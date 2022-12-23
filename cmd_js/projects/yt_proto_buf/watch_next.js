let token_enc=`
CCgSJRILOHppbEVnX2ZlWkEyAMgBAOABA6ICDSj___________8BQAAYACqnDDJzNkw2d3lXQ1FxVENRb0Q4ajRBQ2czQ1Bnb0lpLW1laTlLOXZzSkxDZ1B5UGdBS0RjSS1DZ2pib0xYSGs5YWQwbThLQV9JLUFBb093ajRMQ09xNHlJYUJqSXkwdlFFS0FfSS1BQW9Od2o0S0NMV29rNjJkcnFiUUlRb0Q4ajRBQ2c3Q1Bnc0kycDJDdHJ5ZXBLTEhBUW9EOGo0QUNnN0NQZ3NJNHNHTjd0bXpxdnVYQVFvRDhqNEFDZzdDUGdzSWc5dkh1UExSa1l2WUFRb0Q4ajRBQ2czQ1Bnb0l0UHlLNnJfZWlkbDJDZ1B5UGdBS0RjSS1DZ2l4cTctOXJlaUE4ellLQV9JLUFBb053ajRLQ0pYZjdmU3N6dEh6ZndvRDhqNEFDZzNDUGdvSXBwMnoxdU9uM09RbUNnUHlQZ0FLRHNJLUN3aXZzc21fbk9fU2lhWUJDZ1B5UGdBS0RzSS1Dd2k3djdQUm1xVDVxcWtCQ2dQeVBnQUtEY0ktQ2dqQ182dWZyTjNkOWxnS0FfSS1BQW9Od2o0S0NLRGMydUdlOThpZ2J3b0Q4ajRBQ2c3Q1Bnc0loLWJFOW82Tms3U3hBUW9EOGo0QUNpZlNQaVFLSWxCTVNGUm9NVWx1YUdoM1ZEWmpNa3BPZEZWcFNtdGhTRGhaVW5GNmFGVTNRV2NLQV9JLUFBb093ajRMQ1BILTJKMkNfcW5GaFFFS0FfSS1BQW9Pd2o0TENMN3hqdm41OW9uaHpRRUtBX0ktQUFvTndqNEtDSld0eC03WXJwZXpZQW9EOGo0QUNnN0NQZ3NJanJpdXdyblJ6TnpyQVFvRDhqNEFDZzdDUGdzSTI5dnowZHZyOF9tT0FRb0Q4ajRBQ2c3Q1Bnc0lfTWljcXB1THlJT3dBUW9EOGo0QUNnM0NQZ29JNUpLX3BvdW5qdTl6Q2dQeVBnQUtEc0ktQ3dpR2dyQ2UyTGpQazYwQkNnUHlQZ0FLRHNJLUN3aUFzNm5EdWFuWF9MRUJDZ1B5UGdBS0RjSS1DZ2owNnNpWHc3V25zRUlLQV9JLUFBb093ajRMQ05MSzh2SDd5X2JkNEFFS0FfSS1BQW9Pd2o0TENLM1c4dWpEdUlQUXNRRUtBX0ktQUFvTndqNEtDT3FMM1plcDQ3Nk1TUW9EOGo0QUNnN0NQZ3NJM0xQWjJiZm1oNTdoQVFvRDhqNEFDZzNDUGdvSWtKdm9rNFRKZ09oLUNnUHlQZ0FLRGNJLUNnaW56N3JQdm9lb3cxa0tBX0ktQUFvTndqNEtDTURCb3F5RHplekJTZ29EOGo0QUNnM0NQZ29JNFlPQnM0aVpqY0p3Q2dQeVBnQUtEY0ktQ2dqYng2ZkQyYUNaMkhVS0FfSS1BQW9Pd2o0TENMV2l5NV9kNlkzVjhBRUtBX0ktQUFvT3dqNExDTVcybnNXRG5yZkRfUUVLQV9JLUFBb093ajRMQ0xiZXVNbUsxOVN5OEFFS0FfSS1BQW9Pd2o0TENMWGNxdjNwcmQyd3lnRVNLQUFDQkFZSUNnd09FQklVRmhnYUhCNGdJaVFtS0Nvc0xqQXlORFk0T2p3LVFFSkVSa2hLVEU0YUJBZ0FFQUVhQkFnQ0VBTWFCQWdFRUFVYUJBZ0dFQWNhQkFnSUVBa2FCQWdLRUFzYUJBZ01FQTBhQkFnT0VBOGFCQWdRRUJFYUJBZ1NFQk1hQkFnVUVCVWFCQWdXRUJjYUJBZ1lFQmthQkFnYUVCc2FCQWdjRUIwYUJBZ2VFQjhhQkFnZ0VDRWFCQWdpRUNNYUJBZ2tFQ1VhQkFnbUVDY2FCQWdvRUNrYUJBZ3FFQ3NhQkFnc0VDMGFCQWd1RUM4YUJBZ3dFREVhQkFneUVETWFCQWcwRURVYUJBZzJFRGNhQkFnNEVEa2FCQWc2RURzYUJBZzhFRDBhQkFnLUVEOGFCQWhBRUVFYUJBaENFRU1hQkFoRUVFVWFCQWhHRUVjYUJBaElFRWthQkFoS0VFc2FCQWhNRUUwYUJBaE9FRThxS0FBQ0JBWUlDZ3dPRUJJVUZoZ2FIQjRnSWlRbUtDb3NMakF5TkRZNE9qdy1RRUpFUmtoS1RFNGoPd2F0Y2gtbmV4dC1mZWVkcgA%3D
`;
let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
let base64url_enc="CAAQhGciEwi1_PWQz4_8AhVjQkwIHeQaDw8=";
base64url_enc;
// base64_enc=base64url_enc.replaceAll("_","/").replaceAll("-","+");
const text=atob(base64_enc);
const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
// const string_decoder=new TextDecoder('utf-8');
/** @type {import("protobufjs")} */
var protobuf;
protobuf=require('protobufjs');
async function run() {
	let root=await protobuf.load("yt_token.proto");
	var A=root.lookupType("A");
	/** @type {protobuf.Message<YtTokenProtoMessage>} */
	let message=A.decode(token_binary);
	let obj=A.toObject(message);
	console.log(obj);
}
if(typeof exports==="object") {
	exports.token_binary=token_binary;
}
run();
