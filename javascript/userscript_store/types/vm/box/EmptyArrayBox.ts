import BoxTemplate from "./BoxTemplate";

export class EmptyArrayBox extends BoxTemplate<"array_box", []> {
	type: "array_box" = "array_box";
	special:"Unit"="Unit";
}
export default EmptyArrayBox
