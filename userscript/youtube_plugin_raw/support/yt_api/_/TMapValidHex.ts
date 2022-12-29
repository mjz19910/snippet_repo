import {HexByte} from "./h/HexByte";

export type TMapValidHex<T extends string[]>=HexByte<T[number]> extends never? never:T;
