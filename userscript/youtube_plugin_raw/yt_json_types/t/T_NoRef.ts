type T_SettingsPageStr<T extends string>=`SP${T}`;
type T_MapValidHex<T extends string[]>=T_HexByte<T[number]> extends never? never:T;
type T_VerifyHex<T extends string>=T extends `0x${infer U}`? T_MapValidHex<T_SplitIntoGroups<U,string>>["length"] extends 8? T:never:never;
