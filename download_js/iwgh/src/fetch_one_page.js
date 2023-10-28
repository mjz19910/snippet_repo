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
const show_news_str = false;
/** @param {string} v */
export function get_news_str(v) {
	if (!show_news_str) return;
	const [news_str] = string_contained_by(v, '<p class="news">', "</p>");
	console.log(news_str);
}
function on_poems_page_text(v) {
	const [tbl] = string_contained_by(v, "<table ", "</table>");
	get_news_str(tbl);
	const row1_end = string_contained_by_end(tbl, "<tr>", "</tr>");
	const [row2_str] = string_contained_by(tbl, "<tr>", "</tr>", row1_end);
	const [poem_txt] = string_contained_by(row2_str, "<p>", "</p>");
	console.log(poem_txt);
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
