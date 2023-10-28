import { fetch_one_dictionary_page } from "./fetch_one_dictionary_page.js";
import { new_words_set, parse_rng_word } from "./parse_rng_word.js";

export async function iwgh_dict_main(dictionary_words_arr) {
	for (const word of dictionary_words_arr) {
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
}
