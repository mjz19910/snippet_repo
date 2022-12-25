import {ServiceEndpoint} from "./ServiceEndpoint";
import {TextRuns} from "./TextRuns";
import {Icon} from "./Icon";

export type MenuServiceItemRenderer={
	icon: Icon;
	serviceEndpoint: ServiceEndpoint;
	text: TextRuns;
	trackingParams?: string;
	hasSeparator?: boolean;
};
