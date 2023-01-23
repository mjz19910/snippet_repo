type D_DecTypeNum=
	["data32",number,number]|
	["data_fixed32",number,number]|
	["data64",number,number[],bigint]|
	["data_fixed64",number,bigint]|
	["info",number,number]|
	["child",number,Uint8Array,D_DecTypeNum[]|null]|
	["struct",number,D_DecTypeNum[]]|
	["group",number,D_DecTypeNum[]]|
	["error",number];
