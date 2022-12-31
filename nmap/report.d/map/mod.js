import {
	DNS,
	DNSClassEnum,
	DNSTypeEnum,
	Host,
	IP,
	lit_value,
	Query,
	range,
	Status
} from "./ns.js";

export const nmap_out_216_58_192=[
	[Host("216.58.192.65","las15s01-in-f1.1e100.net"),Status.Up],
	[Host("216.58.194.1","cbf96s10-in-f1.1e100.net"),Status.Up],
	[Host("216.58.195.65","sfo07s16-in-f1.1e100.net"),Status.Up],
	[Host("216.58.195.225","sfo03s06-in-f1.1e100.net"),Status.Up],
	[Host("216.58.208.97","ams17s08-in-f1.1e100.net"),Status.Up],
	[Host("216.58.208.129","lhr25s08-in-f1.1e100.net"),Status.Up],
	[Host("216.58.208.161","lhr25s09-in-f1.1e100.net"),Status.Up],
	[Host("216.58.208.193","waw07s02-in-f1.1e100.net"),Status.Up],
	[Host("216.58.209.1","sof01s12-in-f1.1e100.net"),Status.Up],
	[Host("216.58.209.33","waw02s05-in-f1.1e100.net"),Status.Up],
	[Host("216.58.209.129","mct01s13-in-f1.1e100.net"),Status.Up],
	[Host("216.58.209.193","bud02s22-in-f1.1e100.net"),Status.Up],
	[Host("216.58.209.225","par10s29-in-f1.1e100.net"),Status.Up],
	[Host("216.58.210.161","hem08s07-in-f1.1e100.net"),Status.Up],
	[Host("216.58.211.1","arn09s20-in-f1.1e100.net"),Status.Up],
	[Host("216.58.212.129","fra16s46-in-f1.1e100.net"),Status.Up],
	[Host("216.58.212.161","fra24s01-in-f1.1e100.net"),Status.Up],
	[Host("216.58.212.193","lhr25s27-in-f1.1e100.net"),Status.Up],
	[Host("216.58.212.225","ams16s22-in-f1.1e100.net"),Status.Up],
	[Host("216.58.213.1","lhr25s25-in-f1.1e100.net"),Status.Up],
	[Host("216.58.213.65","par21s18-in-f1.1e100.net"),Status.Up],
	[Host("216.58.213.161","par21s04-in-f1.1e100.net"),Status.Up],
	[Host("216.58.214.1","lhr26s05-in-f1.1e100.net"),Status.Up],
	[Host("216.58.214.65","par10s39-in-f1.1e100.net"),Status.Up],
	[Host("216.58.215.33","par21s17-in-f1.1e100.net"),Status.Up],
	[Host("216.58.215.65","waw02s16-in-f1.1e100.net"),Status.Up],
	[Host("216.58.215.97","waw02s17-in-f1.1e100.net"),Status.Up],
	[Host("216.58.215.129","mad41s04-in-f1.1e100.net"),Status.Up],
	[Host("216.58.215.161","mad41s07-in-f1.1e100.net"),Status.Up],
	[Host("216.58.215.225","zrh11s02-in-f1.1e100.net"),Status.Up],
	[Host("216.58.217.1","den03s09-in-f1.1e100.net"),Status.Up],
	[Host("216.58.221.193","kul08s10-in-f1.1e100.net"),Status.Up],
	[Host("216.58.222.1","gru06s66-in-f1.1e100.net"),Status.Up],
	[Host("216.58.223.65","mba01s07-in-f1.1e100.net"),Status.Up],
	[Host("216.58.223.193","los02s03-in-f1.1e100.net"),Status.Up],
];

export const nmap_out_142_251_32=[
	[Host("142.251.32.1","ord38s33-in-f1.1e100.net"),Status.Up],
	[Host("142.251.32.33","sfo03s26-in-f1.1e100.net"),Status.Up],
	[Host("142.251.32.65","yyz12s07-in-f1.1e100.net"),Status.Up],
	[Host("142.251.32.97","lga25s77-in-f1.1e100.net"),Status.Up],
	[Host("142.251.32.129","dfw28s29-in-f1.1e100.net"),Status.Up],
	[Host("142.251.32.161","dfw28s30-in-f1.1e100.net"),Status.Up],
	[Host("142.251.32.193","dfw25s42-in-f1.1e100.net"),Status.Up],
	[Host("142.251.32.225","dfw25s43-in-f1.1e100.net"),Status.Up],
	[Host("142.251.33.1","dfw25s44-in-f1.1e100.net"),Status.Up],
	[Host("142.251.33.33","dfw28s31-in-f1.1e100.net"),Status.Up],
	[Host("142.251.33.65","sea09s28-in-f1.1e100.net"),Status.Up],
	[Host("142.251.33.97","sea30s10-in-f1.1e100.net"),Status.Up],
	[Host("142.251.33.161","yyz10s17-in-f1.1e100.net"),Status.Up],
	[Host("142.251.33.193","iad23s96-in-f1.1e100.net"),Status.Up],
	[Host("142.251.33.225","qro01s26-in-f1.1e100.net"),Status.Up],
	[Host("142.251.34.1","qro01s27-in-f1.1e100.net"),Status.Up],
	[Host("142.251.34.33","qro01s28-in-f1.1e100.net"),Status.Up],
	[Host("142.251.34.65","qro02s23-in-f1.1e100.net"),Status.Up],
	[Host("142.251.34.97","qro02s24-in-f1.1e100.net"),Status.Up],
	[Host("142.251.34.129","qro02s25-in-f1.1e100.net"),Status.Up],
	[Host("142.251.34.161","qro02s26-in-f1.1e100.net"),Status.Up],
	[Host("142.251.34.193","qro02s27-in-f1.1e100.net"),Status.Up],
	[Host("142.251.34.225","qro02s28-in-f1.1e100.net"),Status.Up],
	[Host("142.251.35.1","qro02s29-in-f1.1e100.net"),Status.Up],
	[Host("142.251.35.161","lga25s78-in-f1.1e100.net"),Status.Up],
	[Host("142.251.35.193","dfw25s46-in-f1.1e100.net"),Status.Up],
	[Host("142.251.36.1","ams15s44-in-f1.1e100.net"),Status.Up],
	[Host("142.251.36.33","ams17s12-in-f1.1e100.net"),Status.Up],
	[Host("142.251.36.65","prg03s10-in-f1.1e100.net"),Status.Up],
	[Host("142.251.36.97","prg03s11-in-f1.1e100.net"),Status.Up],
	[Host("142.251.36.129","prg03s12-in-f1.1e100.net"),Status.Up],
	[Host("142.251.36.161","muc12s11-in-f1.1e100.net"),Status.Up],
	[Host("142.251.36.193","muc12s12-in-f1.1e100.net"),Status.Up],
	[Host("142.251.36.225","muc11s22-in-f1.1e100.net"),Status.Up],
	[Host("142.251.37.1","muc11s23-in-f1.1e100.net"),Status.Up],
	[Host("142.251.37.33","mrs09s13-in-f1.1e100.net"),Status.Up],
	[Host("142.251.37.65","tlv03s01-in-f1.1e100.net"),Status.Up],
	[Host("142.251.37.97","prg03s13-in-f1.1e100.net"),Status.Up],
	[Host("142.251.37.161","mrs09s14-in-f1.1e100.net"),Status.Up],
	[Host("142.251.37.193","mrs09s15-in-f1.1e100.net"),Status.Up],
	[Host("142.251.37.225","mrs09s16-in-f1.1e100.net"),Status.Up],
	[Host("142.251.39.1","bud02s37-in-f1.1e100.net"),Status.Up],
	[Host("142.251.39.33","bud02s38-in-f1.1e100.net"),Status.Up],
	[Host("142.251.39.65","bud02s39-in-f1.1e100.net"),Status.Up],
	[Host("142.251.39.97","ams15s48-in-f1.1e100.net"),Status.Up],
	[Host("142.251.40.33","lax17s55-in-f1.1e100.net"),Status.Up],
	[Host("142.251.40.65","dfw28s34-in-f1.1e100.net"),Status.Up],
	[Host("142.251.40.97","lga25s79-in-f1.1e100.net"),Status.Up],
	[Host("142.251.40.129","lga25s80-in-f1.1e100.net"),Status.Up],
	[Host("142.251.40.161","lga25s81-in-f1.1e100.net"),Status.Up],
	[Host("142.251.40.193","lga34s38-in-f1.1e100.net"),Status.Up],
	[Host("142.251.40.225","lga34s39-in-f1.1e100.net"),Status.Up],
	[Host("142.251.41.1","lga34s40-in-f1.1e100.net"),Status.Up],
	[Host("142.251.41.33","yyz12s08-in-f1.1e100.net"),Status.Up],
	[Host("142.251.41.65","yyz10s20-in-f1.1e100.net"),Status.Up],
	[Host("142.251.42.1","bom12s19-in-f1.1e100.net"),Status.Up],
	[Host("142.251.42.33","bom12s20-in-f1.1e100.net"),Status.Up],
	[Host("142.251.42.65","bom12s21-in-f1.1e100.net"),Status.Up],
	[Host("142.251.42.97","bom07s45-in-f1.1e100.net"),Status.Up],
	[Host("142.251.42.129","nrt12s45-in-f1.1e100.net"),Status.Up],
	[Host("142.251.42.161","nrt12s46-in-f1.1e100.net"),Status.Up],
	[Host("142.251.42.193","nrt12s47-in-f1.1e100.net"),Status.Up],
	[Host("142.251.42.225","tsa01s11-in-f1.1e100.net"),Status.Up],
	[Host("142.251.43.1","tsa03s08-in-f1.1e100.net"),Status.Up],
	[Host("142.251.43.33","bkk02s01-in-f1.1e100.net"),Status.Up],
	[Host("142.251.43.65","bkk02s02-in-f1.1e100.net"),Status.Up],
	[Host("142.251.43.97","bkk02s03-in-f1.1e100.net"),Status.Up],
	[Host("142.251.43.129","bkk03s01-in-f1.1e100.net"),Status.Up],
	[Host("142.251.43.161","bkk03s02-in-f1.1e100.net"),Status.Up],
	[Host("142.251.43.193","bkk03s03-in-f1.1e100.net"),Status.Up],
	[Host("142.251.43.225","bkk02s04-in-f1.1e100.net"),Status.Up],
	[Host("142.251.45.1","iad66s01-in-f1.1e100.net"),Status.Up],
	[Host("142.251.45.33","dfw25s47-in-f1.1e100.net"),Status.Up],
	[Host("142.251.45.65","dfw25s48-in-f1.1e100.net"),Status.Up],
	[Host("142.251.45.97","iad23s04-in-f1.1e100.net"),Status.Up],
	[Host("142.251.46.129","dfw28s35-in-f1.1e100.net"),Status.Up],
	[Host("142.251.46.161","nuq04s44-in-f1.1e100.net"),Status.Up],
	[Host("142.251.46.193","nuq04s45-in-f1.1e100.net"),Status.Up],
	[Host("142.251.46.225","sfo03s27-in-f1.1e100.net"),Status.Up],
];

export const dns_names=[
	"ams15s44-in-f1.1e100.net",
	"ams15s48-in-f1.1e100.net",
	"ams16s22-in-f1.1e100.net",
	"ams17s08-in-f1.1e100.net",
	"ams17s12-in-f1.1e100.net",
	"arn09s19-in-f1.1e100.net",
	"arn09s20-in-f1.1e100.net",
	"arn11s04-in-f1.1e100.net",
	"atl14s63-in-f1.1e100.net",
	"bkk02s01-in-f1.1e100.net",
	"bkk02s02-in-f1.1e100.net",
	"bkk02s03-in-f1.1e100.net",
	"bkk02s04-in-f1.1e100.net",
	"bkk03s01-in-f1.1e100.net",
	"bkk03s02-in-f1.1e100.net",
	"bkk03s03-in-f1.1e100.net",
	"bom07s01-in-f1.1e100.net",
	"bom07s45-in-f1.1e100.net",
	"bom12s04-in-f1.1e100.net",
	"bom12s05-in-f1.1e100.net",
	"bom12s19-in-f1.1e100.net",
	"bom12s20-in-f1.1e100.net",
	"bom12s21-in-f1.1e100.net",
	"bud02s22-in-f1.1e100.net",
	"bud02s37-in-f1.1e100.net",
	"bud02s38-in-f1.1e100.net",
	"bud02s39-in-f1.1e100.net",
	"cbf96s07-in-f1.1e100.net",
	"cbf96s10-in-f1.1e100.net",
	"del03s06-in-f1.1e100.net",
	"den03s09-in-f1.1e100.net",
	"dfw25s42-in-f1.1e100.net",
	"dfw25s43-in-f1.1e100.net",
	"dfw25s44-in-f1.1e100.net",
	"dfw25s46-in-f1.1e100.net",
	"dfw25s47-in-f1.1e100.net",
	"dfw25s48-in-f1.1e100.net",
	"dfw28s29-in-f1.1e100.net",
	"dfw28s30-in-f1.1e100.net",
	"dfw28s31-in-f1.1e100.net",
	"dfw28s34-in-f1.1e100.net",
	"dfw28s35-in-f1.1e100.net",
	"eze06s09-in-f1.1e100.net",
	"fjr02s03-in-f1.1e100.net",
	"fjr02s04-in-f1.1e100.net",
	"fra16s46-in-f1.1e100.net",
	"fra24s01-in-f1.1e100.net",
	"gru06s66-in-f1.1e100.net",
	"gru10s13-in-f1.1e100.net",
	"hem08s07-in-f1.1e100.net",
	"hkg12s11-in-f1.1e100.net",
	"iad23s04-in-f1.1e100.net",
	"iad23s96-in-f1.1e100.net",
	"iad66s01-in-f1.1e100.net",
	"kul01s11-in-f1.1e100.net",
	"kul08s10-in-f1.1e100.net",
	"kul09s12-in-f1.1e100.net",
	"kul09s15-in-f1.1e100.net",
	"las15s01-in-f1.1e100.net",
	"lax17s55-in-f1.1e100.net",
	"lga25s77-in-f1.1e100.net",
	"lga25s78-in-f1.1e100.net",
	"lga25s79-in-f1.1e100.net",
	"lga25s80-in-f1.1e100.net",
	"lga25s81-in-f1.1e100.net",
	"lga34s38-in-f1.1e100.net",
	"lga34s39-in-f1.1e100.net",
	"lga34s40-in-f1.1e100.net",
	"lhr25s08-in-f1.1e100.net",
	"lhr25s09-in-f1.1e100.net",
	"lhr25s25-in-f1.1e100.net",
	"lhr25s27-in-f1.1e100.net",
	"lhr26s05-in-f1.1e100.net",
	"los02s03-in-f1.1e100.net",
	"maa03s31-in-f1.1e100.net",
	"maa05s10-in-f1.1e100.net",
	"mad41s04-in-f1.1e100.net",
	"mad41s07-in-f1.1e100.net",
	"mba01s07-in-f1.1e100.net",
	"mct01s13-in-f1.1e100.net",
	"mrs09s08-in-f1.1e100.net",
	"mrs09s09-in-f1.1e100.net",
	"mrs09s13-in-f1.1e100.net",
	"mrs09s14-in-f1.1e100.net",
	"mrs09s15-in-f1.1e100.net",
	"mrs09s16-in-f1.1e100.net",
	"muc11s22-in-f1.1e100.net",
	"muc11s23-in-f1.1e100.net",
	"muc12s11-in-f1.1e100.net",
	"muc12s12-in-f1.1e100.net",
	"nrt12s45-in-f1.1e100.net",
	"nrt12s46-in-f1.1e100.net",
	"nrt12s47-in-f1.1e100.net",
	"nuq04s44-in-f1.1e100.net",
	"nuq04s45-in-f1.1e100.net",
	"ord38s33-in-f1.1e100.net",
	"par10s29-in-f1.1e100.net",
	"par10s33-in-f1.1e100.net",
	"par10s34-in-f1.1e100.net",
	"par10s39-in-f1.1e100.net",
	"par21s04-in-f1.1e100.net",
	"par21s05-in-f1.1e100.net",
	"par21s17-in-f1.1e100.net",
	"par21s18-in-f1.1e100.net",
	"prg03s10-in-f1.1e100.net",
	"prg03s11-in-f1.1e100.net",
	"prg03s12-in-f1.1e100.net",
	"prg03s13-in-f1.1e100.net",
	"qro01s26-in-f1.1e100.net",
	"qro01s27-in-f1.1e100.net",
	"qro01s28-in-f1.1e100.net",
	"qro02s23-in-f1.1e100.net",
	"qro02s24-in-f1.1e100.net",
	"qro02s25-in-f1.1e100.net",
	"qro02s26-in-f1.1e100.net",
	"qro02s27-in-f1.1e100.net",
	"qro02s28-in-f1.1e100.net",
	"qro02s29-in-f1.1e100.net",
	"sea09s28-in-f1.1e100.net",
	"sea30s10-in-f1.1e100.net",
	"sfo03s06-in-f1.1e100.net",
	"sfo03s26-in-f1.1e100.net",
	"sfo03s27-in-f1.1e100.net",
	"sfo07s13-in-f1.1e100.net",
	"sfo07s16-in-f1.1e100.net",
	"sof01s12-in-f1.1e100.net",
	"sof02s27-in-f1.1e100.net",
	"sof02s28-in-f1.1e100.net",
	"tlv03s01-in-f1.1e100.net",
	"tsa01s11-in-f1.1e100.net",
	"tsa03s08-in-f1.1e100.net",
	"waw02s05-in-f1.1e100.net",
	"waw02s16-in-f1.1e100.net",
	"waw02s17-in-f1.1e100.net",
	"waw07s02-in-f1.1e100.net",
	"yyz10s17-in-f1.1e100.net",
	"yyz10s20-in-f1.1e100.net",
	"yyz12s07-in-f1.1e100.net",
	"yyz12s08-in-f1.1e100.net",
	"zrh11s02-in-f1.1e100.net",
];
const IN=DNSClassEnum.IN;
const A=DNSTypeEnum.A;
class B {
	/** @type {import("./ns.js").DNS_IN_A_Type[]}*/
	dns_res_arr=[];
	constructor() {
		/** @type {Map<string, this['dns_res_arr'][0]>} */
		this.map=new Map;
	}
	find_duplicate() {
		/** @readonly*/const Reply=Query.A_ValueEnum.ReplyArray;
		let dup_count=0;
		/** @type {[import("./ns.js").DNS_IN_A_Type, import("./ns.js").DNS_IN_A_Type]|null} */
		let first_dup=null;
		let sort_count=0;
		/** @arg {string} a @arg {string} b */
		function ip_leq(a,b) {
			let ip_a=a.split(".").map(e => +e);
			let ip_b=b.split(".").map(e => +e);
			let leq=true;
			for(let i=0;i<4;i++) {
				let cmp=ip_a[i]<=ip_b[i];
				if(cmp) {
					return true;
				} else {
					return false;
				}
			}
			console.log(leq);
			return leq;
		}
		for(let i of this.dns_res_arr) {
			let is_sorted=i[5].every((v,i,a) => {
				if(!i) return true;
				if(!a[i-1]) throw new Error("Bad Type");
				return ip_leq(a[i-1][1],v[1]);
			});
			if(!is_sorted) {
				console.log(i[5]);
				i[5].sort(([,a],[,b]) => {
					let ip_a=a.split(".").map(e => +e);
					let ip_b=b.split(".").map(e => +e);
					for(let i=0;i<4;i++) {
						if(ip_a[i]===ip_b[i]) return 0;
						let diff=ip_a[i]-ip_b[i];
						return diff;
					}
					return 0;
				});
				console.log(i[5]);
				sort_count++;
			}
			if(!this.map.has(i[1][1])) {
				this.map.set(i[1][1],i);
			} else {
				let entry=this.map.get(i[1][1]);
				if(!entry) continue;
				if(dup_count===0) {
					first_dup=[entry,i];
				}
				dup_count++;
				let acc_reply=entry[Reply];
				console.error(entry[Reply],'is a dup of',i[Reply]);
				console.error("found dup");
				console.error(i[Reply]);
				acc_reply.push(...i[Reply]);
			}
		}
		if(sort_count>0) {
			console.log('unsorted');
			console.log('count',sort_count);
			return;
		}
		if(dup_count>0&&first_dup) {
			console.error('simplify');
			console.error('duplicate entries',dup_count);
			console.log([...this.map.values()].map(e => Query.stringify(e,true)).join(",\n"));
			throw new Error("Fixup");
		}
	}
}
class ams extends B {
	/** @readonly*/static key="ams";
	static value=[
		"ams15s21-in-f1.1e100.net","ams15s22-in-f1.1e100.net","ams15s29-in-f1.1e100.net",
		"ams15s30-in-f1.1e100.net","ams15s33-in-f1.1e100.net",
		"ams15s40-in-f1.1e100.net","ams15s41-in-f1.1e100.net","ams15s42-in-f1.1e100.net",
		"ams15s44-in-f1.1e100.net","ams15s48-in-f1.1e100.net",
		"ams16s21-in-f1.1e100.net","ams16s22-in-f1.1e100.net","ams16s29-in-f1.1e100.net",
		"ams16s30-in-f1.1e100.net","ams16s31-in-f1.1e100.net","ams16s32-in-f1.1e100.net",
		"ams17s08-in-f1.1e100.net","ams17s09-in-f1.1e100.net",
		"ams17s10-in-f1.1e100.net","ams17s12-in-f1.1e100.net"
	];
	nmap_near_27=`
Nmap scan report for ams17s02-in-f6.1e100.net (74.125.100.6)
Nmap scan report for ams17s02-in-f7.1e100.net (74.125.100.7)
Nmap scan report for ams17s02-in-f8.1e100.net (74.125.100.8)
Nmap scan report for ams17s02-in-f9.1e100.net (74.125.100.9)
Nmap scan report for ams17s02-in-f10.1e100.net (74.125.100.10)
Nmap scan report for ams17s02-in-f30.1e100.net (74.125.100.30)
Nmap scan report for ams17s03-in-f6.1e100.net (74.125.100.38)
Nmap scan report for ams17s03-in-f7.1e100.net (74.125.100.39)
Nmap scan report for ams17s03-in-f8.1e100.net (74.125.100.40)
Nmap scan report for ams17s03-in-f9.1e100.net (74.125.100.41)
Nmap scan report for ams17s03-in-f10.1e100.net (74.125.100.42)
Nmap scan report for ams17s03-in-f30.1e100.net (74.125.100.62)
Nmap scan report for ams17s04-in-f6.1e100.net (74.125.100.102)
Nmap scan report for ams17s04-in-f7.1e100.net (74.125.100.103)
Nmap scan report for ams17s04-in-f8.1e100.net (74.125.100.104)
Nmap scan report for ams17s04-in-f9.1e100.net (74.125.100.105)
Nmap scan report for ams17s04-in-f10.1e100.net (74.125.100.106)
Nmap scan report for ams17s04-in-f30.1e100.net (74.125.100.126)
Nmap scan report for ams17s05-in-f6.1e100.net (209.85.226.6)
Nmap scan report for ams17s05-in-f7.1e100.net (209.85.226.7)
Nmap scan report for ams17s05-in-f8.1e100.net (209.85.226.8)
Nmap scan report for ams17s05-in-f9.1e100.net (209.85.226.9)
Nmap scan report for ams17s05-in-f10.1e100.net (209.85.226.10)
Nmap scan report for ams17s05-in-f30.1e100.net (209.85.226.30)
Nmap scan report for ams17s06-in-f6.1e100.net (209.85.226.38)
Nmap scan report for ams17s06-in-f7.1e100.net (209.85.226.39)
Nmap scan report for ams17s06-in-f8.1e100.net (209.85.226.40)
Nmap scan report for ams17s06-in-f9.1e100.net (209.85.226.41)
Nmap scan report for ams17s06-in-f10.1e100.net (209.85.226.42)
Nmap scan report for ams17s06-in-f30.1e100.net (209.85.226.62)
Nmap scan report for ams17s07-in-f6.1e100.net (209.85.226.70)
Nmap scan report for ams17s07-in-f7.1e100.net (209.85.226.71)
Nmap scan report for ams17s07-in-f8.1e100.net (209.85.226.72)
Nmap scan report for ams17s07-in-f9.1e100.net (209.85.226.73)
Nmap scan report for ams17s07-in-f10.1e100.net (209.85.226.74)
Nmap scan report for ams17s07-in-f30.1e100.net (209.85.226.94)
Nmap scan report for sof01s11-in-f96.1e100.net (216.58.208.96)
Nmap scan report for ams17s08-in-f1.1e100.net (216.58.208.97)
Other addresses for ams17s08-in-f1.1e100.net (not scanned): 2a00:1450:400e:80e::1
rDNS record for 216.58.208.97: sof01s11-in-f97.1e100.net
Nmap scan report for ams17s08-in-f2.1e100.net (216.58.208.98)
Nmap scan report for sof01s11-in-f99.1e100.net (216.58.208.99)
Nmap scan report for sof01s11-in-f100.1e100.net (216.58.208.100)
Nmap scan report for sof01s11-in-f101.1e100.net (216.58.208.101)
Nmap scan report for sof01s11-in-f102.1e100.net (216.58.208.102)
Nmap scan report for sof01s11-in-f103.1e100.net (216.58.208.103)
Nmap scan report for ams17s08-in-f8.1e100.net (216.58.208.104)
Nmap scan report for ams17s08-in-f9.1e100.net (216.58.208.105)
Nmap scan report for ams17s08-in-f10.1e100.net (216.58.208.106)
Nmap scan report for sof01s11-in-f107.1e100.net (216.58.208.107)
Nmap scan report for sof01s11-in-f108.1e100.net (216.58.208.108)
Nmap scan report for ams17s08-in-f13.1e100.net (216.58.208.109)
Nmap scan report for sof01s11-in-f110.1e100.net (216.58.208.110)
Nmap scan report for sof01s11-in-f111.1e100.net (216.58.208.111)
Nmap scan report for ams17s08-in-f16.1e100.net (216.58.208.112)
Nmap scan report for ams17s08-in-f17.1e100.net (216.58.208.113)
Nmap scan report for sof01s11-in-f114.1e100.net (216.58.208.114)
Nmap scan report for ams17s08-in-f19.1e100.net (216.58.208.115)
Nmap scan report for ams17s08-in-f20.1e100.net (216.58.208.116)
Nmap scan report for sof01s11-in-f117.1e100.net (216.58.208.117)
Nmap scan report for ams17s08-in-f22.1e100.net (216.58.208.118)
Nmap scan report for sof01s11-in-f119.1e100.net (216.58.208.119)
Nmap scan report for ams17s08-in-f24.1e100.net (216.58.208.120)
Nmap scan report for ams17s08-in-f25.1e100.net (216.58.208.121)
Nmap scan report for ams17s08-in-f26.1e100.net (216.58.208.122)
Nmap scan report for sof01s11-in-f127.1e100.net (216.58.208.127)
Nmap scan report for ams17s09-in-f0.1e100.net (216.58.214.0)
Nmap scan report for ams17s09-in-f1.1e100.net (216.58.214.1)
Nmap scan report for ams17s09-in-f2.1e100.net (216.58.214.2)
Nmap scan report for lhr26s05-in-f3.1e100.net (216.58.214.3)
Nmap scan report for lhr26s05-in-f4.1e100.net (216.58.214.4)
Nmap scan report for lhr26s05-in-f5.1e100.net (216.58.214.5)
Nmap scan report for lhr26s05-in-f6.1e100.net (216.58.214.6)
Nmap scan report for lhr26s05-in-f7.1e100.net (216.58.214.7)
Nmap scan report for ams17s09-in-f8.1e100.net (216.58.214.8)
Nmap scan report for ams17s09-in-f9.1e100.net (216.58.214.9)
Nmap scan report for lhr26s05-in-f10.1e100.net (216.58.214.10)
Nmap scan report for ams17s09-in-f11.1e100.net (216.58.214.11)
Nmap scan report for lhr26s05-in-f13.1e100.net (216.58.214.13)
Nmap scan report for lhr26s05-in-f14.1e100.net (216.58.214.14)
Nmap scan report for ams17s09-in-f15.1e100.net (216.58.214.15)
Nmap scan report for ams17s09-in-f16.1e100.net (216.58.214.16)
Nmap scan report for lhr26s05-in-f17.1e100.net (216.58.214.17)
Nmap scan report for ams17s09-in-f18.1e100.net (216.58.214.18)
Nmap scan report for lhr26s05-in-f19.1e100.net (216.58.214.19)
Nmap scan report for lhr26s05-in-f20.1e100.net (216.58.214.20)
Nmap scan report for ams17s09-in-f21.1e100.net (216.58.214.21)
Nmap scan report for lhr26s05-in-f22.1e100.net (216.58.214.22)
Nmap scan report for ams17s09-in-f23.1e100.net (216.58.214.23)
Nmap scan report for ams17s09-in-f24.1e100.net (216.58.214.24)
Nmap scan report for lhr26s05-in-f25.1e100.net (216.58.214.25)
Nmap scan report for ams17s09-in-f26.1e100.net (216.58.214.26)
Nmap scan report for lhr26s05-in-f31.1e100.net (216.58.214.31)
Nmap scan report for ams17s10-in-f0.1e100.net (142.250.179.128)
Nmap scan report for ams17s10-in-f1.1e100.net (142.250.179.129)
Nmap scan report for ams17s10-in-f2.1e100.net (142.250.179.130)
Nmap scan report for ams17s10-in-f3.1e100.net (142.250.179.131)
Nmap scan report for ams17s10-in-f4.1e100.net (142.250.179.132)
Nmap scan report for ams17s10-in-f5.1e100.net (142.250.179.133)
Nmap scan report for ams17s10-in-f6.1e100.net (142.250.179.134)
Nmap scan report for ams17s10-in-f7.1e100.net (142.250.179.135)
Nmap scan report for ams17s10-in-f8.1e100.net (142.250.179.136)
Nmap scan report for ams17s10-in-f9.1e100.net (142.250.179.137)
Nmap scan report for ams17s10-in-f10.1e100.net (142.250.179.138)
Nmap scan report for ams17s10-in-f11.1e100.net (142.250.179.139)
Nmap scan report for ams17s10-in-f12.1e100.net (142.250.179.140)
Nmap scan report for ams17s10-in-f13.1e100.net (142.250.179.141)
Nmap scan report for ams17s10-in-f14.1e100.net (142.250.179.142)
Nmap scan report for ams17s10-in-f15.1e100.net (142.250.179.143)
Nmap scan report for ams17s10-in-f16.1e100.net (142.250.179.144)
Nmap scan report for ams17s10-in-f17.1e100.net (142.250.179.145)
Nmap scan report for ams17s10-in-f18.1e100.net (142.250.179.146)
Nmap scan report for ams17s10-in-f19.1e100.net (142.250.179.147)
Nmap scan report for ams17s10-in-f20.1e100.net (142.250.179.148)
Nmap scan report for ams17s10-in-f21.1e100.net (142.250.179.149)
Nmap scan report for ams17s10-in-f22.1e100.net (142.250.179.150)
Nmap scan report for ams17s10-in-f23.1e100.net (142.250.179.151)
Nmap scan report for ams17s10-in-f24.1e100.net (142.250.179.152)
Nmap scan report for ams17s10-in-f25.1e100.net (142.250.179.153)
Nmap scan report for ams17s10-in-f26.1e100.net (142.250.179.154)
Nmap scan report for ams17s10-in-f31.1e100.net (142.250.179.159)
Nmap scan report for ams17s11-in-f6.1e100.net (74.125.8.70)
Nmap scan report for ams17s11-in-f7.1e100.net (74.125.8.71)
Nmap scan report for ams17s11-in-f8.1e100.net (74.125.8.72)
Nmap scan report for ams17s11-in-f9.1e100.net (74.125.8.73)
Nmap scan report for ams17s11-in-f10.1e100.net (74.125.8.74)
Nmap scan report for ams17s12-in-f0.1e100.net (142.251.36.32)
Nmap scan report for ams17s12-in-f1.1e100.net (142.251.36.33)
Nmap scan report for ams17s12-in-f2.1e100.net (142.251.36.34)
Nmap scan report for ams17s12-in-f3.1e100.net (142.251.36.35)
Nmap scan report for ams17s12-in-f4.1e100.net (142.251.36.36)
Nmap scan report for ams17s12-in-f5.1e100.net (142.251.36.37)
Nmap scan report for ams17s12-in-f6.1e100.net (142.251.36.38)
Nmap scan report for ams17s12-in-f7.1e100.net (142.251.36.39)
Nmap scan report for ams17s12-in-f8.1e100.net (142.251.36.40)
Nmap scan report for ams17s12-in-f9.1e100.net (142.251.36.41)
Nmap scan report for ams17s12-in-f10.1e100.net (142.251.36.42)
Nmap scan report for ams17s12-in-f11.1e100.net (142.251.36.43)
Nmap scan report for ams17s12-in-f12.1e100.net (142.251.36.44)
Nmap scan report for ams17s12-in-f13.1e100.net (142.251.36.45)
Nmap scan report for ams17s12-in-f14.1e100.net (142.251.36.46)
Nmap scan report for ams17s12-in-f15.1e100.net (142.251.36.47)
Nmap scan report for ams17s12-in-f16.1e100.net (142.251.36.48)
Nmap scan report for ams17s12-in-f17.1e100.net (142.251.36.49)
Nmap scan report for ams17s12-in-f18.1e100.net (142.251.36.50)
Nmap scan report for ams17s12-in-f19.1e100.net (142.251.36.51)
Nmap scan report for ams17s12-in-f20.1e100.net (142.251.36.52)
Nmap scan report for ams17s12-in-f21.1e100.net (142.251.36.53)
Nmap scan report for ams17s12-in-f22.1e100.net (142.251.36.54)
Nmap scan report for ams17s12-in-f23.1e100.net (142.251.36.55)
Nmap scan report for ams17s12-in-f24.1e100.net (142.251.36.56)
Nmap scan report for ams17s12-in-f25.1e100.net (142.251.36.57)
Nmap scan report for ams17s12-in-f26.1e100.net (142.251.36.58)
Nmap scan report for ams17s12-in-f31.1e100.net (142.251.36.63)
Nmap scan report for ams17s13-in-f6.1e100.net (74.125.8.198)
Nmap scan report for ams17s13-in-f7.1e100.net (74.125.8.199)
Nmap scan report for ams17s13-in-f8.1e100.net (74.125.8.200)
Nmap scan report for ams17s13-in-f9.1e100.net (74.125.8.201)
Nmap scan report for ams17s13-in-f10.1e100.net (74.125.8.202)
Nmap scan report for ams17s17-in-f6.1e100.net (74.125.8.134)
Nmap scan report for ams17s17-in-f7.1e100.net (74.125.8.135)
Nmap scan report for ams17s17-in-f8.1e100.net (74.125.8.136)
Nmap scan report for ams17s17-in-f9.1e100.net (74.125.8.137)
Nmap scan report for ams17s17-in-f10.1e100.net (74.125.8.138)
`;
	rev_arr=[
		['ams15s21',['74.125.67.1','216.58.212.129','216.239.37.1']],
		['ams15s22',['74.125.67.1','216.58.212.161','216.239.37.1']],
		['ams15s29',['74.125.67.1','172.217.17.97','216.239.37.1']],
		['ams15s30',['74.125.67.1','172.217.17.129','216.239.37.1']],
		['ams15s33',['172.217.20.65']],
		['ams15s40',['172.217.168.225']],
		['ams15s41',['142.250.179.161']],
		['ams15s42',['142.250.179.193']],
		['ams15s44',['142.251.36.1']],
		['ams15s48',['142.251.39.97']],
		['ams16s21',['74.125.67.1','216.239.37.1','216.58.212.193']],
		['ams16s22',['74.125.67.1','216.239.37.1','216.58.212.225']],
		['ams16s29',['74.125.67.1','172.217.17.33','216.239.37.1']],
		['ams16s30',['74.125.67.1','172.217.17.65','216.239.37.1']],
		['ams16s31',['172.217.19.193']],
		['ams16s32',['172.217.168.193']],
		['ams17s08',['216.58.208.97']],
		['ams17s09',['216.58.214.1']],
		['ams17s10',['142.250.179.129']],
		['ams17s12',['142.251.36.33']]
	];
	dns_res_arr=[
		Query.A("ams15s21-in-f1.1e100.net.",3600,IN,A,[IP("74.125.67.1"),IP("216.58.212.129"),IP("216.239.37.1")]),
		Query.A("ams15s22-in-f1.1e100.net.",3600,IN,A,[IP("74.125.67.1"),IP("216.58.212.161"),IP("216.239.37.1")]),
		Query.A("ams15s29-in-f1.1e100.net.",3400,IN,A,[IP("74.125.67.1"),IP("172.217.17.97"),IP("216.239.37.1")]),
		Query.A("ams15s30-in-f1.1e100.net.",3600,IN,A,[IP("74.125.67.1"),IP("172.217.17.129"),IP("216.239.37.1")]),
		Query.A("ams15s32-in-f1.1e100.net.",3310,IN,A,[IP("216.58.211.97")]),
		Query.A("ams15s33-in-f1.1e100.net.",3600,IN,A,[IP("172.217.20.65")]),
		Query.A("ams15s34-in-f1.1e100.net.",3568,IN,A,[IP("74.125.100.65")]),
		Query.A("ams15s35-in-f1.1e100.net.",2980,IN,A,[IP("209.85.226.97")]),
		Query.A("ams15s36-in-f1.1e100.net.",3600,IN,A,[IP("172.217.132.1")]),
		Query.A("ams15s37-in-f1.1e100.net.",3105,IN,A,[IP("172.217.132.33")]),
		Query.A("ams15s38-in-f1.1e100.net.",3600,IN,A,[IP("172.217.132.65")]),
		Query.A("ams15s39-in-f1.1e100.net.",3105,IN,A,[IP("172.217.132.97")]),
		Query.A("ams15s40-in-f1.1e100.net.",3104,IN,A,[IP("172.217.168.225")]),
		Query.A("ams15s41-in-f1.1e100.net.",2985,IN,A,[IP("142.250.179.161")]),
		Query.A("ams15s42-in-f1.1e100.net.",3399,IN,A,[IP("142.250.179.193")]),
		Query.A("ams15s43-in-f1.1e100.net.",3600,IN,A,[IP("74.125.8.97")]),
		Query.A("ams15s44-in-f1.1e100.net.",3104,IN,A,[IP("142.251.36.1")]),
		Query.A("ams15s45-in-f1.1e100.net.",3600,IN,A,[IP("74.125.100.193")]),
		Query.A("ams15s46-in-f1.1e100.net.",3104,IN,A,[IP("74.125.100.225")]),
		Query.A("ams15s47-in-f1.1e100.net.",3436,IN,A,[IP("172.217.132.129")]),
		Query.A("ams15s48-in-f1.1e100.net.",2985,IN,A,[IP("142.251.39.97")]),
		Query.A("ams15s49-in-f1.1e100.net.",3600,IN,A,[IP("172.217.132.161")]),
		Query.A("ams15s51-in-f1.1e100.net.",1688,IN,A,[IP("172.217.132.225")]),
		Query.A("ams15s52-in-f1.1e100.net.",3600,IN,A,[IP("74.125.8.161")]),
		Query.A("ams16s01-in-f1.1e100.net.",2981,IN,A,[IP("74.125.100.129")]),
		Query.A("ams16s02-in-f1.1e100.net.",3568,IN,A,[IP("74.125.100.145")]),
		Query.A("ams16s03-in-f1.1e100.net.",3115,IN,A,[IP("74.125.100.161")]),
		Query.A("ams16s04-in-f1.1e100.net.",3406,IN,A,[IP("74.125.100.177")]),
		Query.A("ams16s21-in-f1.1e100.net.",3406,IN,A,[IP("74.125.67.1"),IP("216.239.37.1"),IP("216.58.212.193")]),
		Query.A("ams16s22-in-f1.1e100.net.",3600,IN,A,[IP("74.125.67.1"),IP("216.239.37.1"),IP("216.58.212.225")]),
		Query.A("ams16s29-in-f1.1e100.net.",3406,IN,A,[IP("74.125.67.1"),IP("172.217.17.33"),IP("216.239.37.1")]),
		Query.A("ams16s30-in-f1.1e100.net.",3315,IN,A,[IP("74.125.67.1"),IP("172.217.17.65"),IP("216.239.37.1")]),
		Query.A("ams16s31-in-f1.1e100.net.",2981,IN,A,[IP("172.217.19.193")]),
		Query.A("ams16s32-in-f1.1e100.net.",3600,IN,A,[IP("172.217.168.193")]),
		Query.A("ams16s33-in-f1.1e100.net.",2981,IN,A,[IP("172.217.132.193")]),
		Query.A("ams16s34-in-f1.1e100.net.",3600,IN,A,[IP("74.125.8.225")]),
		Query.A("ams17s01-in-f1.1e100.net.",3600,IN,A,[IP("172.217.20.97")]),
		Query.A("ams17s02-in-f1.1e100.net.",3322,IN,A,[IP("74.125.100.1")]),
		Query.A("ams17s03-in-f1.1e100.net.",3600,IN,A,[IP("74.125.100.33")]),
		Query.A("ams17s04-in-f1.1e100.net.",3600,IN,A,[IP("74.125.100.97")]),
		Query.A("ams17s05-in-f1.1e100.net.",3568,IN,A,[IP("209.85.226.1")]),
		Query.A("ams17s06-in-f1.1e100.net.",3322,IN,A,[IP("209.85.226.33")]),
		Query.A("ams17s07-in-f1.1e100.net.",3600,IN,A,[IP("209.85.226.65")]),
		Query.A("ams17s08-in-f1.1e100.net.",3600,IN,A,[IP("216.58.208.97")]),
		Query.A("ams17s09-in-f1.1e100.net.",3412,IN,A,[IP("216.58.214.1")]),
		Query.A("ams17s10-in-f1.1e100.net.",3600,IN,A,[IP("142.250.179.129")]),
		Query.A("ams17s11-in-f1.1e100.net.",1690,IN,A,[IP("74.125.8.65")]),
		Query.A("ams17s12-in-f1.1e100.net.",1690,IN,A,[IP("142.251.36.33")]),
		Query.A("ams17s13-in-f1.1e100.net.",3124,IN,A,[IP("74.125.8.193")]),
		Query.A("ams17s15-in-f1.1e100.net.",3321,IN,A,[IP("173.194.153.1")]),
		Query.A("ams17s17-in-f1.1e100.net.",3448,IN,A,[IP("74.125.8.129")]),
	];
	ip_map=[
		["216.58.214.1",[
			"ams17s09-in-f1.1e100.net",
			"lhr26s05-in-f1.1e100.net",
		]]
	];
	constructor() {
		super();
		this.find_duplicate();
		if(ams.value.length==ams.value.length) return;
		console.log(ams.value.map(e => {
			return this.map.get(`${e}.`);
		}).map(e => {
			if(e) {
				return ([e[1][1].split("-")[0],e[5].map(e => e[1]).sort((a,b) => {
					let ip_a=a.split(".").map(e => +e);
					let ip_b=b.split(".").map(e => +e);
					for(let i=0;i<4;i++) {
						if(ip_a[i]===ip_b[i]) return 0;
						return ip_a[i]-ip_b[i];
					}
					return 0;
				})]);
			} else {
				throw new Error("Missing data");
			}
		}));
	}
	nmap_res=``;
};
class arn extends B {
	/** @readonly*/static key="arn";
	static value=[
		"arn09s19-in-f1.1e100.net","arn09s20-in-f1.1e100.net",
		"arn11s04-in-f1.1e100.net",
	];
	nmap_near_26=`
Nmap scan report for arn02s05-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn02s05-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn02s05-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn02s05-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn02s06-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn02s06-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn02s06-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn02s06-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn06s07-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn06s07-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn06s07-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn06s07-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn09s05-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn09s05-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn09s05-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn09s05-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn09s05-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn09s05-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn09s10-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn09s10-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn09s10-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn09s10-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn09s10-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn09s10-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn09s11-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn09s11-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn09s11-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn09s11-in-f1.1e100.net (216.239.37.1)
Nmap scan report for arn09s11-in-f1.1e100.net (74.125.67.1)
Nmap scan report for arn09s11-in-f1.1e100.net (216.239.37.1)
`;
	rev_arr=[""];
	dns_res_arr=[
		Query.A("arn02s05-in-f1.1e100.net.",3600,IN,A,[IP("74.125.67.1"),IP("216.239.37.1")]),
		Query.A("arn02s06-in-f1.1e100.net.",3600,IN,A,[IP("74.125.67.1"),IP("216.239.37.1")]),
		Query.A("arn06s07-in-f1.1e100.net.",3600,IN,A,[IP("74.125.67.1"),IP("216.239.37.1")]),
		Query.A("arn09s05-in-f1.1e100.net.",3600,IN,A,[IP("74.125.67.1"),IP("216.58.209.129"),IP("216.239.37.1")]),
		Query.A("arn09s10-in-f1.1e100.net.",3600,IN,A,[IP("74.125.67.1"),IP("216.58.211.129"),IP("216.239.37.1")]),
		Query.A("arn09s11-in-f1.1e100.net.",3600,IN,A,[IP("74.125.67.1"),IP("172.217.22.161"),IP("216.239.37.1")]),
		Query.A("arn09s14-in-f1.1e100.net.",3600,IN,A,[IP("173.194.163.81")]),
		Query.A("arn09s15-in-f1.1e100.net.",3600,IN,A,[IP("173.194.163.97")]),
		Query.A("arn09s18-in-f1.1e100.net.",3600,IN,A,[IP("74.125.110.161")]),
		Query.A("arn09s19-in-f1.1e100.net.",3600,IN,A,[IP("216.58.207.225")]),
		Query.A("arn09s20-in-f1.1e100.net.",3600,IN,A,[IP("216.58.211.1")]),
		Query.A("arn09s21-in-f1.1e100.net.",3600,IN,A,[IP("142.250.74.1")]),
		Query.A("arn09s22-in-f1.1e100.net.",3600,IN,A,[IP("142.250.74.33")]),
		Query.A("arn09s23-in-f1.1e100.net.",3600,IN,A,[IP("142.250.74.65")]),
		Query.A("arn11s01-in-f1.1e100.net.",3600,IN,A,[IP("172.217.20.33")]),
		Query.A("arn11s02-in-f1.1e100.net.",3600,IN,A,[IP("172.217.21.129")]),
		Query.A("arn11s03-in-f1.1e100.net.",3600,IN,A,[IP("172.217.21.161")]),
		Query.A("arn11s04-in-f1.1e100.net.",3600,IN,A,[IP("216.58.207.193")]),
		Query.A("arn11s05-in-f1.1e100.net.",3600,IN,A,[IP("173.194.150.161")]),
		Query.A("arn11s06-in-f1.1e100.net.",3600,IN,A,[IP("173.194.150.177")]),
		Query.A("arn11s07-in-f1.1e100.net.",3600,IN,A,[IP("173.194.150.193")]),
		Query.A("arn11s08-in-f1.1e100.net.",3600,IN,A,[IP("173.194.150.209")]),
		Query.A("arn11s09-in-f1.1e100.net.",3600,IN,A,[IP("74.125.110.129")]),
		Query.A("arn11s10-in-f1.1e100.net.",3600,IN,A,[IP("142.250.74.97")]),
		Query.A("arn11s11-in-f1.1e100.net.",3600,IN,A,[IP("142.250.74.129")]),
		Query.A("arn11s12-in-f1.1e100.net.",3600,IN,A,[IP("142.250.74.161")]),
		Query.A("arn11s13-in-f1.1e100.net.",3600,IN,A,[IP("74.125.108.225")]),
		Query.A("arn11s14-in-f1.1e100.net.",3600,IN,A,[IP("74.125.111.1")]),
	];
	constructor() {
		super();
		this.find_duplicate();
	}
};
class atl extends B {
	/** @readonly*/static key="atl";
	static value=["14s63-in-f1.1e100.net"];
};
class bkk extends B {
	/** @readonly*/static key="bkk";
	static value=[
		"02s01-in-f1.1e100.net","02s02-in-f1.1e100.net","02s03-in-f1.1e100.net","02s04-in-f1.1e100.net",
		"03s01-in-f1.1e100.net","03s02-in-f1.1e100.net","03s03-in-f1.1e100.net"
	];
};
class bom extends B {
	/** @readonly*/static key="bom";
	static value=[
		"07s01-in-f1.1e100.net","07s45-in-f1.1e100.net",
		"12s04-in-f1.1e100.net","12s05-in-f1.1e100.net","12s19-in-f1.1e100.net","12s20-in-f1.1e100.net","12s21-in-f1.1e100.net"
	];
};
class bud extends B {
	/** @readonly*/static key="bud";
	static value=["02s22-in-f1.1e100.net","02s37-in-f1.1e100.net","02s38-in-f1.1e100.net","02s39-in-f1.1e100.net"];
};
class cbf extends B {
	/** @readonly*/static key="cbf";
	static value=["96s07-in-f1.1e100.net","96s10-in-f1.1e100.net"];
};
class del extends B {
	/** @readonly*/static key="del";
	static value=["03s06-in-f1.1e100.net"];
};
class den extends B {
	/** @readonly*/static key="den";
	static value=["03s09-in-f1.1e100.net"];
};
class dfw extends B {
	/** @readonly*/static key="dfw";
	static value=[
		"25s42-in-f1.1e100.net","25s43-in-f1.1e100.net","25s44-in-f1.1e100.net","25s46-in-f1.1e100.net","25s47-in-f1.1e100.net","25s48-in-f1.1e100.net",
		"28s29-in-f1.1e100.net","28s30-in-f1.1e100.net","28s31-in-f1.1e100.net","28s34-in-f1.1e100.net","28s35-in-f1.1e100.net"
	];
};
class eze extends B {
	/** @readonly*/static key="eze";
	static value=["06s09-in-f1.1e100.net"];
};
class fjr extends B {
	/** @readonly*/static key="fjr";
	static value=["02s03-in-f1.1e100.net","02s04-in-f1.1e100.net"];
};
class fra extends B {
	/** @readonly*/static key="fra";
	static value=[
		"16s46-in-f1.1e100.net",
		"24s01-in-f1.1e100.net"
	];
};
class gru extends B {
	/** @readonly*/static key="gru";
	static value=[
		"06s66-in-f1.1e100.net",
		"10s13-in-f1.1e100.net"
	];
};
class hem extends B {
	/** @readonly*/static key="hem";
	static value=["08s07-in-f1.1e100.net"];
};
class hkg extends B {
	/** @readonly*/static key="hkg";
	static value=["12s11-in-f1.1e100.net"];
};
class iad extends B {
	/** @readonly*/static key="iad";
	static value=["23s04-in-f1.1e100.net","23s96-in-f1.1e100.net","66s01-in-f1.1e100.net"
	];
};
class kul extends B {
	/** @readonly*/static key="kul";
	static value=["01s11-in-f1.1e100.net","08s10-in-f1.1e100.net","09s12-in-f1.1e100.net","09s15-in-f1.1e100.net"
	];
};
class las extends B {
	/** @readonly*/static key="las";
	static value=["15s01-in-f1.1e100.net"];
};
class lax extends B {
	/** @readonly*/static key="lax";
	static value=["17s55-in-f1.1e100.net"];
};
class lga extends B {
	/** @readonly*/static key="lga";
	static value=["25s77-in-f1.1e100.net","25s78-in-f1.1e100.net","25s79-in-f1.1e100.net","25s80-in-f1.1e100.net","25s81-in-f1.1e100.net","34s38-in-f1.1e100.net","34s39-in-f1.1e100.net","34s40-in-f1.1e100.net"
	];
};
class lhr extends B {
	/** @readonly*/static key="lhr";
	static value=["25s08-in-f1.1e100.net","25s09-in-f1.1e100.net","25s25-in-f1.1e100.net","25s27-in-f1.1e100.net","26s05-in-f1.1e100.net"
	];
};
class los extends B {
	/** @readonly*/static key="los";
	static value=["02s03-in-f1.1e100.net"];
};
class maa extends B {
	/** @readonly*/static key="maa";
	static value=["03s31-in-f1.1e100.net","05s10-in-f1.1e100.net"
	];
};
class mad extends B {
	/** @readonly*/static key="mad";
	static value=["41s04-in-f1.1e100.net","41s07-in-f1.1e100.net"];
};
class mba extends B {
	/** @readonly*/static key="mba";
	static value=["01s07-in-f1.1e100.net"];
};
class mct extends B {
	/** @readonly*/static key="mct";
	static value=["01s13-in-f1.1e100.net"];
};
class mrs extends B {
	/** @readonly*/static key="mrs";
	static value=[
		"09s08-in-f1.1e100.net","09s09-in-f1.1e100.net","09s13-in-f1.1e100.net","09s14-in-f1.1e100.net","09s15-in-f1.1e100.net","09s16-in-f1.1e100.net"
	];
};
class muc extends B {
	/** @readonly*/static key="muc";
	static value=[
		"11s22-in-f1.1e100.net","11s23-in-f1.1e100.net",
		"12s11-in-f1.1e100.net","12s12-in-f1.1e100.net"
	];
};
class nrt extends B {
	/** @readonly*/static key="nrt";
	static value=["12s45-in-f1.1e100.net","12s46-in-f1.1e100.net","12s47-in-f1.1e100.net"];
};
class nuq extends B {
	/** @readonly*/static key="nuq";
	static value=["04s44-in-f1.1e100.net","04s45-in-f1.1e100.net"];
};
class ord extends B {
	/** @readonly*/static key="ord";
	static value=["38s33-in-f1.1e100.net"];
};
class par extends B {
	/** @readonly*/static key="par";
	static value=[
		"10s29-in-f1.1e100.net","10s33-in-f1.1e100.net","10s34-in-f1.1e100.net","10s39-in-f1.1e100.net",
		"21s04-in-f1.1e100.net","21s05-in-f1.1e100.net","21s17-in-f1.1e100.net","21s18-in-f1.1e100.net"
	];
};
class prg extends B {
	/** @readonly*/static key="prg";
	static value=["03s10-in-f1.1e100.net","03s11-in-f1.1e100.net","03s12-in-f1.1e100.net","03s13-in-f1.1e100.net"
	];
};
class qro extends B {
	/** @readonly*/static key="qro";
	static value=[
		"01s26-in-f1.1e100.net","01s27-in-f1.1e100.net","01s28-in-f1.1e100.net",
		"02s23-in-f1.1e100.net","02s24-in-f1.1e100.net","02s25-in-f1.1e100.net","02s26-in-f1.1e100.net","02s27-in-f1.1e100.net","02s28-in-f1.1e100.net","02s29-in-f1.1e100.net"
	];
};
class sea extends B {
	/** @readonly*/static key="sea";
	static value=[
		"sea09s28-in-f1.1e100.net","sea09s29-in-f1.1e100.net","sea09s30-in-f1.1e100.net",
		"sea30s10-in-f1.1e100.net"
	];
	nmap_scan=`
Nmap scan report for sea09s28-in-f1.1e100.net. (142.251.33.65)
Nmap scan report for sea09s29-in-f1.1e100.net. (142.250.217.65)
Nmap scan report for sea09s30-in-f1.1e100.net. (142.250.217.97)
Nmap scan report for sea30s01-in-f1.1e100.net. (172.217.14.193)
Nmap scan report for sea30s02-in-f1.1e100.net. (172.217.14.225)
Nmap scan report for sea30s08-in-f1.1e100.net. (142.250.69.193)
Nmap scan report for sea30s10-in-f1.1e100.net. (142.251.33.97)
`;
	nmap_res=[
		"sea30s01-in-f1.1e100.net.",
		"sea30s02-in-f1.1e100.net.",
		"sea30s08-in-f1.1e100.net.",
		"sea30s10-in-f1.1e100.net.",
	];
};
class sfo extends B {
	/** @readonly*/static key="sfo";
	static value=[
		"sfo03s06-in-f1.1e100.net","sfo03s26-in-f1.1e100.net","sfo03s27-in-f1.1e100.net",
		"sfo07s13-in-f1.1e100.net","sfo07s16-in-f1.1e100.net"
	];
};
class sof extends B {
	/** @readonly*/static key="sof";
	static value=[
		"sof01s12-in-f1.1e100.net",
		"sof02s27-in-f1.1e100.net","sof02s28-in-f1.1e100.net"
	];
};
class tlv extends B {
	/** @readonly*/static key="tlv";
	static value=["tlv03s01-in-f1.1e100.net"];
};
class tsa extends B {
	/** @readonly*/static key="tsa";
	static value=[
		"01s11-in-f1.1e100.net",
		"03s08-in-f1.1e100.net"
	];
};
class waw extends B {
	/** @readonly*/static key="waw";
	static value=[
		"02s05-in-f1.1e100.net","02s16-in-f1.1e100.net","02s17-in-f1.1e100.net",
		"07s02-in-f1.1e100.net"
	];
};
class yyz extends B {
	/** @readonly*/static key="yyz";
	static value=[
		"10s17-in-f1.1e100.net","10s20-in-f1.1e100.net",
		"12s07-in-f1.1e100.net","12s08-in-f1.1e100.net"
	];
};
class zrh extends B {
	/** @readonly*/static key="zrh";
	static value=["11s02-in-f1.1e100.net"];
};

export const arr_2=[
	ams,arn,atl,
	bkk,bom,bud,
	cbf,
	del,den,dfw,
	eze,
	fjr,fra,
	gru,
	hem,hkg,
	iad,
	kul,
	las,lax,lga,lhr,los,
	maa,mad,mba,mct,mrs,muc,
	nrt,nuq,
	ord,
	par,prg,
	qro,
	sea,sfo,sof,
	tlv,tsa,
	waw,
	yyz,
	zrh,
];

export const arr_2_arr_vec=arr_2.map(e => e.value);
export const arr_2_keys=arr_2.map(e => e.key);

arr_2.forEach(e => {
	new e();
});

export const arr=[
	"s01",
	"s03",
	"s04",
	"s05",
	"s06",
	"s07",
	"s08",
	"s09",
	"s10",
	"s11",
	"s12",
	"s13",
	"s15",
	"s16",
	"s19",
	"s27",
	"s28",
	"s31",
	"s33",
	"s34",
	"s63",
];

export const rev_dig_arr=[
	[IP("216.239.37.1"),Query.PTR("1.37.239.216.in-addr.arpa.",21310,DNSClassEnum.IN,DNSTypeEnum.PTR,DNS("any-in-2501.1e100.net."))],
];

export const rev_dig_todo=[
	"74.125.8.65",
	"74.125.67.1",
	"74.125.100.1",
	"142.250.179.129",
	"142.251.36.1",
	"142.251.39.97",
	"172.217.17.33",
	"172.217.19.193",
	"172.217.20.65",
	"172.217.132.1",
	"172.217.168.193",
	"173.194.153.1",
	"209.85.226.1",
	"216.58.208.97",
	"216.58.211.97",
	"216.58.212.129",
	"216.58.214.1",
];

/** @readonly */
export const rev_arr_2=(() => {
	/** @type {import("./ns.js").ip_range_in_type|null}*/
	let x=null;
	return [
		[64,233,(x=[[160,171],[176,191]],range(...x)),1],
		[66,102,[0,1,12,15],1],
		[70,32,[152,154,159],1],
		[74,125,(x=[[20,31]],range(...x)),1],
		[74,125,(x=[lit_value(64),[66,71],[124,143],[192,207]],range(...x)),1],
		[108,170,[192,222,223],1],
		[108,177,(x=[[8,15],[96,127]],range(...x)),1],
		[142,250,(x=[[0,31],[96,99],[101,128],lit_value(136,138,140,141),[143,159]],range(...x)),1],
		[142,251,(x=[[0,2],[4,6],[8,31],[96,126],[161,167]],range(...x)),1],
		[172,217,(x=[[192,223]],range(...x)),1],
		[172,253,(x=[[56,63],[112,127]],range(...x)),1],
		[173,194,(x=[[64,80],lit_value(104),[172,175],[192,224],lit_value(240)],range(...x)),1],
		[199,36,152,1],
		[207,223,[160,168],1],
		[208,68,108,1],
		[209,85,[129,(x=[[144,147],[200,203],lit_value(211),[232,235]],range(...x)),],1],
		[216,239,[32,36,37],1],
	];
})();