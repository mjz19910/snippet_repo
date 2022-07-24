import {DomTaggedPack} from "../../vm/instruction/vm/VMBlockTrace"

export function is_DomTaggedPack(v: DomTaggedPack): v is DomTaggedPack {
	switch(v[0]) {
		case 'dom': {
			v
		} break
		case 'dom_mem':
		case 'vm':
	}
	return false
}
