import {G_VoidBox} from "./G_VoidBox.ts";
import {NumberBox} from "./NumberBox.ts";
import {StringBox} from "./StringBox.ts";

export type G_PrimitiveBox=NumberBox|StringBox|G_VoidBox;
