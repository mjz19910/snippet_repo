
function disable_vars() {
		let rng_bytes=Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		console.log(rng_bytes);
}