import {Box} from "../mod/Box.ts";
export type ExtractKey<T extends Box,U extends keyof Box>=T[U];
