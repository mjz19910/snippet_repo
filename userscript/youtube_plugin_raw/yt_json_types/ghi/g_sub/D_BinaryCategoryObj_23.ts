type G_CategoryMap={
	1: "Recently uploaded";
	3: "New For You";
	4: "Live";
	14: "Mixes";
	15: "Music";
	31: "Watched";
	53: "Gaming";
};
type D_BinaryCategoryObj_23={
	2: TR_Binary_Num_f1<keyof G_CategoryMap>;
	3: G_CategoryMap[keyof G_CategoryMap];
};