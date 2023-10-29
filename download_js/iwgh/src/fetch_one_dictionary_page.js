import { parse_rng_description } from "./parse_rng_description.js";
import { parse_rng_word } from "./parse_rng_word.js";
import { split_at } from "./string_helpers.js";

export async function fetch_one_dictionary_page() {
	const res = await fetch("https://louigiverona.com/iwgh/?page=dictionary");
	let rt = await res.text();
	const start_pos = rt.indexOf("table ", rt.indexOf("table ") + 43) + 57;
	const end_pos = rt.indexOf("</table>");
	rt = rt.slice(start_pos + 26, end_pos - 10);
	let page_arr = split_at(rt, "</p>");
	page_arr = page_arr.map((v) => v.slice(3, -4));
	page_arr.forEach((v) => {
		let [word, description] = v.split(" - ");
		word = word.slice(3, -4);
		word = word.toLowerCase();
		parse_rng_word({ word, add_new_words: true, destructure_word: true });
		parse_rng_description(description);
	});
}
