import {ResponseContext} from "../g/json/GeneralContext.js";
import {OpenPopupAction} from "../../../../yt_json_types/OpenPopupAction";

export type AccountMenuJson={
       responseContext: ResponseContext;
       actions: OpenPopupAction[];
       trackingParams: string;
};
