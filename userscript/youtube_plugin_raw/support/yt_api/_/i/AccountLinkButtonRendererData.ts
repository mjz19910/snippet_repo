import {ButtonRenderer} from "../b/ButtonRenderer.js";
import {AccountLinkProviderKey} from "./AccountLinkProviderKey";

export type AccountLinkButtonRendererData={
	providerKey: AccountLinkProviderKey;
	unlinkedButton: ButtonRenderer;
};
