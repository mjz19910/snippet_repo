/* spell:words
-- version_list template --
v1 (cur): snippet_repo/javascript/final/items/item8_v1.js
*/
function main() {
	class GameType {
		update() {
			throw new Error("Method not implemented.");
		}
}
	/** @arg {{}} _v @returns {asserts _v is GameType} */
	function assert_game(_v) {}
	function get_game() {
		assert_game(game);
		return game;
	}
	// cspell: disable-next-line
	/** @arg {number} lim */
	function do_work_1(lim) {
		let game=get_game();
		// cspell: disable-next-line
		let lsw=document.querySelector("#layerswrapper");
		if(!lsw) return;
		wl: do {
			var do_cont=lim;
			var s_count=do_cont;
			var pn=performance.now();
			var ps=performance.now();
			var pl_id=1;
			var pl=lsw.children[pl_id];
			fl: for(var dc=0;do_cont;do_cont--) {
				let lc=pl.children[4].lastElementChild;
				if(!lc) return;
				let sb=lc.previousElementSibling;
				lc=pl.lastElementChild;
				if(!lc) return;
				lc=lc.lastElementChild;
				if(!lc) return;
				let eb=lc.previousElementSibling;
				for(var xj=0;xj<5;xj++) {
					lc=lsw.children[0].firstElementChild;
					if(!lc) return;
					if(!lc.nextElementSibling) return;
					let elm=lc.nextElementSibling;
					if(!(elm instanceof HTMLInputElement)) return;
					elm.click();
					game.update();
					any(window).setElems();
					any(window).updatePrestiges();
				}
				let c=a(lsw.children[0].querySelector(".pb"));
				v(c);
				c.click();
				game.update();
				any(window).setElems();
				any(window).updatePrestiges();
				c=a(a(pl.firstElementChild).nextElementSibling);
				v(c);
				c.click();
				let ec=a(eb);
				if(ec.classList.contains("green")) {
					v(ec);
					ec.click();
					dc=1;
				}
				sb=a(sb);
				if(sb.classList.contains("green")) {
					v(sb);
					sb.click();
					dc=1;
				}
				if(!(dc)) {
					break;
				}
				game.update();
				any(window).setElems();
				any(window).updatePrestiges();
				let sb2=a(pl.children[4].lastElementChild).previousElementSibling;
				let eb2=a(a(pl.lastElementChild).lastElementChild).previousElementSibling;
				eb2=a(eb2);sb2=a(sb2);
				if(eb2.classList.contains("green")) {
					break;
				}
				if(sb2.classList.contains("green")) {
					break;
				}
				if(eb2.classList.contains("green")) {
					v(eb2);
					eb2.click();
					dc=1;
				}
				continue fl;
			}
			pn=performance.now();
			console.log(pn-ps);
			ps=pn;
			continue wl;
		} while(do_cont<(s_count-4));
	}
	// cspell: disable-next-line
	/** @arg {number} dcs */
	function do_work_0(dcs) {
		let game=get_game();
		// cspell: disable-next-line
		let lsw=document.querySelector("#layerswrapper");
		if(!lsw) return;
		wl: do {
			var do_cont=dcs;
			var pn=performance.now();
			var ps=performance.now();
			var pl_id=0;
			var pl=lsw.children[pl_id];
			fl: for(var dc=0;do_cont;do_cont--) {
				let sb=a(pl.children[4].lastElementChild).previousElementSibling;
				let eb=a(a(pl.lastElementChild).lastElementChild).previousElementSibling;
				game.update();
				any(window).setElems();
				any(window).updatePrestiges();
				let c=a(a(pl.firstElementChild).nextElementSibling);
				v(c);
				c.click();
				let ec=a(eb);
				if(ec.classList.contains("green")) {
					v(ec);
					ec.click();
					dc=1;
				}
				sb=a(sb);
				if(sb.classList.contains("green")) {
					v(sb);
					sb.click();
					dc=1;
				}
				if(!(dc)) {
					break;
				}
				game.update();
				any(window).setElems();
				any(window).updatePrestiges();
				let sb2=a(pl.children[4].lastElementChild).previousElementSibling;
				let eb2=a(a(pl.lastElementChild).lastElementChild).previousElementSibling;
				if(!a(eb2).classList.contains("green")) {
					break;
				}
				if(!a(sb2).classList.contains("green")) {
					break;
				}
			}
			pn=performance.now();
			console.log(pn-ps);
			ps=pn;
			if(do_cont>0) {
				break;
			}
		} while(false);
	}
	/** @template T @arg {T|null} v @returns {T} */
	function a(v) {
		if(v===null) throw 1;
		return v;
	}
	/** @arg {number} dim_l @arg {number} lim */
	function maxall_dim(dim_l,lim) {
		let game=get_game();
		let lsw=document.querySelector("#layerswrapper");
		if(!lsw) return;
		let pn=performance.now();
		let ps=pn;
		var chunk_size=15;
		for(var cj=chunk_size;cj<lim;cj+=chunk_size) {
			for(var xj=0;xj<chunk_size;xj++) {
				let x=a(lsw.children[dim_l].firstElementChild);
				let el=a(x.nextElementSibling); v(el);
				el.click();
				game.update();
				any(window).setElems();
				any(window).updatePrestiges();
			}
			pn=performance.now();
			console.log(pn-ps);
			ps=pn;
		}
	}
	/** @arg {Element} v @returns {asserts v is HTMLInputElement} */
	function v(v) {
		if(!(v instanceof HTMLInputElement)) throw 1;
	}
	/** @arg {Element} _v @returns {asserts _v is HTMLElement} */
	function h(_v) {}
	function max_pres_last() {
		let game=get_game();
		let lsw=document.querySelector("#layerswrapper");
		if(!lsw) return;
		let pn=performance.now();
		let ps=pn;
		let c=a(lsw.children[0].querySelector(".pb"));
		v(c);
		c.click();
		game.update();
		any(window).setElems();
		any(window).updatePrestiges();
		pn=performance.now();
		console.log("f",pn-ps);
		ps=pn;
		for(var i=0;true;i++) {
			let dcl=lsw.children[1].querySelector(".pb");
			if(!(dcl instanceof HTMLInputElement)) throw 1;
			dcl.click();
			game.update();
			any(window).setElems();
			any(window).updatePrestiges();
			if(i%64==0) {
				pn=performance.now();
				console.log(i,pn-ps);
				ps=pn;
				if(i>500) {
					console.log("hit automation limit");
					break;
				}
				let sh=a(lsw.children[1].querySelector(".pb"));
				h(sh);
				if(sh.style.display=="none") {
					break;
				}
			}
		}
	}
	// cspell: disable
	do_work_0(70);
	do_work_1(30);
	do_work_0(100);
	// cspell: enable
	maxall_dim(0,50);
	maxall_dim(1,50);
	maxall_dim(0,100);
	maxall_dim(1,100);
	max_pres_last();
}
