type HexLen<T extends string,L extends number>=T_Split<T,"">["length"] extends L? T:T_Split<T,"">["length"];
