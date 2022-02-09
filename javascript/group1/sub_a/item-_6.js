/* spell:words mustafaq cupcc
-- version_list item 6 --
v1 (old): snippet_repo_v2/javascript/final/item6_v1.js
v2 (cur): snippet_repo_v2/javascript/group1/sub_a/item-_6.js
*/
// the code in the template block was written by @mustafaq#8791 in his programming language with file extension `.cup`
let code=`struct Vec2D {
    x: int;
    y: int;
};

method Vec2D::add(other: Vec2D*) {
    self.x = self.x + other.x;
    self.y = self.y + other.y;
}

method Vec2D::cmp_wise_max(): int {
    return self.x > self.y ? self.x : self.y;
}

method Vec2D::cmp_wise_min(): int {
    return self.x < self.y ? self.x : self.y;
}

fn main() {
    let a: Vec2D;
    let b: Vec2D;
    let c = &a;


    a.x = 1;
    a.y = 2;
    b.x = 3;
    b.y = 4;

    c::add(&b);
    print(a::cmp_wise_max());
    print(c::cmp_wise_min());
}`;
function encode_section(id, arr){
	if(arr.length >= 128){
		console.assert(false, "Unable to encode section length, need to support varint", arr.length);
		return null;
	}
	return [id, arr.length, ...arr];
}
function encode_string(arr) {
	if(arr.length >= 128){
		console.assert(false, "variable length ints unsupported, length=%o is too long", arr.length);
		return null;
	}
	return [arr.length, ...arr];
}
async function run() {
	const wasm_header=[0,0x61,0x73,0x6d,1,0,0,0];
	// const empty_wasm_module=await WebAssembly.compile(new Uint8Array([...wasm_header]));
	let module_list=[];
	window.module_list=module_list;
	for(let i=0;i<256;i++) {
		let has_error=false, res, tmp;
		let wasm_arr=wasm_header.slice();
		tmp=encode_string([0x65]).concat([]);
		wasm_arr=wasm_arr.concat(encode_section(0, tmp));
		try{
			res=await WebAssembly.compile(new Uint8Array(wasm_arr));
		}catch(e){
			has_error=true;
		}
		if(!has_error){
			module_list.push(res);
		}
	}
	console.log('success rate', module_list.length / 256);
}
run();