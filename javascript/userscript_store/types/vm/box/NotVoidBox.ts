import {Box} from "./Box";
import VoidBox from "./VoidBox";
import NonPrimitives from "./NonPrimitives";
import ArrayBox from "./ArrayBox";

type NotVoidBox<T extends NonPrimitives<Box>> = T extends VoidBox ? never : T;
export default NotVoidBox;

type TestNotVoid = NotVoidBox<ArrayBox | VoidBox>;