/* spell:words makiki99
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/makiki99_prestige-frame_client_code.js
*/
/** @type {import("./__global.js")} */
let holder=1;
holder;
if(activatePrestige.length==3) {
	/** @arg {number} x @arg {number} y @arg {number} l */
	function nx_l(x,y,l) {
		return nx_df(x,y,l,x,y,l+1);
	}
	/** @arg {number} x @arg {number} y @arg {number} l */
	function nx_x(x,y,l) {
		return nx_df(x,y,l,x+1,y,l);
	}
	/** @arg {number} x @arg {number} y @arg {number} l */
	function nx_y(x,y,l) {
		return nx_df(x,y,l,x,y+1,l);
	}
	/** @arg {number} prestige_a @arg {number} prestige_b @arg {number} prestige_count @arg {number} requirement_a @arg {number} requirement_b @arg {number} requirement_count */
	function nx_df(prestige_a,prestige_b,prestige_count,requirement_a,requirement_b,requirement_count) {
		let ret,nx=getRequirement(requirement_a,requirement_b,requirement_count);
		for(let i=0;i<=nx;i++) {
			if(canActivatePrestige(prestige_a,prestige_b,prestige_count)) {
				activatePrestige(prestige_a,prestige_b,prestige_count);
			} else {
				ret=[i,nx];
				break;
			}
		}
		activatePrestige(requirement_a,requirement_b,requirement_count);
		if(!ret)
			ret=[-1,nx];
		return ret;
	}
	for(let i=0;i<7;i++) {
		let r=[...nx_x(0,0,0),...nx_y(0,0,0),...nx_l(0,0,0)];
		let zc=0;
		let om=[];
		for(let y=0;y<r.length;y+=2) {
			if(r[y]==0) {
				zc++;
			}
			om.push(r[y+1]);
		}
		console.log(om,zc);
		if(zc===3) {
			break;
		}
	}
} else {
	/** @arg {number} x @arg {number} y */
	function nx_x(x,y) {
		return nx_df(x,y,x+1,y);
	}
	/** @arg {number} x @arg {number} y */
	function nx_y(x,y) {
		return nx_df(x,y,x,y+1);
	}
	/** @arg {number} prestige_1_a @arg {number} prestige_1_b @arg {number} prestige_2_a @arg {number} prestige_2_b */
	function nx_df(prestige_1_a,prestige_1_b,prestige_2_a,prestige_2_b) {
		let prestige_2_requirement=getRequirement(prestige_2_a,prestige_2_b,0);
		for(let i=0;i<=prestige_2_requirement;i++) {
			if(canActivatePrestige(prestige_1_a,prestige_1_b,0)) {
				activatePrestige(prestige_1_a,prestige_1_b,0);
			} else {
				activatePrestige(prestige_2_a,prestige_2_b,0);
				return [i,prestige_2_requirement];
			}
		}
		activatePrestige(prestige_2_a,prestige_2_b,0);
		return [-1,prestige_2_requirement];
	}
	for(let i=0;i<6;i++) {
		let r=[...nx_x(0,0),...nx_y(0,0)];
		let zc=0
			,om=[];
		for(let y=0;y<r.length;y+=2) {
			if(r[y]==0) {
				zc++;
			}
			om.push(r[y+1]);
		}
		console.log(om,zc);
		if(zc===2) {
			break;
		}
	}
}
