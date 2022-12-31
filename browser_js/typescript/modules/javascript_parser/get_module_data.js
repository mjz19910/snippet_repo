// @ts-nocheck

export function get_module_data() {
	return raw_template`[[4],[function(e,t,r) {
		"use strict";
		function n(e) {
			for(var r in e)
				t.hasOwnProperty(r)||(t[r]=e[r]);
		}
		Object.defineProperty(t,"__esModule",{
			value: !0
		}),
			n(r(376)),
			n(r(531)),
			n(r(259)),
			n(r(760)),
			n(r(792));
	},
		,
		,,function(e,t,r) {
			"use strict";
			(function(e) {
				/*!
				* The buffer module from node.js, for the browser.
				*
				* @author   Feross Aboukhadijeh <http://feross.org>
				* @license  MIT */
				var n=r(658),i=r(659),o=r(533);
				function s() {
					return u.TYPED_ARRAY_SUPPORT? 2147483647:1073741823;
				}
				function a(e,t) {
					if(s()<t)
						throw new RangeError("Invalid typed array length");
					return u.TYPED_ARRAY_SUPPORT? (e=new Uint8Array(t)).__proto__=u.prototype:(null===e&&(e=new u(t)),
						e.length=t),
						e;
				}
				function u(e,t,r) {
					if(!(u.TYPED_ARRAY_SUPPORT||this instanceof u))
						return new u(e,t,r);
					if("number"==typeof e) {
						if("string"==typeof t)
							throw new Error("If encoding is specified then the first argument must be a string");
						return h(this,e);
					}
					return c(this,e,t,r);
				}
				function c(e,t,r,n) {
					if("number"==typeof t)
						throw new TypeError('"value" argument must not be a number');
					return "undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer? function(e,t,r,n) {
						if(t.byteLength,
							r<0||t.byteLength<r)
							throw new RangeError("'offset' is out of bounds");
						if(t.byteLength<r+(n||0))
							throw new RangeError("'length' is out of bounds");
						t=void 0===r&&void 0===n? new Uint8Array(t):void 0===n? new Uint8Array(t,r):new Uint8Array(t,r,n);
						u.TYPED_ARRAY_SUPPORT? (e=t).__proto__=u.prototype:e=l(e,t);
						return e;
					}(e,t,r,n):"string"==typeof t? function(e,t,r) {
						"string"==typeof r&&""!==r||(r="utf8");
						if(!u.isEncoding(r))
							throw new TypeError('"encoding" must be a valid string encoding');
						var n=0|p(t,r),i=(e=a(e,n)).write(t,r);
						i!==n&&(e=e.slice(0,i));
						return e;
					}(e,t,r):function(e,t) {
						if(u.isBuffer(t)) {
							var r=0|d(t.length);
							return 0===(e=a(e,r)).length||t.copy(e,0,0,r),
								e;
						}
						if(t) {
							if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length" in t)
								return "number"!=typeof t.length||(n=t.length)!=n? a(e,0):l(e,t);
							if("Buffer"===t.type&&o(t.data))
								return l(e,t.data);
						}
						var n;
						throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
					}(e,t);
				}
				function f(e) {
					if("number"!=typeof e)
						throw new TypeError('"size" argument must be a number');
					if(e<0)
						throw new RangeError('"size" argument must not be negative');
				}
				function h(e,t) {
					if(f(t),
						e=a(e,t<0? 0:0|d(t)),
						!u.TYPED_ARRAY_SUPPORT)
						for(var r=0;r<t;++r)
							e[r]=0;
					return e;
				}
				function l(e,t) {
					var r=t.length<0? 0:0|d(t.length);
					e=a(e,r);
					for(var n=0;n<r;n+=1)
						e[n]=255&t[n];
					return e;
				}
				function d(e) {
					if(e>=s())
						throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");
					return 0|e;
				}
				function p(e,t) {
					if(u.isBuffer(e))
						return e.length;
					if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))
						return e.byteLength;
					"string"!=typeof e&&(e=""+e);
					var r=e.length;
					if(0===r)
						return 0;
					for(var n=!1;;)
						switch(t) {
							case "ascii":
							case "latin1":
							case "binary":
								return r;
							case "utf8":
							case "utf-8":
							case void 0:
								return F(e).length;
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return 2*r;
							case "hex":
								return r>>>1;
							case "base64":
								return q(e).length;
							default:
								if(n)
									return F(e).length;
								t=(""+t).toLowerCase(),
									n=!0;
						}
				}
				function g(e,t,r) {
					var n=!1;
					if((void 0===t||t<0)&&(t=0),
						t>this.length)
						return "";
					if((void 0===r||r>this.length)&&(r=this.length),
						r<=0)
						return "";
					if((r>>>=0)<=(t>>>=0))
						return "";
					for(e||(e="utf8");;)
						switch(e) {
							case "hex":
								return A(this,t,r);
							case "utf8":
							case "utf-8":
								return k(this,t,r);
							case "ascii":
								return T(this,t,r);
							case "latin1":
							case "binary":
								return C(this,t,r);
							case "base64":
								return x(this,t,r);
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return R(this,t,r);
							default:
								if(n)
									throw new TypeError("Unknown encoding: "+e);
								e=(e+"").toLowerCase(),
									n=!0;
						}
				}
				function m(e,t,r) {
					var n=e[t];
					e[t]=e[r],
						e[r]=n;
				}
				function b(e,t,r,n,i) {
					if(0===e.length)
						return -1;
					if("string"==typeof r? (n=r,
						r=0):r>2147483647? r=2147483647:r<-2147483648&&(r=-2147483648),
						r=+r,
						isNaN(r)&&(r=i? 0:e.length-1),
						r<0&&(r=e.length+r),
						r>=e.length) {
						if(i)
							return -1;
						r=e.length-1;
					} else if(r<0) {
						if(!i)
							return -1;
						r=0;
					}
					if("string"==typeof t&&(t=u.from(t,n)),
						u.isBuffer(t))
						return 0===t.length? -1:v(e,t,r,n,i);
					if("number"==typeof t)
						return t&=255,
							u.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf? i? Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):v(e,[t],r,n,i);
					throw new TypeError("val must be string, number or Buffer");
				}
				function v(e,t,r,n,i) {
					var o,s=1,a=e.length,u=t.length;
					if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)) {
						if(e.length<2||t.length<2)
							return -1;
						s=2,
							a/=2,
							u/=2,
							r/=2;
					}
					function c(e,t) {
						return 1===s? e[t]:e.readUInt16BE(t*s);
					}
					if(i) {
						var f=-1;
						for(o=r;o<a;o++)
							if(c(e,o)===c(t,-1===f? 0:o-f)) {
								if(-1===f&&(f=o),
									o-f+1===u)
									return f*s;
							}

							else
								-1!==f&&(o-=o-f),
									f=-1;
					}

					else
						for(r+u>a&&(r=a-u),
							o=r;o>=0;o--) {
							for(var h=!0,l=0;l<u;l++)
								if(c(e,o+l)!==c(t,l)) {
									h=!1;
									break;
								}
							if(h)
								return o;
						}
					return -1;
				}
				function y(e,t,r,n) {
					r=Number(r)||0;
					var i=e.length-r;
					n? (n=Number(n))>i&&(n=i):n=i;
					var o=t.length;
					if(o%2!=0)
						throw new TypeError("Invalid hex string");
					n>o/2&&(n=o/2);
					for(var s=0;s<n;++s) {
						var a=parseInt(t.substr(2*s,2),16);
						if(isNaN(a))
							return s;
						e[r+s]=a;
					}
					return s;
				}
				function _(e,t,r,n) {
					return H(F(t,e.length-r),e,r,n);
				}
				function w(e,t,r,n) {
					return H(function(e) {
						for(var t=[],r=0;r<e.length;++r)
							t.push(255&e.charCodeAt(r));
						return t;
					}(t),e,r,n);
				}
				function M(e,t,r,n) {
					return w(e,t,r,n);
				}
				function S(e,t,r,n) {
					return H(q(t),e,r,n);
				}
				function E(e,t,r,n) {
					return H(function(e,t) {
						for(var r,n,i,o=[],s=0;s<e.length&&!((t-=2)<0);++s)
							r=e.charCodeAt(s),
								n=r>>8,
								i=r%256,
								o.push(i),
								o.push(n);
						return o;
					}(t,e.length-r),e,r,n);
				}
				function x(e,t,r) {
					return 0===t&&r===e.length? n.fromByteArray(e):n.fromByteArray(e.slice(t,r));
				}
				function k(e,t,r) {
					r=Math.min(e.length,r);
					for(var n=[],i=t;i<r;) {
						var o,s,a,u,c=e[i],f=null,h=c>239? 4:c>223? 3:c>191? 2:1;
						if(i+h<=r)
							switch(h) {
								case 1:
									c<128&&(f=c);
									break;
								case 2:
									128==(192&(o=e[i+1]))&&(u=(31&c)<<6|63&o)>127&&(f=u);
									break;
								case 3:
									o=e[i+1],
										s=e[i+2],
										128==(192&o)&&128==(192&s)&&(u=(15&c)<<12|(63&o)<<6|63&s)>2047&&(u<55296||u>57343)&&(f=u);
									break;
								case 4:
									o=e[i+1],
										s=e[i+2],
										a=e[i+3],
										128==(192&o)&&128==(192&s)&&128==(192&a)&&(u=(15&c)<<18|(63&o)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(f=u);
							}
						null===f? (f=65533,
							h=1):f>65535&&(f-=65536,
								n.push(f>>>10&1023|55296),
								f=56320|1023&f),
							n.push(f),
							i+=h;
					}
					return function(e) {
						var t=e.length;
						if(t<=4096)
							return String.fromCharCode.apply(String,e);
						var r="",n=0;
						for(;n<t;)
							r+=String.fromCharCode.apply(String,e.slice(n,n+=4096));
						return r;
					}(n);
				}
				t.Buffer=u,
					t.SlowBuffer=function(e) {
						+e!=e&&(e=0);
						return u.alloc(+e);
					}
					,
					t.INSPECT_MAX_BYTES=50,
					u.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT? e.TYPED_ARRAY_SUPPORT:function() {
						try {
							var e=new Uint8Array(1);
							return e.__proto__={
								__proto__: Uint8Array.prototype,
								foo: function() {
									return 42;
								}
							},
								42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength;
						} catch(e) {
							return !1;
						}
					}(),
					t.kMaxLength=s(),
					u.poolSize=8192,
					u._augment=function(e) {
						return e.__proto__=u.prototype,
							e;
					}
					,
					u.from=function(e,t,r) {
						return c(null,e,t,r);
					}
					,
					u.TYPED_ARRAY_SUPPORT&&(u.prototype.__proto__=Uint8Array.prototype,
						u.__proto__=Uint8Array,
						"undefined"!=typeof Symbol&&Symbol.species&&u[Symbol.species]===u&&Object.defineProperty(u,Symbol.species,{
							value: null,
							configurable: !0
						})),
					u.alloc=function(e,t,r) {
						return function(e,t,r,n) {
							return f(t),
								t<=0? a(e,t):void 0!==r? "string"==typeof n? a(e,t).fill(r,n):a(e,t).fill(r):a(e,t);
						}(null,e,t,r);
					}
					,
					u.allocUnsafe=function(e) {
						return h(null,e);
					}
					,
					u.allocUnsafeSlow=function(e) {
						return h(null,e);
					}
					,
					u.isBuffer=function(e) {
						return !(null==e||!e._isBuffer);
					}
					,
					u.compare=function(e,t) {
						if(!u.isBuffer(e)||!u.isBuffer(t))
							throw new TypeError("Arguments must be Buffers");
						if(e===t)
							return 0;
						for(var r=e.length,n=t.length,i=0,o=Math.min(r,n);i<o;++i)
							if(e[i]!==t[i]) {
								r=e[i],
									n=t[i];
								break;
							}
						return r<n? -1:n<r? 1:0;
					}
					,
					u.isEncoding=function(e) {
						switch(String(e).toLowerCase()) {
							case "hex":
							case "utf8":
							case "utf-8":
							case "ascii":
							case "latin1":
							case "binary":
							case "base64":
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return !0;
							default:
								return !1;
						}
					}
					,
					u.concat=function(e,t) {
						if(!o(e))
							throw new TypeError('"list" argument must be an Array of Buffers');
						if(0===e.length)
							return u.alloc(0);
						var r;
						if(void 0===t)
							for(t=0,
								r=0;r<e.length;++r)
								t+=e[r].length;
						var n=u.allocUnsafe(t),i=0;
						for(r=0;r<e.length;++r) {
							var s=e[r];
							if(!u.isBuffer(s))
								throw new TypeError('"list" argument must be an Array of Buffers');
							s.copy(n,i),
								i+=s.length;
						}
						return n;
					}
					,
					u.byteLength=p,
					u.prototype._isBuffer=!0,
					u.prototype.swap16=function() {
						var e=this.length;
						if(e%2!=0)
							throw new RangeError("Buffer size must be a multiple of 16-bits");
						for(var t=0;t<e;t+=2)
							m(this,t,t+1);
						return this;
					}
					,
					u.prototype.swap32=function() {
						var e=this.length;
						if(e%4!=0)
							throw new RangeError("Buffer size must be a multiple of 32-bits");
						for(var t=0;t<e;t+=4)
							m(this,t,t+3),
								m(this,t+1,t+2);
						return this;
					}
					,
					u.prototype.swap64=function() {
						var e=this.length;
						if(e%8!=0)
							throw new RangeError("Buffer size must be a multiple of 64-bits");
						for(var t=0;t<e;t+=8)
							m(this,t,t+7),
								m(this,t+1,t+6),
								m(this,t+2,t+5),
								m(this,t+3,t+4);
						return this;
					}
					,
					u.prototype.toString=function() {
						var e=0|this.length;
						return 0===e? "":0===arguments.length? k(this,0,e):g.apply(this,arguments);
					}
					,
					u.prototype.equals=function(e) {
						if(!u.isBuffer(e))
							throw new TypeError("Argument must be a Buffer");
						return this===e||0===u.compare(this,e);
					}
					,
					u.prototype.inspect=function() {
						var e="",r=t.INSPECT_MAX_BYTES;
						return this.length>0&&(e=this.toString("hex",0,r).match(/.{2}/g).join(" "),
							this.length>r&&(e+=" ... ")),
							"<Buffer "+e+">";
					}
					,
					u.prototype.compare=function(e,t,r,n,i) {
						if(!u.isBuffer(e))
							throw new TypeError("Argument must be a Buffer");
						if(void 0===t&&(t=0),
							void 0===r&&(r=e? e.length:0),
							void 0===n&&(n=0),
							void 0===i&&(i=this.length),
							t<0||r>e.length||n<0||i>this.length)
							throw new RangeError("out of range index");
						if(n>=i&&t>=r)
							return 0;
						if(n>=i)
							return -1;
						if(t>=r)
							return 1;
						if(this===e)
							return 0;
						for(var o=(i>>>=0)-(n>>>=0),s=(r>>>=0)-(t>>>=0),a=Math.min(o,s),c=this.slice(n,i),f=e.slice(t,r),h=0;h<a;++h)
							if(c[h]!==f[h]) {
								o=c[h],
									s=f[h];
								break;
							}
						return o<s? -1:s<o? 1:0;
					}
					,
					u.prototype.includes=function(e,t,r) {
						return -1!==this.indexOf(e,t,r);
					}
					,
					u.prototype.indexOf=function(e,t,r) {
						return b(this,e,t,r,!0);
					}
					,
					u.prototype.lastIndexOf=function(e,t,r) {
						return b(this,e,t,r,!1);
					}
					,
					u.prototype.write=function(e,t,r,n) {
						if(void 0===t)
							n="utf8",
								r=this.length,
								t=0;
						else if(void 0===r&&"string"==typeof t)
							n=t,
								r=this.length,
								t=0;
						else {
							if(!isFinite(t))
								throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
							t|=0,
								isFinite(r)? (r|=0,
									void 0===n&&(n="utf8")):(n=r,
										r=void 0);
						}
						var i=this.length-t;
						if((void 0===r||r>i)&&(r=i),
							e.length>0&&(r<0||t<0)||t>this.length)
							throw new RangeError("Attempt to write outside buffer bounds");
						n||(n="utf8");
						for(var o=!1;;)
							switch(n) {
								case "hex":
									return y(this,e,t,r);
								case "utf8":
								case "utf-8":
									return _(this,e,t,r);
								case "ascii":
									return w(this,e,t,r);
								case "latin1":
								case "binary":
									return M(this,e,t,r);
								case "base64":
									return S(this,e,t,r);
								case "ucs2":
								case "ucs-2":
								case "utf16le":
								case "utf-16le":
									return E(this,e,t,r);
								default:
									if(o)
										throw new TypeError("Unknown encoding: "+n);
									n=(""+n).toLowerCase(),
										o=!0;
							}
					}
					,
					u.prototype.toJSON=function() {
						return {
							type: "Buffer",
							data: Array.prototype.slice.call(this._arr||this,0)
						};
					};
				function T(e,t,r) {
					var n="";
					r=Math.min(e.length,r);
					for(var i=t;i<r;++i)
						n+=String.fromCharCode(127&e[i]);
					return n;
				}
				function C(e,t,r) {
					var n="";
					r=Math.min(e.length,r);
					for(var i=t;i<r;++i)
						n+=String.fromCharCode(e[i]);
					return n;
				}
				function A(e,t,r) {
					var n=e.length;
					(!t||t<0)&&(t=0),
						(!r||r<0||r>n)&&(r=n);
					for(var i="",o=t;o<r;++o)
						i+=U(e[o]);
					return i;
				}
				function R(e,t,r) {
					for(var n=e.slice(t,r),i="",o=0;o<n.length;o+=2)
						i+=String.fromCharCode(n[o]+256*n[o+1]);
					return i;
				}
				function I(e,t,r) {
					if(e%1!=0||e<0)
						throw new RangeError("offset is not uint");
					if(e+t>r)
						throw new RangeError("Trying to access beyond buffer length");
				}
				function O(e,t,r,n,i,o) {
					if(!u.isBuffer(e))
						throw new TypeError('"buffer" argument must be a Buffer instance');
					if(t>i||t<o)
						throw new RangeError('"value" argument is out of bounds');
					if(r+n>e.length)
						throw new RangeError("Index out of range");
				}
				function P(e,t,r,n) {
					t<0&&(t=65535+t+1);
					for(var i=0,o=Math.min(e.length-r,2);i<o;++i)
						e[r+i]=(t&255<<8*(n? i:1-i))>>>8*(n? i:1-i);
				}
				function D(e,t,r,n) {
					t<0&&(t=4294967295+t+1);
					for(var i=0,o=Math.min(e.length-r,4);i<o;++i)
						e[r+i]=t>>>8*(n? i:3-i)&255;
				}
				function N(e,t,r,n,i,o) {
					if(r+n>e.length)
						throw new RangeError("Index out of range");
					if(r<0)
						throw new RangeError("Index out of range");
				}
				function L(e,t,r,n,o) {
					return o||N(e,0,r,4),
						i.write(e,t,r,n,23,4),
						r+4;
				}
				function j(e,t,r,n,o) {
					return o||N(e,0,r,8),
						i.write(e,t,r,n,52,8),
						r+8;
				}
				u.prototype.slice=function(e,t) {
					var r,n=this.length;
					if((e=~~e)<0? (e+=n)<0&&(e=0):e>n&&(e=n),
						(t=void 0===t? n:~~t)<0? (t+=n)<0&&(t=0):t>n&&(t=n),
						t<e&&(t=e),
						u.TYPED_ARRAY_SUPPORT)
						(r=this.subarray(e,t)).__proto__=u.prototype;
					else {
						var i=t-e;
						r=new u(i,void 0);
						for(var o=0;o<i;++o)
							r[o]=this[o+e];
					}
					return r;
				}
					,
					u.prototype.readUIntLE=function(e,t,r) {
						e|=0,
							t|=0,
							r||I(e,t,this.length);
						for(var n=this[e],i=1,o=0;++o<t&&(i*=256);)
							n+=this[e+o]*i;
						return n;
					}
					,
					u.prototype.readUIntBE=function(e,t,r) {
						e|=0,
							t|=0,
							r||I(e,t,this.length);
						for(var n=this[e+--t],i=1;t>0&&(i*=256);)
							n+=this[e+--t]*i;
						return n;
					}
					,
					u.prototype.readUInt8=function(e,t) {
						return t||I(e,1,this.length),
							this[e];
					}
					,
					u.prototype.readUInt16LE=function(e,t) {
						return t||I(e,2,this.length),
							this[e]|this[e+1]<<8;
					}
					,
					u.prototype.readUInt16BE=function(e,t) {
						return t||I(e,2,this.length),
							this[e]<<8|this[e+1];
					}
					,
					u.prototype.readUInt32LE=function(e,t) {
						return t||I(e,4,this.length),
							(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3];
					}
					,
					u.prototype.readUInt32BE=function(e,t) {
						return t||I(e,4,this.length),
							16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3]);
					}
					,
					u.prototype.readIntLE=function(e,t,r) {
						e|=0,
							t|=0,
							r||I(e,t,this.length);
						for(var n=this[e],i=1,o=0;++o<t&&(i*=256);)
							n+=this[e+o]*i;
						return n>=(i*=128)&&(n-=Math.pow(2,8*t)),
							n;
					}
					,
					u.prototype.readIntBE=function(e,t,r) {
						e|=0,
							t|=0,
							r||I(e,t,this.length);
						for(var n=t,i=1,o=this[e+--n];n>0&&(i*=256);)
							o+=this[e+--n]*i;
						return o>=(i*=128)&&(o-=Math.pow(2,8*t)),
							o;
					}
					,
					u.prototype.readInt8=function(e,t) {
						return t||I(e,1,this.length),
							128&this[e]? -1*(255-this[e]+1):this[e];
					}
					,
					u.prototype.readInt16LE=function(e,t) {
						t||I(e,2,this.length);
						var r=this[e]|this[e+1]<<8;
						return 32768&r? 4294901760|r:r;
					}
					,
					u.prototype.readInt16BE=function(e,t) {
						t||I(e,2,this.length);
						var r=this[e+1]|this[e]<<8;
						return 32768&r? 4294901760|r:r;
					}
					,
					u.prototype.readInt32LE=function(e,t) {
						return t||I(e,4,this.length),
							this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24;
					}
					,
					u.prototype.readInt32BE=function(e,t) {
						return t||I(e,4,this.length),
							this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3];
					}
					,
					u.prototype.readFloatLE=function(e,t) {
						return t||I(e,4,this.length),
							i.read(this,e,!0,23,4);
					}
					,
					u.prototype.readFloatBE=function(e,t) {
						return t||I(e,4,this.length),
							i.read(this,e,!1,23,4);
					}
					,
					u.prototype.readDoubleLE=function(e,t) {
						return t||I(e,8,this.length),
							i.read(this,e,!0,52,8);
					}
					,
					u.prototype.readDoubleBE=function(e,t) {
						return t||I(e,8,this.length),
							i.read(this,e,!1,52,8);
					}
					,
					u.prototype.writeUIntLE=function(e,t,r,n) {
						(e=+e,
							t|=0,
							r|=0,
							n)||O(this,e,t,r,Math.pow(2,8*r)-1,0);
						var i=1,o=0;
						for(this[t]=255&e;++o<r&&(i*=256);)
							this[t+o]=e/i&255;
						return t+r;
					}
					,
					u.prototype.writeUIntBE=function(e,t,r,n) {
						(e=+e,
							t|=0,
							r|=0,
							n)||O(this,e,t,r,Math.pow(2,8*r)-1,0);
						var i=r-1,o=1;
						for(this[t+i]=255&e;--i>=0&&(o*=256);)
							this[t+i]=e/o&255;
						return t+r;
					}
					,
					u.prototype.writeUInt8=function(e,t,r) {
						return e=+e,
							t|=0,
							r||O(this,e,t,1,255,0),
							u.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),
							this[t]=255&e,
							t+1;
					}
					,
					u.prototype.writeUInt16LE=function(e,t,r) {
						return e=+e,
							t|=0,
							r||O(this,e,t,2,65535,0),
							u.TYPED_ARRAY_SUPPORT? (this[t]=255&e,
								this[t+1]=e>>>8):P(this,e,t,!0),
							t+2;
					}
					,
					u.prototype.writeUInt16BE=function(e,t,r) {
						return e=+e,
							t|=0,
							r||O(this,e,t,2,65535,0),
							u.TYPED_ARRAY_SUPPORT? (this[t]=e>>>8,
								this[t+1]=255&e):P(this,e,t,!1),
							t+2;
					}
					,
					u.prototype.writeUInt32LE=function(e,t,r) {
						return e=+e,
							t|=0,
							r||O(this,e,t,4,4294967295,0),
							u.TYPED_ARRAY_SUPPORT? (this[t+3]=e>>>24,
								this[t+2]=e>>>16,
								this[t+1]=e>>>8,
								this[t]=255&e):D(this,e,t,!0),
							t+4;
					}
					,
					u.prototype.writeUInt32BE=function(e,t,r) {
						return e=+e,
							t|=0,
							r||O(this,e,t,4,4294967295,0),
							u.TYPED_ARRAY_SUPPORT? (this[t]=e>>>24,
								this[t+1]=e>>>16,
								this[t+2]=e>>>8,
								this[t+3]=255&e):D(this,e,t,!1),
							t+4;
					}
					,
					u.prototype.writeIntLE=function(e,t,r,n) {
						if(e=+e,
							t|=0,
							!n) {
							var i=Math.pow(2,8*r-1);
							O(this,e,t,r,i-1,-i);
						}
						var o=0,s=1,a=0;
						for(this[t]=255&e;++o<r&&(s*=256);)
							e<0&&0===a&&0!==this[t+o-1]&&(a=1),
								this[t+o]=(e/s>>0)-a&255;
						return t+r;
					}
					,
					u.prototype.writeIntBE=function(e,t,r,n) {
						if(e=+e,
							t|=0,
							!n) {
							var i=Math.pow(2,8*r-1);
							O(this,e,t,r,i-1,-i);
						}
						var o=r-1,s=1,a=0;
						for(this[t+o]=255&e;--o>=0&&(s*=256);)
							e<0&&0===a&&0!==this[t+o+1]&&(a=1),
								this[t+o]=(e/s>>0)-a&255;
						return t+r;
					}
					,
					u.prototype.writeInt8=function(e,t,r) {
						return e=+e,
							t|=0,
							r||O(this,e,t,1,127,-128),
							u.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),
							e<0&&(e=255+e+1),
							this[t]=255&e,
							t+1;
					}
					,
					u.prototype.writeInt16LE=function(e,t,r) {
						return e=+e,
							t|=0,
							r||O(this,e,t,2,32767,-32768),
							u.TYPED_ARRAY_SUPPORT? (this[t]=255&e,
								this[t+1]=e>>>8):P(this,e,t,!0),
							t+2;
					}
					,
					u.prototype.writeInt16BE=function(e,t,r) {
						return e=+e,
							t|=0,
							r||O(this,e,t,2,32767,-32768),
							u.TYPED_ARRAY_SUPPORT? (this[t]=e>>>8,
								this[t+1]=255&e):P(this,e,t,!1),
							t+2;
					}
					,
					u.prototype.writeInt32LE=function(e,t,r) {
						return e=+e,
							t|=0,
							r||O(this,e,t,4,2147483647,-2147483648),
							u.TYPED_ARRAY_SUPPORT? (this[t]=255&e,
								this[t+1]=e>>>8,
								this[t+2]=e>>>16,
								this[t+3]=e>>>24):D(this,e,t,!0),
							t+4;
					}
					,
					u.prototype.writeInt32BE=function(e,t,r) {
						return e=+e,
							t|=0,
							r||O(this,e,t,4,2147483647,-2147483648),
							e<0&&(e=4294967295+e+1),
							u.TYPED_ARRAY_SUPPORT? (this[t]=e>>>24,
								this[t+1]=e>>>16,
								this[t+2]=e>>>8,
								this[t+3]=255&e):D(this,e,t,!1),
							t+4;
					}
					,
					u.prototype.writeFloatLE=function(e,t,r) {
						return L(this,e,t,!0,r);
					}
					,
					u.prototype.writeFloatBE=function(e,t,r) {
						return L(this,e,t,!1,r);
					}
					,
					u.prototype.writeDoubleLE=function(e,t,r) {
						return j(this,e,t,!0,r);
					}
					,
					u.prototype.writeDoubleBE=function(e,t,r) {
						return j(this,e,t,!1,r);
					}
					,
					u.prototype.copy=function(e,t,r,n) {
						if(r||(r=0),
							n||0===n||(n=this.length),
							t>=e.length&&(t=e.length),
							t||(t=0),
							n>0&&n<r&&(n=r),
							n===r)
							return 0;
						if(0===e.length||0===this.length)
							return 0;
						if(t<0)
							throw new RangeError("targetStart out of bounds");
						if(r<0||r>=this.length)
							throw new RangeError("sourceStart out of bounds");
						if(n<0)
							throw new RangeError("sourceEnd out of bounds");
						n>this.length&&(n=this.length),
							e.length-t<n-r&&(n=e.length-t+r);
						var i,o=n-r;
						if(this===e&&r<t&&t<n)
							for(i=o-1;i>=0;--i)
								e[i+t]=this[i+r];
						else if(o<1e3||!u.TYPED_ARRAY_SUPPORT)
							for(i=0;i<o;++i)
								e[i+t]=this[i+r];


						else
							Uint8Array.prototype.set.call(e,this.subarray(r,r+o),t);
						return o;
					}
					,
					u.prototype.fill=function(e,t,r,n) {
						if("string"==typeof e) {
							if("string"==typeof t? (n=t,
								t=0,
								r=this.length):"string"==typeof r&&(n=r,
									r=this.length),
								1===e.length) {
								var i=e.charCodeAt(0);
								i<256&&(e=i);
							}
							if(void 0!==n&&"string"!=typeof n)
								throw new TypeError("encoding must be a string");
							if("string"==typeof n&&!u.isEncoding(n))
								throw new TypeError("Unknown encoding: "+n);
						}

						else
							"number"==typeof e&&(e&=255);
						if(t<0||this.length<t||this.length<r)
							throw new RangeError("Out of range index");
						if(r<=t)
							return this;
						var o;
						if(t>>>=0,
							r=void 0===r? this.length:r>>>0,
							e||(e=0),
							"number"==typeof e)
							for(o=t;o<r;++o)
								this[o]=e;
						else {
							var s=u.isBuffer(e)? e:F(new u(e,n).toString()),a=s.length;
							for(o=0;o<r-t;++o)
								this[o+t]=s[o%a];
						}
						return this;
					};
				var B=/[^+\/0-9A-Za-z-_]/g;
				function U(e) {
					return e<16? "0"+e.toString(16):e.toString(16);
				}
				function F(e,t) {
					var r;
					t=t||1/0;
					for(var n=e.length,i=null,o=[],s=0;s<n;++s) {
						if((r=e.charCodeAt(s))>55295&&r<57344) {
							if(!i) {
								if(r>56319) {
									(t-=3)>-1&&o.push(239,191,189);
									continue;
								}
								if(s+1===n) {
									(t-=3)>-1&&o.push(239,191,189);
									continue;
								}
								i=r;
								continue;
							}
							if(r<56320) {
								(t-=3)>-1&&o.push(239,191,189),
									i=r;
								continue;
							}
							r=65536+(i-55296<<10|r-56320);
						}

						else
							i&&(t-=3)>-1&&o.push(239,191,189);
						if(i=null,
							r<128) {
							if((t-=1)<0)
								break;
							o.push(r);
						} else if(r<2048) {
							if((t-=2)<0)
								break;
							o.push(r>>6|192,63&r|128);
						} else if(r<65536) {
							if((t-=3)<0)
								break;
							o.push(r>>12|224,r>>6&63|128,63&r|128);
						} else {
							if(!(r<1114112))
								throw new Error("Invalid code point");
							if((t-=4)<0)
								break;
							o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128);
						}
					}
					return o;
				}
				function q(e) {
					return n.toByteArray(function(e) {
						if((e=function(e) {
							return e.trim? e.trim():e.replace(/^\s+|\s+$/g,"");
						}(e).replace(B,"")).length<2)
							return "";
						for(;e.length%4!=0;)
							e+="=";
						return e;
					}(e));
				}
				function H(e,t,r,n) {
					for(var i=0;i<n&&!(i+r>=t.length||i>=e.length);++i)
						t[i+r]=e[i];
					return i;
				}
			}
			).call(this,r(51));
		}
	]]`;
}
