type DE_MutationReplace={type: T_MutType<"REPLACE">; entityKey: string; payload: G_EY_Entity;};
type DE_MutationDelete={type: T_MutType<"DELETE">; entityKey: string; options: DE_PersistenceOption;};
type DE_D_EntityMutationItem=DE_MutationReplace|DE_MutationDelete;
