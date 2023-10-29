import { deno_fs_init } from "./deno_fs_init.js";
import { deno_default_open } from "./deno_support.js";
import { fetch_one_page } from "./fetch_one_page.js";
import { random_dictionary_path } from "./file_paths.js";
import {
	load_dictionary,
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
	await deno_fs_init();
	const dictionary_file = await deno_default_open(random_dictionary_path);
	const dict_size = await load_dictionary(dictionary_file);
	await scope();
	await save_dictionary(dictionary_file, dict_size);
	dictionary_file.close();
}
await main();
