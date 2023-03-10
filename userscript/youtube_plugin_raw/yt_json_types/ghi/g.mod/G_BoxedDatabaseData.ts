//#region G_Boxed
type G_BoxedDatabaseData={
	key: "boxed_id:any";
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
}|DST_SaveId|DST_LoadId;
