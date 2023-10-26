import {D_GoogleVideoHostPartition,G_GV_0,G_GV_1} from "../../../d/group_D.ts";
import {D_GoogleVideoPathname} from "./D_GoogleVideoPathname";

export type D_GoogleVideoHostPartitionRet<T extends D_GoogleVideoPathname>={
	host: `rr${number}---sn-${string}n${string}.googlevideo.com`;
	path: T;
	parts: ["rr",`${number}`,"---","sn","-",G_GV_0,"n",G_GV_1,".","googlevideo",".","com"];
	partitioned: D_GoogleVideoHostPartition;
}|{
	host: `r${number}---sn-${string}n${string}.googlevideo.com`;
	path: T;
	parts: ["r",`${number}`,"---","sn","-",G_GV_0,"n",G_GV_1,".","googlevideo",".","com"];
	partitioned: D_GoogleVideoHostPartition;
};
