import { parse_rng_description } from "./parse_rng_description.js";
import { parse_rng_word } from "./parse_rng_word.js";
import { split_at } from "./string_helpers.js";

/** @param {"poems"} target_page */
export async function fetch_one_page(target_page) {
	const res = await fetch(`https://louigiverona.com/iwgh/?page=${target_page}`);
	let rt = await res.text();
	switch (target_page) {
		case "poems": {
			const start_pos = rt.indexOf("table ", rt.indexOf("table ") + 43) + 57;
			const end_pos = rt.indexOf("</table>");
			rt = rt.slice(start_pos + 26, end_pos - 10);
			console.log(rt);
			break;
		}
	}
	let page_arr = split_at(rt, "</p>");
	page_arr = page_arr.map((v) => v.slice(3, -4));
	page_arr.forEach((v) => {
		let [word, description] = v.split(" - ");
		word = word.slice(3, -4);
		word = word.toLowerCase();
		parse_rng_word(word, true, true);
		parse_rng_description(description);
	});
}
