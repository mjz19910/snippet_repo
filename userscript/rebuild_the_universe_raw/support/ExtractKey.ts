import {Box} from "./box/mod/Box.js";
import {VoidBox_ForUndefined} from "./box/mod/VoidBox_ForUndefined.js";
import {IndexOrNever} from "./IndexOrNever.js";

export type ExtractKey<T extends Box,U>=T extends Exclude<Box,VoidBox_ForUndefined>? IndexOrNever<T,U>:never;
