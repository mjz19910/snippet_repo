import { deno_fs_init } from "./deno_fs_init.js";
import { fetch_one_page } from "./fetch_one_page.js";
import { random_dictionary_path } from "./file_paths.js";
import {
	load_dictionary_sync,
	reset_words_set,
	save_dictionary,
} from "./parse_rng_word.js";
/** @param {GetPoemsState} state */
async function scope(state) {
	const lim = 4;
	for (let i = 0; i < (4 * 6); i++) {
		const arr = [];
		for (let j = 0; j < (20 + Math.floor(i / 4)); j++) {
			arr.push(fetch_one_page("poems"));
		}
		await Promise.all(arr);
		arr.length = 0;
		if (i % lim == lim - 1) {
			reset_words_set(20 + Math.floor(i / 4));
			await state.save();
		}
	}
}
class GetPoemsState {
	dictionary_file;
	dictionary_size;
	constructor() {
		this.dictionary_file = Deno.openSync(random_dictionary_path, {
			read: true,
			write: true,
			create: true,
		});
		this.dictionary_size = load_dictionary_sync(this.dictionary_file);
	}
	save() {
		return save_dictionary(
			this.dictionary_file,
			this.dictionary_size,
			false,
		);
	}
	async dispose() {
		await save_dictionary(this.dictionary_file, this.dictionary_size);
		this.dictionary_file.close();
	}
}
/[ct]h|[bcdfkmnptvw]/;
/[ct]h|[aeiouy]|[bcdfkmnptvw]/;
async function main() {
	await deno_fs_init();
	const state = new GetPoemsState();
	await scope(state);
	await state.dispose();
}
await main();
