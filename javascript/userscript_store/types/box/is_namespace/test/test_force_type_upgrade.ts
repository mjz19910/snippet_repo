import {force_type_upgrade} from "../force_type_upgrade.js"

let v1={}
let v2={a: 1}
let test=((upg) => {
	if(force_type_upgrade(upg,v2)) return upg
	return null
})(v1)
console.log(test)
