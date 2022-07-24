import {Box} from "../Box";
import {BoxVerify} from "../BoxVerify";
import {TemporaryBoxTemplate} from "./TemporaryBoxTemplate";
export class temporary_box_from_object
	extends TemporaryBoxTemplate<{[x: string]: Box;}>
	implements BoxVerify<temporary_box_from_object, "temporary_box_from_create_box_from_obj"> {
	readonly type = 'temporary_box';
	readonly extension = 'create_box';
	readonly source = 'create_box_from_obj';
	readonly custom_type = 'box';
	readonly m_verify_name = "temporary_box_from_create_box_from_obj";
	verify_name(name: "temporary_box_from_create_box_from_obj") {
		return this.m_verify_name === 'temporary_box_from_create_box_from_obj' && name === 'temporary_box_from_create_box_from_obj';
	}
}
