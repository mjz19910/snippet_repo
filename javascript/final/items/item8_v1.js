/* spell:words
-- version_list template --
v1 (cur-f): snippet_repo_v2/javascript/final/items/item8_v1.js
*/
// cspell: disable-next-line
lsw=document.querySelector("#layerswrapper")
// cspell: disable-next-line
function do_work_tiai_1(lim) {
	wl: do {
		var do_cont=lim
		var scount=do_cont
		var pn=performance.now()
		var ps=performance.now()
		var pl_id=1
		var pl=lsw.children[pl_id]
		fl: for(var dc=0;do_cont;do_cont--) {
			sb=pl.children[4].lastElementChild.previousElementSibling
			eb=pl.lastElementChild.lastElementChild.previousElementSibling
			for(var xj=0;xj<5;xj++) {
				lsw.children[0].firstElementChild.nextElementSibling.click()
				game.update()
				setElems()
				updatePrestiges()
			}
			lsw.children[0].querySelector(".pb").click()
			game.update()
			setElems()
			updatePrestiges()
			pl.firstElementChild.nextElementSibling.click()
			if(eb.classList.contains("green")) {
				eb.click()
				dc=1
			}
			if(sb.classList.contains("green")) {
				sb.click()
				dc=1
			}
			if(!(dc)) {
				break
			}
			game.update()
			setElems()
			updatePrestiges()
			sb2=pl.children[4].lastElementChild.previousElementSibling
			eb2=pl.lastElementChild.lastElementChild.previousElementSibling
			if(eb2.classList.contains("green")) {
				break
			}
			if(sb2.classList.contains("green")) {
				break
			}
			if(eb2.classList.contains("green")) {
				eb2.click()
				dc=1
			}
			continue fl
		}
		pn=performance.now()
		console.log(pn-ps)
		ps=pn
		continue wl
	} while(do_cont<(scount-4))
}
// cspell: disable-next-line
function do_work_tiai_0(dcs) {
	// cspell: disable-next-line
	lsw=document.querySelector("#layerswrapper")
	wl: do {
		var do_cont=dcs
		var pn=performance.now()
		var ps=performance.now()
		var pl_id=0
		var pl=lsw.children[pl_id]
		fl: for(var dc=0;do_cont;do_cont--) {
			sb=pl.children[4].lastElementChild.previousElementSibling
			eb=pl.lastElementChild.lastElementChild.previousElementSibling
			game.update()
			setElems()
			updatePrestiges()
			pl.firstElementChild.nextElementSibling.click()
			if(eb.classList.contains("green")) {
				eb.click()
				dc=1
			}
			if(sb.classList.contains("green")) {
				sb.click()
				dc=1
			}
			if(!(dc)) {
				break
			}
			game.update()
			setElems()
			updatePrestiges()
			sb2=pl.children[4].lastElementChild.previousElementSibling
			eb2=pl.lastElementChild.lastElementChild.previousElementSibling
			if(!eb2.classList.contains("green")) {
				break
			}
			if(!sb2.classList.contains("green")) {
				break
			}
		}
		pn=performance.now()
		console.log(pn-ps)
		ps=pn
		if(do_cont>0) {
			break
		}
	} while(false)
}
function maxall_dim(dim_l,lim) {
	pn=performance.now()
	ps=pn
	var chunksz=15
	for(var cj=chunksz;cj<lim;cj+=chunksz) {
		for(var xj=0;xj<chunksz;xj++) {
			lsw.children[dim_l].firstElementChild.nextElementSibling.click()
			game.update()
			setElems()
			updatePrestiges()
		}
		pn=performance.now()
		console.log(pn-ps)
		ps=pn
	}
}
function max_pres_last() {
	pn=performance.now()
	ps=pn
	lsw.children[0].querySelector(".pb").click()
	game.update()
	setElems()
	updatePrestiges()
	pn=performance.now()
	console.log("f",pn-ps)
	ps=pn
	for(var i=0;true;i++) {
		dcl=lsw.children[1].querySelector(".pb")
		dcl.click()
		game.update()
		setElems()
		updatePrestiges()
		if(i%64==0) {
			pn=performance.now()
			console.log(i,pn-ps)
			ps=pn
			if(i>500) {
				console.log("hit automation limit")
				break
			}
			if(lsw.children[1].querySelector(".pb").style.display=="none") {
				break
			}
		}
	}
}
// cspell: disable
do_work_tiai_0(70)
do_work_tiai_1(30)
do_work_tiai_0(100)
// cspell: enable
maxall_dim(0,50)
maxall_dim(1,50)
maxall_dim(0,100)
maxall_dim(1,100)
max_pres_last()
