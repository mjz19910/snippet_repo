if(window.cint) {
	clearTimeout(window.cint)
}
if(window.cint2) {
	clearInterval(cint2)
}
window.cint=setTimeout(function() {
	window.cint2=setInterval(maxAll,17*1000)
	//setTimeout(pointReset,200)
	setTimeout(maxAll,400)
	reset_func=(e,dl) => {
		var c={
			i: 0,
			d: dl,
			j: 0,
			s: 0
		}
		e.nr=function() {
			pointReset()
			if(c.j<8) {
				c.j++
				c.i=0
				c.s=0
				window.cint2=setInterval(maxAll,17*1000)
				e(e,c)
			}
		}
		e(e,c)
	}
	loop_func=(rep,c) => {
		maxAll()
		var dsx=300
		if(c.i<(3600*2-dsx)) {
			if(c.s==0&&c.i>60) {
				c.d=200
				c.s=1
			}
			if(c.s==1&&c.i>700) {
				c.d=2*1000
				c.s=2
			}
			if(c.s==2&&c.i>1800) {
				c.s=3
				c.d=10*1000
				clearInterval(window.cint2)
			}
			c.i+=c.d/1000
			window.cint=setTimeout(rep,c.d,rep,c)
		} else {
			console.log("min:"+dsx/60,Math.random())
			window.cint=setTimeout(rep.nr,dsx*1000)
		}
	}
	window.cint=setTimeout(e => {
		var ds=performance.now()
		e(e,ds)
	}
		,600,function(rc,ds) {
			var dr,dl
			void rc,
				ds,
				dr,
				dl
			console.log(player.tier1.cost.logarithm/player.points.logarithm)
			reset_func(loop_func,100)
		})
},2*1000)
