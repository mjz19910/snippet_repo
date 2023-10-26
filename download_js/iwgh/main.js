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
	if(v===void 0) throw new Error("next_word underflow");
	if(v==="") {
		v=arr.shift();
		if(v===void 0) throw new Error("next_word underflow");
	}
	if(v===" ") {
		v=arr.shift();
		if(v===void 0) throw new Error("next_word underflow");
	}
	return v;
}
/**
 * @param {string} str
 */
function parse_sentence(str) {
	// remove period
	if(str.endsWith(".")) {
		str=str.slice(0,-1);
	}
	/**
	 * @typedef {{type: "a"|"this_is"|"usually"|"generally"|"of";} | {type: "section";value: string;}} ParsedArrItem
	 */

	/**
	 * @param {(ParsedArrItem)[]} parsed
	 * @param {string[]} parsed_src
	 */
	function parse_a(parsed,parsed_src) {
		parsed.push({type: "a"});
		let word1=next_word(parsed_src);
		if(word1===void 0) throw new Error("word1 null");
		if(word3_dict.includes(word1)) {
			let word2=next_word(parsed_src);
			console.log(["w2",word2]);
			return;
		}
		x: switch(word1) {
			case "rare":
			case "local":
			case "traditional":
			case "national":
			case "popular": {
				let word2=next_word(parsed_src);
				if(word2===void 0) throw new Error("word2 null");
				if(!word3_dict.includes(word2)) {
					console.log("@w3",["w2",word2]);
					break x;
				}
			} break x;
			case "category":
			case "sort":
			case "kind":
			case "type": {
				parsed.push({type: "section",value: word1});
				let word2=next_word(parsed_src);
				if(word2!=="of") throw new Error("word2 not of");
				parsed.push({type: "of"});
				let word3=next_word(parsed_src);
				if(word3===void 0) throw new Error("word3 null");
				if(!word3_dict.includes(word3)) {
					console.log("@w3",["w3",word3]);
					break x;
				}
				if(parsed_src.length==0) break x;
				let word4=next_word(parsed_src);
				switch(word4) {
					case "...": break x;
					case ",": {
						let word5=next_word(parsed_src);
						console.log(["w5",word5],parsed_src);
					} break x;
					case "of": break x;
					case "which":
					case "art":
					case "but":
					case "in":
					case "pipe":
					case "though":
					case "instrument":
					case "when":
						break x;
				}
				console.log(["w4",word4]);
			} break x;
			default: {
				console.log(["w1",word1]);
			} break;
		}
	}
	if(str.startsWith("This is ")) {
		/** @type {ParsedArrItem[]} */
		let parsed=[];
		let parsed_src=str.split(/([ ,]|\.\.\.)/);
		let word1=next_word(parsed_src);
		if(word1!=="This") throw new Error("first word not 'This'");
		let word2=next_word(parsed_src);
		if(word2!=="is") throw new Error("second word not 'is'");
		parsed.push({type: "this_is"});
		let word3=next_word(parsed_src);
		switch(word3) {
			case "a": {
				parse_a(parsed,parsed_src);
			} break;
			case "usually":
			case "generally": {
				parsed.push({type: word3});
				let word4=next_word(parsed_src);
				if(word4==="a") {
					parse_a(parsed,parsed_src);
					break;
				}
				console.log([arr_end(parsed).type,parsed_src[0]]);
				throw 1;
			}
			default: {
				console.log("parsed default:",parsed_src[0]);
				throw 1;
			}
		}
	}
	return str;
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
	for(let j=0;j<1;j++) {
		const request_count=3;
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
					dict.add(word);
					description=parse_sentence(description);
					description_set.add(description);
				});
			}
			arr.push(one_page());
		}
		let before_wait=dict.size;
		await Promise.all(arr);
		console.log("dict word num",dict.size-before_wait);
		arr.length=0;
	}
	let description_arr=[...description_set.values()].sort().slice(0,5);
	for(let description of description_arr) {
		console.log("%o",description);
	}
}
await run();

export {};
