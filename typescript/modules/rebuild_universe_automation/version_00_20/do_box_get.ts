import {MediaListBox} from "../../../box/MediaListBox"
import {TempBox} from "./TempBox"
import {throw_invalid_error} from "./throw_invalid_error"
import {Box} from "../../../box/Box"
import {WindowBox} from "../../../box/WindowBox"
import {InstructionTypeBox} from "../../../box/InstructionTypeBox"

function do_get_for_array_box(opt: Box,get_name: string): Box {
	if(typeof opt!='object') {
		throw throw_invalid_error()
	}
	if(opt===null) {
		throw throw_invalid_error()
	}
	if(opt.type!='array_box') {
		throw throw_invalid_error()
	}
	let int_num=parseInt(get_name)
	if(Number.isNaN(int_num)) {
		throw new Error("Can't parse number")
	}
	if(opt.item_type==='Box') {
		let res=opt.value[int_num]
		return res
	} else if(opt.item_type=='instruction_type[]') {
		let res=opt.value[int_num]
		return new InstructionTypeBox(res)
	} else if(opt.item_type===null) {
		let type_assert: 'EmptyArrayBox'=opt.m_verify_name
		if(type_assert==='EmptyArrayBox') {
			console.assert(type_assert==='EmptyArrayBox')
		}
	} else {
		throw new Error("Unknown box in do_get_for_array_box")
	}
	let res=opt.value[int_num]
	if(TempBox.is_box_inner(res)) {
		return res
	} else {
		return res
	}
}

export function do_box_get(opt: Box,get_name: string): Box {
	if(typeof opt!='object') {
		throw throw_invalid_error()
	}
	if(opt===null) {
		throw throw_invalid_error()
	}
	switch(opt.type) {
		case "shape_box": {
			let content=opt.value
			switch(get_name) {
				case 'baseURL': return content['baseURL']
				case 'disabled': return content['disabled']
				case 'media':
					let val=content.media
					if(!val)
						return val
					if(typeof val==='string') {
						return val
					} else {
						return new MediaListBox(val)
					}
				default: throw new Error("Invalid box on get")
			}
		}
		case "array_box": {
			return do_get_for_array_box(opt,get_name)
		}
		case "constructor_box": throw new Error("Unable to index")
		case "function_box": throw new Error("Unable to index")
		case "promise_box": throw new Error("Unable to index")
		case "void": throw new Error("Unable to index type is void")
		case "object_box": {
			if(opt) {
				if(opt.inner_type==='{}') {
					console.info('is this (%o) really a unit (ie has no properties)',opt.value)
					throw new Error("Unable to index unit object")
				}
				if(opt.inner_type==='Box') {
					throw new Error("Unable to index Window object")
				}
				if(get_name in opt.value) {
					let int_num=parseInt(get_name)
					if(Number.isNaN(int_num)) {
						throw new Error("Figure out how to type check index access to the window object")
					}
					let other_window=opt.value[int_num]
					if(other_window===null)
						return other_window
					if(typeof other_window==='string') {
						return other_window
					}
					return new WindowBox(other_window)
				}
			}
		}
		case "instance_box": throw new Error("Unable to index instance yet")
	}
}
