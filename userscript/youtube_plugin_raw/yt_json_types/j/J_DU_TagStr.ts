// deno-lint-ignore-file
import {G_BoxedDatabaseData} from "../ghi/group_G.ts";

export type J_DU_TagStr=
	|Extract<G_BoxedDatabaseData,{j: any;}>["l"]
	|"bigint"
	|"keys"
	;
;