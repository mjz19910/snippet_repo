/** @param {string} v @param {string} needle1 @param {string} needle2  */
function string_contained_by(v, needle1, needle2) {
	const start_pos = v.indexOf(needle1);
	const end_pos = v.indexOf(needle2, start_pos) + needle2.length;
	return v.slice(start_pos, end_pos);
}
/** @param {"poems"} target_page */
export async function fetch_one_page(target_page) {
	const res = await fetch(`https://louigiverona.com/iwgh/?page=${target_page}`);
	const rt = await res.text();
	switch (target_page) {
		case "poems": {
			const in_table_str = string_contained_by(rt, '<table ', "</table>");
			console.log(in_table_str);
			console.log(
				string_contained_by(in_table_str, '<p class="news">', "</p>"),
			);
			break;
		}
	}
}
async function main() {
}
await main();
