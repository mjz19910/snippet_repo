function gen_section_group_las() {
	const las_11_list=[
		["01",{d: "las11s01-in-f0.1e100.net",i: "142.251.214.0"}],
		["02",{d: "las11s02-in-f0.1e100.net",i: "142.251.214.32"}],
		["03",{d: "las11s03-in-f0.1e100.net",i: "142.251.214.64"}],
	] as const;
	const las_12_list=[
		["01",{d: "las12s01-in-f0.1e100.net",i: "142.251.213.160"}],
		["02",{d: "las12s02-in-f0.1e100.net",i: "142.251.213.192"}],
		["03",{d: "las12s03-in-f0.1e100.net",i: "142.251.213.224"}],
	] as const;
	const las_14_list=[
		["01",{d: "las14s01-in-f0.1e100.net",i: "172.217.3.0"}],
		["02",{d: "las14s02-in-f0.1e100.net",i: "172.217.3.32"}],
		["03",{d: "las14s03-in-f0.1e100.net",i: "216.58.219.160"}],
		["04",{d: "las14s04-in-f0.1e100.net",i: "216.58.219.192"}],
		["05",{d: "las14s05-in-f0.1e100.net",i: "142.251.213.128"}],
	] as const;
	const las_15_list=[
		["01",{d: "las15s01-in-f0.1e100.net",i: "216.58.192.64"}],
		["02",{d: "las15s02-in-f0.1e100.net",i: "216.58.192.96"}],
		["03",{d: "las15s03-in-f0.1e100.net",i: "216.58.219.224"}],
		["04",{d: "las15s04-in-f0.1e100.net",i: "142.250.64.0"}],
		["05",{d: "las15s05-in-f0.1e100.net",i: "142.251.214.96"}],
	] as const;
	return [
		["count","las","11",3,las_11_list],
		["count","las","12",3,las_12_list],
		["count","las","14",5,las_14_list],
		["count","las","15",5,las_15_list],
	] as const;
}
const section_order=[
	"arn",
	"atl",
	"bom",
	"cbf",
	"del",
	"dfw",
	"eze",
	"fjr",
	"gru",
	"hkg",
	"kul",
	"las",
	"maa",
	"mrs",
	"par",
	"sfo",
	"sof",
];
section_order;
function get_sections() {
	const bom_03=[
		['06',{d: "bom03s06-in-f0.1e100.net",i: "172.217.24.0"}],
	] as const;
	return [
		["group","arn",2,[
			["count","arn","09",1],
			["count","arn","11",1]
		]],
		["count","atl","14",1],
		["group","bom",6,[
			["count","bom","03",1,bom_03],
			["count","bom","05",22,["range","05,08-29"]],
			["count","bom","07",38,["range","01,10-12,15-22,24-37,41-56"]],
			["count","bom","08",2,["range","01-02"]],
			["count","bom","10",2,["range","01-02"]],
			["count","bom","12",21,["range","01,03-23"]],
		]],
		["group","cbf",2,[
			["count","cbf","29"],
			["count","cbf","96",2],
		]],
		["count","del","03",1],
		["count","dfw","25",1],
		["count","eze","06",1],
		["count","fjr","02",2],
		["count","gru","10",1],
		["count","hkg","12",1],
		["group","kul",2,[
			["count","kul","01",1],
			["count","kul","09",2]
		]],
		["group","las",5,gen_section_group_las()] as const,
		["group","maa",2,[
			["count","maa","03",1],
			["count","maa","05",1]
		]],
		["count","mrs","09",2],
		["group","par",2,[
			["count","par","10",2],
			["count","par","21",1]
		]],
		["group","sfo",2,[
			["count","sfo","03"],
			["count","sfo","07",2],
		]],
		["count","sof","02",2],
	] as const;
}
const sections=get_sections();
sections;