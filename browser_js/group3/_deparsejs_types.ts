type Split<S extends string,D extends string>=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}`? [...Split<T,D>,""]:
	S extends `${infer T}${D}${infer U}${D}${infer X}`? [T,U,...Split<X,D>]:
	S extends `${infer T}${D}${infer U}`? [T,...Split<U,D>]:
	[S];

type prim_types=["null","undefined","true","false","NaN","Infinity","-Infinity","String"];
type NamedFunctionToken={
	value: "Function";
	head: TokenTypes[];
	body: TokenTypes[];
	name: string;
	named: true;
};

type AnonFunctionToken={
	value: "Function";
	head: TokenTypes[];
	body: TokenTypes[];
	named: false;
};

type FunctionToken=AnonFunctionToken|NamedFunctionToken;
type Operator={
	value: "Operator";
	data: JsOperators;
};

type RightParen={
	value: "r_paren";
};
type LeftParen={
	value: "l_paren";
};

type Ident={
	value: "ident";
};

type RegexpToken={
	value: "Regex";
	data: RegExp;
};

type baseTokenTypes=FunctionToken|TryObjType|Operator|RegexpToken|RightParen|Ident|{
	value:"Separator";
}|{
	value: "LBracket"|"RBracket";
}|LeftParen|{
	value: "primitive";
	type: "String"|"StringSingle";
	data: string;
}|{
	value: "Assignment";
}|{
	value: "Operator";
	data: "?";
	depth: number;
}|{
	value: "Number";
	data: number;
}|{
	value: "bracket";
	empty: true;
}|{
	value: "bracket";
	empty: false,
	body: TokenTypes[];
}|{
	value: "keyword",
	data: "function"|"try"|"catch"|"finally";
};

type TokenTypes=baseTokenTypes&{
	eat_next?: boolean;
};

type JsOperators=JsOperatorsList[number];
type JsOperatorsList=[
	">",
	"<",
	"||",
	"/",
	"!==",
	"!=",
	"!",
	",",
	"===",
	"==",
	"&&",
	"&",
	"|",
	"^",
	"...",
	".",
	"?",
	":",
	"-=",
	"--",
	"-",
	"<<",
	">>",
	"+=",
	"++",
	"+",
	"*=",
	"*",
	"~",
	"%",
]
type PtType=0|1|2|3|4|5|7|8|12|9|6|14|10|11;
type TryObjType={
	value: "Try",
	body: TokenTypes[];
	catch?: {
		head: TokenTypes[];
		body?: TokenTypes[];
	};
	finally?: {
		body: TokenTypes[];
	};
}