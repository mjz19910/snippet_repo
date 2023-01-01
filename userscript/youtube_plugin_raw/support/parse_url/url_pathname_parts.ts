import {Split} from "../yt_api/json/Split.js";
import {RemoveFirst} from "./RemoveFirst";
import {vv} from "./index";

export type url_pathname_parts=RemoveFirst<Split<typeof vv.pathname,"/">>;
