import {LexerBase} from "./LexerBase";
import {LexReturnType} from "./LexReturnType";
import {EnvSettingsType} from "../EnvSettingsType";
export type DispatcherIndexType = ((str: string, index: number) => LexReturnType) | LexerBase | EnvSettingsType;
