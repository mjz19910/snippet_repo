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
	type: "prototype"; key: K; type_name: T_Of;
	__prototype_description: Type_GetOwnPropertyDescriptors<V>&{[box_sym_g]: boolean;};
};

type JsonFilterRet<K,T>=
	|{
		type: "obj"; of: string; value: any;
	}
	|{
		type: "function";
		value: null;
		id: number;
	}
	|{
		type: "normal"; value: T;
	}
	|GType_PrototypeDescription_OfTextDecoder<K,"TextDecoder",TextDecoder>
	|{
		type: "symbol"; for: "box_symbol";
	}
	|{type: "symbol";}
	|{
		type: "normal:copy"; copy: true; value: {
			[k: string]: unknown;
		};
	}
	|string
	|boolean
	|null
	;
;
type PartialWithType<T,S=JsonFilterRet<any,any>>=Extract<S,{type: T;}>;
type PartialWithType2<L,S=JsonFilterRet<any,any>>=Extract<S,L>;
type RequiredType2<V,L extends {type: any;}>=Partial<Omit<PartialWithType2<V,L>,"type">>&Pick<PartialWithType2<V,L>,"type">;
type RequiredType<V>=Partial<Omit<PartialWithType<V>,"type">>&Pick<PartialWithType<V>,"type">;
