<<<<<<< HEAD
async function async_main() {
	let code=await(await fetch('https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js')).text()
	console.log(code.length);
	window.code=code;
}
=======
code=await(await fetch('https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js')).text()
code.length
>>>>>>> e10fb913 (u)
