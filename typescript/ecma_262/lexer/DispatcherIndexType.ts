import {LexerBase} from "./LexerBase.js"
import {LexReturnType} from "./LexReturnType.js"
import {EnvSettingsType} from "../EnvSettingsType.js"
export type DispatcherIndexType=((str: string,index: number) => LexReturnType)|LexerBase|EnvSettingsType
