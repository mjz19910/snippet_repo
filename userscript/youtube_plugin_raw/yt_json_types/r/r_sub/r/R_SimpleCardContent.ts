import {D_Thumbnail} from "../../../d/group_D.js";
import {E_Url} from "../../../e/E.js";
import {G_Text} from "../../../ghi/group_G.js";
import {R_SimpleCardButton} from "./R_SimpleCardButton.js";

export type D_SimpleCardContent={
	image: D_Thumbnail;
	title: G_Text;
	actionButton: R_SimpleCardButton;
	trackingParams: string;
	displayDomain: G_Text;
	showLinkIcon: true;
	callToAction: G_Text;
	command: E_Url;
};
export type R_SimpleCardContent={simpleCardContentRenderer: D_SimpleCardContent;};
