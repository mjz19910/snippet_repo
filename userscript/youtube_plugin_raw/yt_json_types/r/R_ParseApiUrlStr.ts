type R_ParseApiUrlStr=T_SplitOnce<Extract<T_SplitOnce<ParseUrlStr_1,"/">,["api",...any]>[1],"/">[1];
