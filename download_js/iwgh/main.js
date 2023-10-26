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
/** @type {Map<string,number>} */
const rng_word_num_map = new Map();
/**
 * @param {string} word
 */
function parse_rng_word(word) {
  word = word.toLowerCase();
  dict.add(word);
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
    parse_rng_word(word);
    description = parse_sentence(description);
    if (!description_set.has(description)) {
      description_set.add(description);
      console.log(["new_description", description]);
      description_set_state.modified = true;
    }
  });
}
/** @arg {Deno.FsFile} file */
async function read_entire_file(file) {
  await file.seek(0, 0);
  let buf = new Uint8Array(0);
  const tmp_buf = new Uint8Array(1024 * 8);
  do {
    const n = await file.read(tmp_buf);
    if (n === null) break;
    const prev_end = buf.length;
    const prev_data = buf;
    buf = new Uint8Array(prev_end + n);
    buf.set(prev_data, 0);
    buf.set(tmp_buf.slice(0, n), prev_end);
  } while (true);
  return new TextDecoder().decode(buf);
}
/** @arg {Deno.FsFile} file @arg {any} obj */
async function write_entire_file(file, obj) {
  const data = JSON.stringify(obj, void 0, "\t");
  await file.seek(0, 0);
  const encoder = new TextEncoder();
  const buf = encoder.encode(data);
  const n_written = await file.write(buf);
  if (n_written !== buf.length) {
    await file.truncate(n_written);
    throw new Error("partial write");
  }
  await file.truncate(buf.length);
}
function deno_default_open(filename) {
  return Deno.open(filename, {
    read: true,
    write: true,
    create: true,
  });
}
function show_rng_map() {
  const rng_map = [...rng_word_num_map.entries()].sort((a, b) => b[1] - a[1]);
  const arr = [];
  let cur_item = [];
  for (let i = 0; i < rng_map.length; i++) {
    if (i % 5 === 0) arr.push(cur_item = []);
    cur_item.push(rng_map[i]);
  }
  for (const part of arr) {
    console.log(part);
  }
}
export { show_rng_map };
/** @template T @arg {Deno.FsFile} file @returns {Promise<T[]>} */
async function read_json_array_file(file) {
  const data = await read_entire_file(file);
  if (data === "") return [];
  return JSON.parse(data);
}
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
    parse_rng_word(word);
  }
  let before_wait = dict.size;
  const request_log_interval = 1; // 10
  for (let j = 0; j < (10 * 3); j++) {
    const request_count = 1; // 20
    for (let i = 0; i < request_count; i++) {
      arr.push(fetch_one_dictionary_page());
    }
    await Promise.all(arr);
    arr.length = 0;
    if (j % request_log_interval === (request_log_interval - 1)) {
      console.log("dict word num", dict.size - before_wait);
      before_wait = dict.size;
    }
  }
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
