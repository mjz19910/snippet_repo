/** @arg {string[]} arr */
export function get_uniq_compression_parts(arr) {
	let part_uniq=[];
	for(let part of arr) {
		if(part_uniq.includes(part))
			continue;
		part_uniq.push(part);
	}
	return part_uniq;
}
