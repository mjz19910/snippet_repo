import Box from "./box/Box";

type NewableFactory<T> = (fn: {new(...a: Box[]): T}) => Box;

export default NewableFactory;
