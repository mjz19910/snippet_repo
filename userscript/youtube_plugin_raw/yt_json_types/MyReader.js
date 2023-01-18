import {LongBits} from "./LongBits";
export class MyReader {
	noisy_log_level=false;
	/** @arg {Uint8Array} buf  */
	constructor(buf) {
		this.buf=buf;
		this.pos=0;
		this.len=buf.length;
		this.last_pos=0;
	}
	/** @arg {number} [size] */
	try_read_any(size) {
		try {
			return this.read_any(size);
		} catch {
			return null;
		}
	}
	/** @arg {number} [size] */
	reset_and_read_any(size) {
		this.pos=0;
		return this.read_any(size);
	}
	cur_len=0;
	/** @private @arg {number} [size] */
	read_any(size) {
		this.failed=false;
		if(!size) {
			this.cur_len=this.len;
		} else {
			this.cur_len=this.pos+size;
		}
		/** @type {DataArrType} */
		let data=[];
		let loop_count=0;
		let log_slow=true;
		for(;this.pos<this.cur_len;loop_count++) {
			let cur_byte=this.uint32();
			let wireType=cur_byte&7;
			let fieldId=cur_byte>>>3;
			let first_num=this.skipTypeEx(fieldId,wireType);
			data.push([fieldId,wireType,first_num]);
			if(this.failed) {
				break;
			}
			if(log_slow&&loop_count>128) {
				console.log("taking a long time to read protobuf data");
				log_slow=false;
			}
			if(!log_slow&&loop_count%4096==0) {
				console.log("taking a very long time to read protobuf data",loop_count/4096|0);
			}
		}
		/** @type {DecTypeNum[]} */
		let res_arr=[];
		for(let i=0;i<data.length;i++) {
			let cur=data[i];
			let [_fieldId,_type,decoded_data]=cur;
			for(let item of decoded_data) {
				res_arr.push(item);
			}
		}
		return res_arr;
	}
	/** @template T @arg {()=>T} x */
	revert(x) {
		let prev_pos=this.pos;
		this.pos=this.last_pos;
		let ret=x();
		this.pos=prev_pos;
		return ret;
	}
	/** @template T @arg {number} pos @arg {()=>T} x */
	revert_to(pos,x) {
		let prev_pos=this.pos;
		this.pos=pos;
		let ret=x();
		this.pos=prev_pos;
		return ret;
	}
	/** @private @arg {number} [length] */
	skip(length) {
		this.last_pos=this.pos;
		let start_pos=this.pos;
		if(typeof length==="number") {
			/* istanbul ignore if */
			if(this.pos+length>this.len)
				throw this.indexOutOfRange(length);
			this.pos+=length;
		} else {
			do {
				/* istanbul ignore if */
				if(this.pos>=this.len)
					throw this.indexOutOfRange(1);
			} while(this.buf[this.pos++]&128);
		}
		if(length!==void 0) {
			if(this.noisy_log_level)
				console.log("asked to skip %o bytes",this.pos-start_pos);
		} else {
			if(this.noisy_log_level)
				console.log("asked to skip %o bytes of VarInt",this.pos-start_pos);
		}
	}
	uint32() {
		this.last_pos=this.pos;
		let ret=this.do_uint32_read();
		let diff=this.pos-this.last_pos;
		if(diff!==1) {
			if(this.noisy_log_level)
				console.log("at %o uint32 consumed %o bytes",this.last_pos,diff);
		}
		return ret;
	};
	do_uint32_read() {
		let value=0;
		value=(this.buf[this.pos]&127)>>>0;
		if(this.buf[this.pos++]<128)
			return value;
		value=(value|(this.buf[this.pos]&127)<<7)>>>0;
		if(this.buf[this.pos++]<128)
			return value;
		value=(value|(this.buf[this.pos]&127)<<14)>>>0;
		if(this.buf[this.pos++]<128)
			return value;
		value=(value|(this.buf[this.pos]&127)<<21)>>>0;
		if(this.buf[this.pos++]<128)
			return value;
		value=(value|(this.buf[this.pos]&15)<<28)>>>0;
		if(this.buf[this.pos++]<128)
			return value;
		if((this.pos+=5)>this.len) {
			this.pos=this.len;
			throw RangeError("index out of range: "+this.pos+" + "+(10||1)+" > "+this.len);
		}
		return value;
	}
	uint64() {
		this.last_pos=this.pos;
		return this.readLongVarint().toBigInt();
	}
	readLongVarint() {
		// tends to deopt with local vars for octet etc.
		var bits=new LongBits(0,0);
		var i=0;
		if(this.len-this.pos>4) { // fast route (lo)
			for(;i<4;++i) {
				// 1st..4th
				bits.lo=(bits.lo|(this.buf[this.pos]&127)<<i*7)>>>0;
				if(this.buf[this.pos++]<128)
					return bits;
			}
			// 5th
			bits.lo=(bits.lo|(this.buf[this.pos]&127)<<28)>>>0;
			bits.hi=(bits.hi|(this.buf[this.pos]&127)>>4)>>>0;
			if(this.buf[this.pos++]<128)
				return bits;
			i=0;
		} else {
			for(;i<3;++i) {
				/* istanbul ignore if */
				if(this.pos>=this.len)
					throw new Error("indexOutOfRange");
				// 1st..3th
				bits.lo=(bits.lo|(this.buf[this.pos]&127)<<i*7)>>>0;
				if(this.buf[this.pos++]<128)
					return bits;
			}
			// 4th
			bits.lo=(bits.lo|(this.buf[this.pos++]&127)<<i*7)>>>0;
			return bits;
		}
		if(this.len-this.pos>4) { // fast route (hi)
			for(;i<5;++i) {
				// 6th..10th
				bits.hi=(bits.hi|(this.buf[this.pos]&127)<<i*7+3)>>>0;
				if(this.buf[this.pos++]<128)
					return bits;
			}
		} else {
			for(;i<5;++i) {
				if(this.pos>=this.len)
					throw new Error("indexOutOfRange");
				// 6th..10th
				bits.hi=(bits.hi|(this.buf[this.pos]&127)<<i*7+3)>>>0;
				if(this.buf[this.pos++]<128)
					return bits;
			}
		}
		/* istanbul ignore next */
		throw Error("invalid varint encoding");
	}
	readFixed64() {
		if(this.pos+8>this.len)
			throw this.indexOutOfRange(8);
		return new LongBits(
			this.readFixed32_end(this.buf,this.pos+=4),
			this.readFixed32_end(this.buf,this.pos+=4)
		).toBigInt();
	}
	/** @private @arg {Uint8Array} buf @arg {number} end */
	readFixed32_end(buf,end) {
		return (buf[end-4]
			|buf[end-3]<<8
			|buf[end-2]<<16
			|buf[end-1]<<24)>>>0;
	}
	fixed64() {
		this.last_pos=this.pos;
		return this.readFixed64();
	}
	/** @private @arg {number} writeLength */
	indexOutOfRange(writeLength) {
		return RangeError("index out of range: "+this.pos+" + "+writeLength+" > "+this.len);
	}
	fixed32() {
		/* istanbul ignore if */
		if(this.pos+4>this.len)
			throw this.indexOutOfRange(4);

		return this.readFixed32_end(this.buf,this.pos+=4);
	}
	/** @returns {[number,number]} */
	read_field_description() {
		let cur_byte=this.uint32();
		return [cur_byte&7,cur_byte>>>3];
	}
	log_range_error=false;
	/** @private @arg {number} fieldId @arg {number} wireType */
	skipTypeEx(fieldId,wireType) {
		if(this.noisy_log_level)
			console.log("[skip] pos=%o",this.pos);
		let pos_start=this.pos;
		/** @type {DecTypeNum[]} */
		let first_num=[];
		switch(wireType) {
			case 0:
				/** @type {[boolean,bigint,number]} */
				let revert_res=this.revert_to(pos_start,() => {
					try {
						let u64=this.uint64();
						return [true,u64,this.pos];
					} catch {}
					return [false,0n,this.pos];
				});
				let num32=null;
				x: try {
					num32=this.uint32();
				} catch {
					if(revert_res[0])
						break x;
					this.failed=true;
					first_num.push(["error",fieldId]);
					break;
				}
				let [success_64,num64,new_pos]=revert_res;
				if(success_64&&num32===null) {
					first_num.push(["data64",fieldId,num64]);
					this.pos=new_pos;
				} else if(num32===null) {
					this.failed=true;
					first_num.push(["error",fieldId]);
				} else if(success_64&&num64!==BigInt(num32)) {
					first_num.push(["data64",fieldId,num64]);
					this.pos=new_pos;
				} else {
					first_num.push(["data32",fieldId,num32]);
				}
				if(this.noisy_log_level)
					console.log("\"field %o: VarInt\": %o",fieldId,first_num[0][1]);
				break;
			case 1:
				first_num.push(["data_fixed64",fieldId,this.fixed64()]);
				break;
			case 2: {
				let size=this.uint32();
				if(size===null) {
					first_num.push(["error",fieldId]);
					this.failed=true;
					break;
				}
				if(this.pos+size>this.cur_len) {
					if(this.log_range_error) console.log("range error at",this.pos,fieldId,"size is too big",size);
					first_num.push(["error",fieldId]);
					this.failed=true;
					break;
				}
				let sub_buffer=this.buf.subarray(this.pos,this.pos+size);
				let res=this.try_read_any(size);
				/** @type {DecTypeNum} */
				try {
					this.skip(size);
				} catch {
					console.log("skip failed at",this.pos,fieldId);
					first_num.push(["error",fieldId]);
					this.failed=true;
				}
				x: if(res) {
					if(res.findIndex(e => e[0]==="error")>-1) {
						first_num.push(["child",fieldId,sub_buffer,null]);
						break x;
					}
					first_num.push(["child",fieldId,sub_buffer,res]);
				} else {
					first_num.push(["child",fieldId,sub_buffer,null]);
				}
			} break;
			case 3: {
				let res;
				while((wireType=(res=this.uint32())&7)!==4) {
					let skip_res=this.skipTypeEx(res>>>3,wireType);
					first_num.push(["group",fieldId,skip_res]);
				}
			} break;
			case 4: {
				first_num.push(["error",fieldId]);
				this.failed=true;
			} break;
			case 5: first_num.push(["data_fixed32",fieldId,this.fixed32()]); break;
			default: break;
		}
		return first_num;
	}
}
