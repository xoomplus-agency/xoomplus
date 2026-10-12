<?php
/**
 * Plugin Name: Xoomplus Yoast Public Sitemap URLs
 * Description: When WordPress lives on cms.* but the public site is the apex domain, force Yoast sitemap <loc> URLs to the public home URL.
 *
 * Define in wp-config.php (no trailing slash):
 *   define('XP_PUBLIC_HOME_URL', 'https://xoomplus.co.uk');
 *
 * Recommended split-host wp-config (Astro on apex, WP on CMS):
 *   define('WP_HOME', 'https://xoomplus.co.uk');
 *   define('WP_SITEURL', 'https://cms.xoomplus.co.uk');
 *   define('XP_PUBLIC_HOME_URL', 'https://xoomplus.co.uk');
 *
 * Astro still proxies /sitemap_index.xml on the public host so crawlers never hit cms.*.
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * @return string Public home origin without trailing slash, or empty.
 */
function xp_public_home_url() {
	if (defined('XP_PUBLIC_HOME_URL') && XP_PUBLIC_HOME_URL) {
		return untrailingslashit((string) XP_PUBLIC_HOME_URL);
	}
	return '';
}

/**
 * Swap CMS host → public home for absolute URLs. Leaves /wp-content/ paths alone.
 *
 * @param string $url
 * @return string
 */
function xp_rewrite_public_url($url) {
	$public = xp_public_home_url();
	if ($public === '' || !is_string($url) || $url === '') {
		return $url;
	}

	$parts = wp_parse_url($url);
	if (empty($parts['host'])) {
		return $url;
	}

	$path = isset($parts['path']) ? $parts['path'] : '';
	if (strpos($path, '/wp-content/') === 0 || strpos($path, '/wp-includes/') === 0) {
		return $url;
	}

	$public_parts = wp_parse_url($public);
	if (empty($public_parts['host'])) {
		return $url;
	}

	$scheme = !empty($public_parts['scheme']) ? $public_parts['scheme'] : 'https';
	$host = $public_parts['host'];
	$rewritten = $scheme . '://' . $host . $path;
	if (!empty($parts['query'])) {
		$rewritten .= '?' . $parts['query'];
	}
	if (!empty($parts['fragment'])) {
		$rewritten .= '#' . $parts['fragment'];
	}
	return $rewritten;
}

add_filter(
	'wpseo_xml_sitemap_post_url',
	static function ($url) {
		return xp_rewrite_public_url($url);
	},
	20
);

add_filter(
	'wpseo_sitemap_entry',
	static function ($url) {
		if (is_array($url) && !empty($url['loc'])) {
			$url['loc'] = xp_rewrite_public_url($url['loc']);
		}
		return $url;
	},
	20
);

add_filter(
	'wpseo_sitemap_index_links',
	static function ($links) {
		if (!is_array($links)) {
			return $links;
		}
		foreach ($links as &$link) {
			if (is_array($link) && !empty($link['loc'])) {
				$link['loc'] = xp_rewrite_public_url($link['loc']);
			}
		}
		unset($link);
		return $links;
	},
	20
);
