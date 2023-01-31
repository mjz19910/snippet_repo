//#region Discriminated Unions
type DU_MutationReplace={type: T_MutType<"REPLACE">; entityKey: string; payload: G_EY_Entity;};
type DU_MutationDelete={type: T_MutType<"DELETE">; entityKey: string; options: DE_PersistenceOption;};
type DU_D_EntityMutationItem=DU_MutationReplace|DU_MutationDelete;
type DE_Url_Redirect={url: `https://www.youtube.com/redirect?${string}`;target: "TARGET_NEW_WINDOW";nofollow: true;};
type DE_Url_External={url: GU_VE83769_Url_External;target: "TARGET_NEW_WINDOW";};
type DU_DE_Url=DE_Url_Redirect|DE_Url_External;
//#endregion
//#region Partial Objects from Discriminated Unions
type DE_MutationItem=T_UnionToPartial<DU_D_EntityMutationItem>;
//#endregion
