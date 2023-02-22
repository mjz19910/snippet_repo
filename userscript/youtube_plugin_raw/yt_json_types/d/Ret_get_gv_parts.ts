// cSpell:ignoreRegExp /"(\dualdn?|5uaez|qxoed|vgqsk)"/
type G_Gv_0=
	|"5uaez"
	|"5uald"
	|"9gv7e"
	|"9gv7l"
	|"a5mek"
	|"ab5l6"
	|"hp57k"
	|"hp57y"
	|"n4v7s"
	|"nx5s7"
	|"nx57y"
	|"o097z"
	|"p5qls"
	|"p5qs7"
	|"qxoed"
	|"vgqsk"
	;
;
// cSpell:ignoreRegExp /rr1.sn-(qxoed[n][e7][7ek]).googlevideo.com. \d+ IN A\s+\d+\.\d+\.\d+\.\d+/
// cSpell:ignoreRegExp /sn-\w+?\.googlevideo\.com.?"/
type PT_DigDomain=[
	``,
	// dig results
	`
	`,
	"rr1.sn-qxo7rn7k.googlevideo.com.",
];
type PT_TypeS_NoRep=[
	gen_g2_t1<"5uaez">,
	gen_g2_t1<"5uald">,
	gen_g2_t1<"a5mek">,
	gen_g2_t1<"hp57k">,
];
type PT_TypeS=[
	gen_g3_t2<"qxo",[
		"7r",
		"ed",
	]>,
	gen_g3_t2<"9gv7",["l","e"]>,
	gen_g3_t2<"n",[
		gen_a3_t2<["4","8"],"v7",["s","z"]>,
		gen_a2_t2<"x5",["s7","7y"]>,
	]>,
	gen_g3_raw<"o","097z">,
	gen_g3_t2<"p",[gen_g3_or<"p5q",["ls","s7"]>]>,
];
type PT_TypeArr=[
	["5uaez",[
		"6l","6s",
		"7e",
		"e6","ed","ek","el","er","es","ey","ez",
		"l6","ld","le","lk","ll","lr","ls","ly","lz",
		"r6","rr","ry","rz",
		"y6","ys","yy","yz","z6","zd","zr","zy","zz"
	]],// hit
	["5uald",["l7","ll","lr","ls","s6","sd","se","sk","sl","sr","ss","sy","sz","z7","ze"]],// hit
	["9gv7l",["es","ez","le","s7"]],// hit
	["a5mek",["6d","6k","6l","6r","6s","6z","d6","de","dl","ds","dz","sd","sy","zk","zl","zr","zs"]],// hit
	["hp57k",["6r","6y","d6","dd","dk","dr","ds","dy","dz","k7"]],// hit
	["n4v7s",["ee","ey","l7","ll","lr","ls","ly","s7","se"]],// hit
	["n8v7z",["lk","lr","ly","s6","s7","sd","se","sk","sl","sr","ss","sy","sz","z7","ze","zl"]],// hit
	["nx5s7",["7d","7s","7y","7z","76","ee","el"]],// hit
	["nx57y",["lk","sd","se","sk","sl","ss","sz"]],// hit
	["o097z",["sd","se","sk","sl","sr","ss","sz","z7","zd","ze","zk","zr"]],
	["p5qls",["6l","7d","7l","7s","76","d6","dd","dk","dr","dz","rl","rr","y6"]],// hit
	["p5qs7",["6d","sk","sr","zk","zr","zy"]],// hit
	["qxoed",["7k","e7","ee",]],// hit
	["qxo7r",["7k","7r","7y",]],// hit
	// 
];
type PList=["6d","sk","sr","zk","zr","zy"];
type G_Gv_1_List=[
	"6d","6k","6l","6r","6s","6y","6z",
	"7d","7l","7s","7s","7y","7z","76",
	"d6","dd","de","dk","dl","dr","ds","ds","dy","dz",
	"ee","el","es","ey","ez",
	"k7","l7","le","lk","ll","lr","ls","ly",
	"rl","rr",
	"s7","s6","sd","se","sk","sl","sr","ss","sy","sz",
	"y6","z7",
	"zd","ze","zk","zl","zr","zs","zy",
];
type G_Gv_1_List_0=[
	"6","7","d","e","k","l","r","s","y","z",
];
type G_Gv_1_List_1=[
	"6","7","d","e","k","l","r","s","y","z",
];
// end ["p5qs7","zy"],
type G_Gv_1="lk"|`s${"d"|"e"|"k"|"l"|"s"|"z"}`|"d6"|`7${"6"|"d"|"s"|"y"|"z"}`|`e${"l"|"e"}`|PList[number];
type D_GoogleVideoHostPartition={
	parts: ["sn","-",G_Gv_0,"n",G_Gv_1],
	partition: G_Gv_0,
	selector: G_Gv_1,
};
