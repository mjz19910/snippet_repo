function main() {
	let out_pre="u,ᚢ!f,ᚠ!y,ᚣ!w,ᚥ!th,ᚦ!a,ᚨ!o,ᚩ!d,ᛑ!v,ᚡ!r,ᚱ!c,ᚳ!k,ᚴ!g,ᚷ!h,ᚺ!i,ᛁ!y,ᛃ!a,ᛆ!p,ᛈ!s,ᛋ!z,ᛎ!n,ᚾ!t,ᛐ!b,ᛒ!e,ᛖ!m,ᛗ!l,ᛚ!q,ᛩ!x,ᛪ!u,ᛀ!t,ᛏ!h,ᚻ!a,ᚪ!d,ᛞ!a,ᚫ!s,ᛉ!j,ᛄ!o,ᛟ!v,ᚹ";
	let out_b=["ᚢ", // numeral 2
		"ᚠ", // numeral 1
		"ᚣ", //
		"ᚥ", // numeral 3
		"ᚦ", //
		"ᚨ", //
		"ᚩ", // numeral 4
		"ᛑ", //
		"ᚡ", //
		"ᚱ", // numeral 5
		"ᚳ", // numeral 6
		"ᚴ", //
		"ᚷ", // numeral 7
		"ᚺ", //
		"ᛁ", //
		"ᛃ", //
		"ᛆ", //
		"ᛈ", //
		"ᛋ", //
		"ᛎ", //
		"ᚾ", //
		"ᛐ", //
		"ᛒ", //
		"ᛖ", //
		"ᛗ", //
		"ᛚ", //
		"ᛩ", //
		"ᛪ", //
		"ᛀ", //
		"ᛏ", //
		"ᚻ", // numeral 9
		"ᚪ", //
		"ᛞ", //
		"ᚫ", //
		"ᛉ", //
		"ᛄ", //
		"ᛟ", //
		"ᚹ"// numeral 8
		// w or v
	];
	let out=out_pre.split("!");

	let outs="";
	//cspell:disable-next-line
	let ar="Runed_text".split("");
	ar.forEach((s,n) => {
		if(out_b.indexOf(s)>-1) {
			console.log(n,out_b.indexOf(s));
			outs+=out[out_b.indexOf(s)][0];
		} else {
			outs+=s;
		}
	}
	);
	return outs;
}
main();