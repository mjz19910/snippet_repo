import {Box} from "./Box.js";
import {NumberBox} from "./NumberBox.js";
import {StringBox} from "./StringBox.js";

export type ExcludeObjectBoxPrimitives<T extends Box>=Exclude<T,StringBox|NumberBox>;
