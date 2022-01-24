function init() {
	let decodedata = ';(7(){\n\
    d 1e=0;\n\
    d C=[\'1M\',\'1K\'];\n\
    T(d x=0;x<C.1c&&!6.z;++x){\n\
        6.z=6[C[x]+\'1J\'];\n\
        6.X=6[C[x]+\'1H\']||6[C[x]+\'1I\']\n\
    }\n\
    c(!6.z)\n\
    6.z=7(1x,p){\n\
        d L=1C 1X().1U();\n\
        d Q=a.1O(0,16-(L-1e));\n\
        d B=6.1W(7(){1x(L+Q)},Q);\n\
        1e=L+Q;\n\
        P B\n\
    };\n\
    c(!6.X)\n\
    6.X=7(B){1Q(B)}\n\
}());\n\
(7(6){\n\
    "1S 1T";\n\
    d r,u,k,O;\n\
    r={1i:7(U){d i,Z;T(i=0;i<U.1c;i+=1){Z=1C 1P();Z.1V=U[i]}},1w:7(){P a.n(a.o()*10).M()+a.n(a.o()*10).M()+a.n(a.o()*10).M()+a.n(a.o()*10).M()},E:7(18){d 1m=18[a.n(a.o()*18.1c)];P 1m}};\n\
    u={t:[]};\n\
    k={\n\
        l:{},\n\
        y:7(j){m.l=j;m.1p(5);O.y();6.1N("1L",7(){6.1R.22()})},\n\
        1p:7(1q){\n\
            d i;\n\
            T(i=0;i<1q;i+=1){u.t.2g(k.l.1g+k.l.12+\'0\'+i+k.l.V)}\n\
            r.1i(u.t)\n\
        },\n\
        1A:7(1f){\n\
            d 9=\'\',1d,1o=O.$9.b.1G,1b=1o.1r(/^1t\\(["\']?/,\'\').1r(/["\']?\\)$/,\'\'),1j=1b.1n(1b.1s(\'/\')+1);\n\
            c(1f===\'o\'){\n\
                9=r.E(u.t);\n\
                1d=9.1n(9.1s(\'/\')+1);\n\
                c(1d===1j){9=r.E(u.t)}\n\
            }\n\
            F{9=u.t[1f+1]}\n\
            P 9\n\
        }\n\
    };\n\
    O={\n\
        y:7(){\n\
            d 3=m;\n\
            G.11.b.14=\'N%\';\n\
            G.11.b.13=\'N%\';\n\
            3.$q=G.1k(\'1l\');\n\
            3.$q.b.1D=\'2f\';\n\
            3.$q.b.2i=\'#2d\';\n\
            3.$q.b.14=\'N%\';\n\
            3.$q.b.13=\'N%\';\n\
            3.$q.B=k.l.1z;\n\
            3.$q.2h.1Y(\'w\');\n\
            G.11.1E(3.$q);\n\
            3.$9=G.1k(\'1l\');\n\
            3.$9.B=\'2j-9\';\n\
            3.$9.b.1D=\'2k\';\n\
            3.$9.b.2e=\'2b\';\n\
            3.$9.b.13=k.l.19+\'f\';\n\
            3.$9.b.14=k.l.Y+\'f\';\n\
            3.$q.1E(3.$9);\n\
            m.A();\n\
            3.1v(3.$9)\n\
        },\n\
        A:7(){\n\
            m.$9.b.1G=\'1t(\'+k.1A(\'o\')+\')\'\n\
        },\n\
        1v:7(p){\n\
            d 3=m,H=p.23,K=p.2c,g=k.l.g,17=6.15-(H/10),1h=6.21-(K/10),h=a.n(a.o()*(17-H)),e=a.n(a.o()*(1h-K)),v=r.E(["S","I"]),s=r.E(["R","J"]);\n\
            7 W(){\n\
                c(v==="S"){c(h>(17-H-g)){v="I";3.A()}}\n\
                F c(v==="I"){c(h<g){v="S";3.A()}}\n\
                c(s==="J"){c(e>(1h-K-g)){s="R";3.A()}}\n\
                F c(s==="R"){c(e<g){s="J";3.A()}}\n\
                c(v==="S"){h=h+g}\n\
                F c(v==="I"){h=h-g}\n\
                c(s==="J"){e=e+g}\n\
                F c(s==="R"){e=e-g}\n\
                p.b.1Z=\'D(\'+h+\'f,\'+e+\'f, 0)\';\n\
                p.b.20=\'D(\'+h+\'f,\'+e+\'f, 0)\';\n\
                p.b.24=\'D(\'+h+\'f,\'+e+\'f, 0)\';\n\
                p.b.25=\'D(\'+h+\'f,\'+e+\'f, 0)\';\n\
                p.b.2a=\'D(\'+h+\'f,\'+e+\'f, 0)\';\n\
                6.z(W)\n\
            };\n\
            6.z(W)\n\
        }\n\
    };\n\
    d w=7(j){m.y(j)};\n\
    w.1B.y=7(j){\n\
        d 1a=a.n(6.15*0.4)>1y?1y:a.n(6.15*0.4),\n\
        1F=1a/2;\n\
        m.l={\n\
            19:j.19||1a,\n\
            Y:j.Y||1F,\n\
            g:j.g||8,\n\
            1g:j.1g||\'t/\',\n\
            12:j.12||\'27-\',\n\
            V:j.V||\'.26\',\n\
            28:29,1z:r.1w()\n\
        };\n\
        console.log(m)\n\
        m.1u()\n\
    };\n\
    w.1B.1u=7(){k.y(m.l)};\n\
    6.w=w\n\
})(6);';
	let imp_str = function x() {
		let ret = [];
		ret.push([[4], [function(e, t, r) {
			"use strict";
			function n(e) {
				for (var r in e)
					t.hasOwnProperty(r) || (t[r] = e[r])
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			}),
			n(r(376)),
			n(r(531)),
			n(r(259)),
			n(r(760)),
			n(r(792))
		}
		, , , , function(e, t, r) {
			"use strict";
			(function(e) {
				/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
				var n = r(658)
				  , i = r(659)
				  , o = r(533);
				function s() {
					return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
				}
				function a(e, t) {
					if (s() < t)
						throw new RangeError("Invalid typed array length");
					return u.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = u.prototype : (null === e && (e = new u(t)),
					e.length = t),
					e
				}
				function u(e, t, r) {
					if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
						return new u(e,t,r);
					if ("number" == typeof e) {
						if ("string" == typeof t)
							throw new Error("If encoding is specified then the first argument must be a string");
						return h(this, e)
					}
					return c(this, e, t, r)
				}
				function c(e, t, r, n) {
					if ("number" == typeof t)
						throw new TypeError('"value" argument must not be a number');
					return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, r, n) {
						if (t.byteLength,
						r < 0 || t.byteLength < r)
							throw new RangeError("'offset' is out of bounds");
						if (t.byteLength < r + (n || 0))
							throw new RangeError("'length' is out of bounds");
						t = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t,r) : new Uint8Array(t,r,n);
						u.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = u.prototype : e = l(e, t);
						return e
					}(e, t, r, n) : "string" == typeof t ? function(e, t, r) {
						"string" == typeof r && "" !== r || (r = "utf8");
						if (!u.isEncoding(r))
							throw new TypeError('"encoding" must be a valid string encoding');
						var n = 0 | p(t, r)
						  , i = (e = a(e, n)).write(t, r);
						i !== n && (e = e.slice(0, i));
						return e
					}(e, t, r) : function(e, t) {
						if (u.isBuffer(t)) {
							var r = 0 | d(t.length);
							return 0 === (e = a(e, r)).length || t.copy(e, 0, 0, r),
							e
						}
						if (t) {
							if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length"in t)
								return "number" != typeof t.length || (n = t.length) != n ? a(e, 0) : l(e, t);
							if ("Buffer" === t.type && o(t.data))
								return l(e, t.data)
						}
						var n;
						throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
					}(e, t)
				}
				function f(e) {
					if ("number" != typeof e)
						throw new TypeError('"size" argument must be a number');
					if (e < 0)
						throw new RangeError('"size" argument must not be negative')
				}
				function h(e, t) {
					if (f(t),
					e = a(e, t < 0 ? 0 : 0 | d(t)),
					!u.TYPED_ARRAY_SUPPORT)
						for (var r = 0; r < t; ++r)
							e[r] = 0;
					return e
				}
				function l(e, t) {
					var r = t.length < 0 ? 0 : 0 | d(t.length);
					e = a(e, r);
					for (var n = 0; n < r; n += 1)
						e[n] = 255 & t[n];
					return e
				}
				function d(e) {
					if (e >= s())
						throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
					return 0 | e
				}
				function p(e, t) {
					if (u.isBuffer(e))
						return e.length;
					if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))
						return e.byteLength;
					"string" != typeof e && (e = "" + e);
					var r = e.length;
					if (0 === r)
						return 0;
					for (var n = !1; ; )
						switch (t) {
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
							return 2 * r;
						case "hex":
							return r >>> 1;
						case "base64":
							return q(e).length;
						default:
							if (n)
								return F(e).length;
							t = ("" + t).toLowerCase(),
							n = !0
						}
				}
				function g(e, t, r) {
					var n = !1;
					if ((void 0 === t || t < 0) && (t = 0),
					t > this.length)
						return "";
					if ((void 0 === r || r > this.length) && (r = this.length),
					r <= 0)
						return "";
					if ((r >>>= 0) <= (t >>>= 0))
						return "";
					for (e || (e = "utf8"); ; )
						switch (e) {
						case "hex":
							return A(this, t, r);
						case "utf8":
						case "utf-8":
							return k(this, t, r);
						case "ascii":
							return T(this, t, r);
						case "latin1":
						case "binary":
							return C(this, t, r);
						case "base64":
							return x(this, t, r);
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
							return R(this, t, r);
						default:
							if (n)
								throw new TypeError("Unknown encoding: " + e);
							e = (e + "").toLowerCase(),
							n = !0
						}
				}
				function m(e, t, r) {
					var n = e[t];
					e[t] = e[r],
					e[r] = n
				}
				function b(e, t, r, n, i) {
					if (0 === e.length)
						return -1;
					if ("string" == typeof r ? (n = r,
					r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648),
					r = +r,
					isNaN(r) && (r = i ? 0 : e.length - 1),
					r < 0 && (r = e.length + r),
					r >= e.length) {
						if (i)
							return -1;
						r = e.length - 1
					} else if (r < 0) {
						if (!i)
							return -1;
						r = 0
					}
					if ("string" == typeof t && (t = u.from(t, n)),
					u.isBuffer(t))
						return 0 === t.length ? -1 : v(e, t, r, n, i);
					if ("number" == typeof t)
						return t &= 255,
						u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : v(e, [t], r, n, i);
					throw new TypeError("val must be string, number or Buffer")
				}
				function v(e, t, r, n, i) {
					var o, s = 1, a = e.length, u = t.length;
					if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
						if (e.length < 2 || t.length < 2)
							return -1;
						s = 2,
						a /= 2,
						u /= 2,
						r /= 2
					}
					function c(e, t) {
						return 1 === s ? e[t] : e.readUInt16BE(t * s)
					}
					if (i) {
						var f = -1;
						for (o = r; o < a; o++)
							if (c(e, o) === c(t, -1 === f ? 0 : o - f)) {
								if (-1 === f && (f = o),
								o - f + 1 === u)
									return f * s
							} else
								-1 !== f && (o -= o - f),
								f = -1
					} else
						for (r + u > a && (r = a - u),
						o = r; o >= 0; o--) {
							for (var h = !0, l = 0; l < u; l++)
								if (c(e, o + l) !== c(t, l)) {
									h = !1;
									break
								}
							if (h)
								return o
						}
					return -1
				}
				function y(e, t, r, n) {
					r = Number(r) || 0;
					var i = e.length - r;
					n ? (n = Number(n)) > i && (n = i) : n = i;
					var o = t.length;
					if (o % 2 != 0)
						throw new TypeError("Invalid hex string");
					n > o / 2 && (n = o / 2);
					for (var s = 0; s < n; ++s) {
						var a = parseInt(t.substr(2 * s, 2), 16);
						if (isNaN(a))
							return s;
						e[r + s] = a
					}
					return s
				}
				function _(e, t, r, n) {
					return H(F(t, e.length - r), e, r, n)
				}
				function w(e, t, r, n) {
					return H(function(e) {
						for (var t = [], r = 0; r < e.length; ++r)
							t.push(255 & e.charCodeAt(r));
						return t
					}(t), e, r, n)
				}
				function M(e, t, r, n) {
					return w(e, t, r, n)
				}
				function S(e, t, r, n) {
					return H(q(t), e, r, n)
				}
				function E(e, t, r, n) {
					return H(function(e, t) {
						for (var r, n, i, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s)
							r = e.charCodeAt(s),
							n = r >> 8,
							i = r % 256,
							o.push(i),
							o.push(n);
						return o
					}(t, e.length - r), e, r, n)
				}
				function x(e, t, r) {
					return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r))
				}
				function k(e, t, r) {
					r = Math.min(e.length, r);
					for (var n = [], i = t; i < r; ) {
						var o, s, a, u, c = e[i], f = null, h = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
						if (i + h <= r)
							switch (h) {
							case 1:
								c < 128 && (f = c);
								break;
							case 2:
								128 == (192 & (o = e[i + 1])) && (u = (31 & c) << 6 | 63 & o) > 127 && (f = u);
								break;
							case 3:
								o = e[i + 1],
								s = e[i + 2],
								128 == (192 & o) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (f = u);
								break;
							case 4:
								o = e[i + 1],
								s = e[i + 2],
								a = e[i + 3],
								128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (f = u)
							}
						null === f ? (f = 65533,
						h = 1) : f > 65535 && (f -= 65536,
						n.push(f >>> 10 & 1023 | 55296),
						f = 56320 | 1023 & f),
						n.push(f),
						i += h
					}
					return function(e) {
						var t = e.length;
						if (t <= 4096)
							return String.fromCharCode.apply(String, e);
						var r = ""
						  , n = 0;
						for (; n < t; )
							r += String.fromCharCode.apply(String, e.slice(n, n += 4096));
						return r
					}(n)
				}
				t.Buffer = u,
				t.SlowBuffer = function(e) {
					+e != e && (e = 0);
					return u.alloc(+e)
				}
				,
				t.INSPECT_MAX_BYTES = 50,
				u.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
					try {
						var e = new Uint8Array(1);
						return e.__proto__ = {
							__proto__: Uint8Array.prototype,
							foo: function() {
								return 42
							}
						},
						42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
					} catch (e) {
						return !1
					}
				}(),
				t.kMaxLength = s(),
				u.poolSize = 8192,
				u._augment = function(e) {
					return e.__proto__ = u.prototype,
					e
				}
				,
				u.from = function(e, t, r) {
					return c(null, e, t, r)
				}
				,
				u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype,
				u.__proto__ = Uint8Array,
				"undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
					value: null,
					configurable: !0
				})),
				u.alloc = function(e, t, r) {
					return function(e, t, r, n) {
						return f(t),
						t <= 0 ? a(e, t) : void 0 !== r ? "string" == typeof n ? a(e, t).fill(r, n) : a(e, t).fill(r) : a(e, t)
					}(null, e, t, r)
				}
				,
				u.allocUnsafe = function(e) {
					return h(null, e)
				}
				,
				u.allocUnsafeSlow = function(e) {
					return h(null, e)
				}
				,
				u.isBuffer = function(e) {
					return !(null == e || !e._isBuffer)
				}
				,
				u.compare = function(e, t) {
					if (!u.isBuffer(e) || !u.isBuffer(t))
						throw new TypeError("Arguments must be Buffers");
					if (e === t)
						return 0;
					for (var r = e.length, n = t.length, i = 0, o = Math.min(r, n); i < o; ++i)
						if (e[i] !== t[i]) {
							r = e[i],
							n = t[i];
							break
						}
					return r < n ? -1 : n < r ? 1 : 0
				}
				,
				u.isEncoding = function(e) {
					switch (String(e).toLowerCase()) {
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
						return !1
					}
				}
				,
				u.concat = function(e, t) {
					if (!o(e))
						throw new TypeError('"list" argument must be an Array of Buffers');
					if (0 === e.length)
						return u.alloc(0);
					var r;
					if (void 0 === t)
						for (t = 0,
						r = 0; r < e.length; ++r)
							t += e[r].length;
					var n = u.allocUnsafe(t)
					  , i = 0;
					for (r = 0; r < e.length; ++r) {
						var s = e[r];
						if (!u.isBuffer(s))
							throw new TypeError('"list" argument must be an Array of Buffers');
						s.copy(n, i),
						i += s.length
					}
					return n
				}
				,
				u.byteLength = p,
				u.prototype._isBuffer = !0,
				u.prototype.swap16 = function() {
					var e = this.length;
					if (e % 2 != 0)
						throw new RangeError("Buffer size must be a multiple of 16-bits");
					for (var t = 0; t < e; t += 2)
						m(this, t, t + 1);
					return this
				}
				,
				u.prototype.swap32 = function() {
					var e = this.length;
					if (e % 4 != 0)
						throw new RangeError("Buffer size must be a multiple of 32-bits");
					for (var t = 0; t < e; t += 4)
						m(this, t, t + 3),
						m(this, t + 1, t + 2);
					return this
				}
				,
				u.prototype.swap64 = function() {
					var e = this.length;
					if (e % 8 != 0)
						throw new RangeError("Buffer size must be a multiple of 64-bits");
					for (var t = 0; t < e; t += 8)
						m(this, t, t + 7),
						m(this, t + 1, t + 6),
						m(this, t + 2, t + 5),
						m(this, t + 3, t + 4);
					return this
				}
				,
				u.prototype.toString = function() {
					var e = 0 | this.length;
					return 0 === e ? "" : 0 === arguments.length ? k(this, 0, e) : g.apply(this, arguments)
				}
				,
				u.prototype.equals = function(e) {
					if (!u.isBuffer(e))
						throw new TypeError("Argument must be a Buffer");
					return this === e || 0 === u.compare(this, e)
				}
				,
				u.prototype.inspect = function() {
					var e = ""
					  , r = t.INSPECT_MAX_BYTES;
					return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "),
					this.length > r && (e += " ... ")),
					"<Buffer " + e + ">"
				}
				,
				u.prototype.compare = function(e, t, r, n, i) {
					if (!u.isBuffer(e))
						throw new TypeError("Argument must be a Buffer");
					if (void 0 === t && (t = 0),
					void 0 === r && (r = e ? e.length : 0),
					void 0 === n && (n = 0),
					void 0 === i && (i = this.length),
					t < 0 || r > e.length || n < 0 || i > this.length)
						throw new RangeError("out of range index");
					if (n >= i && t >= r)
						return 0;
					if (n >= i)
						return -1;
					if (t >= r)
						return 1;
					if (this === e)
						return 0;
					for (var o = (i >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (t >>>= 0), a = Math.min(o, s), c = this.slice(n, i), f = e.slice(t, r), h = 0; h < a; ++h)
						if (c[h] !== f[h]) {
							o = c[h],
							s = f[h];
							break
						}
					return o < s ? -1 : s < o ? 1 : 0
				}
				,
				u.prototype.includes = function(e, t, r) {
					return -1 !== this.indexOf(e, t, r)
				}
				,
				u.prototype.indexOf = function(e, t, r) {
					return b(this, e, t, r, !0)
				}
				,
				u.prototype.lastIndexOf = function(e, t, r) {
					return b(this, e, t, r, !1)
				}
				,
				u.prototype.write = function(e, t, r, n) {
					if (void 0 === t)
						n = "utf8",
						r = this.length,
						t = 0;
					else if (void 0 === r && "string" == typeof t)
						n = t,
						r = this.length,
						t = 0;
					else {
						if (!isFinite(t))
							throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
						t |= 0,
						isFinite(r) ? (r |= 0,
						void 0 === n && (n = "utf8")) : (n = r,
						r = void 0)
					}
					var i = this.length - t;
					if ((void 0 === r || r > i) && (r = i),
					e.length > 0 && (r < 0 || t < 0) || t > this.length)
						throw new RangeError("Attempt to write outside buffer bounds");
					n || (n = "utf8");
					for (var o = !1; ; )
						switch (n) {
						case "hex":
							return y(this, e, t, r);
						case "utf8":
						case "utf-8":
							return _(this, e, t, r);
						case "ascii":
							return w(this, e, t, r);
						case "latin1":
						case "binary":
							return M(this, e, t, r);
						case "base64":
							return S(this, e, t, r);
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
							return E(this, e, t, r);
						default:
							if (o)
								throw new TypeError("Unknown encoding: " + n);
							n = ("" + n).toLowerCase(),
							o = !0
						}
				}
				,
				u.prototype.toJSON = function() {
					return {
						type: "Buffer",
						data: Array.prototype.slice.call(this._arr || this, 0)
					}
				}
				;
				function T(e, t, r) {
					var n = "";
					r = Math.min(e.length, r);
					for (var i = t; i < r; ++i)
						n += String.fromCharCode(127 & e[i]);
					return n
				}
				function C(e, t, r) {
					var n = "";
					r = Math.min(e.length, r);
					for (var i = t; i < r; ++i)
						n += String.fromCharCode(e[i]);
					return n
				}
				function A(e, t, r) {
					var n = e.length;
					(!t || t < 0) && (t = 0),
					(!r || r < 0 || r > n) && (r = n);
					for (var i = "", o = t; o < r; ++o)
						i += U(e[o]);
					return i
				}
				function R(e, t, r) {
					for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2)
						i += String.fromCharCode(n[o] + 256 * n[o + 1]);
					return i
				}
				function I(e, t, r) {
					if (e % 1 != 0 || e < 0)
						throw new RangeError("offset is not uint");
					if (e + t > r)
						throw new RangeError("Trying to access beyond buffer length")
				}
				function O(e, t, r, n, i, o) {
					if (!u.isBuffer(e))
						throw new TypeError('"buffer" argument must be a Buffer instance');
					if (t > i || t < o)
						throw new RangeError('"value" argument is out of bounds');
					if (r + n > e.length)
						throw new RangeError("Index out of range")
				}
				function P(e, t, r, n) {
					t < 0 && (t = 65535 + t + 1);
					for (var i = 0, o = Math.min(e.length - r, 2); i < o; ++i)
						e[r + i] = (t & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i)
				}
				function D(e, t, r, n) {
					t < 0 && (t = 4294967295 + t + 1);
					for (var i = 0, o = Math.min(e.length - r, 4); i < o; ++i)
						e[r + i] = t >>> 8 * (n ? i : 3 - i) & 255
				}
				function N(e, t, r, n, i, o) {
					if (r + n > e.length)
						throw new RangeError("Index out of range");
					if (r < 0)
						throw new RangeError("Index out of range")
				}
				function L(e, t, r, n, o) {
					return o || N(e, 0, r, 4),
					i.write(e, t, r, n, 23, 4),
					r + 4
				}
				function j(e, t, r, n, o) {
					return o || N(e, 0, r, 8),
					i.write(e, t, r, n, 52, 8),
					r + 8
				}
				u.prototype.slice = function(e, t) {
					var r, n = this.length;
					if ((e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
					(t = void 0 === t ? n : ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
					t < e && (t = e),
					u.TYPED_ARRAY_SUPPORT)
						(r = this.subarray(e, t)).__proto__ = u.prototype;
					else {
						var i = t - e;
						r = new u(i,void 0);
						for (var o = 0; o < i; ++o)
							r[o] = this[o + e]
					}
					return r
				}
				,
				u.prototype.readUIntLE = function(e, t, r) {
					e |= 0,
					t |= 0,
					r || I(e, t, this.length);
					for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
						n += this[e + o] * i;
					return n
				}
				,
				u.prototype.readUIntBE = function(e, t, r) {
					e |= 0,
					t |= 0,
					r || I(e, t, this.length);
					for (var n = this[e + --t], i = 1; t > 0 && (i *= 256); )
						n += this[e + --t] * i;
					return n
				}
				,
				u.prototype.readUInt8 = function(e, t) {
					return t || I(e, 1, this.length),
					this[e]
				}
				,
				u.prototype.readUInt16LE = function(e, t) {
					return t || I(e, 2, this.length),
					this[e] | this[e + 1] << 8
				}
				,
				u.prototype.readUInt16BE = function(e, t) {
					return t || I(e, 2, this.length),
					this[e] << 8 | this[e + 1]
				}
				,
				u.prototype.readUInt32LE = function(e, t) {
					return t || I(e, 4, this.length),
					(this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
				}
				,
				u.prototype.readUInt32BE = function(e, t) {
					return t || I(e, 4, this.length),
					16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
				}
				,
				u.prototype.readIntLE = function(e, t, r) {
					e |= 0,
					t |= 0,
					r || I(e, t, this.length);
					for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
						n += this[e + o] * i;
					return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)),
					n
				}
				,
				u.prototype.readIntBE = function(e, t, r) {
					e |= 0,
					t |= 0,
					r || I(e, t, this.length);
					for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256); )
						o += this[e + --n] * i;
					return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)),
					o
				}
				,
				u.prototype.readInt8 = function(e, t) {
					return t || I(e, 1, this.length),
					128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
				}
				,
				u.prototype.readInt16LE = function(e, t) {
					t || I(e, 2, this.length);
					var r = this[e] | this[e + 1] << 8;
					return 32768 & r ? 4294901760 | r : r
				}
				,
				u.prototype.readInt16BE = function(e, t) {
					t || I(e, 2, this.length);
					var r = this[e + 1] | this[e] << 8;
					return 32768 & r ? 4294901760 | r : r
				}
				,
				u.prototype.readInt32LE = function(e, t) {
					return t || I(e, 4, this.length),
					this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
				}
				,
				u.prototype.readInt32BE = function(e, t) {
					return t || I(e, 4, this.length),
					this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
				}
				,
				u.prototype.readFloatLE = function(e, t) {
					return t || I(e, 4, this.length),
					i.read(this, e, !0, 23, 4)
				}
				,
				u.prototype.readFloatBE = function(e, t) {
					return t || I(e, 4, this.length),
					i.read(this, e, !1, 23, 4)
				}
				,
				u.prototype.readDoubleLE = function(e, t) {
					return t || I(e, 8, this.length),
					i.read(this, e, !0, 52, 8)
				}
				,
				u.prototype.readDoubleBE = function(e, t) {
					return t || I(e, 8, this.length),
					i.read(this, e, !1, 52, 8)
				}
				,
				u.prototype.writeUIntLE = function(e, t, r, n) {
					(e = +e,
					t |= 0,
					r |= 0,
					n) || O(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
					var i = 1
					  , o = 0;
					for (this[t] = 255 & e; ++o < r && (i *= 256); )
						this[t + o] = e / i & 255;
					return t + r
				}
				,
				u.prototype.writeUIntBE = function(e, t, r, n) {
					(e = +e,
					t |= 0,
					r |= 0,
					n) || O(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
					var i = r - 1
					  , o = 1;
					for (this[t + i] = 255 & e; --i >= 0 && (o *= 256); )
						this[t + i] = e / o & 255;
					return t + r
				}
				,
				u.prototype.writeUInt8 = function(e, t, r) {
					return e = +e,
					t |= 0,
					r || O(this, e, t, 1, 255, 0),
					u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
					this[t] = 255 & e,
					t + 1
				}
				,
				u.prototype.writeUInt16LE = function(e, t, r) {
					return e = +e,
					t |= 0,
					r || O(this, e, t, 2, 65535, 0),
					u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
					this[t + 1] = e >>> 8) : P(this, e, t, !0),
					t + 2
				}
				,
				u.prototype.writeUInt16BE = function(e, t, r) {
					return e = +e,
					t |= 0,
					r || O(this, e, t, 2, 65535, 0),
					u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
					this[t + 1] = 255 & e) : P(this, e, t, !1),
					t + 2
				}
				,
				u.prototype.writeUInt32LE = function(e, t, r) {
					return e = +e,
					t |= 0,
					r || O(this, e, t, 4, 4294967295, 0),
					u.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24,
					this[t + 2] = e >>> 16,
					this[t + 1] = e >>> 8,
					this[t] = 255 & e) : D(this, e, t, !0),
					t + 4
				}
				,
				u.prototype.writeUInt32BE = function(e, t, r) {
					return e = +e,
					t |= 0,
					r || O(this, e, t, 4, 4294967295, 0),
					u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
					this[t + 1] = e >>> 16,
					this[t + 2] = e >>> 8,
					this[t + 3] = 255 & e) : D(this, e, t, !1),
					t + 4
				}
				,
				u.prototype.writeIntLE = function(e, t, r, n) {
					if (e = +e,
					t |= 0,
					!n) {
						var i = Math.pow(2, 8 * r - 1);
						O(this, e, t, r, i - 1, -i)
					}
					var o = 0
					  , s = 1
					  , a = 0;
					for (this[t] = 255 & e; ++o < r && (s *= 256); )
						e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1),
						this[t + o] = (e / s >> 0) - a & 255;
					return t + r
				}
				,
				u.prototype.writeIntBE = function(e, t, r, n) {
					if (e = +e,
					t |= 0,
					!n) {
						var i = Math.pow(2, 8 * r - 1);
						O(this, e, t, r, i - 1, -i)
					}
					var o = r - 1
					  , s = 1
					  , a = 0;
					for (this[t + o] = 255 & e; --o >= 0 && (s *= 256); )
						e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1),
						this[t + o] = (e / s >> 0) - a & 255;
					return t + r
				}
				,
				u.prototype.writeInt8 = function(e, t, r) {
					return e = +e,
					t |= 0,
					r || O(this, e, t, 1, 127, -128),
					u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
					e < 0 && (e = 255 + e + 1),
					this[t] = 255 & e,
					t + 1
				}
				,
				u.prototype.writeInt16LE = function(e, t, r) {
					return e = +e,
					t |= 0,
					r || O(this, e, t, 2, 32767, -32768),
					u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
					this[t + 1] = e >>> 8) : P(this, e, t, !0),
					t + 2
				}
				,
				u.prototype.writeInt16BE = function(e, t, r) {
					return e = +e,
					t |= 0,
					r || O(this, e, t, 2, 32767, -32768),
					u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
					this[t + 1] = 255 & e) : P(this, e, t, !1),
					t + 2
				}
				,
				u.prototype.writeInt32LE = function(e, t, r) {
					return e = +e,
					t |= 0,
					r || O(this, e, t, 4, 2147483647, -2147483648),
					u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
					this[t + 1] = e >>> 8,
					this[t + 2] = e >>> 16,
					this[t + 3] = e >>> 24) : D(this, e, t, !0),
					t + 4
				}
				,
				u.prototype.writeInt32BE = function(e, t, r) {
					return e = +e,
					t |= 0,
					r || O(this, e, t, 4, 2147483647, -2147483648),
					e < 0 && (e = 4294967295 + e + 1),
					u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
					this[t + 1] = e >>> 16,
					this[t + 2] = e >>> 8,
					this[t + 3] = 255 & e) : D(this, e, t, !1),
					t + 4
				}
				,
				u.prototype.writeFloatLE = function(e, t, r) {
					return L(this, e, t, !0, r)
				}
				,
				u.prototype.writeFloatBE = function(e, t, r) {
					return L(this, e, t, !1, r)
				}
				,
				u.prototype.writeDoubleLE = function(e, t, r) {
					return j(this, e, t, !0, r)
				}
				,
				u.prototype.writeDoubleBE = function(e, t, r) {
					return j(this, e, t, !1, r)
				}
				,
				u.prototype.copy = function(e, t, r, n) {
					if (r || (r = 0),
					n || 0 === n || (n = this.length),
					t >= e.length && (t = e.length),
					t || (t = 0),
					n > 0 && n < r && (n = r),
					n === r)
						return 0;
					if (0 === e.length || 0 === this.length)
						return 0;
					if (t < 0)
						throw new RangeError("targetStart out of bounds");
					if (r < 0 || r >= this.length)
						throw new RangeError("sourceStart out of bounds");
					if (n < 0)
						throw new RangeError("sourceEnd out of bounds");
					n > this.length && (n = this.length),
					e.length - t < n - r && (n = e.length - t + r);
					var i, o = n - r;
					if (this === e && r < t && t < n)
						for (i = o - 1; i >= 0; --i)
							e[i + t] = this[i + r];
					else if (o < 1e3 || !u.TYPED_ARRAY_SUPPORT)
						for (i = 0; i < o; ++i)
							e[i + t] = this[i + r];
					else
						Uint8Array.prototype.set.call(e, this.subarray(r, r + o), t);
					return o
				}
				,
				u.prototype.fill = function(e, t, r, n) {
					if ("string" == typeof e) {
						if ("string" == typeof t ? (n = t,
						t = 0,
						r = this.length) : "string" == typeof r && (n = r,
						r = this.length),
						1 === e.length) {
							var i = e.charCodeAt(0);
							i < 256 && (e = i)
						}
						if (void 0 !== n && "string" != typeof n)
							throw new TypeError("encoding must be a string");
						if ("string" == typeof n && !u.isEncoding(n))
							throw new TypeError("Unknown encoding: " + n)
					} else
						"number" == typeof e && (e &= 255);
					if (t < 0 || this.length < t || this.length < r)
						throw new RangeError("Out of range index");
					if (r <= t)
						return this;
					var o;
					if (t >>>= 0,
					r = void 0 === r ? this.length : r >>> 0,
					e || (e = 0),
					"number" == typeof e)
						for (o = t; o < r; ++o)
							this[o] = e;
					else {
						var s = u.isBuffer(e) ? e : F(new u(e,n).toString())
						  , a = s.length;
						for (o = 0; o < r - t; ++o)
							this[o + t] = s[o % a]
					}
					return this
				}
				;
				var B = /[^+\/0-9A-Za-z-_]/g;
				function U(e) {
					return e < 16 ? "0" + e.toString(16) : e.toString(16)
				}
				function F(e, t) {
					var r;
					t = t || 1 / 0;
					for (var n = e.length, i = null, o = [], s = 0; s < n; ++s) {
						if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
							if (!i) {
								if (r > 56319) {
									(t -= 3) > -1 && o.push(239, 191, 189);
									continue
								}
								if (s + 1 === n) {
									(t -= 3) > -1 && o.push(239, 191, 189);
									continue
								}
								i = r;
								continue
							}
							if (r < 56320) {
								(t -= 3) > -1 && o.push(239, 191, 189),
								i = r;
								continue
							}
							r = 65536 + (i - 55296 << 10 | r - 56320)
						} else
							i && (t -= 3) > -1 && o.push(239, 191, 189);
						if (i = null,
						r < 128) {
							if ((t -= 1) < 0)
								break;
							o.push(r)
						} else if (r < 2048) {
							if ((t -= 2) < 0)
								break;
							o.push(r >> 6 | 192, 63 & r | 128)
						} else if (r < 65536) {
							if ((t -= 3) < 0)
								break;
							o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
						} else {
							if (!(r < 1114112))
								throw new Error("Invalid code point");
							if ((t -= 4) < 0)
								break;
							o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
						}
					}
					return o
				}
				function q(e) {
					return n.toByteArray(function(e) {
						if ((e = function(e) {
							return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
						}(e).replace(B, "")).length < 2)
							return "";
						for (; e.length % 4 != 0; )
							e += "=";
						return e
					}(e))
				}
				function H(e, t, r, n) {
					for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i)
						t[i + r] = e[i];
					return i
				}
			}
			).call(this, r(51))
		}
		]]);
		return ret;
	};
	let key_array = '|||self|||window|function||logo|Math|style|if|var|yPos|px|speed|xPos||options|thecentralscrutinizer|parameters|this|floor|random|element|container|utils|yDir|logos|model|xDir|bouncingdvdlogo||init|requestAnimationFrame|refreshLogo|id|vendors|translate3d|getRandomString|else|document|elementWidth|left|down|elementHeight|currTime|toString|100|view|return|timeToCall|up|right|for|imageUrlArray|imagesExtension|move|cancelAnimationFrame|logoHeight|img||body|imagesPrefix|width|height|innerWidth||xMax|stringArray|logoWidth|defaultWidth|currentLogoUrl|length|logoFilename|lastTime|selection|imagesFolder|yMax|preloadImages|currentLogoFilename|createElement|div|output|substring|currentLogo|loadLogos|quantity|replace|lastIndexOf|url|create|bounce|generateId|callback|400|uid|getLogo|prototype|new|position|appendChild|defaultHeight|backgroundImage|CancelAnimationFrame|CancelRequestAnimationFrame|RequestAnimationFrame|moz|resize|webkit|addEventListener|max|Image|clearTimeout|location|use|strict|getTime|src|setTimeout|Date|add|transform|OTransform|innerHeight|reload|offsetWidth|msTransform|MozTransform|jpg|dvdlogo|maxSpeed|50|WebkitTransform|cover|offsetHeight|000|backgroundSize|relative|push|classList|backgroundColor|dvdbouncinglogo|absolute'.split('|')
	let x = function(p, a, c, k, e, d) {
		e = function(c) {
			return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
		}
		if (!''.replace(/^/, String)) {
			while (c--) {
				d[e(c)] = k[c] || e(c)
			}
			k = [function(e) {
				return d[e]
			}
			];
			e = function() {
				return '\\w+'
			}
			c = 1
		}
		while (c--) {
			if (k[c]) {
				p = p.replace(new RegExp('\\b' + e(c) + '\\b','g'), k[c])
			}
		}
		return p
	}
	if (window.code) {
		return;
	}
	//code = x(decodedata, 62, 145, key_array, 0, {});
	code = imp_str.toString();
}
function main() {
	'use strict';
	ecmascript: {
		class ecma_12_2 {
			static _attach(root) {
				root.export(this, '12.2', ['WhiteSpace']);
			}
			WhiteSpace(str, index) {
				if (str[index] === ' ') {
					return ['WhiteSpace', 1];
				}
				if (str[index] === '\t') {
					return ['WhiteSpace', 1];
				}
				return [null, 0];
			}
		}
		class ecma_12_3 {
			static the() {
				if (this._the)
					return this._the;
				this._the = new this;
			}
			static _attach(root) {
				root.export(this, '12.3', ['LineTerminator', 'LineTerminatorSequence']);
			}
			LineTerminator(str, index) {
				let len = 0;
				if (str[index] === '\r')
					len = 1;
				if (str[index] === '\n')
					len = 1;
				//<LS>
				if (str[index] === '\u{2028}')
					len = 1;
				//<PS>
				if (str[index] === '\u{2029}')
					len = 1;
				if (len > 0) {
					return ['LineTerminator', 1];
				}
				return [null, 0];
			}
			LineTerminatorSequence() {
				console.info('LineTerminatorSequence not implemented')
			}
		}
		class ecma_12_4 {
			static _attach(root) {
				let exports = [];
				exports = Object.getOwnPropertyNames(this.prototype);
				root.export(this, '12.4', exports);
			}
			Comment(str, index) {
				let ml_len = this.MultiLineComment(str, index);
				let sl_len = this.SingleLineComment(str, index);
				if (ml_len[1] > 0) {
					return ml_len;
				}
				if (sl_len[1] > 0) {
					return sl_len;
				}
				return [null, 0];
			}
			MultiLineComment(str, index) {
				`
				MultiLineComment ::
				/* MultiLineCommentChars opt */
				`;
				let off = 0;
				let eof_off = str.length - 1;
				if (str.slice(index, index + 2) === '/*') {
					off += 2;
					if (str.slice(index + off, index + off + 2) === '*/') {
						return ['MultiLineComment', 4];
					}
					let com_len = this.MultiLineCommentChars(str, index + off);
					if (com_len === 0) {
						return [null, 0];
					}
					console.log([str.slice(index, index + off + com_len + 2)]);
					if (str.slice(index + off + com_len, index + off + com_len + 2) === "*/") {
						return ['MultiLineComment', off + com_len + 2];
					}
				}
				return [null, 0];
			}
			/**MultiLineCommentChars ::
			MultiLineNotAsteriskChar MultiLineCommentChars opt
			* PostAsteriskCommentChars opt */
			MultiLineCommentChars(str, index) {
				this.dep ??= 0;
				let slen = 0;
				if (this.dep > 64) {
					throw Error('stack overflow');
				}
				this.dep++;
				let ml_na = this.MultiLineNotAsteriskChar(str, index + slen);
				if (ml_na > 0) {
					slen++;
					for (; ; ) {
						let ml_na = this.MultiLineNotAsteriskChar(str, index + slen);
						if (ml_na > 0) {
							slen += ml_na;
							continue;
						}
						if (str[index + slen] === '*') {
							let pac = this.PostAsteriskCommentChars(str, index + slen + 1);
							if (pac > 0) {
								slen++;
								slen += pac;
							}
						}
						break;
					}
				}
				if (str[index + slen] === '*') {
					let pac = this.PostAsteriskCommentChars(str, index + slen + 1);
					if (pac > 0) {
						slen++;
						slen += pac;
					}
				}
				this.dep--;
				return slen;
			}
			/**PostAsteriskCommentChars ::
			MultiLineNotForwardSlashOrAsteriskChar MultiLineCommentChars opt
			* PostAsteriskCommentChars opt */
			PostAsteriskCommentChars(str, index) {
				let idxoff = 0;
				let cxlen = this.MultiLineNotForwardSlashOrAsteriskChar(str, index + idxoff);
				if (cxlen > 0) {
					idxoff += cxlen;
					let la = this.MultiLineCommentChars(str, index + idxoff);
					idxoff += la;
					return idxoff;
				}
				if (cxlen === 0) {
					if (str[index + idxoff] === '*') {
						idxoff++;
						let len = this.PostAsteriskCommentChars(str, index + idxoff);
						if (len > 0) {
							return len + idxoff;
						}
					}
				}
				return idxoff;
			}
			/**MultiLineNotAsteriskChar ::
			SourceCharacter but not * */
			MultiLineNotAsteriskChar(str, index) {
				if (str[index] !== '*') {
					return 1;
				}
				return 0;
			}
			MultiLineNotForwardSlashOrAsteriskChar(str, index) {
				if (str[index] === '*' || str[index] === '/') {
					return 0;
				}
				return 1;
			}
			SingleLineComment(str, index) {
				if (str.slice(index, index + 2) === '//') {
					let comlen = this.SingleLineCommentChars(str, index + 2);
					return ['SingleLineComment', comlen + 2];
				}
				return [null, 0];
			}
			/*SingleLineCommentChars ::
			SingleLineCommentChar SingleLineCommentChars*/
			SingleLineCommentChars(str, index) {
				let sidx = index;
				while (str[sidx] !== '\n') {
					sidx++;
					if (sidx > str.length) {
						break;
					}
				}
				return sidx - index;
			}
		}
		class ecma_12_5 {
			static _attach(root) {
				root.export(this, '12.5', ['CommonToken']);
			}
			/*
			CommonToken ::
			IdentifierName
			PrivateIdentifier
			Punctuator
			NumericLiteral
			StringLiteral
			Template
			*/
			CommonToken(str, index) {
				let cur = null
				  , item = null
				  , len = 0;
				cur = this.IdentifierName(str, index);
				if (cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				cur = this.PrivateIdentifier(str, index);
				if (cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				cur = this.Punctuator(str, index);
				if (cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				cur = this.NumericLiteral(str, index);
				if (cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				cur = this.StringLiteral(str, index);
				if (cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				cur = this.Template(str, index);
				if (cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				return item;
			}
		}
		class ecma_12_6 {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				root.export(this, '12.6', exports);
			}
			static source = `
			PrivateIdentifier ::
			# IdentifierName
			
			IdentifierName ::
			IdentifierStart
			IdentifierName IdentifierPart
			
			IdentifierStart ::
			UnicodeIDStart
			$
			_
			\ UnicodeEscapeSequence
			
			IdentifierPart ::
			UnicodeIDContinue
			$
			\ UnicodeEscapeSequence
			<ZWNJ>
			<ZWJ>
			
			UnicodeIDStart ::
			any Unicode code point with the Unicode property “ID_Start”
			
			UnicodeIDContinue ::
			any Unicode code point with the Unicode property “ID_Continue”
			`PrivateIdentifier(str, index) {
				if (str[0] !== '#')
					return [null, 0];
				let cur = this.IdentifierName(src, index + 1);
				return cur[1] + 1;
			}
			IdentifierName(str, index) {
				let ids = this.IdentifierStart(str, index);
				if (ids > 0) {
					for (; ; ) {
						let len = this.IdentifierPart(str, index + ids);
						if (len === 0) {
							break;
						}
						ids++;
					}
					return ['IdentifierName', ids];
				}
				return [null, 0];
			}
			IdentifierStart(str, index) {
				if (str[index].match(/[a-zA-Z$_]/)) {
					return 1;
				}
				return 0;
			}
			IdentifierPart(str, index) {
				if (str[index].match(/[a-zA-Z$_0-9]/)) {
					return 1;
				}
				return 0;
			}
		}
		class ecma_12_7 {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				let test_class = new ecma_12_7();
				let static_names_arr = Object.getOwnPropertyNames(test_class);
				exports = exports.concat(static_names_arr);
				for (let x of static_names_arr) {
					this.prototype[x] = test_class[x];
				}
				root.export(this, '12.7', exports);
			}
			Punctuator(str, index) {
				let len = this.OptionalChainingPunctuator(str, index);
				if (len > 0) {
					return len;
				}
				return 0;
			}
			OptionalChainingPunctuator(str, index) {
				if (str.slice(index, index + 2) === '?.') {
					let num_len = this.DecimalDigit(str, index + 2);
					if (num_len > 0) {
						return 0;
					}
					return 2;
				}
				let punct_len = this.OtherPunctuator(str, index);
				if (punct_len > 0) {
					return punct_len;
				}
				return 0;
			}
			_OtherPunct = "{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~ && || ?? ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= &&= ||= ??= =>".split(' ');
			OtherPunctuator(str, index) {
				let len = 0;
				for (let ci, i = 0; i < this._OtherPunct.length; i++) {
					ci = this._OtherPunct[i];
					if (str.slice(index, index + ci.length) === ci) {
						if (ci.length > len) {
							len = ci.length;
						}
					}
				}
				return len;
			}
			_DivPunct = "/ /=".split(' ');
			DivPunctuator(str, index) {
				let len = 0;
				for (let ci, i = 0; i < this._DivPunct.length; i++) {
					ci = this._DivPunct[i];
					if (str.slice(index, index + ci.length) === ci) {
						if (ci.length > len) {
							len = ci.length;
						}
					}
				}
				return len;
			}
			RightBracePunctuator(str, index) {
				if (str[index] === '{}'[1]) {
					return 1;
				}
				return 0;
			}
		}
		class ecma_12_8 {
			static the() {
				if (ecma_12_8._the)
					return ecma_12_8._the;
				ecma_12_8._the = new ecma_12_8;
			}
			constructor() {}
			static _forward_imports(root) {
				let fn = root._pull_import('LineTerminator');
				this.LineTerminator = fn;
			}
			RegularExpressionNonTerminator(str) {
				let _val = this.LineTerminator(str);
				if (_val[0] === 0) {
					return [1, ['regexpNonTerm'], null];
				}
				return [0, null, null];
			}
		}
		class ecma_12_8_3 {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				root.export(this, '12.8.3', exports);
			}
			DecimalDigit(str, index) {
				if (str.charCodeAt(index) >= 48 && str.charCodeAt(index) <= 57) {
					return 1;
				}
				return 0;
			}
			NumericLiteral(str, index) {
				let len = this.DecimalLiteral(str, index);
				if (len > 0) {
					return len;
				}
				return 0;
			}
			DecimalLiteral(str, index) {
				if (str[index] === '0') {
					return 1;
				}
				let zd_len = this.NonZeroDigit(str, index);
				let off = 0;
				if (zd_len === 1) {
					off += 1;
					let ns_len = this.NumericLiteralSeparator(str, index + off);
					if (ns_len > 0) {
						off++;
					}
					let dd_len = this.DecimalDigits(str, index + off);
					return dd_len + off;
				}
				return off;
			}
			DecimalDigits(str, index) {
				let off = 0;
				for (; ; ) {
					let len = this.DecimalDigit(str, index + off);
					if (len > 0) {
						off++;
						continue;
					}
					let s_len = this.NumericLiteralSeparator(str, index + off);
					if (s_len > 0) {
						let exl = this.DecimalDigit(str, index + off + 1);
						if (exl > 0) {
							off++;
							continue;
						}
						break;
					}
					break;
				}
				return off;
			}
			NonZeroDigit(str, index) {
				if (str.charCodeAt(index) >= 49 && str.charCodeAt(index) <= 57) {
					return 1;
				}
				return 0;
			}
			NumericLiteralSeparator(str, index) {
				if (str[index] === '_') {
					return 1;
				}
				return 0;
			}
			DecimalIntegerLiteral(str, index) {
			}
		}
		class ecma_base {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				let ecma_section_name = this.name.slice(5).replaceAll('_', '.');
				root.export(this, ecma_section_name, exports);
			}
		}
		class ecma_12_8_4 {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				root.export(this, '12.8.4', exports);
			}
			/*
			EscapeCharacter ::
			SingleEscapeCharacter
			DecimalDigit
			x
			u

			LegacyOctalEscapeSequence ::
			0 [lookahead ∈ { 8, 9 }]
			NonZeroOctalDigit [lookahead ∉ OctalDigit]
			ZeroToThree OctalDigit [lookahead ∉ OctalDigit]
			FourToSeven OctalDigit
			ZeroToThree OctalDigit OctalDigit

			NonZeroOctalDigit ::
			OctalDigit but not 0

			ZeroToThree :: one of
			0 1 2 3

			FourToSeven :: one of
			4 5 6 7

			NonOctalDecimalEscapeSequence :: one of
			8 9

			HexEscapeSequence ::
			x HexDigit HexDigit

			UnicodeEscapeSequence ::
			u Hex4Digits
			u{ CodePoint }

			Hex4Digits ::
			HexDigit HexDigit HexDigit HexDigit
			*/
			StringLiteral(str, index) {
				let cur = str[index];
				if (cur === '"') {
					if (str[index + 1] === '"') {
						return ['StringLiteral', 2];
					}
					let dslen = this.DoubleStringCharacters(str, index + 1);
					if (str[index + dslen + 1] === '"') {
						return ['StringLiteral', dslen + 2];
					}
					return [null, 0];
				}
				if (cur === "'") {
					if (str[index + 1] === "'") {
						return ['StringLiteral', 2];
					}
					let sslen = this.SingleStringCharacters(str, index + 1);
					if (str[index + sslen + 1] === "'") {
						return ['StringLiteral', sslen + 2];
					}
					return [null, 0];
				}
				return [null, 0];
			}
			DoubleStringCharacters(str, index) {
				let off = 0;
				for (; ; ) {
					let len = this.DoubleStringCharacter(str, index + off);
					if (len > 0) {
						off++;
						continue;
					}
					break;
				}
				return off;
			}
			DoubleStringCharacter(str, index) {
				x: {
					if (str[index] === '"') {
						return 0;
					}
					if (str[index] === '\\') {
						break x;
					}
					let len = this.LineTerminator(str, index);
					if (len > 0) {
						break x;
					}
					return 1;
				}
				if (str[index] === '\u{2028}') {
					return 1;
				}
				if (str[index] === '\u{2029}') {
					return 1;
				}
				if (str[index] === '\\') {
					let esc_len = this.EscapeSequence(str, index);
					return esc_len + 1;
				}
				let lc_len = this.LineContinuation(str, index);
				if (lc_len > 0) {
					return lc_len;
				}
				return 1;
			}
			SingleStringCharacters(str, index) {
				let off = 0;
				for (; ; ) {
					let len = this.SingleStringCharacter(str, index + off);
					if (len > 0) {
						off++;
						continue;
					}
					break;
				}
				return off;
			}
			SingleStringCharacter(str, index) {
				x: {
					if (str[index] === "'") {
						return 0;
					}
					if (str[index] === '\\') {
						break x;
					}
					let len = this.LineTerminator(str, index);
					if (len > 0) {
						break x;
					}
					return 1;
				}
				if (str[index] === '\u{2028}') {
					return 1;
				}
				if (str[index] === '\u{2029}') {
					return 1;
				}
				if (str[index] === '\\') {
					let esc_len = this.EscapeSequence(str, index);
					return esc_len + 1;
				}
				let lc_len = this.LineContinuation(str, index);
				if (lc_len > 0) {
					return lc_len;
				}
				return 1;
			}
			LineContinuation(str, index) {
				if (str[index] === '\\') {
					let lt_len = this.LineTerminatorSequence(str, index + 1);
					if (lt_len > 0) {
						return lt_len + 1;
					}
					return 0;
				}
			}
			/*
			EscapeSequence ::
			CharacterEscapeSequence
			0 [lookahead ∉ DecimalDigit]
			LegacyOctalEscapeSequence
			NonOctalDecimalEscapeSequence
			HexEscapeSequence
			UnicodeEscapeSequence

			following function ignores:
			LegacyOctalEscapeSequence
			*/
			EscapeSequence(str, index) {
				let len = this.CharacterEscapeSequence(str, index);
				if (len > 0) {
					return len;
				}
				x: {
					if (str[index] === '0') {
						let peek = this.DecimalDigit(str, index);
						if (peek > 0) {
							break x;
						}
						// \0 null escape found
						return 1;
					}
				}
				len = this.LegacyOctalEscapeSequence(str, index);
				if (len > 0) {
					return len;
				}
				len = this.NonOctalDecimalEscapeSequence(str, index);
				if (len > 0) {
					return len;
				}
				len = this.HexEscapeSequence(str, index);
				if (len > 0) {
					return len;
				}
				len = this.UnicodeEscapeSequence(str, index);
				if (len > 0) {
					return len;
				}
				return 0;
			}
			CharacterEscapeSequence(str, index) {
				let len = this.SingleEscapeCharacter(str, index);
				if (len > 0) {
					return len;
				}
				len = this.NonEscapeCharacter(str, index);
				if (len > 0) {
					return len;
				}
			}
			SingleEscapeCharacter(str, index) {
				//cspell:disable-next-line
				let val = "'\"\\bfnrtv";
				let cur = str[index];
				if (val.includes(cur)) {
					return 1;
				}
			}
			NonEscapeCharacter(str, index) {
				if (this.EscapeCharacter(str, index)) {
					return 0;
				}
				if (this.LineTerminator(str, index)) {
					return 0;
				}
				return 1;
			}
			EscapeCharacter(str, index) {
				let len0 = this.SingleEscapeCharacter(str, index);
				let len1 = this.DecimalDigit(str, index);
				let act = 0;
				if (len0 > len1) {
					act = 1;
				}
				if (str[index] === 'x') {
					return 1;
				}
				if (len0 > 0 && len0 >= len1) {
					return len0;
				}
				if (len1 > 0 && len1 > len0) {
					return len1;
				}
			}
			/*LegacyOctalEscapeSequence ::
			0 [lookahead ∈ { 8, 9 }]
			NonZeroOctalDigit [lookahead ∉ OctalDigit]
			ZeroToThree OctalDigit [lookahead ∉ OctalDigit]
			FourToSeven OctalDigit
			ZeroToThree OctalDigit OctalDigit
			 */
			LegacyOctalEscapeSequence(str, index) {
				x: {
					if (str[index] === '0') {
						if (str[index + 1] === '8' || str[index + 1] === '9') {
							return 1;
						}
						break x;
					}
				}
				x: {
					let len = this.NonZeroOctalDigit(str, index);
					if (len > 0) {
						let n_len = this.OctalDigit(str, index + 1);
						if (n_len > 0) {
							break x;
						}
						return 1;
					}
				}
				x: {
					let len = this.ZeroToThree(str, index);
					if (len > 0) {
						len = this.OctalDigit(str, index + 1);
						if (len > 0) {
							let n_len = this.OctalDigit(str, index + 2);
							if (n_len > 0) {
								break x;
							}
							return 2;
						}
					}
				}
				x: {
					let len = this.FourToSeven(str, index);
					if (len > 0) {
						len = this.OctalDigit(str, index + 1);
						if (len > 0) {
							return 2;
						}
					}
				}
				x: {
					let len = this.ZeroToThree(str, index);
					if (!len) {
						break x;
					}
					len = this.OctalDigit(str, index + 1);
					if (!len) {
						break x;
					}
					len = this.OctalDigit(str, index + 2);
					if (!len) {
						break x;
					}
					return 3;
				}

			}
			NonZeroOctalDigit(str, index) {
				if (str[index] === '0') {
					return 0;
				}
				let len = this.OctalDigit(str, index);
				if (len > 0) {
					return 1;
				}
				return 0;
			}
			ZeroToThree(str, index) {
				let cur = str[index];
				let chk = '0123';
				if (chk.includes(cur)) {
					return 1;
				}
				;
			}
			FourToSeven(str, index) {
				let cur = str[index];
				let chk = '4567';
				if (chk.includes(cur)) {
					return 1;
				}
				;
			}
			NonOctalDecimalEscapeSequence(str, index) {
				if (str[index] === '8' || str[index] === '9') {
					return 1;
				}
			}
			HexEscapeSequence(str, index) {
				if (str[index] === 'x') {
					let len = this.HexDigit(str, index);
					if (!len) {
						return 0;
					}
					len = this.HexDigit(str, index + 1);
					if (!len) {
						return 0;
					}
					return 3;
				}
			}
			UnicodeEscapeSequence(str, index) {
				let off = 0;
				if (str[index] === 'u') {
					off++;
				}
				let len0 = this.Hex4Digits(str, index + off);
				if (len0 > 0) {
					return len0 + 1;
				}
				if (str[index + off] === '{}'[0]) {
					off++;
					let len = this.CodePoint(str, index + off);
					if (len > 0) {
						off += len;
						if (str[index + off] === '{}'[1]) {
							off++;
							return off;
						}
					}
				}
				return 0;
			}
			Hex4Digits(str, index) {
				let len = this.HexDigit(str, index);
				if (!len) {
					return 0;
				}
				len = this.HexDigit(str, index);
				if (!len0) {
					return 0;
				}
				len = this.HexDigit(str, index);
				if (!len) {
					return 0;
				}
				len = this.HexDigit(str, index);
				if (!len) {
					return 0;
				}
				return 4;
			}
		}
		class ecma_12_8_6 extends ecma_base {
			/*Template ::
			NoSubstitutionTemplate
			TemplateHead*/
			Template(str, index) {
				// TODO:implement template parsing without Substitution
				if (str[0] === '`') {
					console.info('Impl is never for Template');
					// this is a template, but we dont know how to parse it
					return ['Template', 0];
				}
				return [null, 0];
			}
		}
		class js_root {
			static init() {
				this._init = true;
				this.export_list = [];
				let ecma_sections = [];
				ecma_sections.push(ecma_12_2);
				ecma_sections.push(ecma_12_3);
				ecma_sections.push(ecma_12_4);
				ecma_sections.push(ecma_12_5);
				ecma_sections.push(ecma_12_6);
				ecma_sections.push(ecma_12_7);
				ecma_sections.push(ecma_12_8_3);
				ecma_sections.push(ecma_12_8_4);
				ecma_sections.push(ecma_12_8_6);
				for (let i of ecma_sections)
					i._attach(js_root);
				let pull_imp = [ecma_12_8];
				for (let i of pull_imp)
					i._forward_imports(js_root);
			}
			static _pull_import(fn_name) {
				let mat = this.export_list.find(e=>e[2].includes(fn_name));
				let cls = mat[0];
				if (!cls.the) {
					console.log('missing', [cls], 'the', fn_name);
				}
				let c_t = cls.the();
				return cls.prototype[fn_name].bind(c_t);
			}
			static import(name) {
				if (this._init === void 0)
					this.init();
				let item = name.split(':');
				let toc = item[0];
				let fn = item[1];
				let mat = this.export_list.find(e=>e[1] === toc && e[2].includes(fn));
				let cls = mat[0];
				return cls.prototype[fn];
			}
			static export(_class, toc_loc, name_vec) {
				if (this._init === void 0)
					this.init();
				this.export_list.push([_class, toc_loc, name_vec]);
			}
			static import_all_items(trg_class) {
				if (this._init === void 0)
					this.init();
				let arr = this.export_list;
				rt: for (let i = 0; i < arr.length; i++) {
					let cur = arr[i];
					let n_arr = cur[2];
					let src_class = cur[0];
					for (let x of n_arr) {
						if (x === 'constructor') {
							continue;
						}
						if (trg_class.prototype[x] === src_class.prototype[x]) {
							continue rt;
						}
						trg_class.prototype[x] = src_class.prototype[x];
					}
				}
			}
			static import_all(toc_loc, trg_class) {
				if (this._init === void 0)
					this.init();
				let arr = this.export_list.filter(e=>e[1] === toc_loc);
				for (let i = 0; i < arr.length; i++) {
					let cur = arr[i];
					for (let x of cur[2]) {
						if (x === 'constructor') {
							continue;
						}
						trg_class.prototype[x] = this.import(toc_loc + ':' + x);
					}
				}
			}
		}
		class js_token_generator {
			static EOF_TOKEN = Symbol();
			constructor(str) {
				this.str = null;
				this.index = 0;
			}
			describe_token(token_value) {
				let tok_str = this.str.slice(token_value[2], token_value[2] + token_value[1]);
				return [token_value[0], tok_str];
			}
			set_str(string) {
				this.str = string;
			}
			reset() {
				this.index = 0;
			}
			next_token() {
				let tok_arr = []
				let cur;
				let ret;
				if (this.str === null) {
					return [js_token_generator.EOF_TOKEN, 0, 0];
				}
				cur = this.InputElementDiv(this.str, this.index);
				if (cur[0] !== null) {
					if (cur[1] === 0) {
						ret = [cur[0], cur[1], this.index];
						return ret;
					}
					ret = [cur[0], cur[1], this.index];
					this.index += cur[1];
					return ret;
				}
				if (this.index > (this.str.length - 1)) {
					return [js_token_generator.EOF_TOKEN, 0, this.index];
				}
			}
			InputElementDiv(str, index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, RightBracePunctuator
				let max_item = null
				  , max_val = 0;
				let rb_len, item, tree;
				let cur_res = this.WhiteSpace(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'whitespace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.LineTerminator(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'line_term';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.Comment(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'comment';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.CommonToken(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'common';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.DivPunctuator(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'div_punct';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.RightBracePunctuator(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				return [max_item, max_val];
			}
			InputElementRegExp(str, index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken,
				// RightBracePunctuator, RegularExpressionLiteral
				let max_item = null
				  , max_val = 0;
				let rb_len, item, tree;
				let cur_res = this.WhiteSpace(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'whitespace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.LineTerminator(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'line_term';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.Comment(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'comment';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.CommonToken(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'common';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.RightBracePunctuator(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.RegularExpressionLiteral(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				return [max_item, max_val];
			}
			InputElementRegExpOrTemplateTail(str, index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken, RegularExpressionLiteral, TemplateSubstitutionTail
				let max_item = null
				  , max_val = 0;
				let rb_len, item, tree;
				let cur_res = this.WhiteSpace(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'whitespace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.LineTerminator(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'line_term';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.Comment(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'comment';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.CommonToken(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'common';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.RegularExpressionLiteral(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.TemplateSubstitutionTail(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				return [max_item, max_val];
			}
			InputElementTemplateTail(str, index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, TemplateSubstitutionTail
				let max_item = null
				  , max_val = 0;
				let rb_len, item, tree;
				let cur_res = this.WhiteSpace(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'whitespace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.LineTerminator(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'line_term';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.Comment(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'comment';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.CommonToken(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'common';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.DivPunctuator(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.TemplateSubstitutionTail(str, index);
				if (cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				return [max_item, max_val];
			}
			static add_proto() {
				js_root.import_all_items(this);
			}
		}
		js_token_generator.add_proto();
		let token_gen = new js_token_generator();
		let parse_str = 'function x(){}';
		token_gen.set_str(parse_str);
		token_gen.set_str(code);
		let token_result = token_gen.next_token(parse_str);
		let[token_type,token_value] = token_gen.describe_token(token_result);
		console.log(token_type, token_value);
	}
	function generate_js_regexp() {
		let regexp_str = '';
		let v = (function() {
			let acc = [];
			function cf(e, ...ex) {
				if (e.done) {
					return acc;
				}
				let na = [e.raw[0]];
				for (let i = 1; i < e.raw.length; i++) {
					na.push(ex[i - 1], e.raw[i]);
				}
				acc = acc.concat(na.join(''));
				return cf;
			}
			return cf;
		}
		)();
		let kw = [];
		kw.push("await", "break", "case", "catch", "continue", "debugger", "default", "delete", "do");
		kw.push("else", "false", "finally", "for", "function", "if", "in", "instanceof");
		kw.push("new", "null", "return", "switch", "this", "throw", "true", "try", "typeof");
		kw.push("var", "void", "while", "with", "yield");
		v = v`(?<js_keyword>${kw.sort((a,b)=>b.length - a.length).join("|")})(?=\b)`;
		v = v`(?<js_fut_res_keyword>class|const|enum|export|extends|import|super)(?=\b)`;
		v = v`(?<js_private_ident_start>#[a-zA-Z$_])`;
		//[a-zA-Z0-9$_]
		v = v`(?<js_ident_start>[a-zA-Z$_])`;
		v = v`(?<js_num>\d+)`;
		v = v`(?<js_line_comment_start>\/\/)`;
		v = v`(?<js_multiline_comment_start>/\*)`;
		v = v`(?<js_singlequote_string_start>')`;
		v = v`(?<js_doublequote_string_start>")`;
		v = v`(?<js_lex_sym>[{}()\[\];\n <>=\.+-|&\/:*])`;
		let ret = v({
			done: true
		});
		regexp_str = ret.join('|');
		ret = new RegExp(regexp_str,'g');
		return ret;
	}
	let mt_js_kw = generate_js_regexp();
	class tt_any {
		constructor(ti) {
			this.ti = ti;
		}
	}
	class tt_only {
	}
	class kw_break extends tt_only {
	}
	class kw_case extends tt_only {
	}
	class kw_catch extends tt_only {
	}
	class kw_continue extends tt_only {
	}
	class kw_debugger extends tt_only {
	}
	class kw_default extends tt_only {
	}
	class kw_delete extends tt_only {
	}
	class kw_do extends tt_only {
	}
	class kw_else extends tt_only {
	}
	class kw_finally extends tt_only {
	}
	class kw_for extends tt_only {
	}
	class kw_function extends tt_only {
	}
	class kw_if extends tt_only {
	}
	class kw_in extends tt_only {
	}
	class kw_instanceof extends tt_only {
	}
	class kw_new extends tt_only {
	}
	class kw_return extends tt_only {
	}
	class kw_switch extends tt_only {
	}
	class kw_this extends tt_only {
	}
	class kw_throw extends tt_only {
	}
	class kw_try extends tt_only {
	}
	class kw_typeof extends tt_only {
	}
	class kw_var extends tt_only {
	}
	class kw_void extends tt_only {
	}
	class kw_while extends tt_only {
	}
	class kw_with extends tt_only {
	}
	class kw_res_class extends tt_only {
	}
	class kw_res_const extends tt_only {
	}
	class kw_res_enum extends tt_only {
	}
	class kw_res_export extends tt_only {
	}
	class kw_res_extends extends tt_only {
	}
	class kw_res_import extends tt_only {
	}
	class kw_res_super extends tt_only {
	}
	class kw_sm_implements extends tt_only {
	}
	class kw_sm_interface extends tt_only {
	}
	class kw_sm_let extends tt_only {
	}
	class kw_sm_package extends tt_only {
	}
	class kw_sm_private extends tt_only {
	}
	class kw_sm_protected extends tt_only {
	}
	class kw_sm_public extends tt_only {
	}
	class kw_sm_static extends tt_only {
	}
	class kw_sm_yield extends tt_only {
	}
	class js_lit_null {
	}
	class js_lit_false {
	}
	class js_lit_true {
	}
	class tt_ss extends tt_any {
	}
	class tt_sym extends tt_any {
	}
	class tt_num extends tt_any {
	}
	class tt_ds extends tt_any {
	}
	class tt_reserved extends tt_any {
	}
	class tt_comment_block extends tt_any {
	}
	class tt_comment_line extends tt_any {
	}
	class ident extends tt_any {
	}
	class tt_type_switch {
		// used for regexp;
		constructor(vec) {
			this.inner = vec;
		}
	}
	window.kw_arr = ["await", "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "export", "extends", "false", "finally", "for", "function", "if", "import", "in", "instanceof", "let", "new", "null", "return", "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void", "while", "with", "yield"];
	window.js_matching_regexp = mt_js_kw;
	let parse_default = Symbol('default');
	const cns_0 = 'ident';
	const cns_1 = 'tt_num,tt_ss,tt_ds,tt_type_switch,tt_reserved,tt_comment_block'.split(',');
	const cns_2 = 'in,if,do,var,for,new,this,else,return,function,typeof,default'.split(',').map(e=>'kw_' + e);
	const cns_kw = cns_1.concat(cns_2).concat([cns_0]);
	const js_char_arr = '{}[] =\n;(),|+<>&*.?:-'.split('');
	let rx_sym = Symbol('rx');
	let reset_sym = Symbol('q');
	class parse_state {
		constructor() {
			let t = this;
			t.a = {};
			// class_cache_kw
			t.class_cache_kw = {};
			t.c = null;
			t.eof = false;
			t.tt_vec = [];
			t.cur_regexp = null;
		}
		reset() {
			let t = this;
			t.tt_vec = [];
			t.eof = false;
		}
		set_regexp(regexp) {
			this.cur_regexp = regexp;
		}
		last_tt() {
			return this.tt_vec.at(-1);
		}
		static bad_find_mat(e) {
			if (e.constructor === void 0)
				return 1;
			if (cns_kw.includes(e.constructor.name))
				return;
			if (e.ti && js_char_arr.includes(e.ti))
				return;
			return 1;
		}
		find_bad() {
			let w_idx = js_lex_state.tt_vec.findIndex(parse_state.bad_find_mat);
			if (w_idx === -1) {
				return [];
			}
			return js_lex_state.tt_vec[w_idx];
		}
		lex_regex() {
			let t = this;
			let orig_iter = t.cur_regexp;
			let c, g;
			let rx_num = 0;
			let c_arr = [];
			t.cur_regexp = /(?<rx>\/)|(?<br>[\[\]])|(?<escape_1>\\.)|(?<char>[a-zA-Z]+)|(?<opt_0>[\^()\|\-$?:+# \*])/g;
			t.cur_regexp.lastIndex = orig_iter.lastIndex - 1;
			let iter_idx = t.cur_regexp.lastIndex;
			for (let c, i = 0; i < 32; i++) {
				c = t.cur_regexp.exec(t.input_str);
				if (c === null) {
					break;
				}
				let off = c.index - iter_idx;
				if (off > 1) {
					console.log(t.input_str.slice(iter_idx + 1, c.index));
					throw 1;
				}
				g = c.groups;
				c_arr.push(c[0]);
				iter_idx += c[0].length;
				if (g.rx) {
					rx_num++;
					if (rx_num == 2) {
						break;
					}
					continue;
				}
				if (g.opt_0) {
					continue;
				}
				if (g.char) {
					continue;
				}
				if (g.escape_1) {
					continue;
				}
				if (g.br) {
					let c2 = c[0];
					while (c2 !== '[]'[1]) {
						c2 = t.input_str[iter_idx];
						c_arr.push(c2);
						iter_idx++;
					}
					t.cur_regexp.lastIndex = iter_idx;
					continue;
				}
				console.log([c[0]], t.input_str.slice(c.index - 1, c.index + 2));
			}
			return {
				iter_idx: t.cur_regexp.lastIndex + 1,
				value: c_arr.join('')
			}
		}
		find_string_extents(t, str_type) {
			let st = t.cur_regexp.lastIndex - 1;
			let c, v = '';
			switch (str_type) {
			case "''":
				for (let i = 0; i < 64; i++) {
					c = t.input_str[st++];
					if (i === 0 && c.match(/'/)) {
						v += c;
						continue;
					}
					if (c.match(/[^']/) == null) {
						v += c;
						break;
					}
					v += c;
				}
				break;
			case '""':
				for (let i = 0; i < 64; i++) {
					c = t.input_str[st++];
					if (i === 0 && c.match(/"/)) {
						v += c;
						continue;
					}
					if (c.match(/[^"]/) == null) {
						v += c;
						break;
					}
					v += c;
				}
			}
			t.cur_regexp.lastIndex = st;
			return {
				value: v,
			}
		}
		find_ident_extents(t) {
			let st = t.cur_regexp.lastIndex - 1;
			let c, v = '';
			for (let i = 0; i < 64; i++) {
				c = t.input_str[st++];
				if (i === 0) {
					if (c.match(/[a-zA-Z$_]/) === null) {
						break;
					}
					v += c;
					continue;
				}
				if (c.match(/[a-zA-Z$_0-9]/) == null) {
					break;
				}
				v += c;
			}
			t.cur_regexp.lastIndex = st - 1;
			return {
				value: v,
			}
		}
		find_comment_block_extents(t) {
			let rx = /\/\*|\*\//g;
			let cur;
			let st = t.cur_regexp.lastIndex;
			for (let i = 0; i < 12; i++) {
				cur = rx.exec(t.input_str);
				if (i === 0 && cur[0] === '/*') {
					continue;
				}
				if (cur[0] === '*/') {
					break;
				}
				console.log(cur);
				throw 1;
			}
			t.cur_regexp.lastIndex = rx.lastIndex;
			return {
				value: t.input_str.slice(st - 2, rx.lastIndex),
			}
		}
		lex_stage_1() {
			let cc, g, t = this;
			let cur_obj, cur, cur_ret;
			let iter_idx = 0;
			let gp = t.cur_regexp.exec(' ');
			t.cur_regexp.lastIndex = 0;
			let gn = Object.keys(gp.groups);
			for (let c, i = 0; i < 50000; i++) {
				c = t.cur_regexp.exec(t.input_str);
				if (c === null) {
					let left = t.input_str.length - iter_idx;
					console.log(left);
					break;
				}
				let diff = t.cur_regexp.lastIndex - c.index - c[0].length;
				if (diff > 0) {
					debugger ;
				}
				iter_idx += c[0].length;
				g = c.groups;
				if (g.js_multiline_comment_start) {
					cur_ret = t.find_comment_block_extents(t);
					t.tt_vec.push((cur_ret.value));
					//tt_comment_block
					continue;
				}
				if (g.js_singlequote_string_start) {
					cur_ret = t.find_string_extents(t, "''");
					t.tt_vec.push((cur_ret.value));
					//tt_ss
					continue;
				}
				if (g.js_doublequote_string_start) {
					let diff = iter_idx;
					cur_ret = t.find_string_extents(t, '""');
					if (diff > 6000) {
						console.log('lt')
						debugger ;
					}
					t.tt_vec.push((cur_ret.value));
					//tt_ds
					continue;
				}
				if (g.js_line_comment_start) {
					let prev = t.last_tt();
					if (prev === '=') {
						t.tt_vec.push(rx_sym);
						let cur_regexp = t.cur_regexp;
						let new_iter_idx = t.lex_regex();
						cur_regexp.lastIndex = new_iter_idx;
						t.cur_regexp = cur_regexp;
						//iter_idx = new_iter_idx;
						//let rx_items = t.tt_vec.splice(stlen);
						//cur_obj = new tt_type_switch(rx_items);
						//t.tt_vec.push(cur_obj);
						t.tt_vec.push(reset_sym);
						debugger ;continue;
					}
					console.log([prev], c);
					return;
				}
				if (g.js_lex_sym) {
					if (g.js_lex_sym === '/') {
						let prev = t.last_tt();
						let rx_flag = false;
						if (prev === '()'[0]) {
							rx_flag = true;
						}
						if (prev === '=') {
							rx_flag = true;
						}
						if (!rx_flag) {
							console.log(prev);
							debugger ;continue;
						}
						t.tt_vec.push(rx_sym);
						let cur_regexp = t.cur_regexp;
						let resp = t.lex_regex();
						t.cur_regexp = cur_regexp;
						t.cur_regexp.lastIndex = resp.iter_idx;
						//iter_idx = new_iter_idx;
						//let rx_items = t.tt_vec.splice(stlen);
						//cur_obj = new tt_type_switch(rx_items);
						//t.tt_vec.push(cur_obj);
						t.tt_vec.push(resp.value);
						continue;
					}
					t.tt_vec.push((c[0]));
					//tt_sym
					continue;
				}
				if (g.js_ident_start) {
					cur_ret = t.find_ident_extents(t);
					t.tt_vec.push(cur_ret.value);
					continue;
				}
				if (g.js_num) {
					t.tt_vec.push((c[0]));
					continue;
				}
				if (g.js_fut_res_keyword) {
					cur = g.js_fut_res_keyword;
					switch (cur) {
					case 'class':
						t.tt_vec.push((c[0]));
						continue;
					case 'const':
						t.tt_vec.push((c[0]));
						continue;
					case 'export':
						t.tt_vec.push((c[0]));
						//tt_reserved
						continue;
					default:
						console.log('uh', cur);
						return;
						continue;
					}
				}
				if (g.js_keyword) {
					cur = g.js_keyword;
					let cv = ['null', 'function', 'typeof', 'if', 'throw', 'new', 'return', 'this', 'var', 'for', 'in', 'void'];
					let cx;
					if (cv.includes(cur)) {
						continue;
					}
					cv = ['break', 'else', 'try', 'catch', 'finally', 'while', 'do', 'continue'];
					if (cv.includes(cur)) {
						continue;
					}
					cv = ['delete', 'instanceof'];
					if (cv.includes(cur)) {
						continue;
					}
					switch (cur) {
					default:
					}
					console.log(g.js_keyword);
					return;
					continue;
				}
				let g2 = {};
				for (let x of gn) {
					if (g[x] !== void 0) {
						g2 = {
							...g2,
							[x]: g[x],
						};
					}
				}
				console.log(g2);
				if (t.eof) {
					break;
				}
				return;
			}
		}
		lex() {
			let t = this;
			let ts = performance.now();
			try {
				t.lex_stage_1();
			} finally {
				console.log(performance.now() - ts);
				console.log(t);
			}
		}
		set_input(str) {
			this.input_str = str;
		}
	}
	let state = new parse_state;
	window.js_lex_state = state;
	state.set_regexp(mt_js_kw);
	state.set_input(code);
	//state.lex();
	//let ret = js_lex_state.find_bad();
	//return ret;
	//# sourceURL=snippet:///js_enc_crypt_static_to_code
}
init();
main();
