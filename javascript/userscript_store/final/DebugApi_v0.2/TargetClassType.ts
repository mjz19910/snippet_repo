import {ClassCallbackArgs} from "./ClassCallbackArgs";

export type TargetClassType = {type: 'class'; run: (v: ClassCallbackArgs) => void;};
