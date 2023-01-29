type TP_ParseUrlItems<T extends string>=T extends `${infer U}&${infer Z}`?
	TP_ParseUrlValue<U>&TP_ParseUrlItems<Z>:T extends `${infer U}`? TP_ParseUrlValue<U>:never;
