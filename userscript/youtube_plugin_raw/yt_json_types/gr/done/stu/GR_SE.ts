type SE_ShareEntity=TE_Endpoint_3<"shareEntityServiceEndpoint",D_ShareEntityService,M_GetSharePanel>;
type SE_Signal_SendPost=T_SE_Signal<M_SendPost,G_ClientSignal>;
type SE_Signal_SubscribeButton=TE_Endpoint_3<"signalServiceEndpoint",G_ClientSignal,M_SendPost>;
