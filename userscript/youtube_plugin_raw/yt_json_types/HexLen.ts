type HexLen<T extends string,L extends number>=Split<T,"">["length"] extends L? T:Split<T,"">["length"];
