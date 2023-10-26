import {RawBox} from "./RawBox.ts";

export type RawBoxes=RawBox<{as_interface:Function}>|RawBox<{as_unknown:unknown}>|RawBox<{as_any: any;}>;
