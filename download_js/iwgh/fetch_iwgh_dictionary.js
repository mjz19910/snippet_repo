import {
	deno_default_open,
	read_json_array_file,
	write_entire_file,
} from "./deno_support.js";
import {
	description_cache_set,
	description_set_state,
	parse_rng_description,
} from "./parse_rng_description.js";
import {
	new_words_set,
	parse_rng_word,
	random_dictionary_set,
} from "./parse_rng_word.js";
import { split_at } from "./string_helpers.js";
async function fetch_one_dictionary_page() {
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
		parse_rng_word(word, true, true);
		parse_rng_description(description);
	});
}
async function run() {
	const description_file = await deno_default_open("./description_cache.json");
	/** @type {string[]} */
	const description_load_arr = await read_json_array_file(description_file);
	for (const description_item of description_load_arr) {
		description_cache_set.add(description_item);
	}
	const dictionary_file = await deno_default_open("./random_dictionary.json");
	/** @type {string[]} */
	const load_arr2 = await read_json_array_file(dictionary_file);
	for (const word of load_arr2) {
		parse_rng_word(word, false, false);
	}
	const perf_start = performance.now();
	const at_loop_end = () => {
		console.log("dict word num", new_words_set.size);
		new_words_set.clear();
	};
	let total_request_count = 0;
	const request_log_interval = 15;
	const inc_request_total = () => {
		total_request_count++;
	};
	const arr = [];
	for (let j = 0;; j++) {
		const request_parallelism = 1;
		for (let i = 0; i < request_parallelism; i++) {
			arr.push(fetch_one_dictionary_page().then(inc_request_total));
		}
		await Promise.all(arr);
		console.log("request parallelism", request_parallelism);
		arr.length = 0;
		if (j % request_log_interval === (request_log_interval - 1)) {
			at_loop_end();
			if (j > 20) break;
		}
	}
	const perf_end = performance.now();
	const perf_diff = perf_end - perf_start;
	const total_seconds = Math.floor(perf_diff / 100) / 10;
	console.log("requests took %s seconds", total_seconds.toFixed(1));
	console.log("request_total:", total_request_count);
	console.log(
		"requests per second:",
		+(total_request_count / total_seconds).toFixed(3),
	);
	if (description_set_state.modified) {
		const description_arr = [...description_cache_set.values()].sort();
		console.log("description_arr.length", description_arr.length);
		await write_entire_file(description_file, description_arr);
	}
	description_file.close();
	{
		const dictionary_arr = [...random_dictionary_set.values()].sort();
		console.log("dictionary.length", dictionary_arr.length);
		await write_entire_file(dictionary_file, dictionary_arr);
	}
	dictionary_file.close();
}
await run();

export {};
