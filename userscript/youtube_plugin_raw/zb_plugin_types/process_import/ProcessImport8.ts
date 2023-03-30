type ProcessImport8<T extends MatchType_Import4>=
	T extends ["..","..",infer P1 extends string,infer P2 extends string]
	? `./${P1}/${P2}`
	:T extends ["..","zc_child_modules",infer P1 extends string]
	? `./${P1}`
	:T extends ["..",infer P1 extends string,infer P2 extends string]
	? `../${P1}/${P2}`
	:T
	;
;
