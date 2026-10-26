<?php
/**
 * Plugin Name: Xoomplus CMS Noindex
 * Description: Blocks search engines from indexing the WordPress CMS host (e.g. xoomplusagency.com). The public Astro site (xoomplus.co.uk) stays crawlable.
 *
 * Install: copy into wp-content/mu-plugins/ on the CMS.
 *
 * Recommended wp-config.php:
 *   define('WP_HOME', 'https://xoomplus.co.uk');
 *   define('WP_SITEURL', 'https://xoomplusagency.com');
 *   define('XP_PUBLIC_HOME_URL', 'https://xoomplus.co.uk');
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * @return string Request host (lowercase, no port).
 */
function xp_cms_noindex_request_host() {
	$host = isset($_SERVER['HTTP_HOST']) ? (string) $_SERVER['HTTP_HOST'] : '';
	$host = preg_replace('/:\d+$/', '', $host);
	return strtolower($host);
}

/**
 * Hosts treated as the non-public CMS (never for Google indexing).
 *
 * @return string[]
 */
function xp_cms_noindex_hosts() {
	$hosts = array(
		'xoomplusagency.com',
		'www.xoomplusagency.com',
	);

	if (defined('WP_SITEURL') && WP_SITEURL) {
		$h = wp_parse_url((string) WP_SITEURL, PHP_URL_HOST);
		if (is_string($h) && $h !== '') {
			$hosts[] = strtolower($h);
		}
	}

	$site = wp_parse_url(site_url(), PHP_URL_HOST);
	if (is_string($site) && $site !== '') {
		$hosts[] = strtolower($site);
	}

	return array_values(array_unique($hosts));
}

/**
 * @return bool True when this HTTP request is on the CMS host.
 */
function xp_is_cms_host_request() {
	$host = xp_cms_noindex_request_host();
	if ($host === '') {
		return false;
	}
	return in_array($host, xp_cms_noindex_hosts(), true);
}

/** X-Robots-Tag on every CMS-host response (HTML, REST, feeds, etc.). */
add_action(
	'send_headers',
	static function () {
		if (!xp_is_cms_host_request()) {
			return;
		}
		if (!headers_sent()) {
			header('X-Robots-Tag: noindex, nofollow', true);
		}
	},
	0
);

/** robots.txt on the CMS host: disallow everything; no Sitemap line. */
add_filter(
	'robots_txt',
	static function ($output, $public) {
		if (!xp_is_cms_host_request()) {
			return $output;
		}
		return "User-agent: *\nDisallow: /\n";
	},
	99,
	2
);

/** Yoast / front-end robots meta when HTML is served from the CMS host. */
add_filter(
	'wpseo_robots',
	static function ($robots) {
		if (!xp_is_cms_host_request()) {
			return $robots;
		}
		return 'noindex, nofollow';
	},
	99
);

add_action(
	'wp_head',
	static function () {
		if (!xp_is_cms_host_request()) {
			return;
		}
		echo '<meta name="robots" content="noindex, nofollow" />' . "\n";
	},
	1
);
