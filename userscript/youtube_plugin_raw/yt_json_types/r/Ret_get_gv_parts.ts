// cSpell:ignoreRegExp /"(\dualdn?|5u[a]e[z]|qx[o]e[d]|vg[q]s[rk]|vg[q]s)"/
namespace GV_Parts_NS {
	export const done_func=(num: number) => (num*2)/*[GV_0]*/+num/*[TypeArr]*/+1/*[B]*/+2/*[S]*/;
	export type G_GV_idx0=
		|"5"|"9"
		|"a"
		|"h"|"n"|"o"|"p"
		|"q"|"t"|"v"
		;
	;
	export type G_GV_idx1=
		T_Split<T_StringTrim<`
		0
		4
		5
		8
		b
		g
		p
		t
		u
		x
		`>,`
		`>
		;
	;
	export type G_GV_idx2=
		T_Split<T_StringTrim<`
		1
		5
		9
		a
		f
		m
		o
		q
		v
		`>,`
		`>
		;
	;
	export type G_GV_idx3=
		T_Split<T_StringTrim<`
		7
		e
		l
		s
		z
		`>,`
		`>
		;
	;
	export type G_GV_idx4=
		T_Split<T_StringTrim<`
		6
		7
		d
		e
		k
		l
		r
		s
		y
		z
		`>,`
		`>
		;
	;
	export type G_GV_Base=
		|"5ua" // done_func(2) = 9
		|"9gv" // done_func(3) = 12
		|"a5m" // done_func(3) = 12
		|"ab5" // done_func(2) = 9
		|"hp5" // done_func(2) = 9
		|"n4v" // done_func(1) = 6
		|"n8v" // done_func(1) = 6
		|"nx5" // done_func(2) = 9
		|"o09" // done_func(1) = 6
		|"p5q" // done_func(2) = 9
		|"q4f" // done_func(3) = 12
		|"qxo" // done_func(2) = 9
		|"t0a" // done_func(2) = 9
		|"tt1" // done_func(2) = 9
		|"vgq" // done_func(2) = 9
		;
	;
}
type G_GV_0=
	|"5uaez" // 2 [dig_final] [dig_user@5ua:ez:[6,7,e,l,r,y]]
	|"5uald" // 2 [dig_final] [dig_user@5ua:ld:[l,s,z]]
	|"9gv7e" // 2 [dig_final] [dig_user@9gv:7e:[e,l]]
	|"9gv7l" // 2 [dig_final] [dig_user@9gv:7l:[e,l,s]]
	|"9gv7z" // 2 [dig_final] [dig_user@9gv:7z:[7]]
	|"a5mek" // 2 [dig_final] [dig_user@a5m:ek:[6,d,s,z]]
	|"a5mlr" // 2 [dig_final] [dig_user@a5m:lr:[e,l]]
	|"a5mse" // 2 [dig_final] [dig_user@a5m:se:[7,e,l]]
	|"ab5l6" // 2 [dig_final] [dig_user@ab5:l6:[d,k,r]]
	|"ab5sz" // 2 [dig_final] [dig_user@ab5:sz:[l,z]]
	|"hp57k" // 2 [dig_final] [dig_user@hp5:7k:[6,d,k]]
	|"hp57y" // 2 [dig_final] [dig_user@hp5:7y:[7,e,l,s]]
	|"n4v7s" // 2 [dig_final] [dig_user@n4v:7s:[e,l,s]]
	|"n8v7z" // 2 [dig_final] [dig_user@n8v:7z:[l,s,z]]
	|"nx5s7" // 2 [dig_final] [dig_user@nx5:s7:[7,e]]
	|"nx57y" // 2 [dig_final] [dig_user@nx5:7y:[l,s]]
	|"o097z" // 2 [dig_final] [dig_user@o09:7z:[s,z]]
	|"p5qdd" // 2 [dig_final] [dig_user@p5q:dd:[7]]
	|"p5qls" // 2 [dig_final] [dig_user@p5q:ls:[6,7,d,r,y]]
	|"p5qs7" // 2 [dig_final] [dig_user@p5q:s7:[6,s,z]]
	|"q4fl6" // 2 [dig_final] [dig_user@q4f:l6:[6,l,s,z]]
	|"q4flr" // 2 [dig_final] [dig_user@q4f:lr:[7,e,l,s]]
	|"q4fze" // 2 [dig_final] [dig_user@q4f:ze:[7,e]]
	|"qxo7r" // 2 [dig_final] [dig_user@qxo:7r:[7]]
	|"qxoed" // 2 [dig_final] [dig_user@qxo:ed:[7,e]]
	|"t0a7l" // 2 [dig_final] [dig_user@t0a:7l:[7,e]]
	|"t0a7s" // 2 [dig_final] [dig_user@t0a:7s:[7]]
	|"tt1e7" // 2 [dig_final] [dig_user@tt1:e7:[7,l]]
	|"tt1el" // 2 [dig_final] [dig_user@tt1:el:[7,e]]
	|"vgqsk" // 2 [dig_final] [dig_user@vgq:sk:[6,e,l,s,z]]
	|"vgqsr" // 2 [dig_final] [dig_user@vgq:sr:[e,l,s,z]]
	;
;
// cSpell:ignoreRegExp /rr1.sn-\w+?\.googlevideo\.com\. \d+ IN A\s+\d+\.\d+\.\d+\.\d+/
// cSpell:ignoreRegExp /sn-\w+?\.googlevideo\.com.?"/
type PT_DigDomain=[
	// dig results
	``,
];
type PT_TypeS_NoRep=[
];
type PT_TypeS=[
	["5ua",GV_gen_g3_t2<"5ua",["ez","ld"]>],
	["9gv",GV_gen_g3_t2<"9gv7",["e","l","z"]>],
	["a5m",GV_gen_g3_t2<"a5m",["ek","lr","se"]>],
	["ab5",GV_gen_g3_t2<"ab5",["l6","sz"]>],
	["hp5",GV_gen_g3_t2<"hp57",["k","y"]>],
	["n4v",GV_gen_g3_t2<"n4v",["7s","7z"]>],
	["n8v",GV_gen_g2_t1<"n8v7z">],
	["nx5",GV_gen_g3_t2<"nx5",["s7","7y"]>],
	["o09",GV_gen_g2_t1<"o097z">],
	["p5q",GV_gen_g3_t2<"p5q",["ls","s7"]>],
	["q4f",GV_gen_g3_t2<"q4f",["l6","lr","ze"]>],
	["qxo",GV_gen_g3_t2<"qxo",["7r","ed"]>],
	["t0a",GV_gen_g3_t2<"t0a7",["l","s"]>],
	["tt1",GV_gen_g3_t2<"tt1e",["7","l"]>],
	["vgq",GV_gen_g3_t2<"vgqs",["k","r"]>],
];
type PT_TypeArr=[
	["5uaez",[
		"6l","6s",
		"7e",
		"e6","ed","ek","el","er","es","ey","ez",
		"l6","ld","le","lk","ll","lr","ls","ly","lz",
		"r6","rr","ry","rz",
		"y6","ys","yy","yz","z6","zd","zr","zy","zz",
	]],
	["5uald",[
		"l7","ll","lr","ls",
		"s6","sd","se","sk","sl","sr","ss","sy","sz",
		"z7","ze",
	]],
	["9gv7e",[
		"e6","ed","ek",
		"ls",
	]],
	["9gv7l",[
		"es","ez",
		"le",
		"s7",
	]],
	["9gv7z",[
		"76","7e",
	]],
	["a5mek",[
		"6d","6k","6l","6r","6s","6z",
		"d6","de","dl","ds","dz",
		"sd","sy",
		"zk","zl","zr","zs",
	]],
	["a5mlr",[
		"ek",
		"l6","ll","ls","lz",
	]],
	["a5mse",[
		"76","7l","7s","7z",
		"ek","er","es",
		"l7","le","ll",
	]],
	["ab5l6",[
		"dr","dy",
		"k6","kd",
		"r6","rd","rk","rl","rr","rs","rz",
	]],
	["ab5sz",[
		"ld","lk","ly",
		"z6","zd","ze","zk","zl","zr","zs","zy","zz",
	]],
	["hp57k",[
		"6r","6y",
		"d6","dd","dk","dr","ds","dy","dz",
		"k7",
	]],
	["hp57y",[
		"7r","7y",
		"e7","ee",
		"l6","lr","ly",
		"s7","se","sl","ss",
	]],
	["n4v7s",[
		"ee","ey",
		"l7","ll","lr","ls","ly",
		"s7","se",
	]],
	["n8v7z",[
		"lk","lr","ly",
		"s6","s7","sd","se","sk","sl","sr","ss","sy","sz",
		"z7","ze","zl",
	]],
	["nx5s7",[
		"7d","7s","7y","7z","76",
		"ee","el",
	]],
	["nx57y",[
		"lk",
		"sd","se","sk","sl","ss","sz",
	]],
	["o097z",[
		"sd","se","sk","sl","sr","ss","sz",
		"z7","zd","ze","zk","zr",
	]],
	["p5qls",[
		"6l",
		"7d","7l","7s","76",
		"d6","dd","dk","dr","dz",
		"rl","rr",
		"y6",
	]],
	["p5qs7",[
		"6d",
		"sk","sr",
		"zk","zr","zy",
	]],
	["q4fl6",[
		"66","6d","6s","6z",
		"lz",
		"s6","s7","sd","sk","sl","sr","ss","sy",
		"z6","z7","zy",
	]],
	["q4flr",[
		"7k","7r","7y",
		"e6","e7","ee","ek","el","er","es","ey","ez",
		"l6","l7","ld","le","lz",
		"sd","sk","sl","ss",
	]],
	["q4fze",[
		"7e","7l","7s",
		"ee",
	]],
	["qxo7r",[
		"7k","7r","7y",
	]],
	["qxoed",[
		"7k",
		"e7","ee",
	]],
	["t0a7l",[
		"7d",
		"ee",
	]],
	["t0a7s",[
		"7d",
	]],
	["tt1e7",[
		"7k",
		"ls","lz",
	]],
	["tt1el",[
		"7l",
		"el",
	]],
	["vgqsk",[
		"66","6s","6z",
		"e6","ed","ek","es","ez",
		"ld","lk","ll","lr","ls","ly","lz",
		"s7","se","sk",
		"z7","ze","zl","zs","zz",
	]],
	["vgqsr",[
		"e6","ed","ek","es","ez",
		"l6","ld","lk","ll","ls","lz",
		"s6","sd","sr","sy",
		"z6","z7","zd","zk","zs","zz",
	]],
];
type G_GV_1_List=[
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
type G_GV_1_List_0=[
	"6",
	"7",
	"d",
	"e",
	"k",
	"l",
	"r",
	"s",
	"y",
	"z",
];
type G_GV_1_List_1=[
	/*     */"6","7","d","e","k","l","r","s","y","z",
];
type G_GV_11="6"|"7"|"d"|"e"|"k"|"l"|"r"|"s"|"y"|"z";
type G_GV_1=
	|`6${Exclude<G_GV_11,"7"|"e"|"k"|"s">|" "}`
	|`7${Exclude<G_GV_11,"7"|"e">|" "}`
	|`d${Exclude<G_GV_11,"7"|"e"|"k">|" "}`
	|`e${Exclude<G_GV_11,"d"|"r">|" "}`
	|`k${Extract<G_GV_11,"6"|"d">|" "}`
	|`l${Exclude<G_GV_11,"z">|" "}`
	|`r${Extract<G_GV_11,"6"|"l"|"r">|" "}`
	|`s${G_GV_11}`
	|`z${Exclude<G_GV_11,"l">|" "}`
	;
;
type D_GoogleVideoHostPartition={
	parts: ["sn","-",G_GV_0,"n",G_GV_1],
	partition: G_GV_0,
	selector: G_GV_1,
};
