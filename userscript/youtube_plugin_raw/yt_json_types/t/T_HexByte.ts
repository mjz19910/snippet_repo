type T_HexByte<T extends string>=string extends T? "00":T extends `${infer U}${infer V}`? `${T_HexNibble<U>}${T_HexNibble<V>}`:never;
