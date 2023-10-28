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
 * @returns {{type:"consonant"|"vowel",part:string,rest:string}}
 */
export function word_starts_with_consonant_seq2(word) {
	const [type, seq_len] = word_starts_with_consonant_seq(word);
	const part = word.slice(0, seq_len), rest = word.slice(seq_len);
	return { type, part, rest };
}
/** @type {Set<string>} */
export const dict = new Set();
export const new_words_set = new Set();
/**
 * @param {string} word
 */
export function parse_rng_word(
	word,
	add_new_words = true,
	destructure_word = false,
) {
	if (dict.has(word)) return;
	if (destructure_word) {
		const word_arr = [],
			/** @type {("c" | "v")[]} */
			type_arr = [];
		let w2 = word;
		do {
			const r2 = word_starts_with_consonant_seq2(w2);
			word_arr.push(r2.part);
			type_arr.push(r2.type == "vowel" ? "v" : "c");
			w2 = r2.rest;
		} while (w2 !== "");
		if (word_arr.length <= 3) {
			console.log("W:", word_arr.join(""), "T:", type_arr.join(""));
		}
	}
	dict.add(word);
	if (add_new_words) {
		new_words_set.add(word);
	}
}
