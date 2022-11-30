import {RawBox} from "./RawBox";

export type RawBoxes=RawBox<Function>|RawBox<{real:unknown}>|RawBox<{as_any: any;}>;
