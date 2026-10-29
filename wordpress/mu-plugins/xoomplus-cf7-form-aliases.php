<?php
/**
 * Plugin Name: Xoomplus CF7 Form ID Aliases + CORS
 * Description: CF7 ID aliases, CORS, consent mail label, multi-service join (split comma string → array for checkbox validation).
 *
 * Install on WordPress (xoomplusagency.com):
 *   wp-content/mu-plugins/xoomplus-cf7-form-aliases.php
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * @return array<int, int>
 */
function xp_cf7_form_aliases(): array {
	return array(
		15940 => 15862,
		15941 => 15863,
	);
}

/**
 * @return list<string>
 */
function xp_cf7_cors_allowed_origins(): array {
	$defaults = array(
		'https://xoomplus.co.uk',
		'https://www.xoomplus.co.uk',
		'http://localhost:4321',
		'http://127.0.0.1:4321',
	);
	/**
	 * @param list<string> $origins
	 */
	return apply_filters('xp_cf7_cors_allowed_origins', $defaults);
}

/**
 * @return string Empty if origin not allowed.
 */
function xp_cf7_request_origin(): string {
	$origin = isset($_SERVER['HTTP_ORIGIN']) ? trim((string) $_SERVER['HTTP_ORIGIN']) : '';
	if ($origin === '') {
		return '';
	}
	return in_array($origin, xp_cf7_cors_allowed_origins(), true) ? $origin : '';
}

function xp_cf7_send_cors_headers(): void {
	$origin = xp_cf7_request_origin();
	if ($origin === '') {
		return;
	}
	header('Access-Control-Allow-Origin: ' . $origin);
	header('Vary: Origin');
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Accept');
	header('Access-Control-Max-Age: 86400');
}

/**
 * Early OPTIONS preflight for CF7 REST (before WP returns a non-CORS 404).
 */
function xp_cf7_handle_options_preflight(): void {
	if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'OPTIONS') {
		return;
	}
	$uri = $_SERVER['REQUEST_URI'] ?? '';
	if (strpos($uri, '/wp-json/contact-form-7/') === false) {
		return;
	}
	xp_cf7_send_cors_headers();
	status_header(204);
	exit;
}

add_action('init', 'xp_cf7_handle_options_preflight', 0);

/**
 * @param bool             $served
 * @param WP_HTTP_Response $result
 * @param WP_REST_Request  $request
 * @param WP_REST_Server   $server
 */
function xp_cf7_cors_rest_pre_serve($served, $result, $request, $server) {
	if (!($request instanceof WP_REST_Request)) {
		return $served;
	}
	$route = $request->get_route();
	if (is_string($route) && strpos($route, '/contact-form-7/') === 0) {
		xp_cf7_send_cors_headers();
	}
	return $served;
}

add_filter('rest_pre_serve_request', 'xp_cf7_cors_rest_pre_serve', 15, 4);

/**
 * @param mixed           $result
 * @param WP_REST_Server  $server
 * @param WP_REST_Request $request
 * @return mixed
 */
function xp_cf7_alias_rest_pre_dispatch($result, $server, $request) {
	if ($result !== null) {
		return $result;
	}
	if (!($request instanceof WP_REST_Request) || !($server instanceof WP_REST_Server)) {
		return $result;
	}

	// CORS on OPTIONS for matched CF7 routes.
	if ($request->get_method() === 'OPTIONS') {
		$route = $request->get_route();
		if (is_string($route) && strpos($route, '/contact-form-7/') === 0) {
			$response = new WP_REST_Response(null, 204);
			return $response;
		}
	}

	$route = $request->get_route();
	if (!is_string($route) || !preg_match(
		'#^/contact-form-7/v1/contact-forms/(15940|15941)(/feedback(?:/schema)?)?$#',
		$route,
		$m
	)) {
		return $result;
	}

	// Skip if this request is already an alias hop.
	if ($request->get_header('x_xp_cf7_alias')) {
		return $result;
	}

	$from = (int) $m[1];
	$aliases = xp_cf7_form_aliases();
	if (!isset($aliases[$from])) {
		return $result;
	}

	$to = (int) $aliases[$from];
	$suffix = isset($m[2]) ? $m[2] : '';
	$new_route = "/contact-form-7/v1/contact-forms/{$to}{$suffix}";

	$aliased = new WP_REST_Request($request->get_method(), $new_route);
	$aliased->set_query_params($request->get_query_params());
	$aliased->set_body_params($request->get_body_params());
	$aliased->set_file_params($request->get_file_params());
	$aliased->set_url_params(array_merge($request->get_url_params(), array('id' => $to)));
	$aliased->set_headers($request->get_headers());
	$aliased->set_body($request->get_body());
	$aliased->set_param('id', $to);
	$aliased->set_header('X-XP-CF7-Alias', (string) $from);

	// Keep CF7 meta field in sync when clients still send _wpcf7=15940.
	$body_params = $aliased->get_body_params();
	if (is_array($body_params) && isset($body_params['_wpcf7'])) {
		$body_params['_wpcf7'] = (string) $to;
		$aliased->set_body_params($body_params);
	}

	if (defined('WP_DEBUG') && WP_DEBUG) {
		error_log("[xp-cf7-alias] dispatch {$route} → {$new_route}");
	}

	return $server->dispatch($aliased);
}

add_filter('rest_pre_dispatch', 'xp_cf7_alias_rest_pre_dispatch', 5, 3);

/**
 * Astro sends project-services as one comma-separated string (reliable over Node→PHP).
 * Split it into an array before CF7 checkbox validation runs.
 *
 * @param mixed           $result
 * @param WP_REST_Server  $server
 * @param WP_REST_Request $request
 * @return mixed
 */
function xp_cf7_split_services_before_cf7($result, $server, $request) {
	if (!($request instanceof WP_REST_Request)) {
		return $result;
	}
	$route = $request->get_route();
	if (!is_string($route) || strpos($route, '/contact-form-7/') === false || strpos($route, '/feedback') === false) {
		return $result;
	}

	if (!isset($_POST['project-services']) || !is_string($_POST['project-services'])) {
		return $result;
	}

	$raw = trim($_POST['project-services']);
	if ($raw === '') {
		return $result;
	}

	$parts = array_values(array_filter(array_map('trim', explode(',', $raw)), static function ($v) {
		return $v !== '';
	}));
	if (!$parts) {
		return $result;
	}

	$_POST['project-services'] = $parts;

	$body = $request->get_body_params();
	if (is_array($body)) {
		$body['project-services'] = $parts;
		$request->set_body_params($body);
	}

	return $result;
}

add_filter('rest_pre_dispatch', 'xp_cf7_split_services_before_cf7', 4, 3);

/**
 * Mail output: acceptance fields print "1" — show "Checked/Ticked" instead.
 * Join service arrays so every selection appears in the email.
 *
 * @param string              $replaced
 * @param string|array|null   $submitted
 * @param bool                $html
 * @param WPCF7_MailTag|mixed $mail_tag
 * @return string
 */
function xp_cf7_mail_tag_replaced($replaced, $submitted, $html, $mail_tag) {
	$name = '';
	if (is_object($mail_tag) && method_exists($mail_tag, 'field_name')) {
		$name = (string) $mail_tag->field_name();
	}

	if ($name === 'privacy-consent') {
		$raw = is_array($submitted) ? implode(',', $submitted) : (string) $submitted;
		$raw = strtolower(trim($raw));
		if ($raw === '1' || $raw === 'on' || $raw === 'yes' || $raw === 'true' || $raw === 'checked' || $raw === 'checked/ticked') {
			return 'Checked/Ticked';
		}
	}

	if ($name === 'project-services') {
		if (is_array($submitted)) {
			$parts = array_values(array_filter(array_map('strval', $submitted), static function ($v) {
				return trim($v) !== '';
			}));
			if ($parts) {
				return implode(', ', $parts);
			}
		}
	}

	return $replaced;
}

add_filter('wpcf7_mail_tag_replaced', 'xp_cf7_mail_tag_replaced', 10, 4);

/**
 * Ensure Flamingo / mail posted data lists every service.
 *
 * @param array<string, mixed> $posted_data
 * @return array<string, mixed>
 */
function xp_cf7_posted_data($posted_data) {
	if (!is_array($posted_data)) {
		return $posted_data;
	}

	if (isset($posted_data['project-services']) && is_array($posted_data['project-services'])) {
		$parts = array_values(array_filter(array_map('strval', $posted_data['project-services']), static function ($v) {
			return trim($v) !== '';
		}));
		if ($parts) {
			$posted_data['project-services'] = implode(', ', $parts);
		}
	}

	return $posted_data;
}

add_filter('wpcf7_posted_data', 'xp_cf7_posted_data', 10, 1);
