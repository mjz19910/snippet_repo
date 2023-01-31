// type TP_ParseUrlItems<T extends string>=T extends `${infer U}&${infer Z}`? TP_ParseUrlValue<U>&TP_ParseUrlItems<Z>:T extends `${infer U}`? TP_ParseUrlValue<U>:never;
type TP_ParseUrlItems<T extends string>=
	T extends ""? never:
	T extends `${infer U}&${infer Z}`?
	{[C in keyof TP_ParseUrlValue<U>]: C;}&{[C in keyof TP_ParseUrlItems<Z>]: C;}:{
		[C in keyof TP_ParseUrlValue<T>]: C;
	}
	;
;