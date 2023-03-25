type LZBeforeItem=["1","before",number,string,LZBufferItem[][]|null];
type LZBufferItem=
	|["1","part",number,string]
	|["1","mode-after",number,string]
	|LZBeforeItem
	|["1","data"|"rest",number,string]
	;
;
