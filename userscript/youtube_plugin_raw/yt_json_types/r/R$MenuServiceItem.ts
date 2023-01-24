type R_MenuServiceItem={
	menuServiceItemRenderer:
	|D_MenuServiceItem<null,{}>
	|{
		text: R_TextWithRuns;
		icon: T_Icon<"NOT_INTERESTED">;
		serviceEndpoint: {};
		trackingParams: string;
	}|{
		text: R_TextWithRuns;
		icon: T_Icon<"ADD_TO_QUEUE_TAIL">;
		serviceEndpoint: TE_SignalService<{}>;
		trackingParams: string;
	};
};