import {ButtonRenderer} from "../b/ButtonRenderer.js";

export type ConnectButton={
	accountLinkButtonRenderer: {
		providerKey:{
			id: string;
			subject: "all";
		};
		unlinkedButton: ButtonRenderer;
	};
};
