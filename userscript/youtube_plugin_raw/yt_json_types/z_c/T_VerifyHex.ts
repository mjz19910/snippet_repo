type T_VerifyHex<T extends string>=T extends `0x${infer U}`? T_MapValidHex<SplitIntoGroups<U,string>>["length"] extends 8? T:never:never;
