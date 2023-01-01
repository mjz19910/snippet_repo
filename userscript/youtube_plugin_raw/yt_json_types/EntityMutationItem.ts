import {EntityMutationDelete} from "./EntityMutationDelete";
import {EntityMutationReplace} from "./EntityMutationReplace";

export type EntityMutationItem=EntityMutationReplace|EntityMutationDelete;
