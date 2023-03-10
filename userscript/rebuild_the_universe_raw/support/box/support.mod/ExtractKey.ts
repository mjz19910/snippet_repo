import {Box} from "../mod/Box.js";
export type ExtractKey<T extends Box,U extends keyof Box>=T[U];
