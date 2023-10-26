import {D_Thumbnail} from "../../../d/group_D.ts";
import {E_Url} from "../../../e/E.ts";
import {G_Text} from "../../../ghi/group_G.ts";
import {R_SimpleCardButton} from "./R_SimpleCardButton.ts";

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
