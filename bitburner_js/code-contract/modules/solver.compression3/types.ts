type LZBeforeItem=["1","before",number,string,LZBufferItem[][]|null];
type LZRestItem=["1","rest",number,string,LZBufferItem[][]|null];
type LZModeAfterItem=["1","mode-after",number,string,LZBufferItem[][]|null];
type LZPartItem=["1","part",number,string];

type LZBufferItem=
	|LZPartItem
	|LZModeAfterItem
	|LZBeforeItem
	|["1","data",number,string]
	|LZRestItem
	;
;
