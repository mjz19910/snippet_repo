type StoreDescription<T>={
	new_data: [string,T|T[]][];
	data: [string,["one",T[]]|["many",T[][]]][];
	index: Record<string,number>;
};