// cSpell:ignoreRegExp /"(\dualdn?|5uaez)"/
type G_Gv_0=
	|"5uaez"
	|"5uald"
	|"9gv7e"
	|"9gv7l"
	|"a5mek"
	|"hp57k"
	|"hp57y"
	|"n4v7s"
	|"nx5s7"
	|"nx57y"
	|"o097z"
	|"p5qls"
	|"p5qs7"
	;
;
// cSpell:ignoreRegExp /rr1.sn-5ua(ldn[lsz][0-9a-z]|ezn[67elryz][0-9a-z]).googlevideo.com. \d+ IN A\s+\d+\.\d+\.\d+\.\d+/
// cSpell:ignoreRegExp /sn-\w+?\.googlevideo\.com.?"/
type PT_DigDomain=[
	``,
	// dig results
	`
	rr1.sn-5uaezn6l.googlevideo.com. 1800 IN A      173.194.29.55
	rr1.sn-5uaezn6s.googlevideo.com. 1800 IN A      173.194.29.71
	rr1.sn-5uaezn7e.googlevideo.com. 1800 IN A      74.125.6.102
	rr1.sn-5uaezne6.googlevideo.com. 1800 IN A      173.194.11.102
	rr1.sn-5uaezned.googlevideo.com. 1800 IN A      173.194.11.134
	rr1.sn-5uaeznek.googlevideo.com. 1800 IN A      173.194.11.161
	rr1.sn-5uaeznel.googlevideo.com. 1800 IN A      172.217.128.166
	rr1.sn-5uaezner.googlevideo.com. 1800 IN A      173.194.11.198
	rr1.sn-5uaeznes.googlevideo.com. 1800 IN A      172.217.128.198
	rr1.sn-5uaezney.googlevideo.com. 1800 IN A      173.194.29.129
	rr1.sn-5uaeznez.googlevideo.com. 1800 IN A      173.194.11.70
	rr1.sn-5uaeznl6.googlevideo.com. 1800 IN A      172.217.142.134
	rr1.sn-5uaeznld.googlevideo.com. 1800 IN A      172.217.142.166
	rr1.sn-5uaeznle.googlevideo.com. 1800 IN A      172.217.142.6
	rr1.sn-5uaeznlk.googlevideo.com. 1800 IN A      173.194.147.134
	rr1.sn-5uaeznll.googlevideo.com. 1800 IN A      172.217.142.38
	rr1.sn-5uaeznlr.googlevideo.com. 1800 IN A      173.194.147.166
	rr1.sn-5uaeznls.googlevideo.com. 1800 IN A      172.217.142.70
	rr1.sn-5uaeznly.googlevideo.com. 1800 IN A      172.217.147.6
	rr1.sn-5uaeznlz.googlevideo.com. 1800 IN A      172.217.142.102
	rr1.sn-5uaeznr6.googlevideo.com. 1800 IN A      173.194.186.6
	rr1.sn-5uaeznrr.googlevideo.com. 1800 IN A      172.217.128.102
	rr1.sn-5uaeznry.googlevideo.com. 1800 IN A      173.194.144.38
	rr1.sn-5uaeznrz.googlevideo.com. 1800 IN A      74.125.7.70
	rr1.sn-5uaezny6.googlevideo.com. 1800 IN A      173.194.144.102
	rr1.sn-5uaeznys.googlevideo.com. 1800 IN A      173.194.144.134
	rr1.sn-5uaeznyy.googlevideo.com. 1800 IN A      74.125.6.70
	rr1.sn-5uaeznyz.googlevideo.com. 1800 IN A      173.194.144.70
	rr1.sn-5uaeznz6.googlevideo.com. 1800 IN A      173.194.142.215
	rr1.sn-5uaeznzd.googlevideo.com. 1800 IN A      173.194.142.231
	rr1.sn-5uaeznzr.googlevideo.com. 1800 IN A      173.194.17.19
	rr1.sn-5uaeznzy.googlevideo.com. 1400 IN A      173.194.147.83
	rr1.sn-5uaeznzz.googlevideo.com. 1800 IN A      173.194.142.199
	`,
	"rr1.sn-5uaeznzy.googlevideo.com.",
	"rr1.sn-5uaeznes.googlevideo.com.",
	"rr1.sn-5ualdnl7.googlevideo.com.",
];
type PT_TypeS=[
	gen_g2_t1<"5uald">,
	gen_g3_t2<"9gv7",["l","e"]>,
	gen_g2_t1<"a5mek">,
	gen_g2_t1<"hp57k">,
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
	// 
];
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
type G_Gv_1="lk"|`s${"d"|"e"|"k"|"l"|"s"|"z"}`|`7${"6"|"d"|"s"|"y"|"z"}`|`e${"l"|"e"}`;
type D_GoogleVideoHostPartition={
	partition: G_Gv_0,
	selector: G_Gv_1,
};
