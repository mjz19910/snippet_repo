async function read(stream) {
	let chunks = [];
	for await (let chunk of stream)
		chunks.push(chunk);
	return Buffer.concat(chunks).toString("utf8");
}
let input = await read(process.stdin);
let st = 0;
let char_set = '';
function char_range(start_char, end_char) {
	let st = start_char.charCodeAt(0);
	let ed = end_char.charCodeAt(0) + 1;
	for (let i = st; i < ed; i++) {
		char_set += String.fromCharCode(i);
	}
}
char_range('a', 'z');
char_range('A', 'Z');
let cs_arr = [];
for (let i of char_set) {
	cs_arr[i.charCodeAt(0)] = 'case "' + i + '":';
}
console.log(cs_arr);
if (input[st] == '#') {
	st++;
}

export {};
