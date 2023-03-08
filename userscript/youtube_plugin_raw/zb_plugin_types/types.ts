type TextDecoderExt={
	decode(buffer: BufferSource): string|null;
};
type Type_GetOwnPropertyDescriptors<T>={
	[P in keyof T]: TypedPropertyDescriptor<T[P]>;
};
type Type_PrototypeDescription<K,T>={
	type: "prototype"; key: K; of: "TextDecoder";
	__prototype_description: Type_GetOwnPropertyDescriptors<T>&{[box_sym_g]: boolean;};
};

type JsonFilterRet<K,T>=
	|{
		type: "obj",of: string,value: any;
	}
	|{type: "function"; id: number;}
	|{type: "normal",value: T;}
	|Type_PrototypeDescription<K,T>;