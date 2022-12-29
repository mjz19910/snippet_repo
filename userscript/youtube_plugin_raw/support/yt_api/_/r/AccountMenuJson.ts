import {GeneralContext} from "../../_abc/g/GeneralContext.js";
import {OpenPopupAction} from "./OpenPopupAction";

export type AccountMenuJson={
	responseContext: GeneralContext;
	actions: OpenPopupAction[];
	trackingParams: string;
};
