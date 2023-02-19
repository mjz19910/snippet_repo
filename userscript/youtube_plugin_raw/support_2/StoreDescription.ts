type StoreDescription<T>={
	new_data: [string,T|T[]][];
	data: [string,["one",T[]]|["many",T[][]]][];
	index: Map<string,number>;
	content: "number"|"keys"|"boolean"|"root_visual_element"|"string";
	type: T extends number? "number":T extends string? "string":T extends boolean? "boolean":T extends string? "string":"unknown";
};