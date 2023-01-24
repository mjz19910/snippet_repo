namespace HD {
	function as<T,U>(e: U,x: any=e): T {
		return x;
	}
	export class TestClass {
		static {
			let u: {name: string;}=as(this);
			u.name="BAD";
		}
	}
}
new HD.TestClass;
console.log(HD.TestClass.name);