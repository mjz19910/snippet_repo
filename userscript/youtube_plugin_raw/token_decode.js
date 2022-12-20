const token="Eg0SCzh6aWxFZ19mZVpBGAYy9wcKzAdnZXRfcmFua2VkX3N0cmVhbXMtLUNvUUZDSUFFRlJlMzBUZ2EtUVFLOHdRSTJGOFFnQVFZQnlMb0JBTTJJbEpkeGZDQ3dTVE85V0h4bk92LXdtMHJKLVhRN0g3b0pRMk0tS0JuN1BPMWVPZnMxamUyWERqNTc4cVhka2VkMXVPeW9BMHZxNUwwcF9uVGowRzQyNWVncXhtM1k1SjdTWUpISmJuMzIyVWx6WXRHZWN1YnBoc2ZIOEl3dXB2SmV6M0o2blZ0LXJ4MHB1NDZHYzNETDRVU2ZlVkRvRmFHRW92UmJGc3l5d01OdkpzVjBlSkNIcVVVa1NrNG5sWlI2bE45akNtSkZPU1JTb3hLVXRhSFJOcjJKS1hkVldaOXpjcXBHNm5jdEY5VE83d21uOW9ZcHBmcGotNGtQazlEbjBZeEo1RlpnMXpxcFhBYnVQV0pzZmhRNDlKTTRpX3JzTHdqYVNrbGV2d3lxWG1JZnRub2NpbVhvWmRKaTloazQ1SkpoMFhDaHRRMVAwUUt1Wi05dXhSYWhTNHFVMWRwLWVPX2hZZWZEUHViV1lnUElhZUpmMXkteU9JaU1XUjNLaE9Xd2RfbFVYcXlfNVBlRUNXZms4Uzh0TnRmbTZqY2NmRjktU3BiTU5NWlAwd3hZVG5xdVkxbEdqTFNQVW5yd3lSdmtTU2ZCN1E2VDlacWxlX3hPek1aajB1STVFWmJiaEh2VXg3T1VTLUhSOGM5eDlIa1pmT2MtdzFibDI5MVRibVZjV1g1ZUE2MllJczhjTW4yUV9vaWVKTWxGMjJQa1loWXpxWjVzaTlPQjktU0J0ZDlXVU1ZZnFsVl9vQ3JDOHVEdWhaUnRXbGZwY21rUnNkQkZwM3gtSmFvTmJlTXRMUG1mTEFvOVdoNmZEbHMyOHYzcmo2RUJRWEowSU5FRFAxWHRUcDRKMllsRFNfREFYTTVuWFQyNVhtcEpZVHBsRXJmcTlRRmQ1TlJ4SW5UdnNUUGxDSmVHdE9nd2xMNWtHZ01TOE5IajF6eGR1RHBoX2lhUTVMelAzMUhuRnRJTTN1M3JZbGJYYUppX0JKRVNJNXN2MlhMYm93aXZJMFNSVjdITHBjWmhYVzRVakNaNlVMLWJjUjBiQ3FxSGtST3FFZThfVUs0WVlsTjQyejRjQUVRakFFU0J3aWZJQkFBR0FBU0JRaUpJQmdBRWdnSWhTQVFqQUVZQVJJRkNJZ2dHQUFTQndpRUlCQXdHQUVTQlFpSElCZ0FFZ2NJbHlBUWNoZ0JFZ1VJaGlBWUFCZ0IiESILOHppbEVnX2ZlWkEwAHgBKIwBQhBjb21tZW50cy1zZWN0aW9u";
const text=atob(decodeURIComponent(token));
const binary=new Uint8Array([...atob(decodeURIComponent(token))].map(e => e.charCodeAt(0)));
const string_decoder=new TextDecoder('utf-8');
/**
 * @param {Uint8Array} binary
 * @returns {[[number,number,typeof decoded],Uint8Array]}
 */
function decode_type_18_depth_0(binary) {
	let [type,length_]=binary;
	let rest=binary.subarray(2);
	let decoded=decode_str_tlv(rest.subarray(0,length_));
	/** @type {[number,number,typeof decoded]} */
	let data=[type,length_,decoded];
	console.log(type,length_,decoded);
	return [data,rest.subarray(length_)];
}
/**
 * @param {Uint8Array} binary
 * @returns {[number,string]}
 */
function decode_str_tlv(binary) {
	let [type,length_]=binary;
	let rest=binary.slice(2);
	let data=rest.slice(0,length_);
	let str=string_decoder.decode(data);
	return [type,str];
}
/**
 * @param {Uint8Array} binary
 */
function run(binary) {
	let parts=[];
	x: for(let i=0;;) {
		switch(binary[i]) {
			case 0x18: {
				let part_len=binary[i+1];
				let part_off=i+2;
				parts.push(binary.subarray(i,part_off));
				parts.push(binary.subarray(part_off,part_off+part_len));
				i=part_off+part_len;
			} break x;
			case 0x12: {
				let part_len=binary[i+1];
				let part_off=i+2;
				parts.push(binary.subarray(i,part_off));
				parts.push(binary.subarray(part_off,part_off+part_len));
				i=part_off+part_len;
			} break;
			default: console.log(binary[i]); break x;
		}
	}
	let [decode,rest]=decode_type_18_depth_0(binary);
	console.log('decode run',decode,[[[rest]]],encodeURIComponent(text.slice(0,rest.byteOffset)),encodeURIComponent(text.slice(rest.byteOffset)));
	console.log(parts);
}
run(binary);
const tlv=[
	{
			"key": [
					18
			],
			"length": 13,
			"value": [
					18,
					11,
					56,
					122,
					105,
					108,
					69,
					103,
					95,
					102,
					101,
					90,
					65
			]
	},
	{
			"key": [
					24
			],
			"length": 6,
			"value": [
					50,
					247,
					7,
					10,
					204,
					7
			]
	}
];

console.log(decode_str_tlv(new Uint8Array(tlv[1].value)));