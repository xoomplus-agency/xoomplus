/** Log published post count from WP (used by build.sh). */
const api = (process.env.PUBLIC_WP_API || 'https://xoomplus.co.uk/wp-json/wp/v2').replace(
	/\/+$/,
	'',
);

function strip(text) {
	return text.replace(/^\s*<style[\s\S]*?<\/style>\s*/gi, '');
}

const params = new URLSearchParams({
	per_page: '1',
	status: 'publish',
	orderby: 'date',
	order: 'desc',
	_fields: 'id',
	_: String(Date.now()),
});

const res = await fetch(`${api}/posts?${params}`, {
	headers: { 'Cache-Control': 'no-cache' },
});
const total = Number(res.headers.get('X-WP-Total') || '0');
const body = strip(await res.text());
if (!res.ok) {
	console.error(`[build] WP posts count failed HTTP ${res.status}: ${body.slice(0, 120)}`);
	process.exit(1);
}
console.log(`[build] WordPress published posts (X-WP-Total): ${total}`);
