import {ResponseContext} from "../g/GeneralContext.js";
import {OpenPopupAction} from "../o/OpenPopupAction";

export type AccountMenuJson={
       responseContext: ResponseContext;
       actions: OpenPopupAction[];
       trackingParams: string;
};
