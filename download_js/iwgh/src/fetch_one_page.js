/** @param {string} v @param {string} needle1 @param {string} needle2 @returns {[string,number]} */
function string_contained_by(v, needle1, needle2, search_pos = 0) {
	const start_pos = v.indexOf(needle1, search_pos);
	const end_pos = v.indexOf(needle2, start_pos) + needle2.length;
	return [v.slice(start_pos, end_pos), end_pos];
}
/** @param {string} v @param {string} needle1 @param {string} needle2 */
function string_contained_by_end(v, needle1, needle2, search_pos = 0) {
	const start_pos = v.indexOf(needle1, search_pos);
	const end_pos = v.indexOf(needle2, start_pos) + needle2.length;
	return end_pos;
}
function on_poems_page_text(v) {
	const [tbl] = string_contained_by(v, "<table ", "</table>");
	const row1_end = string_contained_by_end(tbl, "<tr>", "</tr>");
	const [row2_str] = string_contained_by(tbl, "<tr>", "</tr>", row1_end);
	console.log(row2_str);
	const [news_str] = string_contained_by(tbl, '<p class="news">', "</p>");
	console.log(news_str);
}
/** @param {"poems"} target_page */
export async function fetch_one_page(target_page) {
	const res = await fetch(`https://louigiverona.com/iwgh/?page=${target_page}`);
	const rt = await res.text();
	switch (target_page) {
		case "poems": {
			on_poems_page_text(rt);
			break;
		}
	}
}
