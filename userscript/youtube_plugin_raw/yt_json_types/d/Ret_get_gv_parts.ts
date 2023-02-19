// cSpell:ignoreRegExp /"\duald"/
type G_Gv_0=
	|"5uald"
	|"9gv7e"
	|"9gv7l"
	|"a5mek"
	|"hp57k"
	|"n4v7s"
	|"nx5s7"
	|"nx57y"
	|"o097z"
	|"p5qls"
	|"p5qs7"
	;
;
// cSpell:ignoreRegExp /sn-\w+?\.googlevideo\.com.?"/
type PT_DigDomain=[
	"rr1.sn-5ualdnl7.googlevideo.com.",
	"rr1.sn-9gv7enls.googlevideo.com.",
	"rr1.sn-9gv7ene6.googlevideo.com.",
	"rr1.sn-9gv7ened.googlevideo.com.",
	"rr1.sn-9gv7enek.googlevideo.com.",
	"rr1.sn-9gv7lnes.googlevideo.com.",
	"rr1.sn-n8v7znlk.googlevideo.com.",
	"rr1.sn-n8v7znsd.googlevideo.com.",
];
type PT_TypeS=[
	["gen",null,["raw",["gen2","9gv7",["l","e"]]]],
	["gen",null,["raw","a5mek"]],
	["gen",null,["raw","hp57k"]],
	["gen","n",["arr",[
		["gen","4",["gen2","v7","s"]],
		["gen","8",["gen2","v7","z"]],
		["gen","x5",["arr",[
			["or",["s7","7y"]]
		]]],
	]]],
	["gen","o",["raw","097z"]],
	["gen","p",["arr",[
		["gen","p5q",["or",["ls","s7"]]]
	]]],
];
type PT_TypeArr=[
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
	// 
];
type G_Gv_1_List=[
	"6d","6k","6l","6r","6s","6y","6z",
	"7d","7l","7s","7s","7y","7z","76",
	"d6","dd","de","dk","dl","dr","ds","ds","dy","dz",
	"ee","el","es","ey","ez",
	"k7","l7","le","lk","ll","lr","ls","ly",
	"rl","rr",
	"s7","sd","se","sk","sl","sr","ss","sy","sz",
	"y6","z7",
	"zd","ze","zk","zl","zr","zs","zy",
];
// end ["p5qs7","zy"],
type G_Gv_1="lk"|`s${"d"|"e"|"k"|"l"|"s"|"z"}`|`7${"6"|"d"|"s"|"y"|"z"}`|`e${"l"|"e"}`;
type D_GoogleVideoHostPartition={
	partition: G_Gv_0,
	selector: G_Gv_1,
};
