type G_Gv_0=
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
type PT_TypeArr=[
	["9gv7l",["es","ez","le","s7"]],
	["a5mek",["6d","6k","6l","6r","6s","6z","d6","de","dl","ds","dz","sd","sy","zk","zl","zr","zs"]],
	["hp57k",["6r","6y","d6","dd","dk","dr","ds","dy","dz","k7"]],
	["n4v7s",["ee","ey","l7","ll","lr","ls","ly","s7","se"]],
	["nx5s7",["7d","7s","7y","7z","76","ee","el"]],
	["nx57y",["lk","sd","se","sk","sl","ss","sz"]],
	["o097z",["sd","se","sk","sl","sr","ss","sz","z7","zd","ze","zk","zr"]],
	["p5qls",["6l","7d","7l","7s","76","d6","dd","dk","dr","dz","rl","rr","y6"]],
	["p5qs7",["6d","sk","sr","zk","zr","zy"]],
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
