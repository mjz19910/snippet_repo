
export type RawDomInstructions=
	[number,'push',null,((...v: Promise<CSSStyleSheet>[]) => Promise<void>)]|
	[number,'new',NewableFunction,[],CallableFunction,[string]]|
	[number,'call',number]|
	[number,'get','body']|
	[number,'create','div',string,string]|
	[number,'create_props','div',string,{id: string;}]|
	[number,'append']|
	[number,'drop']|
	[number,'enable_dry_mode'];
