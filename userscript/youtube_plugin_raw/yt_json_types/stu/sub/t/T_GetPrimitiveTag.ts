type T_GetPrimitiveTag<T>=
	T extends bigint? |"bigint":
	T extends boolean? |"boolean":
	T extends number? |"number":
	T extends string? |"string":
	T extends object? |"object":
	"unknown"
	;
;
type G_PrimitiveTag=
	|"bigint"
	|"boolean"
	|"number"
	|"string"
	|"object"
	|"unknown"
	;
;