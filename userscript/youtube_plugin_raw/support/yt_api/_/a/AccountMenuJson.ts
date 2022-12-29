import {GeneralContext} from "../g/GeneralContext.js";
import {OpenPopupAction} from "../o/OpenPopupAction";

export type AccountMenuJson={
       responseContext: GeneralContext;
       actions: OpenPopupAction[];
       trackingParams: string;
};
