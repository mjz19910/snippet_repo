import {Box} from "./Box";

export type NewableFactoryToBox<T> = (box_value: new(...a: Box[])=> T) => Box;

export default NewableFactoryToBox;
