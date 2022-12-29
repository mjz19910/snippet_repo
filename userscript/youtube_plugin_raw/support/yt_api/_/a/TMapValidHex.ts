import {HexByte} from "./HexByte";

export type TMapValidHex<T extends string[]>=HexByte<T[number]> extends never? never:T;
