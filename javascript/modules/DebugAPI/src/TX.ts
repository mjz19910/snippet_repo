import {X} from "./X";

export type TX<A,B>=["T",X<A>]|["U",X<B>];
