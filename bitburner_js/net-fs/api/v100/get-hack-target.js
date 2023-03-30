export {};

/** @param {number} skill_lvl */
function with_ssh(skill_lvl) {
	if(skill_lvl>(100*2)) return "iron-gym";
	if(skill_lvl>(80*2)) return "max-hardware";
	if(skill_lvl>(40*2)) return "harakiri-sushi";
	if(skill_lvl>(30*2)) return "neo-net";
	return without_ssh(skill_lvl);
}
/** @param {number} skill_lvl */
function without_ssh(skill_lvl) {
	if(skill_lvl>10) return "joesguns";
	return "n00dles";
}
/** @param {number} skill_lvl */
function with_ftp(skill_lvl) {
	if(skill_lvl>(468*2)) return "summit-uni";
	if(skill_lvl>(436*2)) return "aevum-police";
	if(skill_lvl>(425*2)) return "catalyst";
	if(skill_lvl>(393*2)) return "rothman-uni";
	if(skill_lvl>(388*2)) return "netlink";
	if(skill_lvl>(300*2)) return "the-hub";
	if(skill_lvl>(215*2)) return "omega-net";
	if(skill_lvl>(150*2)) return "silver-helix";
	return with_ssh(skill_lvl);
}
/** @param {number} skill_lvl @param {"none"|"with-ssh"|"with-ftp"|"with-http"|"with-smtp"|"with-sql"} mode */
function get_hack_target(skill_lvl,mode) {
	if(mode==="none") return without_ssh(skill_lvl);
	if(mode==="with-ssh") return with_ssh(skill_lvl);
	if(mode==="with-ftp") return with_ftp(skill_lvl);
	return with_ftp(skill_lvl);
}

get_hack_target(10,"none");
