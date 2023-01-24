
type SplitIntoGroups<S extends string,D extends string>=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${infer X extends D}${infer U}`? [`${T}${X}`,...SplitIntoGroups<U,D>]:
	[S];
