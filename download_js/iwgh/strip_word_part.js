/** @param {string} word */
export function strip_word_part(word) {
	if(word.startsWith("ch")) return strip_vowel("ch",word);
	if(word.startsWith("th")) return strip_vowel("th",word);
	if(word.startsWith("b")) return strip_vowel("b",word);
	if(word.startsWith("c")) return strip_vowel("c",word);
	if(word.startsWith("d")) return strip_vowel("d",word);
	if(word.startsWith("f")) return strip_vowel("f",word);
	if(word.startsWith("k")) return strip_vowel("k",word);
	if(word.startsWith("m")) return strip_vowel("m",word);
	if(word.startsWith("n")) return strip_vowel("n",word);
	if(word.startsWith("p")) return strip_vowel("p",word);
	if(word.startsWith("t")) return strip_vowel("t",word);
	if(word.startsWith("v")) return strip_vowel("v",word);
	if(word.startsWith("w")) return strip_vowel("w",word);
	return word;
}
/** @arg {string} prefix @arg {string} word */
export function strip_vowel(prefix,word) {
	if(word.startsWith(prefix+"a")) {
		return word.slice(prefix.length+1);
	}
	if(word.startsWith(prefix+"e")) {
		return word.slice(prefix.length+1);
	}
	if(word.startsWith(prefix+"i")) {
		return word.slice(prefix.length+1);
	}
	if(word.startsWith(prefix+"o")) {
		return word.slice(prefix.length+1);
	}
	if(word.startsWith(prefix+"u")) {
		return word.slice(prefix.length+1);
	}
	if(word.startsWith(prefix+"y")) {
		return word.slice(prefix.length+1);
	}
	return word;
}