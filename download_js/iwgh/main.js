const word3_dict=[
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
 * @template T
 * @param {T[]} arr
 */
function arr_end(arr) {
	let v=arr.at(-1);
	if(v===void 0) throw new Error("arr_end");
	return v;
}
/**
 * @param {string[]} arr
 */
function next_word(arr) {
	let v=arr.shift();
	if(v===void 0) return null;
	if(v==="") {
		v=arr.shift();
		if(v===void 0) return null;
	}
	if(v===" ") {
		v=arr.shift();
		if(v===void 0) return null;
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
function parse_next_word(parsed,parsed_src) {
	if(parsed_src.length==0) return;
	let cur_word=next_word(parsed_src);
	if(cur_word===null) return;
	if(word3_dict.includes(cur_word)) {
		parsed.push({type: "dictionary_word",value: cur_word});
		return parse_next_word(parsed,parsed_src);
	}
	switch(cur_word) {
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
			parsed.push({type: "sentence_structure",value: cur_word});
			return parse_next_word(parsed,parsed_src);
		}
		default: {
			console.log(["parsed_default",cur_word]);
		}
	}
}
/**
 * @param {string} str
 */
function parse_sentence(str) {
	// remove period
	if(str.endsWith(".")) {
		str=str.slice(0,-1);
	}
	/** @type {ParsedArrItem[]} */
	let parsed=[];
	let parsed_src=str.split(/([ ,]|\.\.\.)/);
	{
		let tmp_arr=[];
		for(;parsed_src.length>0;) {
			let word=next_word(parsed_src);
			if(word===null) throw new Error("Bad iter");
			tmp_arr.push(word);
		}
		parsed_src=tmp_arr;
	}
	parse_next_word(parsed,parsed_src);
	return str;
}
/** @type {Map<string,number>} */
let rng_word_num_map=new Map;
/**
 * @param {string} word
 */
function parse_rng_word(word) {
	let word_chars=word.toLowerCase().split("");
	for(let char_idx=0;char_idx<word_chars.length-1;char_idx++) {
		let pair1=word_chars[char_idx];
		let pair2=word_chars[char_idx+1];
		let pair_key=pair1+pair2;
		let seq_val=rng_word_num_map.get(pair_key);
		if(seq_val!==void 0) {
			rng_word_num_map.set(pair_key,seq_val+1);
		} else {
			rng_word_num_map.set(pair_key,1);
		}
	}
}
/**
 * @param {string} str
 * @param {string} needle
 */
function split_at(str,needle) {
	let idx=str.indexOf(needle);
	if(idx===-1) return [str];
	let n_len=needle.length;
	let arr=[];
	let start=0;
	do {
		let sp=str.slice(start,idx+n_len);
		arr.push(sp);
		start=idx+n_len;
		idx=str.indexOf(needle,start);
	} while(idx!==-1);
	return arr;
}
async function run() {
	let dict=new Set;
	let description_set=new Set;
	let arr=[];
	let before_wait=dict.size;
	for(let j=0;j<5;j++) {
		const request_count=20;
		for(let i=0;i<request_count;i++) {
			async function one_page() {
				let res=await fetch("https://louigiverona.com/iwgh/?page=dictionary");
				let rt=await res.text();
				let start_pos=rt.indexOf("table ",rt.indexOf("table ")+43)+57;
				let end_pos=rt.indexOf("</table>");
				rt=rt.slice(start_pos+26,end_pos-10);
				let page_arr=split_at(rt,"</p>");
				page_arr=page_arr.map(v => v.slice(3,-4));
				page_arr.forEach(v => {
					let [word,description]=v.split(" - ");
					word=word.slice(3,-4);
					parse_rng_word(word);
					dict.add(word);
					description=parse_sentence(description);
					description_set.add(description);
				});
			}
			arr.push(one_page());
		}
		await Promise.all(arr);
		arr.length=0;
	}
	console.log("dict word num",dict.size-before_wait);
	let description_arr=[...description_set.values()].sort().slice(0,5);
	for(let description of description_arr) {
		console.log("%o",description);
	}
	let rng_map=[...rng_word_num_map.entries()].sort((a,b) => b[1]-a[1]);
	console.log(rng_map);
}
await run();

export {};
