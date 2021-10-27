//cspell:words outb outpre
outpre = "u,ᚢ!f,ᚠ!y,ᚣ!w,ᚥ!th,ᚦ!a,ᚨ!o,ᚩ!d,ᛑ!v,ᚡ!r,ᚱ!c,ᚳ!k,ᚴ!g,ᚷ!h,ᚺ!i,ᛁ!y,ᛃ!a,ᛆ!p,ᛈ!s,ᛋ!z,ᛎ!n,ᚾ!t,ᛐ!b,ᛒ!e,ᛖ!m,ᛗ!l,ᛚ!q,ᛩ!x,ᛪ!u,ᛀ!t,ᛏ!h,ᚻ!a,ᚪ!d,ᛞ!a,ᚫ!s,ᛉ!j,ᛄ!o,ᛟ!v,ᚹ";
outb = [
	"ᚢ",// numeral 2
	"ᚠ",// numeral 1
	"ᚣ",
	"ᚥ",// numeral 3
	"ᚦ",
	"ᚨ",
	"ᚩ",// numeral 4
	"ᛑ",
	"ᚡ",
	"ᚱ",// numeral 5
	"ᚳ",// numeral 6
	"ᚴ",
	"ᚷ",// numeral 7
	"ᚺ",
	"ᛁ",
	"ᛃ",
	"ᛆ",
	"ᛈ",
	"ᛋ",
	"ᛎ",
	"ᚾ",
	"ᛐ",
	"ᛒ",
	"ᛖ",
	"ᛗ",
	"ᛚ",
	"ᛩ",
	"ᛪ",
	"ᛀ",
	"ᛏ",
	"ᚻ",// numeral 9
	"ᚪ",
	"ᛞ",
	"ᚫ",
	"ᛉ",
	"ᛄ",
	"ᛟ",
	"ᚹ" // this might be w or v, not sure which it is... numeral 8
];
out = outpre.split("!");
outs = "";
ar = "Runes_to_text".split("");
ar.forEach((s, n) => {if(outb.indexOf(s) > -1) {console.log(n, outb.indexOf(s)); outs += out[outb.indexOf(s)][0];} else {outs += s;} });
outs;
