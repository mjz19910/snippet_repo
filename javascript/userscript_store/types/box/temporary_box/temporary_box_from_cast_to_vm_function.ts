import {Box} from "../Box";
import {BoxVerify} from "../BoxVerify";
import {TemporaryBoxTemplate} from "./TemporaryBoxTemplate";
export class temporary_box_from_cast_to_vm_function
	extends TemporaryBoxTemplate<(...a: Box[]) => Box>
	implements BoxVerify<temporary_box_from_cast_to_vm_function, "temporary_box_from_cast_to_vm_function"> {
	readonly type = 'temporary_box';
	readonly source = 'cast';
	readonly cast_source = 'vm_function';
	readonly m_verify_name = "temporary_box_from_cast_to_vm_function";
	readonly extension = null;
	verify_name(name: "temporary_box_from_cast_to_vm_function") {
		return this.m_verify_name === 'temporary_box_from_cast_to_vm_function' && name === 'temporary_box_from_cast_to_vm_function';
	}
}
