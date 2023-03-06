type T_UrlInfo_BC_J<T_Type extends string,T_PartArr extends string[],T_Item extends {b: string; z: [any];}>={
	b: T_Type; c: Join<T_PartArr,":">;
	z: [T_Item];
};
