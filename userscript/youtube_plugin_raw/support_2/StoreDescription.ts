type StoreDescription<T>={
	new_data: [string,T|T[]][];
	data: [string,["one",T[]]|["many",T[][]]][];
	index: Map<string,number>;
	type: T extends string? "string":"unknown";
};