type TupleToObject<TTuple extends readonly PropertyKey[]> = {
	[TIndex in TTuple[number]]: TIndex;
};

// @ts-expect-error
type err=TupleToObject<[[1,2], {}]>;
