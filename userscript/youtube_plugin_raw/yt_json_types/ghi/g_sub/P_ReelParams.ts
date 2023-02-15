type P_ReelParams_w6={
	1: T_VW<12>;
	6: T_VW<2>;
};
type P_ReelParams_w5={
	1: T_VW<12>;
	3: T_VW<V_BinaryTimestamp>;
	5: T_VW<{}>;
};
type P_ReelParams_t15={1: T_VW<15>;};

type P_ReelParams=P_ReelParams_w6|P_ReelParams_w5|P_ReelParams_t15;
