//#region G_Boxed
type G_BoxedDatabaseData={
	key: string;
	l: string;
	z: [{
		z: [{
			l: "many"; z: [any[][]];
		}|{
			l: "arr"; z: [any[]];
		}|{
			l: "one"; z: [any];
		}];
	}];
};
