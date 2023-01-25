type T_HexNibble<T extends string>=string extends T? "0":T extends G_HexNibbleStr? T:never;
