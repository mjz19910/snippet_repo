type DST_MK_ST_D<DI extends {
	b: string; c: string; z: [any,T_DI_FromObj<{
		id: string;
	}>];
},K extends string=DI["z"][1]["z"][0]['z'][0],J1 extends string=DI["b"],J2 extends string=DI['c']>={
	a: "ST:D";
	b: "boxed_id";
	j: `${DI['b']}:${DI['c']}`;
	key: `boxed_id:${J1}:${J2}:${K}`;
	z: [DI];
};
