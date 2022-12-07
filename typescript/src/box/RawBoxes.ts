import {RawBox} from "./RawBox";

export type RawBoxes=RawBox<{as_interface:Function}>|RawBox<{as_unknown:unknown}>|RawBox<{as_any: any;}>;
