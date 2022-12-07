str="4qmFsgKkARIPRkV3aGF0X3RvX3dhdGNoGo4BQ0FWNlpFTnFSVUZCUjFaMVRGVmtRMEZCUmtSUlVVRkNVVEJGUVVGUlFrZFNXR1J2V1ZoU1ptUkhPV1prTWtZd1dUSm5RVUZSUVVGQlVVVkNRVUZCUWtGQlJVRkJRVVZDUlVGQldUUTRiVGN4ZFVkUU5IZEplVU4zYVVnMVNubExlVXczZEdwaFRVSSUzREIA"
bytes=atob(str)
e_bytes=bytes.split("")
ar=e_bytes.map(e => e.charCodeAt(0))
ar=ar.slice(3)
function* genfunc() {
	var xt,nvitr=ar.values(),ar4=[],md4=0,running=true,rx=/[0-9A-Za-z_%-]/
	while(running) {
		nv=nvitr.next()
		md4++
		if(nv.done) {
			yield ar4
			running=false
			continue
		}
		if(md4>=4) {
			xt=String.fromCharCode(nv.value)
			if(xt.match(rx)!=null) {
				ar4.push(xt)
			} else {
				ar4.push(nv.value)
			}
			yield ar4
			md4=0
			ar4=[]
			continue
		}
		xt=String.fromCharCode(nv.value)
		if(xt.match(rx)!=null) {
			ar4.push(xt)
		} else {
			ar4.push(nv.value)
		}
	}
	return
}
genret=genfunc()
Array.from(genret)
{
	debugger
}
decpart=decodeURIComponent(bytes.slice(4*6+3,-2))
ar=atob(decpart).split("").map(e => e.charCodeAt(0))
Array.from(genfunc())
next_part=atob(atob(decpart).slice(4))
ar=next_part.split("").map(e => e.charCodeAt(0))
Array.from(genfunc())
