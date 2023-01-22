type D$DecTypeNum=
	["data32",number,number]|
	["data_fixed32",number,number]|
	["data64",number,number[],bigint]|
	["data_fixed64",number,bigint]|
	["info",number,number]|
	["child",number,Uint8Array,D$DecTypeNum[]|null]|
	["struct",number,D$DecTypeNum[]]|
	["group",number,D$DecTypeNum[]]|
	["error",number];
