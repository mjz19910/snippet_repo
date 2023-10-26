import {
  deno_default_open,
  read_json_array_file,
  write_entire_file,
} from "./deno_support.js";

const word3_dict = [
  "art",
  "boat",
  "book",
  "building",
  "clothing",
  "club",
  "coin",
  "company",
  "dance",
  "drink",
  "emblem",
  "establishment",
  "food",
  "game",
  "garden",
  "god",
  "hairstyle",
  "holiday",
  "landscape",
  "martial",
  "melody",
  "music",
  "painting",
  "palace",
  "pastime",
  "performance",
  "person",
  "philosophy",
  "plant",
  "poem",
  "political",
  "profanity",
  "profession",
  "religion",
  "ritual",
  "sculpture",
  "smoking",
  "song",
  "sport",
  "symbol",
  "toy",
  "transport",
  "treehouse",
  "village",
  "weapon",
  "pipe",
];
/**
 * @param {string[]} arr
 */
function next_word(arr) {
  let v = arr.shift();
  if (v === void 0) return null;
  if (v === "") {
    v = arr.shift();
    if (v === void 0) return null;
  }
  if (v === " ") {
    v = arr.shift();
    if (v === void 0) return null;
  }
  return v;
}
/**
 * @typedef {{type: "section";value: string;}} SentenceSectionWord
 */

/**
 * @typedef {{type: "a" | "this_is" | "usually" | "generally" | "of";}} GeneralSentenceWord
 */

/**
 * @typedef {GeneralSentenceWord|SentenceSectionWord|{type:"dictionary_word"|"sentence_structure"; value: string;} } ParsedArrItem
 */

/**
 * @param {(ParsedArrItem)[]} parsed
 * @param {string[]} parsed_src
 */
function parse_next_word(parsed, parsed_src) {
  if (parsed_src.length == 0) return;
  const cur_word = next_word(parsed_src);
  if (cur_word === null) return;
  if (word3_dict.includes(cur_word)) {
    parsed.push({ type: "dictionary_word", value: cur_word });
    return parse_next_word(parsed, parsed_src);
  }
  switch (cur_word) {
    case "thing":
    case "else":
    case "polite":
    case "p.m.":
    case "mean":
    case "might":
    case "lied":
    case "cases":
    case "16":
    case "sound":
    case "most":
    case "different":
    case "being":
    case "after":
    case "texts":
    case "suspect":
    case "priest":
    case "outdated":
    case "otherwise":
    case "older":
    case "least":
    case "central":
    case "wants":
    case "slightly":
    case "among":
    case "mostly":
    case "politician":
    case "lost":
    case "lips":
    case "which":
    case "was":
    case "from":
    case "letters":
    case "holidays":
    case "heard":
    case "generation":
    case "speech":
    case "figure":
    case "ancient":
    case "sure":
    case "you":
    case "younger":
    case "morning":
    case "less":
    case "explained":
    case "exact":
    case "especially":
    case "more":
    case "entirely":
    case "during":
    case "a.m.":
    case "day":
    case "if":
    case "11":
    case "before":
    case "change":
    case "time":
    case "not":
    case "often":
    case "bakers":
    case "barber":
    case "children":
    case "country":
    case "interests":
    case "means":
    case "at":
    case "peasant":
    case "someone":
    case "course":
    case "usage":
    case "common":
    case "modern":
    case "vary":
    case "eastern":
    case "elderly":
    case "circumstances":
    case "citizens":
    case "museum":
    case "rarely":
    case "party":
    case "may":
    case "on":
    case "spotted":
    case "foreigner":
    case "like":
    case "that":
    case "are":
    case "to":
    case "uttered":
    case "sometimes":
    case "something":
    case "told":
    case "by":
    case "official":
    case "it":
    case "debate":
    case "used":
    case "part":
    case "northern":
    case "southern":
    case "or":
    case "scientists":
    case "depending":
    case "as":
    case "its":
    case "it's":
    case "the":
    case "meaning":
    case "linguists":
    case "...":
    case "generally":
    case "when":
    case "this":
    case ",":
    case "though":
    case "but":
    case "instrument":
    case "of":
    case "in":
    case "rare":
    case "local":
    case "traditional":
    case "national":
    case "popular":
    case "category":
    case "sort":
    case "kind":
    case "type":
    case "usually":
    case "This":
    case "is":
    case "a": {
      parsed.push({ type: "sentence_structure", value: cur_word });
      return parse_next_word(parsed, parsed_src);
    }
    default: {
      console.log(["parsed_default", cur_word]);
    }
  }
}
/**
 * @param {string} str
 */
function parse_sentence(str) {
  // remove period
  if (str.endsWith(".")) {
    str = str.slice(0, -1);
  }
  /** @type {ParsedArrItem[]} */
  const parsed = [];
  let parsed_src = str.split(/([ ,]|\.\.\.)/);
  {
    const tmp_arr = [];
    for (; parsed_src.length > 0;) {
      const word = next_word(parsed_src);
      if (word === null) throw new Error("Bad iter");
      tmp_arr.push(word);
    }
    parsed_src = tmp_arr;
  }
  parse_next_word(parsed, parsed_src);
  return str;
}
/** @arg {string} prefix @arg {string} word */
function strip_vowel(prefix, word) {
  if (word.startsWith(prefix + "a")) {
    return word.slice(prefix.length + 1);
  }
  if (word.startsWith(prefix + "e")) {
    return word.slice(prefix.length + 1);
  }
  if (word.startsWith(prefix + "i")) {
    return word.slice(prefix.length + 1);
  }
  if (word.startsWith(prefix + "o")) {
    return word.slice(prefix.length + 1);
  }
  if (word.startsWith(prefix + "u")) {
    return word.slice(prefix.length + 1);
  }
  if (word.startsWith(prefix + "y")) {
    return word.slice(prefix.length + 1);
  }
  return word;
}
function word_starts_with_vowel(word) {
  switch (word[0]) {
    case "a":
    case "e":
    case "i":
    case "o":
    case "u":
    case "y":
      return true;
    default:
      return false;
  }
}
function word_starts_with_consonant_seq(word) {
  switch (word.slice(0, 2)) {
    case "ch":
    case "th":
      return 2;
  }
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
      return 1;
  }
  return null;
}
function strip_word_part(word) {
  if (word.startsWith("ch")) return strip_vowel("ch", word);
  if (word.startsWith("th")) return strip_vowel("th", word);
  if (word.startsWith("b")) return strip_vowel("b", word);
  if (word.startsWith("c")) return strip_vowel("c", word);
  if (word.startsWith("d")) return strip_vowel("d", word);
  if (word.startsWith("f")) return strip_vowel("f", word);
  if (word.startsWith("k")) return strip_vowel("k", word);
  if (word.startsWith("m")) return strip_vowel("m", word);
  if (word.startsWith("n")) return strip_vowel("n", word);
  if (word.startsWith("p")) return strip_vowel("p", word);
  if (word.startsWith("t")) return strip_vowel("t", word);
  if (word.startsWith("v")) return strip_vowel("v", word);
  if (word.startsWith("w")) return strip_vowel("w", word);
  return word;
}
export { strip_word_part };
/** @type {Map<string,number>} */
const rng_word_num_map = new Map();
const new_words_set = new Set();
/**
 * @param {string} word
 */
function parse_rng_word(word, add_new_words = true, destructure_word = false) {
  if (destructure_word) {
    const word_arr = [];
    let w2 = word;
    do {
      if (word_starts_with_vowel(w2)) {
        word_arr.push("v:" + w2[0]);
        w2 = w2.slice(1);
        continue;
      }
      const seq_len = word_starts_with_consonant_seq(w2);
      if (seq_len === null) break;
      word_arr.push("c:" + w2.slice(0, seq_len));
      w2 = w2.slice(seq_len);
    } while (w2 !== "");
    if (word_arr.length < 4) {
      console.log(word_arr.length, word_arr.join(","));
    }
  }
  if (dict.has(word)) return;
  dict.add(word);
  if (add_new_words) {
    new_words_set.add(word);
  }
  const word_chars = word.split("");
  for (let char_idx = 0; char_idx < word_chars.length - 1; char_idx++) {
    const pair1 = word_chars[char_idx];
    const pair2 = word_chars[char_idx + 1];
    const pair_key = pair1 + pair2;
    const seq_val = rng_word_num_map.get(pair_key);
    if (seq_val !== void 0) {
      rng_word_num_map.set(pair_key, seq_val + 1);
    } else {
      rng_word_num_map.set(pair_key, 1);
    }
    break;
  }
}
/**
 * @param {string} str
 * @param {string} needle
 */
function split_at(str, needle) {
  let idx = str.indexOf(needle);
  if (idx === -1) return [str];
  const n_len = needle.length;
  const arr = [];
  let start = 0;
  do {
    const sp = str.slice(start, idx + n_len);
    arr.push(sp);
    start = idx + n_len;
    idx = str.indexOf(needle, start);
  } while (idx !== -1);
  return arr;
}
/** @type {Set<string>} */
const dict = new Set();
/** @type {Set<string>} */
const description_set = new Set();
const description_set_state = {
  modified: false,
};
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
    parse_rng_word(word, true, false);
    description = parse_sentence(description);
    if (!description_set.has(description)) {
      description_set.add(description);
      console.log(["new_description", description]);
      description_set_state.modified = true;
    }
  });
}
function show_rng_map() {
  const rng_map = [...rng_word_num_map.entries()].sort((a, b) => b[1] - a[1]);
  const arr = [];
  let cur_item = [];
  for (let i = 0; i < rng_map.length; i++) {
    if (i % 4 === 0) arr.push(cur_item = []);
    cur_item.push(rng_map[i]);
  }
  for (const part of arr) {
    console.log(part);
  }
}
export { show_rng_map };
function peek_description_arr(description_arr) {
  const description_arr2 = description_arr.slice(0, 5);
  for (const description of description_arr2) {
    console.log("%o", description);
  }
}
export { peek_description_arr };
async function run() {
  const arr = [];
  const description_file = await deno_default_open("./description_cache.json");
  /** @type {string[]} */
  const description_load_arr = await read_json_array_file(description_file);
  for (const description_item of description_load_arr) {
    description_set.add(description_item);
  }
  const dictionary_file = await deno_default_open("./random_dictionary.json");
  /** @type {string[]} */
  const load_arr2 = await read_json_array_file(dictionary_file);
  for (const word of load_arr2) {
    parse_rng_word(word, false, false);
  }
  let before_wait = dict.size;
  const at_loop_end = () => {
    const new_words = dict.size - before_wait;
    before_wait = dict.size;
    const new_words_arr = [...new_words_set.values()].sort();
    for (const new_word of new_words_arr) {
      parse_rng_word(new_word, true, true);
    }
    console.log(new_words_arr);
    new_words_set.clear();
    console.log("dict word num", new_words);
  };
  const request_log_interval = 11;
  for (let j = 0; j < (10 * 8 + request_log_interval - 1); j++) {
    const request_count = 4;
    for (let i = 0; i < request_count; i++) {
      arr.push(fetch_one_dictionary_page());
    }
    await Promise.all(arr);
    arr.length = 0;
    if (j % request_log_interval === (request_log_interval - 1)) {
      at_loop_end();
    }
  }
  at_loop_end();
  if (description_set_state.modified) {
    const description_arr = [...description_set.values()].sort();
    console.log("description_arr.length", description_arr.length);
    await write_entire_file(description_file, description_arr);
  }
  description_file.close();
  {
    const dictionary_arr = [...dict.values()].sort();
    console.log("dictionary.length", dictionary_arr.length);
    await write_entire_file(dictionary_file, dictionary_arr);
  }
  dictionary_file.close();
}
await run();

export {};
