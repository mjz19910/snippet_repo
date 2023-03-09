type Ret_simple_filter=
	|{a: "/string"; z: string;}
	|{a: "/empty";}
	|{a: "/obj"; z: number;}
	|{a: "/raw",z: {[k: string]: any;};}
	|{b: "/own_property_descriptors"; z: Type_GetOwnPropertyDescriptors<any>;}
	|{a: "/null";}
	|{a: "/symbol"; z: symbol;}
	|{a: "/function"; z: number;}
	|{a: "/number"; z: number;}
	|{a: "/bigint"; z: bigint;}
	|{a: "/boolean"; z: boolean;}
	|{a: "/undefined";}
	|{a: "/null";}
	|{a: "/arr"; z: any[];}
	;
;
type Ret_can_clone_map={
	a: "/array";
	z: [string,any[]];
};