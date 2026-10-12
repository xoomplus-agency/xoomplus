<?php
/**
 * Plugin Name: Xoomplus Deploy Hook
 * Description: Triggers the Astro/VPS build hook when posts are published, updated, unpublished, or deleted. Schedules a follow-up if the 60s lock swallows a second publish.
 *
 * Define in wp-config.php (never commit the real URL):
 *   define('XP_DEPLOY_HOOK_URL', 'https://your-vps.example/hooks/rebuild');
 * Legacy alias also accepted: DEPLOY_HOOK_URL
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * @return string
 */
function xp_deploy_hook_url() {
	if (defined('XP_DEPLOY_HOOK_URL') && XP_DEPLOY_HOOK_URL) {
		return (string) XP_DEPLOY_HOOK_URL;
	}
	if (defined('DEPLOY_HOOK_URL') && DEPLOY_HOOK_URL) {
		return (string) DEPLOY_HOOK_URL;
	}
	return '';
}

/**
 * Fire the host build hook. Uses a 60s transient lock to avoid stampeding builds.
 * If locked, schedules one more attempt ~65s later so the last change is never lost.
 *
 * @param string $reason
 * @param bool   $from_scheduled  When true, skip re-scheduling (avoid loops).
 */
function xp_trigger_deploy_hook($reason = 'post-change', $from_scheduled = false) {
	$hook = xp_deploy_hook_url();
	if ($hook === '') {
		error_log('[xoomplus-deploy] XP_DEPLOY_HOOK_URL / DEPLOY_HOOK_URL not defined — skip (' . $reason . ')');
		return;
	}

	$lock_key = 'xp_deploy_hook_lock';
	if (get_transient($lock_key)) {
		error_log('[xoomplus-deploy] lock active — deferring (' . $reason . ')');
		if (!$from_scheduled && !wp_next_scheduled('xp_deploy_hook_deferred')) {
			wp_schedule_single_event(time() + 65, 'xp_deploy_hook_deferred', array($reason . '-deferred'));
		}
		return;
	}

	set_transient($lock_key, 1, 60);

	$response = wp_remote_post(
		$hook,
		array(
			'timeout'  => 8,
			'blocking' => true,
			'headers'  => array('Content-Type' => 'application/json'),
			'body'     => wp_json_encode(array('reason' => $reason, 'source' => 'wordpress')),
		)
	);

	if (is_wp_error($response)) {
		error_log('[xoomplus-deploy] hook error: ' . $response->get_error_message());
		return;
	}

	$code = (int) wp_remote_retrieve_response_code($response);
	error_log('[xoomplus-deploy] hook HTTP ' . $code . ' (' . $reason . ')');
	// Listener should answer 202 Accepted (or 200).
}

add_action('xp_deploy_hook_deferred', function ($reason = 'deferred') {
	xp_trigger_deploy_hook(is_string($reason) ? $reason : 'deferred', true);
});

add_action('transition_post_status', function ($new, $old, $post) {
	if (!($post instanceof WP_Post) || $post->post_type !== 'post') {
		return;
	}
	$relevant = in_array($new, array('publish', 'trash', 'draft', 'private', 'pending', 'future'), true)
		|| in_array($old, array('publish'), true);
	if (!$relevant) {
		return;
	}
	xp_trigger_deploy_hook('transition:' . $old . '→' . $new . ':#' . $post->ID);
}, 10, 3);

add_action('delete_post', function ($post_id) {
	$post = get_post($post_id);
	if (!$post || $post->post_type !== 'post') {
		return;
	}
	xp_trigger_deploy_hook('delete:#' . $post_id);
});
