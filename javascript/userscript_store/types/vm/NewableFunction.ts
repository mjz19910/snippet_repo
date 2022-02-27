import {IBox} from "./mod";

export type NewableFunction = {
	new(...a: IBox[]): IBox;
};
