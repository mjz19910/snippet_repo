/** @param {string} v @param {string} needle1 @param {string} needle2 @returns {[string,number]} */
function string_contained_by(v, needle1, needle2, search_pos = 0) {
	const start_pos = v.indexOf(needle1, search_pos);
	const end_pos = v.indexOf(needle2, start_pos) + needle2.length;
	return [v.slice(start_pos, end_pos), end_pos];
}
/** @param {string} v @param {string} needle1 @param {string} needle2 */
function string_contained_by_end(v, needle1, needle2) {
	const start_pos = v.indexOf(needle1);
	const end_pos = v.indexOf(needle2, start_pos) + needle2.length;
	return end_pos;
}
/** @param {"poems"} target_page */
export async function fetch_one_page(target_page) {
	const res = await fetch(`https://louigiverona.com/iwgh/?page=${target_page}`);
	const rt = await res.text();
	switch (target_page) {
		case "poems": {
			const [in_table_str] = string_contained_by(rt, "<table ", "</table>");
			const row1_end = string_contained_by_end(in_table_str, "<tr>", "</tr>");
			console.log(string_contained_by(in_table_str, "<tr>", "</tr>", row1_end)[0]);
			const [news_str] = string_contained_by(
				in_table_str,
				'<p class="news">',
				"</p>",
			);
			console.log(news_str);
			break;
		}
	}
}
async function main() {
}
await main();
