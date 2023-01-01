type HexNib<T extends string>=string extends T? "0":T extends HexNibOpts? T:never;
