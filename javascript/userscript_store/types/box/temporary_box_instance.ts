import {BoxVerify} from "./BoxVerify";
import {TemporaryBoxTemplate} from "./TemporaryBoxTemplate";
export class temporary_box_instance
	extends TemporaryBoxTemplate<{}>
	implements BoxVerify<temporary_box_instance, "temporary_box_instance"> {
	readonly type = 'temporary_box';
	readonly source = 'create_box';
	readonly m_verify_name = "temporary_box_instance";
	readonly extension = null;
	verify_name(name: "temporary_box_instance") {
		return this.m_verify_name === 'temporary_box_instance' && name === 'temporary_box_instance';
	}
}
