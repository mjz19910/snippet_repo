type RD_MenuServiceItem=[
	D_MenuServiceItem<null,{}>,
	D_MenuServiceItem<"NOT_INTERESTED",E_Feedback>,
	D_MenuServiceItem<"ADD_TO_QUEUE_TAIL",TE_SignalService<{}>>
][number];

type R_MenuServiceItem={
	menuServiceItemRenderer: RD_MenuServiceItem;
};