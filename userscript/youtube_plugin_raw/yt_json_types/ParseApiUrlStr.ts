type ParseApiUrlStr=SplitOnce<Extract<SplitOnce<ParseUrlStr_1,"/">,["api",...any]>[1],"/">[1];
