type TM_VE<T extends number>=TM_Gen<{rootVe:T}>;
type TE_VE<T extends number>=TE_Endpoint_3<"browseEndpoint",any,TM_VE<T>>;
type TE_VE_In=TE_Endpoint_3<"browseEndpoint",any,TM_VE<number>>;
//#region E_VE
type E_VE3611_Browse=TE_Endpoint_3<"browseEndpoint",DE_VE3611,M_VE3611|M_VE3611>;
type E_VE3854=TE_Endpoint_3<"browseEndpoint",DE_VE3854,M_VE3854|M_VE3854>;
type E_VE5754_Browse=TE_Endpoint_3<"browseEndpoint",DE_VE5754,M_VE5754>;
type E_VE6827=TE_Endpoint_3<"browseEndpoint",DE_VE6827|DE_VE6827_FeedHistory,M_VE6827|M_VE6827_FeedHistory>;
type E_VE11487=TE_Endpoint_3<"browseEndpoint",DE_VE11487,M_VE11487>;
type E_VE23462=TE_Endpoint_3<"browseEndpoint",DE_VE23462,M_VE23462>;
type E_VE42352=TE_Endpoint_3<"browseEndpoint",DE_VE42352,M_VE42352>;
type E_VE96368=TE_Endpoint_3<"browseEndpoint",DE_VE96368,M_VE96368>;
//#endregion
