import {
	read_json_array_file,
	read_json_array_file_sync,
	write_entire_file,
} from "./deno_support.js";

/**
 * @param {string} word
 * @returns {["consonant",1|2]|["vowel",1]}
 */
export function word_starts_with_consonant_seq(word) {
	switch (word.slice(0, 2)) {
		case "ch":
		case "th":
			return ["consonant", 2];
	}
	//cspell:ignore aeiouy
	//cspell:ignore bcdfkmnptvw
	/([aeiouy]|[ct]h|[bcdfkmnptvw]){4}/;
	switch (word[0]) {
		case "b":
		case "c":
		case "d":
		case "f":
		case "k":
		case "m":
		case "n":
		case "p":
		case "t":
		case "v":
		case "w":
			return ["consonant", 1];
		case "a":
		case "e":
		case "i":
		case "o":
		case "u":
		case "y":
			return ["vowel", 1];
	}
	throw new Error("Invalid word start '" + word.slice(0, 3) + "'");
}
/**
 * @param {string} word
 * @returns {{item:WordArrItem,rest:string}}
 */
export function word_starts_with_consonant_seq2(word) {
	const [type, idx] = word_starts_with_consonant_seq(word);
	const part = word.slice(0, idx), rest = word.slice(idx);
	return { item: { type, v: part }, rest };
}
/** @type {Set<string>} */
export const random_dictionary_set = new Set();
/** @param {Deno.FsFile} dictionary_file @param {number} dictionary_size */
export async function save_dictionary(
	dictionary_file,
	dictionary_size,
	debug = true,
) {
	const dictionary_arr = [...random_dictionary_set.values()].sort();
	if (debug) {
		console.log(
			"diff(dictionary.length,dictionary_words.length)",
			dictionary_arr.length - dictionary_size,
		);
	}
	await write_entire_file(dictionary_file, dictionary_arr);
	return dictionary_arr.length;
}
export const new_words_set = new Set();
export const partial_words = new Set();
/** @param {Deno.FsFile} file  */
export async function load_dictionary(file) {
	/** @type {string[]} */
	const dictionary_words_arr = await read_json_array_file(file);
	for (const word of dictionary_words_arr) {
		if (word === "") continue;
		random_dictionary_set.add(word);
	}
	return dictionary_words_arr.length;
}

/** @param {Deno.FsFile} file  */
export function load_dictionary_sync(file) {
	/** @type {string[]} */
	const dictionary_words_arr = read_json_array_file_sync(file);
	for (const word of dictionary_words_arr) {
		if (word === "") continue;
		random_dictionary_set.add(word);
	}
	return dictionary_words_arr.length;
}

/** @param {ParseRngOpts} opts */
export function parse_rng_word(opts) {
	parse_rng_word2(opts.word, opts);
}

/** @typedef {{type: "consonant" | "vowel";v: string;}} WordArrItem */
/** @typedef {{word:string; add_new_words:boolean; destructure_word:boolean; word_arr?: WordArrItem[]}} ParseRngOpts */

const length_limit = 3;
/**
 * @param {string} word
 * @param {ParseRngOpts} opts
 */
export function parse_rng_word2(word, opts) {
	if (word === "") return;
	const { add_new_words } = opts;
	if (random_dictionary_set.has(word)) return;
	if (!add_new_words) {
		partial_words.add(word.slice(0, -1));
	}
	const word_arr = [];
	let v = word;
	for (;;) {
		const r2 = word_starts_with_consonant_seq2(v);
		word_arr.push(r2.item);
		if (r2.rest === "") break;
		v = r2.rest;
	}
	opts.word_arr = word_arr.slice();
	const ll = length_limit;
	const vowel_word_arr = [];
	do {
		const r1 = word_arr.at(-1);
		if (r1 && r1.type === "vowel") {
			word = word.slice(0, -1);
			const del = word_arr.splice(-1, 1);
			vowel_word_arr.unshift(...del);
		} else {
			break;
		}
		if (word === "") return;
	} while (true);
	x: if (vowel_word_arr.length !== 0) {
		if (vowel_word_arr.length > ll) break x;
		const vowel_word = vowel_word_arr.map((v) => v.v).join("");
		add_word_to_cache(opts, vowel_word, vowel_word_arr);
	}
	if (random_dictionary_set.has(word)) return;
	if (word_arr.length > ll) {
		parse_rng_word2(word_arr.slice(0, -1).map((v) => v.v).join(""), opts);
		parse_rng_word2(word_arr.slice(1).map((v) => v.v).join(""), opts);
		return;
	}
	add_word_to_cache(opts, word, word_arr, { generated: false });
	const vowel_list = ["a", "e", "i", "o", "u", "y"];
	/** @type {WordArrItem} */
	const v_obj = { type: "vowel", v: "" };
	word_arr.push(v_obj);
	for (const v_end of vowel_list) {
		v_obj.v = v_end;
		add_word_to_cache(opts, word + v_end, word_arr, { generated: true });
	}
}

/** @param {{generated: boolean}} word_opts @param {ParseRngOpts} opts @param {string} word @param {WordArrItem} word_arr */
function add_word_to_cache(opts, word, word_arr, word_opts) {
	if (random_dictionary_set.has(word)) return;
	random_dictionary_set.add(word);
	if (word_opts.generated) return;
	if (opts.add_new_words) new_words_set.add(word);
	show_word_parts(opts, word_arr);
}

/**
 * @param {ParseRngOpts} opts @param {WordArrItem[]} word_arr
 */
function show_word_parts(opts, word_arr) {
	if (!opts.destructure_word) return;
	const wj = word_arr.map((v) => v.v).join(""),
		tj1 = word_arr.map((v) => v.type == "vowel" ? "v" : "c").join(""),
		tj2 = opts.word_arr.map((v) => v.type == "vowel" ? "v" : "c").join("");
	console.log("W:", wj, [".parts", word_arr.length], "T:", tj2, "->", tj1);
}

/** @param {number} par */
export function reset_words_set(par) {
	console.log("dict word num", new_words_set.size, "par", par);
	new_words_set.clear();
}
