type SplitOnce<S extends string,D extends string>=string extends S?
	[string]|[string,string]:S extends ''? []:S extends `${infer T}${D}${infer U}`? [T,U]:[S];
