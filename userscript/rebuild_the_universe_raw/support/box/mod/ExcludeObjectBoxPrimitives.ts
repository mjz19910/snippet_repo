import {Box} from "./Box.ts";
import {NumberBox} from "./NumberBox.ts";
import {StringBox} from "./StringBox.ts";

export type ExcludeObjectBoxPrimitives<T extends Box>=Exclude<T,StringBox|NumberBox>;
