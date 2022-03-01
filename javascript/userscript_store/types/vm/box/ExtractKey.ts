import {NonNull} from "types/api";
import {Box} from "./Box";
import NotVoidBox from "./NotVoidBox";
import NonPrimitives from "./NonPrimitives";
import VoidBox from "./VoidBox";
import ArrayBox from "./ArrayBox";


type ExtractKey<T extends Box, U> = 
T extends NonPrimitives<NonNull<Box>> ?
U extends keyof NotVoidBox<T> ?
NotVoidBox<T>[U] :
never :
never;

export default ExtractKey;

type Test2=ExtractKey<ArrayBox | VoidBox, 'value'>;
type Test3=ExtractKey<NonPrimitives<Box>, 'value'>;
