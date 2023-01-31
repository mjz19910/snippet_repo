//#region Discriminated Unions
type DU_MutationReplace={type: T_MutType<"REPLACE">; entityKey: string; payload: G_EY_Entity;};
type DU_MutationDelete={type: T_MutType<"DELETE">; entityKey: string; options: DE_PersistenceOption;};
type DU_D_EntityMutationItem=DU_MutationReplace|DU_MutationDelete;
//#endregion
