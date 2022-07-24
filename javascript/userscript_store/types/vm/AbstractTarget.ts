export class AbstractTarget {
	fire() {
		throw new Error("Attempt to call an abstract class")
	}
}
