import { read_json_array_file, write_entire_file } from "./deno_support.js";

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
 * @returns {{part:{type:"consonant"|"vowel",v:string},rest:string}}
 */
export function word_starts_with_consonant_seq2(word) {
	const [type, idx] = word_starts_with_consonant_seq(word);
	const part = word.slice(0, idx), rest = word.slice(idx);
	return { part: { type, v: part }, rest };
}
/** @type {Set<string>} */
export const random_dictionary_set = new Set();
/** @param {Deno.FsFile} dictionary_file @param {number} dictionary_size */
export function save_dictionary(dictionary_file, dictionary_size) {
	const dictionary_arr = [...random_dictionary_set.values()].sort();
	console.log(
		"diff(dictionary.length,dictionary_words.length)",
		dictionary_arr.length - dictionary_size,
	);
	console.log(partial_words);
	return write_entire_file(dictionary_file, dictionary_arr);
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
const length_limit = 3;
/**
 * @param {string} word
 * @param {{add_new_words:boolean;destructure_word:boolean}} opts
 */
export function parse_rng_word(word, opts) {
	if (word === "") return;
	const { add_new_words, destructure_word } = opts;
	if (random_dictionary_set.has(word)) return;
	if (!add_new_words) {
		partial_words.add(word.slice(0, -1));
	}
	const word_arr = [];
	let v = word;
	for (;;) {
		const r2 = word_starts_with_consonant_seq2(v);
		word_arr.push(r2.part);
		if (r2.rest === "") break;
		v = r2.rest;
	}
	const ll = length_limit + 1;
	const trimmed = [];
	do {
		const r1 = word_arr.at(-1);
		if (r1 && r1.type === "vowel") {
			word = word.slice(0, -1);
			const del = word_arr.splice(-1, 1);
			trimmed.unshift(...del);
		} else {
			break;
		}
		if (word === "") return;
	} while (true);
	x: if (trimmed.length !== 0) {
		const vowel_word = trimmed.map((v) => v.v).join("");
		if (random_dictionary_set.has(vowel_word)) break x;
		random_dictionary_set.add(vowel_word);
		if (add_new_words) {
			new_words_set.add(vowel_word);
		}
		console.log(trimmed.length, vowel_word);
	}
	if (random_dictionary_set.has(word)) return;
	if (word_arr.length >= ll) {
		const p2 = word_arr.at(-2);
		if (!p2) throw new Error("");
		if (p2.type === "consonant") {
			const truncated_word = word_arr.slice(0, -2).map((v) => v.v).join("");
			if (word_arr.length > ll) {
				parse_rng_word(truncated_word, opts);
			} else {
				partial_words.add(truncated_word);
			}
		} else {
			parse_rng_word(word_arr.slice(0, -1).map((v) => v.v).join(""), opts);
		}
		// parse_rng_word(word_arr.slice(0, -1).join(""), opts);
		parse_rng_word(word_arr.slice(1).map((v) => v.v).join(""), opts);
		return;
	}
	if (destructure_word) show_word_parts(word_arr);
	random_dictionary_set.add(word);
	if (add_new_words) {
		new_words_set.add(word);
	}
}
/**
 * @param {ReturnType<typeof word_starts_with_consonant_seq2>["part"][]} word_arr
 */
function show_word_parts(word_arr) {
	if (word_arr.length > 3) return;
	const wj = word_arr.map((v) => v.v).join(""),
		tj = word_arr.map((v) => v.type == "vowel" ? "v" : "c").join("");
	console.log("W:", wj, "T:", tj, [".parts", word_arr.length]);
}

export function reset_words_set() {
	console.log("dict word num", new_words_set.size);
	new_words_set.clear();
}
