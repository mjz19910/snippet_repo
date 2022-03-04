import {ecma_base} from "./LexerBase";
import {LexReturnType} from "./LexReturnType";
import {EnvSettingsType} from "./EnvSettingsType";
export type DispatcherIndexType = ((str: string, index: number) => LexReturnType) | ecma_base | EnvSettingsType;
