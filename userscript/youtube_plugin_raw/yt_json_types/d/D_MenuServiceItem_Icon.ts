type D_MenuServiceItem_Icon<T extends string,T_EI>={
	text: G_Text;
	icon: T_Icon<T>;
	serviceEndpoint: T_EI;
	trackingParams: string;
};
