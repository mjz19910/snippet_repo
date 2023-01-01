import {ButtonRenderer} from "../../../../yt_json_types/ButtonRenderer.js";
import {AccountLinkProviderKey} from "./AccountLinkProviderKey";

export type AccountLinkButtonRendererData={
	providerKey: AccountLinkProviderKey;
	unlinkedButton: ButtonRenderer;
};
