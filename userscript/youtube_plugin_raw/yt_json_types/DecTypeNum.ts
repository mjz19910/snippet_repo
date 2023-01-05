type DecTypeNum=
	["data32",number,number]|
	["data_fixed32",number,number]|
	["data64",number,bigint]|
	["data_fixed64",number,bigint]|
	["info",number,number]|
	["child",number,Uint8Array]|
	["struct",number,DecTypeNum[]]|
	["group",DecTypeNum[]]|
	["error"];
