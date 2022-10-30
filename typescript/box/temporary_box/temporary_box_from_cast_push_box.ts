import {Box} from "../Box"

export type temporary_box_from_cast_push_box={
	type: 'temporary_box'
	source: 'cast'
	extension: null
	cast_source: "object_index"
	value: {
		[x: string]: Box
	}
}
