type StoreDescription<T>={
	new_data: [T,T|T[]][];
	data: [string,["one",T[]]|["many",T[][]]][];
	index: Record<string,number>;
};
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