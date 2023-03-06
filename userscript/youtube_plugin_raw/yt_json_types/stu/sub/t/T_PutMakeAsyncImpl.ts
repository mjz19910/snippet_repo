type T_PutMakeAsyncImpl<N extends string,T extends {
	z: [DIT_Item_AB<"raw_id",T_BoxTypeof<Y>>];
},Y extends string=T["z"][0]["z"][0]["z"][0]>={
	key: N; args: [N,T];
	w: Promise<DSI_Item_BoxedId<N,T>>;
};