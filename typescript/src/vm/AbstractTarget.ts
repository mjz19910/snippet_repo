export class AbstractTarget {
	wait(): Promise<void> {
		return Promise.resolve();
	}
	fire() {
		throw new Error("Attempt to call an abstract class");
	}
	destroy() {}
}
