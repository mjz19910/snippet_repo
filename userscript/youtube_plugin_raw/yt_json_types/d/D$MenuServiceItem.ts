type D_MenuServiceItem<T extends string|null,EndpointItems>=T extends null? {
	text: G_Text;
	serviceEndpoint: G_MenuServiceEndpointItems<EndpointItems>;
	trackingParams: string;
}:{
	text: G_Text;
	icon: T_Icon<T&string>;
	serviceEndpoint: G_MenuServiceEndpointItems<EndpointItems>;
	trackingParams: string;
};