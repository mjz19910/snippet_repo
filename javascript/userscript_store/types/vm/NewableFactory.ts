import {Box} from "./box/Box";

export type NewableFactory<T> = (fn: {new(...a: Box[]): T}) => Box;

export default NewableFactory;
