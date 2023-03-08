type TextDecoderExt={
	decode(buffer: BufferSource): string|null;
};
type Type_GetOwnPropertyDescriptors<T>={
	[P in keyof T]: TypedPropertyDescriptor<T[P]>;
};
type Type_PrototypeDescription_OfTextDecoder<K>={
	type: "prototype"; key: K; of: "TextDecoder";
	__prototype_description: Type_GetOwnPropertyDescriptors<TextDecoder>&{[box_sym_g]: boolean;};
};
type GType_PrototypeDescription_OfTextDecoder<K,T_Of,V>={
	type: "prototype"; key: K; of: T_Of;
	__prototype_description: Type_GetOwnPropertyDescriptors<V>&{[box_sym_g]: boolean;};
};

type JsonFilterRet<K,T>=
	|{
		type: "obj",of: string,value: any;
	}
	|{type: "function"; id: number;}
	|{type: "normal",value: T;}
	|GType_PrototypeDescription_OfTextDecoder<K,"TextDecoder",TextDecoder>
	|{
		type: "normal",copy: true,value: {
			[k: string]: any;
		};
	}
	|{type: "symbol",for: "box_symbol";}
	|{type: "symbol";}
	;
;
