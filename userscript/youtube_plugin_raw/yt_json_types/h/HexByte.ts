type HexByte<T extends string>=string extends T? "00":T extends `${infer U}${infer V}`? `${HexNib<U>}${HexNib<V>}`:never;
