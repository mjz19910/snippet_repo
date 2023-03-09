type G_Boxed_StrExtract=G_BoxedDatabaseData['key'] extends infer I?
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}:${infer f4}:${infer f5}`? [f0,f1,f2,f3,f4,f5]:
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}:${infer f4}`? [f0,f1,f2,f3,f4]:
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}`? [f0,f1,f2,f3]:
	I extends `${infer f0}:${infer f1}:${infer f2}`? [f0,f1,f2]:
	I extends `${infer f0}:${infer f1}`? [f0,f1]:[I]:never
	;
;
