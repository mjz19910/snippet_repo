import { parse_rng_word } from "./parse_rng_word.js";

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
function unwrap_html_str(html_tag, str) {
	return str.slice(html_tag.length + 2, -html_tag.length - 3);
}
const show_news_str = false;
/** @param {string} v */
export function get_news_str(v) {
	if (!show_news_str) return;
	const [news_str] = string_contained_by(v, '<p class="news">', "</p>");
	console.log(news_str);
}
/** @param {string} line */
function on_poem_line(line) {
	const poem_words = line.slice(0, -1).split(" ");
	for (let i = 0; i < poem_words.length; i++) {
		const poem_word = poem_words[i];
		if (poem_word.endsWith("...")) {
			poem_words[i] = poem_words[i].slice(0, -3);
		} else if (poem_word.endsWith(",")) {
			poem_words[i] = poem_words[i].slice(0, -1);
		}
	}
	return poem_words;
}
function on_poems_page_text(v) {
	const [tbl] = string_contained_by(v, "<table ", "</table>");
	get_news_str(tbl);
	const row1_end = string_contained_by_end(tbl, "<tr>", "</tr>");
	const [row2_str] = string_contained_by(tbl, "<tr>", "</tr>", row1_end);
	const [poem_txt2] = string_contained_by(row2_str, "<p>", "</p>");
	const poem_txt = unwrap_html_str("p", poem_txt2);
	const poem_str = poem_txt.replaceAll("<br>", "\n").split("\n\n")[1];
	const poem_lines = poem_str.split("\n");
	for (const poem_line of poem_lines) {
		const poem_words = on_poem_line(poem_line);
		for (const word of poem_words) {
			parse_rng_word(word, { add_new_words: true, destructure_word: true });
		}
	}
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
