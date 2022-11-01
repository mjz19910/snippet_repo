import {temporary_box_from_call} from "./temporary_box_from_call.js"
import {temporary_box_from_cast_to_vm_function} from "./temporary_box_from_cast_to_vm_function.js"
import {temporary_box_from_create_box} from "./temporary_box_from_create_box.js"
import {temporary_box_from_object} from "./temporary_box_from_object.js"
import {temporary_box_from_get} from "./temporary_box_from_get.js"
import {temporary_box_object_index_to_box} from "./temporary_box_object_index_to_box.js"
import {temporary_box_StackVM} from "./temporary_box_StackVM.js"
import {temporary_box_from_cast_push_box} from "./temporary_box_from_cast_push_box.js"
export type TemporaryBox=
	temporary_box_from_get|
	temporary_box_from_cast_to_vm_function|
	temporary_box_from_call|
	temporary_box_object_index_to_box|
	temporary_box_StackVM|
	temporary_box_from_object|
	temporary_box_from_create_box|
	temporary_box_from_cast_push_box
