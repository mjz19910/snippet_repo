import { deno_default_open, read_json_array_file } from "./deno_support.js";
import { fetch_one_page } from "./fetch_one_page.js";
import {
	parse_rng_word,
	reset_words_set,
	save_dictionary,
} from "./parse_rng_word.js";
async function scope() {
	for (let i = 0; i < 80; i++) {
		const arr = [];
		for (let j = 0; j < 40; j++) {
			arr.push(fetch_one_page("poems"));
		}
		await Promise.all(arr);
		arr.length = 0;
		if (i % 6 == 5) {
			reset_words_set();
		}
	}
}
/[ct]h|[bcdfkmnptvw]/;
/[ct]h|[aeiouy]|[bcdfkmnptvw]/;
async function main() {
	const dictionary_file = await deno_default_open("src/random_dictionary.json");
	/** @type {string[]} */
	const dictionary_words_arr = await read_json_array_file(dictionary_file);
	for (const word of dictionary_words_arr) {
		parse_rng_word(word, false, false);
	}
	await scope();
	await save_dictionary(dictionary_file, dictionary_words_arr);
	dictionary_file.close();
}
await main();
