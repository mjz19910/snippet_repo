import {CsiServiceParams} from "./CsiServiceParams";

export type CsiGetWatchNext_rid=CsiServiceParams["params"][number] extends infer V? V extends {key: "GetWatchNext_rid";}? V:never:never;
