import {
	deno_default_open,
	read_json_array_file,
	write_entire_file,
} from "./deno_support.js";
import { fetch_one_page } from "./fetch_one_page.js";
import { parse_rng_word, random_dictionary_set } from "./parse_rng_word.js";

async function scope() {
	for (let i = 0; i < 40; i++) {
		const arr = [];
		for (let j = 0; j < 50; j++) {
			arr.push(fetch_one_page("poems"));
		}
		await Promise.all(arr);
		reset_words_set();
	}
}
async function main() {
	const dictionary_file = await deno_default_open("src/random_dictionary.json");
	/** @type {string[]} */
	const dictionary_words_arr = await read_json_array_file(dictionary_file);
	for (const word of dictionary_words_arr) {
		parse_rng_word(word, false, false);
	}
	await scope();
	const dictionary_arr = [...random_dictionary_set.values()].sort();
	console.log(
		"dictionary.length",
		dictionary_arr.length - dictionary_words_arr.length,
	);
	await write_entire_file(dictionary_file, dictionary_arr);
	dictionary_file.close();
}
await main();
