type TY_BoxedShape<T_Type extends string,T_Tag extends string,T_Value extends Y_DI_Shape>={
	type: T_Type;
	tag: T_Tag;
	key: `${T_Type}:${T_Tag}`;
	value: T_Value;
};
