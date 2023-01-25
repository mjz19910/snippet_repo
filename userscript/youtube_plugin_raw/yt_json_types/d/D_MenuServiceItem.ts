type D_MenuServiceItem<T extends string|null,EndpointItems>=T extends null? {
	text: G_Text;
	serviceEndpoint: EndpointItems;
	trackingParams: string;
}:{
	text: G_Text;
	icon: T_Icon<T&string>;
	serviceEndpoint: EndpointItems;
	trackingParams: string;
};