/* spell:words
--- version_list item 1 ---
v1 (old): snippet_repo/javascript/final/items/item_01_v1.js
v2 (old): snippet_repo/javascript/final/items/item_01_v2.js
v3 (unk): snippet_repo/javascript/group2/item_01.js
*/
//cspell:disable
let extensionId="cjpalhdlnbpafiamejdnhcphjbkeiagm";
//cspell:enable
// @ts-expect-error
main(chrome);
/** @arg {any} chrome */
function main(chrome) {
	/** @arg {any} _resolve */
	function load_activity_log(_resolve) {
		chrome.activityLogPrivate.getExtensionActivities({
			activityType: chrome.activityLogPrivate.ExtensionActivityFilter.ANY,
			extensionId: extensionId
		});
	}
	async function async_main() {
		let activity_log=chrome.activityLogPrivate.getExtensionActivities({
			activityType: chrome.activityLogPrivate.ExtensionActivityFilter.ANY,
			extensionId: extensionId
		});
		(async () => {
			console.log('activity_log',await activity_log);
		})();
	}
	async_main().then(() => console.log("done"));
	return {
		load_activity_log
	};
}
