const decoder=new TextDecoder();
export class Base64Binary {
	_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	/* will return a  Uint8Array type */
	/** @arg {string} input */
	decodeByteArray(input) {
		let real_len=input.length-1;
		while(real_len>=0&&input[real_len]==="=")
			real_len--;
		var byte_len=((real_len+1)/4)*3|0;
		var ab=new ArrayBuffer(byte_len);
		let byte_arr=new Uint8Array(ab);
		this.decode(input,byte_arr);
		return byte_arr;
	}
	/** @public @arg {string} input */
	decode_str(input) {
		let y=this.decodeByteArray(input);
		return decoder.decode(y);
	}
	/** @private @arg {string} input @arg {Uint8Array} binary_arr */
	decode(input,binary_arr) {
		var byte_len=(input.length/4)*3|0;
		var chr1,chr2,chr3;
		var enc1,enc2,enc3,enc4;
		var i=0;
		var j=0;

		let prev_len=input.length;
		input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");
		if(prev_len!==input.length) {
			console.log("removed %o non base64 chars",prev_len-input.length);
			debugger;
			throw new Error("Bad");
		}

		for(i=0;i<byte_len;i+=3) {
			//get the 3 octets in 4 ascii chars
			enc1=this._keyStr.indexOf(input.charAt(j++));
			enc2=this._keyStr.indexOf(input.charAt(j++));
			enc3=this._keyStr.indexOf(input.charAt(j++));
			enc4=this._keyStr.indexOf(input.charAt(j++));

			chr1=(enc1<<2)|(enc2>>4);
			chr2=((enc2&15)<<4)|(enc3>>2);
			chr3=((enc3&3)<<6)|enc4;

			binary_arr[i]=chr1;
			if(enc3!=64)
				binary_arr[i+1]=chr2;
			if(enc4!=64)
				binary_arr[i+2]=chr3;
		}

		return binary_arr;
	}
}
