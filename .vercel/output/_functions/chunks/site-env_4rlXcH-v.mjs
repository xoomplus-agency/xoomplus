//#region src/lib/site-env.ts
var STAGING_ROBOTS = "noindex, nofollow, noarchive, nosnippet, noimageindex";
function isProduction() {
	return false;
}
function isStaging() {
	return !isProduction();
}
//#endregion
export { isProduction as n, isStaging as r, STAGING_ROBOTS as t };
