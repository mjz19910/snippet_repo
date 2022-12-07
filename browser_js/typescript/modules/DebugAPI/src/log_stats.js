/** @param {[unknown, number][]} stats */
export function log_stats(stats) {
	console.log(...stats.sort((a,b) => b[1]-a[1]));
}
