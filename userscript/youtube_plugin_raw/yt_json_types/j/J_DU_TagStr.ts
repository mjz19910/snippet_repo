import {G_BoxedDatabaseData} from "../ghi/group_G.js";

export type J_DU_TagStr=
	|Extract<G_BoxedDatabaseData,{j: any;}>["l"]
	|"bigint"
	|"keys"
	;
;