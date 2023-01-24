type StoreDescription<T>={
	new_data: [T,T|T[]][];
	data: [string,["one",T[]]|["many",T[][]]][];
	index: Record<string,number>;
};