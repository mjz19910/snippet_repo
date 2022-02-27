// ==UserScript==
// @name			rebuild the universe auto
// @namespace		http://tampermonkey.net/
// @version			0.2
// @description		try to take over the world!
// @author			You
// @match			http://rebuildtheuniverse.com/?type=real
// @match			http://rebuildtheuniverse.com/?type=mjz_version
// @match			http://rebuildtheuniverse.com
// @match			https://rebuildtheuniverse.com/?type=real
// @match			https://rebuildtheuniverse.com/?type=mjz_version
// @match			https://rebuildtheuniverse.com
// @match           https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/
// @match           https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/?type=real
// @match           https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/?type=mjz_version
// @run-at			document-start
// @grant			none
// ==/UserScript==
/* eslint-disable no-undef,no-lone-blocks,no-eval */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    'use strict';
    var AUDIO_ELEMENT_VOLUME = 0.58;
    var AudioMuted = true;
    var AutoBuyMulModifierFactor = 1;
    var AutoBuyRatioDiv = 3;
    var LOG_LEVEL_CRIT = 1;
    var LOG_LEVEL_ERROR = 2;
    var LOG_LEVEL_WARN = 3;
    var LOG_LEVEL_NOTICE = 4;
    var LOG_LEVEL_INFO = 5;
    var LOG_LEVEL_DEBUG = 6;
    var LOG_LEVEL_TRACE = 7;
    var local_logging_level = 3;
    /**@type {['crit','error','warn','notice','info','debug','trace']} */
    var logging_levels = ['crit', 'error', 'warn', 'notice', 'info', 'debug', 'trace'];
    /**@arg {(typeof logging_levels)[number]} level_str @arg {string} format_str@arg {any[]} args */
    function append_console_message(level_str, format_str) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        console.log.apply(console, __spreadArray(["[%s] " + format_str, level_str], args, false));
    }
    /** @param {number} level @arg {string} format_str @arg {any[]} args */
    function l_log_if(level, format_str) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (level > local_logging_level)
            return;
        switch (level) {
            case LOG_LEVEL_CRIT:
                append_console_message.apply(void 0, __spreadArray(['crit', format_str], args, false));
                break;
            case LOG_LEVEL_ERROR:
                append_console_message.apply(void 0, __spreadArray(['error', format_str], args, false));
                break;
            case LOG_LEVEL_WARN:
                append_console_message.apply(void 0, __spreadArray(['warn', format_str], args, false));
                break;
            case LOG_LEVEL_NOTICE:
                append_console_message.apply(void 0, __spreadArray(['notice', format_str], args, false));
                break;
            case LOG_LEVEL_INFO:
                append_console_message.apply(void 0, __spreadArray(['info', format_str], args, false));
                break;
            case LOG_LEVEL_DEBUG:
                append_console_message.apply(void 0, __spreadArray(['debug', format_str], args, false));
                break;
            case LOG_LEVEL_TRACE:
                append_console_message.apply(void 0, __spreadArray(['trace', format_str], args, false));
                break;
        }
    }
    /**@typedef {import("types/vm/mod.js").Boxed} Boxed */
    /**@typedef {import("types/vm/mod.js").IStackVM} IStackVM */
    /**@typedef {import("types/vm/mod.js").InstructionType} InstructionType */
    /**@typedef {import("types/vm/mod.js").IndexedFnBox} VMIndexedCallableValue */
    /**@typedef {import("types/vm/mod.js").CSSStyleSheetConstructorBox} VMBoxedCSSStyleSheetConstructor */
    /**@implements {VMBoxedCSSStyleSheetConstructor} */
    var VMBoxedCSSStyleSheetConstructorR = /** @class */ (function () {
        /**@arg {typeof CSSStyleSheet} value */
        function VMBoxedCSSStyleSheetConstructorR(value) {
            /**@type {"constructor_box"} */
            this.type = "constructor_box";
            /**@type {"javascript"} */
            this.from = "javascript";
            /**@type {"CSSStyleSheet"} */
            this.instance_type = "CSSStyleSheet";
            /**@type {"CSSStyleSheet"} */
            this.constructor_type = "CSSStyleSheet";
            this.value = value;
        }
        /**@arg {'function'} to_match */
        VMBoxedCSSStyleSheetConstructorR.prototype.get_matching_typeof = function (to_match) {
            if (typeof this.value === to_match) {
                return this;
            }
            return null;
        };
        return VMBoxedCSSStyleSheetConstructorR;
    }());
    /**@typedef {import("types/vm/mod.js").CSSStyleSheetBox} VMBoxedCSSStyleSheet */
    /**@implements {VMBoxedCSSStyleSheet} */
    var VMBoxedCSSStyleSheetR = /** @class */ (function () {
        /**@arg {CSSStyleSheet} value */
        function VMBoxedCSSStyleSheetR(value) {
            /**@type {"instance_box"} */
            this.type = "instance_box";
            /**@type {"CSSStyleSheet"} */
            this.instance_type = "CSSStyleSheet";
            this.value = value;
        }
        /**@arg {'function'} to_match */
        VMBoxedCSSStyleSheetR.prototype.get_matching_typeof = function (to_match) {
            return null;
        };
        return VMBoxedCSSStyleSheetR;
    }());
    /**@typedef {import("types/vm/mod.js").PromiseBox} PromiseBox */
    /**@implements {PromiseBox} */
    var PromiseBoxImpl = /** @class */ (function () {
        /**@arg {Promise<Boxed>} value */
        function PromiseBoxImpl(value) {
            /**@type {"promise"} */
            this.type = "promise";
            /**@type {"value"} */
            this.await_type = "value";
            this.value = value;
        }
        /**@arg {'function'} _to_match */
        PromiseBoxImpl.prototype.get_matching_typeof = function (_to_match) {
            return null;
        };
        return PromiseBoxImpl;
    }());
    /**@typedef {import("types/vm/mod.js").NewableFunctionBox} VMBoxedNewableFunction */
    /**@implements {VMBoxedNewableFunction} */
    var VMBoxedNewableFunctionR = /** @class */ (function () {
        /**@arg {{new (v:any):any}} value */
        function VMBoxedNewableFunctionR(value) {
            /**@type {"constructor_box"} */
            this.type = "constructor_box";
            /**@type {"typescript"} */
            this.from = "typescript";
            this.instance_type = null;
            /**@type {"NewableFunction"} */
            this.constructor_type = "NewableFunction";
            this.value = value;
        }
        /**@arg {'function'} to_match */
        VMBoxedNewableFunctionR.prototype.get_matching_typeof = function (to_match) {
            if (typeof this.value === to_match) {
                return this;
            }
            return null;
        };
        return VMBoxedNewableFunctionR;
    }());
    /**@typedef {import("types/vm/mod.js").Unboxed} Unboxed */
    var CallableFunctionImpl = /** @class */ (function () {
        /**@arg {{(...a:Unboxed[]) : Unboxed}} value */
        function CallableFunctionImpl(value) {
            /**@type {"callable_box"} */
            this.type = "callable_box";
            this.parameters_type_array = null;
            this.instance_type = null;
            this.return_type = null;
            this.value = value;
        }
        /**@arg {'function'} to_match */
        CallableFunctionImpl.prototype.get_matching_typeof = function (to_match) {
            if (typeof this.value === to_match) {
                return this;
            }
            return null;
        };
        return CallableFunctionImpl;
    }());
    /**@type {<T, X extends keyof T>(obj:{[V in keyof T]:T[V]}, key:X)=>{v:T[X]} | null} */
    function safe_get(obj, key) {
        var cur_proto = obj;
        var prop = null;
        while (cur_proto !== null && !prop) {
            prop = Object.getOwnPropertyDescriptor(cur_proto, key);
            cur_proto = Object.getPrototypeOf(cur_proto);
        }
        if (!prop)
            return null;
        if (!prop.value) {
            if (prop.get) {
                var res = prop.get.call(obj);
                return {
                    v: res
                };
            }
            else if (prop.set) {
                console.log('ignored set only ownProperty');
                return null;
            }
            else {
                return null;
            }
        }
        return {
            v: prop.value
        };
    }
    /**@typedef {import("types/vm/mod.js").FunctionBox} FunctionBox */
    /**@implements {FunctionBox} */
    var FunctionBoxImpl = /** @class */ (function () {
        /**@arg {FunctionBox['value']} value */
        function FunctionBoxImpl(value) {
            /**@type {"function_box"} */
            this.type = "function_box";
            this.return_type = null;
            this.value = value;
        }
        /**@arg {'function'} to_match */
        FunctionBoxImpl.prototype.get_matching_typeof = function (to_match) {
            if (typeof this.value === to_match) {
                return this;
            }
            return null;
        };
        return FunctionBoxImpl;
    }());
    /**@typedef {import("./types/vm/mod.js").InstructionCall} InstructionCall */
    var InstructionCallE = /** @class */ (function () {
        function InstructionCallE() {
        }
        /**@arg {Boxed} v */
        InstructionCallE.unbox_value = function (v) {
            if (typeof v != 'object') {
                return v;
            }
            else if (v === null) {
                return v;
            }
            else {
                if (v.type === 'special') {
                    if (v.value_type === 'void') {
                        throw new Error("Attempt to use a box with void type");
                    }
                    else {
                        throw new Error("TODO");
                    }
                }
                return v.value;
            }
        };
        /**@arg {Boxed[]} v_arr */
        InstructionCallE.unbox_args = function (v_arr) {
            var _this = this;
            return v_arr.map(function (v) {
                return _this.unbox_value(v);
            });
        };
        /**@arg {InstructionCall} instruction @arg {IStackVM} vm */
        InstructionCallE.execute_instruction = function (vm, instruction) {
            var number_of_arguments = instruction[1];
            if (typeof number_of_arguments != 'number')
                throw new Error("Invalid");
            if (number_of_arguments <= 1) {
                throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
            }
            var _b = vm.pop_arg_count(number_of_arguments), target_this = _b[0], target_fn = _b[1], arg_arr = _b.slice(2);
            var a = target_fn;
            if (typeof a != 'object')
                throw new Error("Invalid");
            if (a === null)
                throw new Error("Invalid");
            if (a.type === 'special') {
                if (a.value_type === 'void')
                    throw new Error("Attempt to call a void value");
                throw new Error("Invalid");
            }
            var b = a.get_matching_typeof('function');
            if (!b)
                throw new Error("Type mismatch");
            if (b.type === 'function_box') {
                var ret = b.value.apply(target_this, this.unbox_args(arg_arr));
                switch (typeof ret) {
                    case 'bigint':
                        vm.push(ret);
                        break;
                    case 'string':
                        vm.push(ret);
                        break;
                    case 'function':
                        vm.push(new FunctionBoxImpl(ret));
                        break;
                    case 'object':
                        if (ret instanceof StackVM) {
                            vm.push(new IStackVMBoxImpl(ret));
                        }
                        else {
                            ret;
                            throw new Error("Invalid type");
                        }
                        ;
                }
                if (typeof ret == 'object') {
                }
            }
            else if (b.type == 'constructor_box') {
                throw new Error("Unexpected constructor");
            }
            else if (b.type === 'function_box') {
                if (b.return_type == 'promise') {
                    var ret = b.value.apply(target_this, arg_arr);
                    vm.push(ret);
                }
                else if (b.return_type === null) {
                    var ret = b.value.apply(target_this, arg_arr);
                    console.info('fixme type of return is any', ret);
                    vm.push(ret);
                }
            }
            else {
                throw new Error("Unreachable (type of value is never)");
            }
        };
        return InstructionCallE;
    }());
    /**@typedef {import("types/vm/mod.js").EmptyArrayBox} EmptyArrayBox */
    /**@implements {EmptyArrayBox} */
    var EmptyArrayBoxImpl = /** @class */ (function () {
        /**@arg {[]} v */
        function EmptyArrayBoxImpl(v) {
            /**@type {"array_box"} */
            this.type = "array_box";
            this.value = v;
        }
        return EmptyArrayBoxImpl;
    }());
    /**@typedef {import("types/vm/mod.js").ArrayBox} ArrayBox */
    /**@implements {ArrayBox} */
    var ArrayBoxImpl = /** @class */ (function () {
        /**@arg {Boxed[]} value */
        function ArrayBoxImpl(value) {
            /**@type {"array_box"} */
            this.type = "array_box";
            /**@type {"value"} */
            this.item_type = "value";
            this.value = value;
        }
        /**
         * @param {'function'} _typeof_val
         */
        ArrayBoxImpl.prototype.get_matching_typeof = function (_typeof_val) {
            return null;
        };
        return ArrayBoxImpl;
    }());
    /**@typedef {import("./types/vm/mod.js").InstructionConstruct} InstructionConstruct */
    var InstructionConstructE = /** @class */ (function () {
        function InstructionConstructE() {
        }
        /**@type {<T>(arr:T[])=>arr is []} */
        InstructionConstructE.is_array_empty = function (arr) {
            if (arr.length === 0)
                return true;
            return false;
        };
        /**@type {<T>(arr:T)=>[]|null} */
        InstructionConstructE.to_unit_arr = function (arr) {
            if (arr instanceof Array) {
                if (this.is_array_empty(arr)) {
                    return arr;
                }
            }
            return null;
        };
        /**@arg {InstructionConstruct} instruction @arg {IStackVM} vm */
        InstructionConstructE.execute_instruction = function (vm, instruction) {
            var _b, _c;
            var number_of_arguments = instruction[1];
            if (typeof number_of_arguments != 'number')
                throw new Error("Invalid");
            var _d = vm.pop_arg_count(number_of_arguments), construct_target = _d[0], construct_arr = _d.slice(1);
            var a = construct_target;
            if (typeof a != 'object')
                throw new Error("Invalid");
            if (a === null)
                throw new Error("Invalid");
            if (a.type != 'constructor_box')
                throw new Error("Invalid");
            if (a.from === 'typescript') {
                var obj = new ((_b = a.value).bind.apply(_b, __spreadArray([void 0], construct_arr, false)))();
                switch (typeof obj) {
                    case 'object':
                        if (obj instanceof Array) {
                            var arr = this.to_unit_arr(obj);
                            if (arr !== null) {
                                var val = new EmptyArrayBoxImpl(arr);
                                vm.push(val);
                                return;
                            }
                        }
                        console.assert(false, "If possible convert %o to a box", obj);
                        throw new Error("Unable to convert object, please make a auto boxing factory");
                    case 'function':
                        throw new Error("Unable to create a box for functions (no way to request return types to match to boxes)");
                    case 'symbol':
                    case 'number':
                    case 'bigint':
                    case 'boolean':
                    case 'string':
                        vm.push(obj);
                        break;
                    case 'undefined':
                        vm.push(obj);
                        break;
                    default:
                        throw new Error("new typeof result: " + typeof obj);
                }
            }
            else if (a.from === 'javascript') {
                if (a.constructor_type === 'CSSStyleSheet') {
                    /**@type {{s:[options?: CSSStyleSheetInit | undefined], valid_count:1}|{s:[], valid_count:0}} */
                    var valid_args = {
                        s: [],
                        valid_count: 0
                    };
                    for (var i = 0; i < construct_arr.length; i++) {
                        var val = construct_arr[i];
                        if (typeof val != 'object')
                            continue;
                        if (val === null)
                            continue;
                        if (val.type != 'shape_box')
                            continue;
                        valid_args = {
                            s: [val.value],
                            valid_count: 1
                        };
                    }
                    var obj = new ((_c = a.value).bind.apply(_c, __spreadArray([void 0], valid_args.s, false)))();
                    vm.push(new VMBoxedCSSStyleSheetR(obj));
                }
            }
            l_log_if.apply(void 0, __spreadArray([LOG_LEVEL_INFO, "", instruction], vm.stack.slice(vm.stack.length - number_of_arguments), false));
        };
        return InstructionConstructE;
    }());
    var InstructionCastObjectE = /** @class */ (function () {
        function InstructionCastObjectE() {
        }
        /**@arg {import("types/vm/mod.js").InstructionCastObject} instruction @arg {IStackVM} vm */
        InstructionCastObjectE.execute_instruction = function (vm, instruction) {
            var obj = vm.pop();
            if (!obj)
                throw new Error("Invalid");
            console.log('VM: cast_object', instruction[1], obj);
            if (typeof obj != 'object')
                throw new Error("Invalid");
            /**@typedef {import("./types/vm/mod.js").VMIndexedValueRaw} VMIndexedValue */
            /**@type {<T>(q:T, v:any)=>v is T} */
            function can_cast_indexed(q, obj) {
                if (obj === null) {
                    return false;
                }
                void q;
                void obj;
                return true;
            }
            /**@type {<T>(q:T, v:any)=>T|null} */
            function as_indexed(q, obj) {
                if (can_cast_indexed(q, obj)) {
                    return obj;
                }
                return null;
            }
            switch (instruction[1]) {
                case 'object_index':
                    {
                        /**@type {VMIndexedValue|null} */
                        var unboxed_obj = null;
                        if (obj.type === 'custom_box') {
                            unboxed_obj = as_indexed(unboxed_obj, obj.value);
                        }
                        else {
                            unboxed_obj = as_indexed(unboxed_obj, obj);
                        }
                        if (unboxed_obj)
                            vm.push(new VMIndexedObjectValueR(unboxed_obj));
                    }
                    break;
                case 'callable_index':
                    {
                        /**@type {(v:any)=>v is VMIndexedCallableValueRaw} */
                        function can_cast_indexed(obj) {
                            if (obj === null) {
                                return false;
                            }
                            void obj;
                            return true;
                        }
                        /**@type {(v:any)=>VMIndexedCallableValueRaw|null} */
                        function as_indexed(obj) {
                            if (can_cast_indexed(obj)) {
                                return obj;
                            }
                            return null;
                        }
                        /**@type {VMIndexedCallableValueRaw|null} */
                        var unboxed_obj = null;
                        if (obj.type === 'object_box') {
                            if (obj.inner_type === null) {
                                throw new Error("Can't cast object without properties to an object that indexes to a callable");
                            }
                            unboxed_obj = as_indexed(obj.value);
                        }
                        else {
                            unboxed_obj = as_indexed(obj);
                        }
                        if (unboxed_obj)
                            vm.push(new VMIndexedCallableValueR(unboxed_obj));
                    }
                    break;
                default: throw new Error("Missing cast to " + instruction[1]);
            }
        };
        return InstructionCastObjectE;
    }());
    /**@typedef {import("types/vm/mod.js").IStackVMBox} IStackVMBox */
    /**@implements {IStackVMBox} */
    var IStackVMBoxImpl = /** @class */ (function () {
        /**@arg {StackVM} value */
        function IStackVMBoxImpl(value) {
            /**@type {"custom_box"} */
            this.type = "custom_box";
            /**@type {"StackVM"} */
            this.box_type = "StackVM";
            this.value = value;
        }
        /**@arg {'function'} _a */
        IStackVMBoxImpl.prototype.get_matching_typeof = function (_a) {
            return null;
        };
        return IStackVMBoxImpl;
    }());
    /**@typedef {import("types/vm/mod.js").WindowBox} VMBoxedWindow */
    /**@implements {VMBoxedWindow} */
    var VMBoxedWindowR = /** @class */ (function () {
        /**@arg {Window} value */
        function VMBoxedWindowR(value) {
            /**@type {"object_box"} */
            this.type = "object_box";
            /**@type {"Window"} */
            this.inner_type = "Window";
            this.value = value;
        }
        /**@arg {'function'} _a */
        VMBoxedWindowR.prototype.get_matching_typeof = function (_a) {
            return null;
        };
        return VMBoxedWindowR;
    }());
    /**@typedef {import("types/vm/mod.js").ObjectBox} VMBoxedObject */
    /**@implements {VMBoxedObject} */
    var VMBoxedObjectR = /** @class */ (function () {
        /**@arg {object} value */
        function VMBoxedObjectR(value) {
            /**@type {"object_box"} */
            this.type = "object_box";
            this.inner_type = null;
            this.value = value;
        }
        /**@arg {'function'} _a */
        VMBoxedObjectR.prototype.get_matching_typeof = function (_a) {
            return null;
        };
        return VMBoxedObjectR;
    }());
    /**@type {<T extends {}>(v:T, k:keyof T)=>v is {[U in keyof T]:T[U]}} */
    function does_have_property(v, k) {
        if (v.hasOwnProperty(k))
            return true;
        if (v[k] !== void 0)
            return true;
        return false;
    }
    /**@type {<T, F>(v:T, k:(v:T)=>F)=>v is (T & F)} */
    function does_have_property_as_type(v, k) {
        var rr = v && k;
        void rr;
        return true;
    }
    /**
     * @type {<T, F>(v:T, k:(v:T)=>F)=>T|null}
     */
    function with_has_property_as_type(v, k) {
        if (does_have_property_as_type(v, k))
            return v;
        return null;
    }
    /**@type {<A extends {}, B extends A>(o:B, k:keyof A)=>{[T in keyof A]:A[T]}|null} */
    function with_has_property(o, k) {
        if (does_have_property(o, k)) {
            return o;
        }
        return null;
    }
    /**@type {<T extends {}>(o:T)=>o is T} */
    function can_be_object(v) {
        if (v === null) {
            return false;
        }
        if (typeof v === 'object') {
            return true;
        }
        return false;
    }
    /**@type {<T>(v:T)=>({} & T)|null} */
    function as_object_or_null(v) {
        if (can_be_object(v)) {
            return v;
        }
        return null;
    }
    /**@typedef {import("types/vm/mod.js").VMIndexedValue} VMIndexedObjectValue */
    /**@implements {VMIndexedObjectValue} */
    var VMIndexedObjectValueR = /** @class */ (function () {
        /**@arg {import("types/vm/mod.js").VMIndexed<Boxed>} value */
        function VMIndexedObjectValueR(value) {
            /**@type {"object_index"} */
            this.type = "object_index";
            /**@type {"value"} */
            this.index_type = "value";
            this.value = value;
        }
        /**@arg {'function'} _to_match */
        VMIndexedObjectValueR.prototype.get_matching_typeof = function (_to_match) {
            return null;
        };
        return VMIndexedObjectValueR;
    }());
    /**@typedef {import("types/vm/mod.js").VMIndexed<VMCallableValue>} VMIndexedCallableValueRaw */
    /**@implements {VMIndexedCallableValue} */
    var VMIndexedCallableValueR = /** @class */ (function () {
        /**@arg {VMIndexedCallableValueRaw} value */
        function VMIndexedCallableValueR(value) {
            /**@type {"callable_index"} */
            this.type = "callable_index";
            /**@type {"callable_box"} */
            this.index_type = "callable_box";
            this.value = value;
        }
        /**@arg {'function'} _to_match */
        VMIndexedCallableValueR.prototype.get_matching_typeof = function (_to_match) {
            return null;
        };
        return VMIndexedCallableValueR;
    }());
    ;
    /**@implements {IStackVM} */
    var StackVM = /** @class */ (function () {
        /**@arg {InstructionType[]} instructions */
        function StackVM(instructions) {
            /**
             * @type {{ equal: boolean; }}
             */
            this.flags = {
                equal: false
            };
            this.instructions = instructions;
            this.instruction_pointer = 0;
            this.running = false;
            this.stack = [];
            this.return_value = void 0;
        }
        /**@arg {Boxed} value */
        StackVM.prototype.push = function (value) {
            this.stack.push(value);
        };
        StackVM.prototype.pop = function () {
            return this.stack.pop();
        };
        /**@arg {number} distance */
        StackVM.prototype.peek_at = function (distance) {
            return this.stack.at(-1 - distance);
        };
        /**
         * @param {number} operand_number_of_arguments
         */
        StackVM.prototype.pop_arg_count = function (operand_number_of_arguments) {
            var arguments_arr = [];
            var arg_count = operand_number_of_arguments;
            for (var i = 0; i < arg_count; i++) {
                if (this.stack.length <= 0) {
                    throw new Error('stack underflow in pop_arg_count');
                }
                arguments_arr.unshift(this.pop());
            }
            return arguments_arr;
        };
        StackVM.prototype.reset = function () {
            this.running = false;
            this.instruction_pointer = 0;
            this.return_value = void 0;
            this.stack.length = 0;
        };
        /**
         * @param {number} value
         */
        StackVM.prototype.is_in_instructions = function (value) {
            return value >= 0 && value < this.instructions.length;
        };
        /**
         * @param {InstructionType} instruction
         */
        StackVM.prototype.execute_instruction = function (instruction) {
            /**@type {('je'|'jmp'|'modify_operand'|'push_pc'|'halt'|'push'|'drop'|'dup'|'get'|'call'|'construct'|'return')[]}*/
            var handled_instructions = ['je', 'jmp', 'modify_operand', 'push_pc', 'halt', 'push', 'drop', 'dup', 'get', 'call', 'construct', 'return'];
            var op_code = instruction[0];
            if (assume_equal(op_code, handled_instructions[0]) && handled_instructions.includes(op_code) && instruction[0] === op_code) {
                l_log_if.apply(void 0, __spreadArray(__spreadArray([LOG_LEVEL_INFO, ""], instruction, false), [null], false));
            }
            switch (instruction[0]) {
                case 'je':
                    {
                        var target = instruction[1];
                        if (typeof target != 'number')
                            throw new Error("Invalid");
                        if (this.is_in_instructions(target)) {
                            throw new Error("RangeError: Jump target is out of instructions range");
                        }
                        if (this.flags.equal) {
                            this.instruction_pointer = target;
                        }
                    }
                    break;
                case 'jmp':
                    {
                        var target = instruction[1];
                        if (typeof target != 'number')
                            throw new Error("Invalid");
                        if (this.is_in_instructions(target)) {
                            throw new Error("RangeError: Jump target is out of instructions range");
                        }
                        this.instruction_pointer = target;
                    }
                    break;
                case 'modify_operand':
                    {
                        var target = instruction[1], offset = instruction[2];
                        if (typeof target != 'number')
                            throw new Error("Invalid");
                        if (typeof offset != 'number')
                            throw new Error("Invalid");
                        if (this.is_in_instructions(target)) {
                            throw new Error("RangeError: Destination is out of instructions range");
                        }
                        var instruction_1 = this.instructions[target];
                        /**@type {[string, ...any[]]} */
                        var instruction_modify = instruction_1;
                        var value = null;
                        if (this instanceof StackVM) {
                            value = this.pop();
                        }
                        else {
                            var pop_fn = Object.getOwnPropertyDescriptor(this, 'pop');
                            if (!pop_fn)
                                throw new Error("Previous check should cause this to be unreachable");
                            if (pop_fn.get) {
                                throw new Error("own property pop was a getter");
                            }
                            else {
                                console.info("TODO: add instanceof check");
                                value = pop_fn.value.call(this);
                            }
                        }
                        if (instruction_modify === void 0)
                            throw new Error("Invalid");
                        instruction_modify[offset] = value;
                        var valid_instruction = SimpleStackVMParser.verify_instruction(instruction_modify);
                        this.instructions[target] = valid_instruction;
                    }
                    break;
                case 'push_pc':
                    {
                        instruction;
                        if (!this.hasOwnProperty('push')) {
                            throw new Error("push_pc requires a stack");
                        }
                        else if (this instanceof StackVM) {
                            this.push(this.instruction_pointer);
                        }
                        else {
                            console.info('TODO: add instanceof check to push_pc');
                            /**@type {any} */
                            var this_as_any = this;
                            /**@type {this & {push:StackVM['push'];}} */
                            var this_with_push = this_as_any;
                            var fn_ptr = safe_get(this_with_push, 'push');
                            if (!fn_ptr)
                                throw new Error("push_pc requires a stack");
                            /**@type {<T, U extends T>(proto:T, o:U)=>T}*/
                            function into_typed(proto, obj) {
                                void proto;
                                return obj;
                            }
                            var ww2 = into_typed(StackVM.prototype, this);
                            if (ww2) {
                                fn_ptr.v.call(this, ww2.instruction_pointer);
                            }
                            else {
                                throw new Error("Property missing or invalid: instruction_pointer");
                            }
                        }
                    }
                    break;
                case 'halt' /*Running*/:
                    {
                        instruction;
                        this.running = false;
                    }
                    break;
                case 'push' /*Stack*/:
                    {
                        for (var i = 0; i < instruction.length - 1; i++) {
                            var item = instruction[i + 1];
                            this.push(item);
                        }
                    }
                    break;
                case 'drop' /*Stack*/:
                    this.pop();
                    break;
                case 'dup' /*Stack*/:
                    {
                        var top_1 = this.peek_at(0);
                        if (!top_1)
                            throw new Error("Stack underflow when executing dup instruction");
                        this.push(top_1);
                    }
                    break;
                case 'cast_object':
                    InstructionCastObjectE.execute_instruction(this, instruction);
                    break;
                case 'get' /*Object*/:
                    {
                        var target_name = this.pop();
                        var target_obj = this.pop();
                        if (!target_obj)
                            throw new Error("Invalid");
                        if (typeof target_name != 'string')
                            throw new Error("Invalid");
                        if (typeof target_obj != 'object')
                            throw new Error("Invalid");
                        if (target_obj.type != 'object_index') {
                            console.log('not object_index', target_obj, target_name);
                            throw new Error("Invalid");
                        }
                        var res = target_obj.value[target_name];
                        console.log('VM: get result', res);
                        this.push(res);
                    }
                    break;
                case 'call' /*Call*/:
                    InstructionCallE.execute_instruction(this, instruction);
                    break;
                case 'construct' /*Construct*/:
                    InstructionConstructE.execute_instruction(this, instruction);
                    break;
                case 'return' /*Call*/:
                    this.return_value = this.pop();
                    break;
                case 'breakpoint' /*Debug*/:
                    trigger_debug_breakpoint();
                    break;
                default:
                    throw new Error("Unexpected instruction: " + instruction[0]);
                    break;
            }
        };
        return StackVM;
    }());
    /**@implements {IStackVM} */
    var SimpleStackVM = /** @class */ (function (_super) {
        __extends(SimpleStackVM, _super);
        /**@arg {InstructionType[]} instructions */
        function SimpleStackVM(instructions) {
            var _this = _super.call(this, instructions) || this;
            _this.args_vec = null;
            return _this;
        }
        SimpleStackVM.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.args_vec = null;
        };
        /**
         * @param {InstructionType} instruction
         */
        SimpleStackVM.prototype.execute_instruction = function (instruction) {
            /**@type {('this'|'global'|'call')[]}*/
            var handled_instructions = ['this', 'global', 'call'];
            var op_code = instruction[0];
            if (assume_equal(op_code, handled_instructions[0]) && handled_instructions.includes(op_code) && instruction[0] === op_code) {
                l_log_if.apply(void 0, __spreadArray(__spreadArray([LOG_LEVEL_INFO, ""], instruction, false), [null], false));
            }
            switch (instruction[0]) {
                case 'this' /*Special*/:
                    {
                        console.log('VM: this push');
                        this.push(new IStackVMBoxImpl(this));
                    }
                    break;
                // TODO: if you ever use this on a worker, change
                // it to use globalThis...
                case 'global' /*Special*/:
                    {
                        console.log('VM: global push');
                        this.push(new VMBoxedWindowR(window));
                    }
                    break;
                case 'call' /*Call*/:
                    {
                        // TODO: Fix the other code to use the call handling from
                        // the base class
                        // Currently we support applying functions
                        // this is closer to what you expect, not to just get
                        // the name of a member to call
                        var number_of_arguments = instruction[1];
                        if (typeof number_of_arguments != 'number')
                            throw new Error("Invalid");
                        var _b = this.pop_arg_count(number_of_arguments), target_obj = _b[0], target_name = _b[1], arg_arr = _b.slice(2);
                        if (typeof target_obj != 'object')
                            throw new Error("Invalid");
                        if (typeof target_name != 'string')
                            throw new Error("Invalid");
                        if (target_obj === null)
                            throw new Error("Invalid");
                        if (target_obj.type != "callable_index")
                            throw new Error("Invalid");
                        /**@type {import("types/vm/mod.js").Unboxed[]} */
                        var unboxed_args = [];
                        for (var i = 0; i < arg_arr.length; i++) {
                            var cur = arg_arr[i];
                            switch (typeof cur) {
                                default:
                                    unboxed_args.push(cur);
                                    break;
                                case 'object':
                                    if (cur === null) {
                                        unboxed_args.push(null);
                                        break;
                                    }
                                    switch (cur.type) {
                                        case 'custom_box':
                                            switch (cur.box_type) {
                                                case 'StackVM':
                                                    unboxed_args.push(cur.value);
                                                default:
                                                    console.assert(false, 'handle type: ', cur.type);
                                            }
                                        default:
                                            console.assert(false, 'handle type: ', cur.type);
                                    }
                            }
                        }
                        var target_fn = target_obj.value[target_name];
                        var ret = target_fn.apply(target_obj.value, unboxed_args);
                        console.log.apply(console, __spreadArray(__spreadArray(['VM: call %o %s(...)\n ... = [' + "%o, ".repeat(unboxed_args.length) + "]\n return %o", target_obj, target_name], arg_arr, false), [ret], false));
                        switch (typeof ret) {
                            default:
                                {
                                    this.push(ret);
                                }
                                break;
                            case 'object':
                                if (ret === null) {
                                    this.push(null);
                                    break;
                                }
                                if (ret instanceof StackVM) {
                                    this.push(new IStackVMBoxImpl(ret));
                                }
                                else {
                                    throw new Error("Can't box return");
                                }
                        }
                    }
                    break;
                default /*Base class*/:
                    _super.prototype.execute_instruction.call(this, instruction);
                    break;
            }
        };
        /**
         * @param {Boxed[]} run_arguments
         */
        SimpleStackVM.prototype.run = function () {
            var run_arguments = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                run_arguments[_i] = arguments[_i];
            }
            this.args_vec = run_arguments;
            this.running = true;
            while (this.instruction_pointer < this.instructions.length && this.running) {
                var instruction = this.instructions[this.instruction_pointer];
                this.execute_instruction(instruction);
                this.instruction_pointer++;
            }
            console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
            return this.return_value;
        };
        return SimpleStackVM;
    }(StackVM));
    /**@implements {IStackVM} */
    var EventHandlerVMDispatch = /** @class */ (function (_super) {
        __extends(EventHandlerVMDispatch, _super);
        /**@arg {InstructionType[]} instructions @arg {any} target_obj */
        function EventHandlerVMDispatch(instructions, target_obj) {
            var _this = _super.call(this, instructions) || this;
            _this.target_obj = target_obj;
            return _this;
        }
        /**@arg {Event} event */
        EventHandlerVMDispatch.prototype.handleEvent = function (event) {
            this.reset();
            this.run(new VMBoxedObjectR(event));
        };
        return EventHandlerVMDispatch;
    }(SimpleStackVM));
    /**@implements {IStackVM} */
    var DomBuilderVM = /** @class */ (function () {
        /**@arg {InstructionType[]} instructions */
        function DomBuilderVM(instructions) {
            this.instructions = instructions;
            this.instruction_pointer = 0;
            this.return_value = void 0;
            /**
             * @type {Boxed[]}
             */
            this.stack = [];
            /**
             * @type {[Boxed[], InstructionType[]][]}
             */
            this.exec_stack = [];
            this.jump_instruction_pointer = null;
        }
        /**
         * @param {Boxed} v
         */
        DomBuilderVM.prototype.push = function (v) {
            this.stack.push(v);
        };
        DomBuilderVM.prototype.pop = function () {
            return this.stack.pop();
        };
        /**
         * @param {number} operand_number_of_arguments
         * @return {Boxed[]}
         */
        DomBuilderVM.prototype.pop_arg_count = function (operand_number_of_arguments) {
            var arguments_arr = [];
            var arg_count = operand_number_of_arguments;
            for (var i = 0; i < arg_count; i++) {
                if (this.stack.length <= 0) {
                    throw new Error('stack underflow in pop_arg_count');
                }
                arguments_arr.unshift(this.pop());
            }
            return arguments_arr;
        };
        /**@arg {InstructionType} instruction */
        DomBuilderVM.prototype.execute_instruction = function (instruction) {
            /**@type {('exec'|'peek'|'append')[]}*/
            var handled_instructions = ['exec', 'peek', 'append'];
            var op_code = instruction[0];
            if (assume_equal(op_code, handled_instructions[0]) && handled_instructions.includes(op_code) && instruction[0] === op_code) {
                l_log_if.apply(void 0, __spreadArray(__spreadArray([LOG_LEVEL_INFO, ""], instruction, false), [null], false));
            }
            switch (instruction[0]) {
                case 'exec':
                    {
                        this.exec_stack.push([this.stack, this.instructions]);
                        var base_ptr = this.stack.length;
                        // advance the instruction pointer, when we return we want to resume
                        // at the next instruction...
                        this.instruction_pointer++;
                        this.stack.push(this.instruction_pointer, base_ptr);
                        this.stack = [];
                        var new_instruction_stream = instruction[1];
                        this.instructions = new_instruction_stream;
                        this.jump_instruction_pointer = 0;
                        l_log_if.apply(void 0, __spreadArray([LOG_LEVEL_INFO, 'exec'], instruction[1], false));
                    }
                    break;
                case 'peek':
                    {
                        var op_1 = instruction[1], op_2 = instruction[2];
                        var peek_stack = this.exec_stack[op_1][0];
                        var base_ptr = peek_stack.at(-1);
                        if (typeof base_ptr != 'number')
                            throw new Error("Invalid");
                        var at = peek_stack[base_ptr - op_2 - 1];
                        this.push(at);
                        l_log_if(LOG_LEVEL_INFO, 'peek, pushed value', at, op_2, 'base ptr', base_ptr, 'ex_stack', op_1);
                    }
                    break;
                case 'append':
                    {
                        if (this.stack.length <= 0) {
                            throw new Error('stack underflow');
                        }
                        var target = this.pop();
                        if (this.stack.length <= 0) {
                            throw new Error('stack underflow');
                        }
                        var child_to_append = this.pop();
                        if (typeof child_to_append != 'object')
                            throw 1;
                        if (typeof target != 'object')
                            throw 1;
                        if (this.can_use_box(target) && this.can_use_box(child_to_append)) {
                            if (child_to_append.from !== 'create') {
                                console.warn('Are you sure you want to move elements around? child_to_append was not an element you created', child_to_append);
                            }
                            if (target.value && child_to_append.value) {
                                target.value.appendChild(child_to_append.value);
                            }
                            else {
                                console.assert(false, 'box has no value');
                            }
                        }
                        else {
                            throw new Error("Invalid VMBoxedDomValue");
                        }
                        l_log_if(LOG_LEVEL_INFO, 'append to dom', [target, child_to_append]);
                    }
                    break;
                case 'push' /*Stack*/:
                    {
                        for (var i = 0; i < instruction.length - 1; i++) {
                            var item = instruction[i + 1];
                            this.push(item);
                        }
                    }
                    break;
                case 'drop' /*Stack*/:
                    this.pop();
                    break;
                case 'dup':
                    this.push(this.pop());
                    break;
                case 'get': break;
                case 'call' /*Call*/:
                    InstructionCallE.execute_instruction(this, instruction);
                    break;
                case 'return': break;
                case 'halt': break;
                case 'push_args': break;
                case 'this': break;
                case 'global': break;
                case 'breakpoint': break;
                case 'je': break;
                case 'jmp': break;
                case 'vm_return':
                    {
                        if (!this.exec_stack.length) {
                            this.running = false;
                        }
                    }
                    break;
                case 'vm_call': break;
                case 'push_pc': break;
                case 'construct' /*Construct*/:
                    InstructionConstructE.execute_instruction(this, instruction);
                    break;
                case 'modify_operand': break;
                default /*Base class*/:
                    {
                        console.error("Need instruction: " + instruction[0]);
                        debugger;
                    }
                    break;
            }
        };
        /**@typedef {import("types/vm/mod.js").NodeBox} VMBoxedDomValue */
        /**
         * @param {import("types/vm/mod.js").VMValue} box
         * @returns {box is VMBoxedDomValue}
         */
        DomBuilderVM.prototype.can_use_box = function (box) {
            return typeof box == 'object' && box !== null && box.type === 'dom_value' && (box.from === 'get' || box.from === 'create');
        };
        /**
         * @param {import("types/vm/mod.js").VMValue} box
         */
        DomBuilderVM.prototype.verify_dom_box = function (box) {
            if (typeof box != 'object')
                throw new Error("invalid Box (not an object)");
            if (box === null)
                throw new Error("invalid Box (is null)");
            if (box.type === void 0)
                throw new Error("Invalid Box (no type)");
            if (box.type != 'dom_value')
                throw new Error("Unbox failed not a VMBoxedDomValue");
            if (typeof box.from != 'string')
                throw new Error("Unbox failed Box.from is not a string");
            if (typeof box.value != 'object')
                throw new Error("Unbox failed: Box is not boxing an object");
        };
        DomBuilderVM.prototype.run = function () {
            this.running = true;
            while (this.instruction_pointer < this.instructions.length && this.running) {
                var instruction = this.instructions[this.instruction_pointer];
                this.execute_instruction(instruction);
                if (this.jump_instruction_pointer != null) {
                    this.instruction_pointer = this.jump_instruction_pointer;
                    this.jump_instruction_pointer = null;
                }
                else {
                    this.instruction_pointer++;
                }
                if (this.instruction_pointer >= this.instructions.length) {
                    if (this.exec_stack.length > 0) {
                        var exec_top = this.exec_stack.pop();
                        if (!exec_top)
                            throw 1;
                        this.stack = exec_top[0], this.instructions = exec_top[1];
                        var base_ptr = this.stack.pop();
                        var instruction_ptr = this.stack.pop();
                        if (instruction_ptr === void 0)
                            throw new Error("Stack underflow");
                        if (typeof instruction_ptr != 'number')
                            throw new Error("Invalid");
                        this.instruction_pointer = instruction_ptr;
                        l_log_if(LOG_LEVEL_INFO, 'returned to', this.instruction_pointer, this.exec_stack.length);
                        continue;
                    }
                    l_log_if(LOG_LEVEL_INFO, 'reached end of instruction stream, nothing to return too', instruction, this.instructions, this.instruction_pointer);
                }
            }
            console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
            return this.return_value;
        };
        return DomBuilderVM;
    }());
    var SimpleStackVMParser = /** @class */ (function () {
        function SimpleStackVMParser() {
        }
        /**@arg {string[] | number[]} cur @arg {number} arg_loc*/
        SimpleStackVMParser.parse_int_arg = function (cur, arg_loc) {
            var cur_item = cur[arg_loc];
            if (typeof cur_item == 'string') {
                var arg = cur_item;
                if (arg[3] === '()'[0] && arg.at(-1) === "()"[1]) {
                    var str_int = arg.slice(4, -1);
                    cur[arg_loc] = parseInt(str_int, 10);
                }
            }
        };
        /**
         * @param {string | string[]} str
         * @param {any[]} format_list
         */
        SimpleStackVMParser.parse_string_with_format_ident = function (str, format_list) {
            var format_index = str.indexOf('%');
            var format_type = str[format_index + 1];
            switch (format_type) {
                case 'o':
                    return format_list.shift();
                default:
                    console.assert(false, "Assertion failed: %s", 'unsupported format spec %' + format_type);
            }
        };
        /**
         * @param {any[]} cur
         * @param {any[]} format_list
         */
        SimpleStackVMParser.parse_current_instruction = function (cur, format_list) {
            var arg_loc = 1;
            var arg = cur[arg_loc];
            while (arg) {
                if (arg.slice(0, 3) === 'int')
                    this.parse_int_arg(cur, arg_loc);
                if (arg.includes('%')) {
                    var res = this.parse_string_with_format_ident(arg, format_list);
                    cur[arg_loc] = res;
                }
                arg_loc++;
                arg = cur[arg_loc];
            }
        };
        /**
         * @param {string[]} m
         */
        SimpleStackVMParser.raw_parse_handle_regexp_match = function (m) {
            var iter = m[1].trim();
            if (iter.startsWith("//"))
                return;
            while (iter.startsWith("/*")) {
                var j = iter.indexOf("*/");
                iter = iter.slice(j + 2).trim();
            }
            if (!iter)
                return null;
            return iter.split(",");
        };
        /**
         * @param {string} string
         */
        SimpleStackVMParser.parse_string_into_raw_instruction_stream = function (string) {
            var parser_max_match_iter = 300;
            var parts, arr = [], i = 0;
            do {
                parts = this.match_regex.exec(string);
                if (!parts)
                    break;
                var res = this.raw_parse_handle_regexp_match(parts);
                if (res)
                    arr.push(res);
            } while (parts && i++ < parser_max_match_iter);
            if (parts)
                console.assert(false, 'SimpleStackVM Parser: Iteration limit exceeded (limit=%o)', parser_max_match_iter);
            return arr;
        };
        /**
         * @param {string} string
         * @param {any[]} format_list
         */
        SimpleStackVMParser.parse_instruction_stream_from_string = function (string, format_list) {
            var raw_instructions = this.parse_string_into_raw_instruction_stream(string);
            for (var i = 0; i < raw_instructions.length; i++) {
                var raw_instruction = raw_instructions[i];
                this.parse_current_instruction(raw_instruction, format_list);
            }
            var instructions = this.verify_raw_instructions(raw_instructions);
            return instructions;
        };
        /**@arg {string[]} instruction @returns {InstructionType}*/
        SimpleStackVMParser.verify_instruction = function (instruction) {
            var num_to_parse = instruction.length;
            /**@type {InstructionType|null} */
            var ret = null;
            switch (instruction[0]) {
                case 'push':
                    {
                        num_to_parse = 0;
                        var push_operands = instruction.slice(1);
                        ret = __spreadArray([instruction[0]], push_operands, true);
                    }
                    break;
                case 'call' /*1 argument*/:
                    {
                        if (typeof instruction[1] === 'number' && Number.isFinite(instruction[1])) {
                            num_to_parse -= 2;
                            ret = [instruction[0], instruction[1]];
                        }
                        else {
                            console.info("Operand is", instruction[1]);
                            throw new Error("Invalid operand");
                        }
                    }
                    break;
                case 'cast_object': {
                    var m_arg = instruction[1];
                    switch (m_arg) {
                        case 'object_index':
                        case 'callable_index':
                            num_to_parse -= 2;
                            ret = [instruction[0], m_arg];
                    }
                    if (num_to_parse === 0)
                        break;
                    throw new Error("Assertion failed: cast_object operand `" + m_arg + "` is invalid");
                }
                case 'drop':
                case 'get':
                case 'return':
                case 'halt':
                case 'push_args':
                case 'this':
                case 'global':
                case 'breakpoint' /*opcode*/:
                    {
                        num_to_parse--;
                        ret = [instruction[0]];
                    }
                    break;
                default: throw new Error("Verify: Unexpected opcode, opcode was `" + instruction[0] + "`");
            }
            if (num_to_parse > 0)
                throw new Error("Typechecking failure, data left when processing raw instruction stream");
            if (ret !== null) {
                return ret;
            }
            throw new Error("Unreachable");
        };
        /** @arg {string[][]} raw_instructions @return {InstructionType[]} */
        SimpleStackVMParser.verify_raw_instructions = function (raw_instructions) {
            /**@type{InstructionType[]}*/
            var instructions = [];
            for (var i = 0; i < raw_instructions.length; i++) {
                instructions.push(this.verify_instruction(raw_instructions[i]));
            }
            return instructions;
        };
        return SimpleStackVMParser;
    }());
    SimpleStackVMParser.match_regex = /(.+?)(;|$)/gm;
    var DocumentWriteList = /** @class */ (function () {
        function DocumentWriteList() {
            this.list = [];
            this.attached = false;
            this.end_symbol = Symbol(void 0);
            /**@type {import("./final/rebuild_the_universe_auto_typed_v0.1.js").DocumentWriteList['document_write']} */
            this.document_write = null;
            this.attached_document = null;
            this.document_write_proxy = null;
        }
        /**
         * @arg {(...text: string[]) => void} target
         * @arg {Document} thisArg
         * @arg {string[]} argArray
         */
        DocumentWriteList.prototype.write = function (target, thisArg, argArray) {
            console.assert(target === this.document_write);
            console.assert(thisArg === this.attached_document);
            this.list.push(argArray, null);
        };
        /**@arg {Document} document */
        DocumentWriteList.prototype.attach_proxy = function (document) {
            if (this.attached) {
                var was_destroyed = this.destroy(true);
                if (!was_destroyed) {
                    throw new Error("Can't reattach to document, document.write is not equal to DocumentWriteList.document_write_proxy");
                }
            }
            this.attached_document = document;
            this.document_write = document.write;
            var proxy_handler = {
                other: this,
                //target: (...text: string[]) => void, thisArg: Document, argArray: string[]
                /**
                 * @arg {(...text: string[]) => void} target
                 * @arg {Document} thisArg
                 * @arg {string[]} argArray
                 */
                apply: function (target, thisArg, argArray) {
                    this.other.write(target, thisArg, argArray);
                }
            };
            this.document_write_proxy = new Proxy(document.write, proxy_handler);
            document.write = this.document_write_proxy;
        };
        /**
         * @param {boolean} should_try_to_destroy
         */
        DocumentWriteList.prototype.destroy = function (should_try_to_destroy) {
            if (should_try_to_destroy === void 0) { should_try_to_destroy = false; }
            if (this.attached_document && this.document_write_proxy) {
                console.assert(this.attached_document.write === this.document_write_proxy);
                if (this.attached_document.write !== this.document_write_proxy) {
                    if (should_try_to_destroy) {
                        return false;
                    }
                    throw new Error("Unable to destroy: document.write is not equal to DocumentWriteList.document_write_proxy");
                }
                var doc_1 = this.attached_document;
                if (doc_1 && this.document_write) {
                    var doc_var = this.document_write;
                    /**@type {any} */
                    var any_var = doc_var;
                    /**@type {Document['write']} */
                    var vv = any_var;
                    doc_1.write = vv;
                }
            }
            if (this.document_write_proxy) {
                this.document_write_proxy = null;
            }
            if (this.document_write) {
                this.document_write = null;
            }
            if (this.attached_document) {
                this.attached_document = null;
            }
            if (should_try_to_destroy) {
                return true;
            }
        };
        return DocumentWriteList;
    }());
    var UniqueIdGenerator = /** @class */ (function () {
        function UniqueIdGenerator() {
            this.m_current = -1;
        }
        /**
         * @param {number} current_value
         */
        UniqueIdGenerator.prototype.set_current = function (current_value) {
            this.m_current = current_value;
        };
        UniqueIdGenerator.prototype.current = function () {
            return this.m_current;
        };
        UniqueIdGenerator.prototype.next = function () {
            return this.m_current++;
        };
        return UniqueIdGenerator;
    }());
    var NamedIdGenerator = /** @class */ (function () {
        function NamedIdGenerator() {
            this.state_map = new Map;
        }
        /**@arg {string} name */
        NamedIdGenerator.prototype.current_named = function (name) {
            var val = this.state_map.get(name);
            if (val) {
                return val;
            }
            else {
                return 0;
            }
        };
        /**@arg {string} name */
        NamedIdGenerator.prototype.next_named = function (name) {
            if (this.state_map.has(name)) {
                var cur = this.state_map.get(name) + 1;
                this.state_map.set(name, cur);
                return cur;
            }
            else {
                this.state_map.set(name, 1);
                return 1;
            }
            ;
        };
        return NamedIdGenerator;
    }());
    var EventHandlerDispatch = /** @class */ (function () {
        /**
         * @param {{[x:string]:any}} target_obj
         * @param {string} target_name
         */
        function EventHandlerDispatch(target_obj, target_name) {
            this.target_obj = target_obj;
            this.target_name = target_name;
        }
        /**
         * @param {any} event
         */
        EventHandlerDispatch.prototype.handleEvent = function (event) {
            this.target_obj[this.target_name](event);
        };
        return EventHandlerDispatch;
    }());
    function trigger_debug_breakpoint() {
        debugger;
    }
    var CompressionStatsCalculator = /** @class */ (function () {
        function CompressionStatsCalculator() {
            /**
             * @type {number[]}
             */
            this.hit_counts = [];
            /**
             * @type {string[]}
             */
            this.cache = [];
        }
        CompressionStatsCalculator.prototype.map_values = function () {
            return this.hit_counts;
        };
        CompressionStatsCalculator.prototype.map_keys = function () {
            return this.cache;
        };
        /**
         * @param {number} index
         */
        CompressionStatsCalculator.prototype.add_hit = function (index) {
            if (!this.map_values()[index]) {
                this.map_values()[index] = 1;
            }
            else
                this.map_values()[index]++;
        };
        /**
         * @param {string} key
         */
        CompressionStatsCalculator.prototype.add_item = function (key) {
            var index = this.map_keys().indexOf(key);
            if (index == -1)
                index = this.map_keys().push(key);
            else
                this.add_hit(index);
        };
        CompressionStatsCalculator.prototype.reset = function () {
            this.map_keys().length = 0;
            this.map_values().length = 0;
        };
        /**
         * @param {any[]} arr
         * @param {number} win_size
         */
        CompressionStatsCalculator.prototype.calc_compression_stats = function (arr, win_size) {
            this.reset();
            for (var i = 0; i < arr.length; i++) {
                if (i + win_size < arr.length) {
                    this.add_item(arr.slice(i, i + win_size).join(","));
                }
            }
            return to_tuple_arr(this.map_keys(), this.map_values()).filter(function (e) { return e[1] !== void 0; });
        };
        /**
         * @param {any[]} stats_arr
         * @param {any[]} arr
         * @param {number} win_size
         */
        CompressionStatsCalculator.prototype.calc_for_stats_window_size = function (stats_arr, arr, win_size) {
            stats_arr[win_size - 1] = this.calc_compression_stats(arr, win_size);
        };
        /**
         * @param {any[]} stats_arr
         * @param {any[]} arr
         * @param {number} index
         */
        CompressionStatsCalculator.prototype.calc_for_stats_index = function (stats_arr, arr, index) {
            stats_arr[index] = this.calc_compression_stats(arr, index + 1);
        };
        return CompressionStatsCalculator;
    }());
    var BaseCompression = /** @class */ (function () {
        function BaseCompression() {
        }
        /**
         * @param {string | any[]} src
         * @param {string | any[]} dst
         */
        BaseCompression.prototype.did_compress = function (src, dst) {
            return dst.length < src.length;
        };
        /**
         * @param {string | any[]} src
         * @param {string | any[]} dst
         */
        BaseCompression.prototype.did_decompress = function (src, dst) {
            return dst.length > src.length;
        };
        /**
         * @param {string[]} src
         * @param {string[]} dst
         * @returns {[boolean, string[]]}
         */
        BaseCompression.prototype.compress_result = function (src, dst) {
            if (this.did_compress(src, dst))
                return [true, dst];
            return [false, src];
        };
        /**
         * @param {string[]} src
         * @param {string[]} dst
         * @returns {[boolean, string[]]}
         */
        BaseCompression.prototype.decompress_result = function (src, dst) {
            // maybe this is not a decompression, just a modification to make
            // later decompression work
            if (this.did_decompress(src, dst))
                return [true, dst];
            return [false, dst];
        };
        return BaseCompression;
    }());
    var MulCompression = /** @class */ (function (_super) {
        __extends(MulCompression, _super);
        function MulCompression() {
            var _this = _super.call(this) || this;
            _this.stats_calculator = new CompressionStatsCalculator;
            /**
             * @type {any[]}
             */
            _this.compression_stats = [];
            return _this;
        }
        /**
         * @param {string[]} arr
         */
        MulCompression.prototype.try_compress = function (arr) {
            var ret = [];
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (i + 1 < arr.length) {
                    if (item === arr[i + 1]) {
                        var off = 1;
                        while (item === arr[i + off]) {
                            off++;
                        }
                        if (off > 1) {
                            ret.push("".concat(item).concat(off));
                            i += off - 1;
                        }
                        else {
                            ret.push(item);
                        }
                    }
                    else {
                        ret.push(item);
                    }
                }
                else {
                    ret.push(item);
                }
            }
            return this.compress_result(arr, ret);
        };
        /**
         * @param {string[]} arr
         */
        MulCompression.prototype.try_decompress = function (arr) {
            var ret = [];
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (!item)
                    continue;
                if (i + 1 < arr.length) {
                    var _b = [item[0], item.slice(1)], item_type = _b[0], num_data = _b[1];
                    var parsed = parseInt(num_data);
                    if (!Number.isNaN(parsed)) {
                        for (var j = 0; j < parsed; j++)
                            ret.push(item_type);
                        continue;
                    }
                }
                ret.push(arr[i]);
            }
            return this.decompress_result(arr, ret);
        };
        /**
         * @param {string[]} arr
         */
        MulCompression.prototype.compress_array = function (arr) {
            var _b, _c;
            var success, res;
            // await async_semaphore.inc(1);
            _b = this.try_decompress(arr), success = _b[0], res = _b[1];
            if (success)
                arr = res;
            for (var i = 0; i < 4; i++) {
                this.stats_calculator.calc_for_stats_index(this.compression_stats, arr, i);
                var ls = this.compression_stats[i];
                if (ls.length > 0) {
                    continue;
                }
                break;
            }
            // await async_semaphore.dec(1);
            _c = this.try_compress(arr), success = _c[0], res = _c[1];
            if (success)
                return res;
            return arr;
        };
        return MulCompression;
    }(BaseCompression));
    /**
     * @param {string | any[]} arr
     */
    function calc_ratio(arr) {
        var ratio_acc = 0;
        for (var i = 0; i < arr.length; i++)
            ratio_acc += arr[i];
        // don't divide by zero
        if (ratio_acc === 0)
            return 0;
        return ratio_acc / arr.length;
    }
    console.assert(calc_ratio([0, 0]) === 0, "calc ratio of array full of zeros does not divide by zero");
    var TimeoutTarget = /** @class */ (function () {
        /**
         * @param {AutoBuyState | AutoBuy | null} obj
         * @param {()=>void} callback
         */
        function TimeoutTarget(obj, callback) {
            this.m_once = true;
            this.m_obj = obj;
            this.m_callback = callback;
        }
        TimeoutTarget.prototype.fire = function () {
            this.m_callback.call(this.m_obj);
        };
        return TimeoutTarget;
    }());
    var IntervalTarget = /** @class */ (function () {
        /**
         * @param {any} obj
         * @param {any} callback
         */
        function IntervalTarget(obj, callback) {
            this.m_once = false;
            this.m_obj = obj;
            this.m_callback = callback;
        }
        IntervalTarget.prototype.fire = function () {
            this.m_callback.call(this.m_obj);
        };
        return IntervalTarget;
    }());
    var PromiseTimeoutTarget = /** @class */ (function () {
        function PromiseTimeoutTarget() {
            this.m_promise_accept = null;
            this.m_promise_reject = null;
            this.m_promise = null;
            this.m_callback = null;
            this.m_active = false;
        }
        PromiseTimeoutTarget.prototype.wait = function () {
            if (this.m_promise)
                return this.m_promise;
            this.m_promise = new Promise(this.promise_executor.bind(this));
            this.m_active = true;
            return this.m_promise;
        };
        /**
         * @param {any} accept
         * @param {any} reject
         */
        PromiseTimeoutTarget.prototype.promise_executor = function (accept, reject) {
            this.m_promise_accept = accept;
            this.m_promise_reject = reject;
            this.m_callback = this.on_result.bind(this);
        };
        /**
         * @param {any} value
         */
        PromiseTimeoutTarget.prototype.on_result = function (value) {
            if (value === void 0) { value = void 0; }
            if (!this.m_promise_accept)
                throw new Error("Missing promise accept handler");
            this.m_promise_accept(value);
            this.reset();
        };
        /**
         * @param {Error} error
         */
        PromiseTimeoutTarget.prototype.on_error = function (error) {
            if (!this.m_promise_reject)
                throw new Error("Missing promise accept handler");
            this.m_promise_reject(error);
            this.reset();
        };
        PromiseTimeoutTarget.prototype.reset = function () {
            this.m_promise_accept = null;
            this.m_promise_reject = null;
            this.m_promise = null;
            this.m_callback = null;
            this.m_active = false;
        };
        PromiseTimeoutTarget.prototype.fire = function () {
            if (this.m_callback)
                this.m_callback();
        };
        PromiseTimeoutTarget.prototype.destroy = function () {
            if (this.m_active)
                this.on_error(new Error("Destroyed"));
        };
        return PromiseTimeoutTarget;
    }());
    var AsyncTimeoutTarget = /** @class */ (function (_super) {
        __extends(AsyncTimeoutTarget, _super);
        function AsyncTimeoutTarget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AsyncTimeoutTarget.prototype.wait = function () {
            return _super.prototype.wait.call(this);
        };
        return AsyncTimeoutTarget;
    }(PromiseTimeoutTarget));
    var BaseNode = /** @class */ (function () {
        function BaseNode() {
            this.m_parent = null;
        }
        /**
         * @param {any} parent
         */
        BaseNode.prototype.set_parent = function (parent) {
            this.m_parent = parent;
        };
        BaseNode.prototype.run = function () {
            // do nothing
        };
        BaseNode.prototype.remove = function () {
            if (this.m_parent)
                this.m_parent.remove_child(this);
        };
        BaseNode.prototype.destroy = function () {
            this.remove();
        };
        return BaseNode;
    }());
    var TimeoutIdNode = /** @class */ (function (_super) {
        __extends(TimeoutIdNode, _super);
        /** @param {number} id */
        function TimeoutIdNode(id) {
            var _this = _super.call(this) || this;
            _this.m_id = id;
            return _this;
        }
        TimeoutIdNode.prototype.destroy = function () {
            if (this.m_id !== null)
                clearTimeout(this.m_id);
            _super.prototype.destroy.call(this);
        };
        return TimeoutIdNode;
    }(BaseNode));
    var IntervalIdNode = /** @class */ (function (_super) {
        __extends(IntervalIdNode, _super);
        /** @param {number} id */
        function IntervalIdNode(id) {
            var _this = _super.call(this) || this;
            _this.m_id = id;
            return _this;
        }
        IntervalIdNode.prototype.destroy = function () {
            if (this.m_id !== null)
                clearInterval(this.m_id);
            _super.prototype.destroy.call(this);
        };
        return IntervalIdNode;
    }(BaseNode));
    var TimeoutTargetFn = /** @class */ (function () {
        /**
         * @param {any} callback
         * @param {number} timeout
         */
        function TimeoutTargetFn(callback, timeout) {
            this.m_once = true;
            this.m_callback = callback;
            this.m_timeout = timeout;
        }
        TimeoutTargetFn.prototype.fire = function () {
            this.m_callback();
        };
        return TimeoutTargetFn;
    }());
    var IntervalTargetFn = /** @class */ (function () {
        /**
         * @param {any} callback
         * @param {number} timeout
         */
        function IntervalTargetFn(callback, timeout) {
            this.m_callback = callback;
            this.timeout = timeout;
        }
        IntervalTargetFn.prototype.fire = function () {
            this.m_callback();
        };
        return IntervalTargetFn;
    }());
    var TimeoutNode = /** @class */ (function (_super) {
        __extends(TimeoutNode, _super);
        function TimeoutNode(timeout) {
            if (timeout === void 0) { timeout = 0; }
            var _this = _super.call(this) || this;
            _this.m_timeout = timeout;
            _this.m_id = null;
            _this.m_target = null;
            return _this;
        }
        TimeoutNode.prototype.timeout = function () {
            return this.m_timeout;
        };
        /**
         * @param {any} target
         */
        TimeoutNode.prototype.set_target = function (target) {
            this.m_target = target;
        };
        TimeoutNode.prototype.set = function () {
            this.m_id = setTimeout(this.run.bind(this), this.m_timeout);
        };
        /**@arg {{} | null} target */
        TimeoutNode.prototype.start = function (target) {
            if (!target)
                throw new Error("No target");
            this.m_target = target;
            this.set();
        };
        TimeoutNode.prototype.run = function () {
            if (this.m_target)
                this.m_target.fire();
            this.m_id = null;
            this.remove();
        };
        TimeoutNode.prototype.destroy = function () {
            if (this.m_id !== null)
                clearTimeout(this.m_id);
        };
        return TimeoutNode;
    }(BaseNode));
    var IntervalNode = /** @class */ (function (_super) {
        __extends(IntervalNode, _super);
        /**
         * @param {CallableFunction} target_fn
         */
        function IntervalNode(target_fn, timeout) {
            if (timeout === void 0) { timeout = 0; }
            var _this = _super.call(this) || this;
            _this.m_target_fn = target_fn;
            _this.m_timeout = timeout;
            _this.id = null;
            return _this;
        }
        IntervalNode.prototype.set = function () {
            this.id = setInterval(this.run.bind(this), this.m_timeout);
        };
        /**@arg {{} | null} target */
        IntervalNode.prototype.start = function (target) {
            if (target === void 0) { target = null; }
            if (target) {
                this.m_target = target;
            }
            else {
                this.m_target = new IntervalTargetFn(this.m_target_fn, this.m_timeout);
            }
            this.set();
        };
        IntervalNode.prototype.destroy = function () {
            if (this.id !== null)
                clearInterval(this.id);
        };
        return IntervalNode;
    }(BaseNode));
    var AsyncTimeoutNode = /** @class */ (function (_super) {
        __extends(AsyncTimeoutNode, _super);
        function AsyncTimeoutNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**@arg {{wait():Promise<any>;destroy():void}} target */
        AsyncTimeoutNode.prototype.start_async = function (target) {
            return __awaiter(this, void 0, void 0, function () {
                var promise;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!target)
                                throw new Error("unable to start_async without anything to wait for");
                            l_log_if(LOG_LEVEL_INFO, 'start_async');
                            this.m_target = target;
                            this.set();
                            promise = this.m_target.wait();
                            l_log_if(LOG_LEVEL_INFO, 'p', promise);
                            return [4 /*yield*/, promise];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncTimeoutNode.prototype.set = function () {
            l_log_if(LOG_LEVEL_INFO, 'set', this);
            _super.prototype.set.call(this);
        };
        AsyncTimeoutNode.prototype.run = function () {
            l_log_if(LOG_LEVEL_INFO, 'run', this);
            return _super.prototype.run.call(this);
        };
        AsyncTimeoutNode.prototype.destroy = function () {
            if (this.m_target)
                this.m_target.destroy();
            _super.prototype.destroy.call(this);
        };
        return AsyncTimeoutNode;
    }(TimeoutNode));
    var IntervalIdNodeRef = /** @class */ (function (_super) {
        __extends(IntervalIdNodeRef, _super);
        /**
         * @param {number} interval_id
         * @param {() => void} destroy_cb
         */
        function IntervalIdNodeRef(interval_id, destroy_cb) {
            var _this = _super.call(this, interval_id) || this;
            _this.destroy_callback = destroy_cb;
            return _this;
        }
        IntervalIdNodeRef.prototype.destroy = function () {
            this.destroy_callback();
            _super.prototype.destroy.call(this);
        };
        return IntervalIdNodeRef;
    }(IntervalIdNode));
    var AsyncNodeRoot = /** @class */ (function () {
        function AsyncNodeRoot() {
            /**
             * @type {BaseNode[]}
             */
            this.children = [];
        }
        /**
         * @param {()=>void} target_fn
         * @param {number | undefined} timeout
         */
        AsyncNodeRoot.prototype.set = function (target_fn, timeout, repeat) {
            if (repeat === void 0) { repeat = false; }
            var node;
            if (repeat) {
                node = new TimeoutNode(timeout);
                node.start(new TimeoutTarget(null, target_fn));
            }
            else {
                node = new IntervalNode(target_fn, timeout);
                node.start(new IntervalTarget(null, target_fn));
            }
        };
        /**
         * @param {number} timeout_id
         */
        AsyncNodeRoot.prototype.append_raw = function (timeout_id, once) {
            if (once === void 0) { once = true; }
            if (once) {
                this.append_child(new TimeoutIdNode(timeout_id));
            }
            else {
                this.append_child(new IntervalIdNode(timeout_id));
            }
        };
        /**@arg {BaseNode} record */
        AsyncNodeRoot.prototype.append_child = function (record) {
            record.remove();
            record.set_parent(this);
            this.children.push(record);
        };
        /**@arg {BaseNode} record */
        AsyncNodeRoot.prototype.remove_child = function (record) {
            var index = this.children.indexOf(record);
            this.children.splice(index, 1);
            record.set_parent(null);
        };
        AsyncNodeRoot.prototype.destroy = function () {
            var item = this.children.shift();
            if (!item)
                return;
            do {
                console.info('timer destroy', item);
                item.destroy();
                item = this.children.shift();
            } while (item);
        };
        return AsyncNodeRoot;
    }());
    var AverageRatio = /** @class */ (function () {
        // @AverageRatio
        /**
         * @param {string} type
         * @param {number} time_diff_max
         * @param {number} size
         * @param {number} history_size
         * @param {any} time_start
         */
        function AverageRatio(type, time_diff_max, size, history_size, time_start) {
            this.type = type;
            /**
             * @type {number[]}
             */
            this.history = [];
            this.count = 0;
            this.value = 0;
            this.size = size;
            this.time_diff_max = time_diff_max;
            this.time_start = time_start;
            this.time_cur_start = 0;
            this.time_cur = 0;
            this.gen_count = 0;
            this.history_size = history_size;
        }
        /**
         * @param {AverageRatioRoot} avg
         * @param {number} time_now
         */
        AverageRatio.prototype.do_history_update = function (avg, time_now) {
            if (this.value === null)
                return;
            this.count++;
            this.time_cur = time_now - this.time_start - this.time_cur_start;
            if (this.time_cur > this.time_diff_max) {
                this.time_cur_start += this.time_diff_max;
                this.time_cur -= this.time_diff_max;
                this.count = 0;
                this.gen_count++;
                this.history.unshift(this.value);
                if (this.history.length > this.history_size)
                    this.history.pop();
                var next = avg.next(this);
                if (next)
                    next.do_history_update(avg, time_now);
            }
        };
        /**
         * @param {number} value
         */
        AverageRatio.prototype.add_to_ratio = function (value, avg_window) {
            if (avg_window === void 0) { avg_window = this.size; }
            if (this.value === null) {
                this.value = value;
                return;
            }
            this.value = (this.value * (avg_window - 1) + value) / avg_window;
        };
        /**
         * @param {number} size
         */
        AverageRatio.prototype.set_history_size = function (size) {
            this.history_size = size;
        };
        AverageRatio.prototype.get_average = function () {
            if (this.value === null)
                return 0;
            return this.value;
        };
        return AverageRatio;
    }());
    var AverageRatioRoot = /** @class */ (function () {
        function AverageRatioRoot() {
            /**@type {Map<string, AverageRatio>} */
            this.map = new Map;
            /**@type {string[]} */
            this.keys = [];
            /**@type {AverageRatio[]} */
            this.values = [];
        }
        /**
         * @param {string} key
         */
        AverageRatioRoot.prototype.get_average = function (key) {
            var ratio_calc = this.map.get(key);
            if (!ratio_calc)
                throw new Error("Ratio not found: " + key);
            return ratio_calc.get_average();
        };
        /**@type {(key:string, value:AverageRatio)=>void} */
        AverageRatioRoot.prototype.set_ratio = function (key, value) {
            this.keys.push(key);
            this.values.push(value);
            this.map.set(key, value);
        };
        /**@arg {AverageRatio} value_obj */
        AverageRatioRoot.prototype.next = function (value_obj) {
            var idx = this.values.indexOf(value_obj);
            if (idx < this.values.length) {
                return this.values[idx + 1];
            }
            return null;
        };
        /**
         * @param {number} value
         */
        AverageRatioRoot.prototype.push = function (value) {
            var cur = this.map.get(this.keys[0]);
            if (!cur)
                throw new Error("Invalid");
            var cur_size = cur.size;
            var time_now = performance.now();
            cur.do_history_update(this, time_now);
            cur.add_to_ratio(value);
            for (var i = 1; i < this.keys.length; i++) {
                var key = this.keys[i];
                cur = this.map.get(key);
                if (!cur)
                    throw new Error("Invalid");
                cur_size *= cur.size;
                cur.add_to_ratio(value, cur_size);
            }
        };
        return AverageRatioRoot;
    }());
    var AutoBuyState = /** @class */ (function () {
        /**@arg {AsyncNodeRoot} root */
        function AutoBuyState(root) {
            this.root_node = root;
            this.debug = false;
            /**
             * @type {number[]}
             */
            this.arr = [];
            this.ratio = 0;
            this.last_ratio = 0;
            this.compressor_stats = [];
            this.arr_max_len = 5 * 60;
            this.val = 1;
            this.total_mul = 1;
            this.ratio_mode = 0;
            this.total_cycle_count_change = 0;
            this.locked_cycle_count = 50;
            this.is_init_complete = false;
            this.avg = new AverageRatioRoot;
        }
        AutoBuyState.prototype.init = function () {
            if (window.atomepersecond === 0) {
                var node = new TimeoutNode(0);
                this.root_node.append_child(node);
                node.start(new TimeoutTarget(this, this.init));
                return;
            }
            this.val = window.totalAtome / window.atomepersecond;
            var rep_val = this.val / (100 * 4 * window.prestige);
            if (Number.isFinite(rep_val)) {
                for (var i = 0; i < 8; i++) {
                    this.arr.push(rep_val * .75);
                }
            }
            else {
                rep_val = 0.75;
            }
            var ratio_types = ['10sec', '1min', '5min', '30min', '3hour'];
            var ratio_times = [10 * 1000, 60 * 1000, 5 * 60 * 1000, 30 * 60 * 1000, 3 * 60 * 60 * 1000];
            var ratio_counts = [80, 6, 5, 6, 6];
            /**
             * @param {number[]} arr
             * @param {any} i
             */
            function mul_3(arr, i) {
                var _b = arr.slice(i), a = _b[0], _c = _b[1], b = _c === void 0 ? 1 : _c, _d = _b[2], c = _d === void 0 ? 10 : _d;
                return a * b * c * 4;
            }
            //@AverageRatio
            /**
             * @arg {AverageRatioRoot} target_obj
             * @param {number} i
             * @param {number} now_start
             */
            function create_ratio(target_obj, i, now_start) {
                var obj = new AverageRatio(ratio_types[i], ratio_times[i], ratio_counts[i], mul_3(ratio_counts, i), now_start);
                if (ratio_types[i] === '1min')
                    obj.set_history_size(7200);
                target_obj.set_ratio(ratio_types[i], obj);
            }
            var now_start = performance.now();
            for (var i = 0; i < 5; i++) {
                create_ratio(this.avg, i, now_start);
            }
            this.prev_atomepersecond = window.atomepersecond;
            this.is_init_complete = true;
        };
        AutoBuyState.prototype.calc_ratio = function () {
            return this.avg.get_average('30min');
        };
        /**
         * @param {number} value
         */
        AutoBuyState.prototype.append_value = function (value) {
            if (!Number.isFinite(value)) {
                console.assert(false, 'value is not finite');
            }
            this.arr.unshift(value);
            this.avg.push(value);
            while (this.arr.length > this.arr_max_len) {
                this.arr.pop();
            }
            var new_ratio = this.calc_ratio();
            if (!Number.isFinite(new_ratio)) {
                console.assert(false, 'ratio result is not finite');
            }
            this.last_ratio = this.ratio;
            this.ratio = new_ratio;
        };
        AutoBuyState.prototype.update_ratio_mode = function () {
            var do_update = false;
            if (this.locked_cycle_count > 0) {
                this.locked_cycle_count--;
                if (this.locked_cycle_count % 100 == 0) {
                    // do_update=true;
                    l_log_if(LOG_LEVEL_INFO, 'ratio cycle lcc=%o', this.locked_cycle_count);
                }
            }
            else {
                do_update = true;
            }
            if (!do_update)
                return;
            this.total_mul = 1;
            this.total_cycle_count_change = 0;
            var did_update = this.rep_update_ratio_mode(true);
            var should_notify = did_update;
            while (did_update) {
                did_update = this.rep_update_ratio_mode(false);
            }
            if (should_notify) {
                this.finalize_locked_cycle_count();
                this.cycle_log();
            }
        };
        /** @param {boolean} do_lock */
        AutoBuyState.prototype.rep_update_ratio_mode = function (do_lock) {
            var mode_ratio_up = this.ratio_mode * .1;
            var mode_ratio_down = this.ratio_mode * .1 - .25;
            if (this.ratio > (mode_ratio_up + .5))
                return this.on_increase_ratio(do_lock, 2);
            if (this.ratio < mode_ratio_down)
                return this.on_decrease_ratio(do_lock);
            if (this.ratio > mode_ratio_up)
                return this.on_increase_ratio(do_lock);
            return false;
        };
        /** @param {boolean} do_lock */
        AutoBuyState.prototype.on_decrease_ratio = function (do_lock, mul) {
            if (mul === void 0) { mul = 1; }
            this.on_ratio_change(do_lock, -1, 10, mul);
            return true;
        };
        /** @param {boolean} do_lock */
        AutoBuyState.prototype.on_increase_ratio = function (do_lock, mul) {
            if (mul === void 0) { mul = 1; }
            this.on_ratio_change(do_lock, 1, 20, mul);
            return true;
        };
        /**
         * @param {boolean} do_lock
         * @param {number} dir_num
         * @param {number} lock_for
         * @param {number} mul
         */
        AutoBuyState.prototype.on_ratio_change = function (do_lock, dir_num, lock_for, mul) {
            if (do_lock) {
                this.do_ratio_lock(do_lock, dir_num, 60 * lock_for * mul);
            }
            else {
                this.do_ratio_lock(do_lock, dir_num, 2 * lock_for * mul);
            }
            this.on_cycle_count_change(lock_for, mul);
        };
        /**
         * @param {number} lock_for
         * @param {number} mul
         */
        AutoBuyState.prototype.on_cycle_count_change = function (lock_for, mul) {
            this.total_mul *= mul;
            this.total_cycle_count_change += lock_for;
        };
        AutoBuyState.prototype.finalize_locked_cycle_count = function () {
            var rem_val = this.locked_cycle_count % 100;
            this.locked_cycle_count -= rem_val;
            this.locked_cycle_count += 50;
        };
        /**
         * @param {boolean} _do_lock
         * @param {number} mode_change_direction
         * @param {number} num_of_cycles
         */
        AutoBuyState.prototype.do_ratio_lock = function (_do_lock, mode_change_direction, num_of_cycles) {
            this.ratio_mode += mode_change_direction;
            this.locked_cycle_count += num_of_cycles;
        };
        AutoBuyState.prototype.get_mul_modifier = function () {
            switch (this.ratio_mode) {
                case 0: return AutoBuyMulModifierFactor + 2;
                case 1: return AutoBuyMulModifierFactor + 1;
                default: return AutoBuyMulModifierFactor;
            }
        };
        /**
         * @param {string} near_avg
         */
        AutoBuyState.prototype.get_near_val = function (near_avg) {
            var real_val = this.avg.get_average(near_avg);
            var log_val = real_val;
            var log_mul_count = 0;
            if (log_val < 0.01 || log_val > 1) {
                while (log_val < 0.1) {
                    log_val *= 10;
                    log_mul_count--;
                }
                while (log_val > 1) {
                    log_val /= 10;
                    log_mul_count++;
                }
            }
            return [real_val, log_val, log_mul_count];
        };
        AutoBuyState.prototype.cycle_log = function () {
            l_log_if(LOG_LEVEL_INFO, 'ratio mode mode=%o total_mul=%o cycle_change=%o', this.ratio_mode, this.total_mul, this.total_cycle_count_change);
            var near_avg = '30min';
            var _b = this.get_near_val(near_avg), real = _b[0], num = _b[1], exponent = _b[2];
            a: if (exponent < 2 && exponent > -2) {
                l_log_if(LOG_LEVEL_INFO, 'ratio cycle avg:%s=%o lcc=%o', near_avg, (~~(real * 10000)) / 10000, this.locked_cycle_count);
            }
            else {
                l_log_if(LOG_LEVEL_ERROR, 'ratio cycle avg:%s=(%o,%o) lcc=%o', near_avg, (~~(num * 1000)) / 1000, exponent, this.locked_cycle_count);
            }
        };
        AutoBuyState.prototype.update_not_ready = function () {
            var node = new TimeoutNode(80);
            this.root_node.append_child(node);
            node.start(new TimeoutTarget(this, this.update));
        };
        AutoBuyState.prototype.update = function () {
            var not_ready = false;
            if (!not_ready)
                if (typeof window.prestige == 'undefined')
                    not_ready = true;
            if (!not_ready)
                if (window.totalAtome < 100 || window.atomepersecond < 100)
                    not_ready = true;
            if (not_ready) {
                this.update_not_ready();
                return;
            }
            this.div = Math.log2(window.prestige) * AutoBuyRatioDiv;
            //this.div=AutoBuyRatioDiv;
            this.val = Math.log2(window.totalAtome / window.atomepersecond) / this.div;
            if (!Number.isFinite(this.val)) {
                this.val = 1e-16;
                this.update_not_ready();
                return;
            }
            if (this.val < 1e-16) {
                this.val = 1e-16;
            }
            this.val *= this.get_mul_modifier();
            this.append_value(this.val);
            this.update_ratio_mode();
        };
        /**
         * @param {string} time_played_str
         */
        AutoBuyState.prototype.on_game_reset_finish = function (time_played_str) {
            var history_arr_1 = this.avg.values[0].history.slice().reverse();
            var history_item = history_arr_1[0];
            var history_div_num = 6 * 5 * 6;
            var history_arr_2 = history_arr_1.map(function (value) {
                history_item *= history_div_num - 1;
                history_item += value;
                history_item /= history_div_num;
                return (history_item * 100).toFixed(1);
            });
            var json_hist = JSON.stringify(history_arr_2);
            var json_tag = "JSON_HIST@";
            var prev_hist = sessionStorage.getItem('history');
            /**@type {string[]} */
            var data_arr;
            if (prev_hist && prev_hist.startsWith(json_tag)) {
                var hist_data = prev_hist.slice("JSON_HIST@".length);
                var prev_data_len = parseInt(hist_data.split(":", 1)[0]);
                data_arr = hist_data.slice((prev_data_len + "").length).split("|");
                if (data_arr.length != prev_data_len) {
                    console.assert(false, 'invalid data_arr len');
                }
                data_arr.push(json_hist);
            }
            else if (prev_hist && prev_hist.startsWith("JSON_HIST:")) {
                // upgrade v1
                var hist_data = prev_hist.slice("JSON_HIST:".length);
                data_arr = hist_data.split("|");
                data_arr.push(json_hist);
            }
            else {
                data_arr = [json_hist];
            }
            sessionStorage.history = "".concat(json_tag).concat(data_arr.length.toFixed(0), ":").concat(data_arr.join("|"));
            /**@type {(string|null)[]} */
            var time_played_arr = data_arr.map(function (_e) { return null; });
            if (sessionStorage.time_played_hist) {
                /**@type {string} */
                var data = sessionStorage.time_played_hist;
                data.split("@").map(function (e) {
                    var _b = e.split("|"), index = _b[0], time_str = _b[1];
                    var index_num = parseInt(index);
                    time_played_arr[index_num] = time_str;
                });
            }
            time_played_arr[time_played_arr.length - 1] = time_played_str;
            /**@type {[number, (string | null)][]} */
            var t_play_tmp = time_played_arr.map(function (e, i) { return [i, e]; });
            t_play_tmp = t_play_tmp.filter(function (e) { return e[1] !== null; });
            var t_play_tmp_2 = t_play_tmp.map(function (e) { return "".concat(e[0], "|").concat(e[1]); });
            sessionStorage.time_played_hist = t_play_tmp_2.join("@");
        };
        AutoBuyState.prototype.reset = function () {
            this.ratio *= 0.75;
            for (var i = 0; i < this.arr.length; i++) {
                this.arr[i] *= 0.75;
            }
        };
        return AutoBuyState;
    }());
    var debug_id_gen = new UniqueIdGenerator;
    /**@type {WeakRef<{sym:symbol}>[]}*/
    var debug_id_syms = [];
    function next_debug_id() {
        var id = debug_id_gen.next();
        var sym = Symbol(id);
        debug_id_syms.push(new WeakRef({ sym: sym }));
        return sym;
    }
    var sym_id_gen = new UniqueIdGenerator;
    var named_sym_gen = new NamedIdGenerator;
    /**@type {(symbol | [string, number, symbol])[]} */
    var sym_id_syms = [];
    function next_sym() {
        var id = sym_id_gen.next();
        var sym = Symbol(id);
        sym_id_syms.push(sym);
        return sym;
    }
    /**@type {(v:string)=>symbol} */
    function labeled_sym(name) {
        var id = named_sym_gen.next_named(name);
        var sym = Symbol("".concat(name, "@").concat(id));
        sym_id_syms.push([name, id, sym]);
        return sym;
    }
    /**@implements {VMBoxedDomValue} */
    var VMBoxedDomValueR = /** @class */ (function () {
        /**
         * @param {"get"|"create"|string} from
         * @param {Node} value
         */
        function VMBoxedDomValueR(from, value) {
            this.type = "dom_value";
            if (from === 'get' || from === 'create') {
                this.from = from;
            }
            else {
                throw new Error("Invalid constructor arguments for VMBoxedDomValue");
            }
            this.value = value;
        }
        /**@arg {'function'} _a */
        VMBoxedDomValueR.prototype.get_matching_typeof = function (_a) {
            return null;
        };
        return VMBoxedDomValueR;
    }());
    /**@type {<T, U extends T>(_v:T, x?:U)=>_v is U} */
    function assume_equal(_v, _q) {
        return true;
    }
    var DataLoader = /** @class */ (function () {
        /**
         * @param {Storage} storage
         */
        function DataLoader(storage) {
            this.store = storage;
        }
        /**
         * @param {string} key
         * @param {string[]} def_value
         */
        DataLoader.prototype.load_str_arr = function (key, def_value) { var data = this.store.getItem(key); if (data === null)
            return def_value; return data.split(","); };
        /**
         * @param {string} key
         * @param {any} def_value
         */
        DataLoader.prototype.load_int_arr = function (key, def_value, storage_data) {
            if (storage_data === void 0) { storage_data = this.store.getItem(key); }
            if (storage_data === null)
                return def_value;
            return this.parse_int_arr(storage_data);
        };
        /**
         * @param {string} key
         * @param {{ (_e: any): number[]; (): any; }} def_factory
         */
        DataLoader.prototype.load_int_arr_cb = function (key, def_factory, storage_data) {
            if (storage_data === void 0) { storage_data = this.store.getItem(key); }
            if (storage_data === null)
                return def_factory();
            return this.parse_int_arr(storage_data);
        };
        /**
         * @param {string} string
         */
        DataLoader.prototype.default_split = function (string) { return string.split(","); };
        /**
         * @param {string} data
         */
        DataLoader.prototype.parse_int_arr = function (data) { return this.default_split(data).map(DataLoader.int_parser); };
        DataLoader.int_parser = new WebAssembly.Function({ parameters: ['externref'], results: ['f64'] }, parseInt);
        return DataLoader;
    }());
    /**@typedef {import("types/vm/mod.js").CallableReturnsVoidPromiseBox} VMReturnsBoxedVoidPromise */
    /**@implements {VMReturnsBoxedVoidPromise} */
    var VMReturnsBoxedVoidPromiseR = /** @class */ (function () {
        /**@arg {VMReturnsBoxedVoidPromise['value']} value */
        function VMReturnsBoxedVoidPromiseR(value) {
            /**@type {"function_box"} */
            this.type = "function_box";
            /**@type {"promise"} */
            this.return_type = "promise";
            /**@type {"void_type"} */
            this.promise_return_type_special = "void_type";
            this.value = value;
        }
        /**@arg {"function"} to_match */
        VMReturnsBoxedVoidPromiseR.prototype.get_matching_typeof = function (to_match) {
            if (typeof this.value === to_match) {
                return this;
            }
            return null;
        };
        return VMReturnsBoxedVoidPromiseR;
    }());
    /**@typedef {[number, 'get', string]} DomExecDescriptionI1 */
    /**@typedef {[number, 'create', string, string, {[s:string]:Boxed}] | [number, 'create', string, string, string]} DomExecDescriptionI2 */
    /**@typedef {[number, 'dup']} DomExecDescriptionI3 */
    /**@typedef {[number, 'append']} DomExecDescriptionI4 */
    /**@typedef {[number, 'push', null, VMReturnsBoxedVoidPromiseR]} DomExecDescriptionI5 */
    /**@typedef {[number, 'new', Boxed, any[], (obj: CSSStyleSheet, str: string) => Promise<CSSStyleSheet>, any[]]} DomExecDescriptionI6 */
    /**@typedef {[number, 'call', number]} DomExecDescriptionI7 */
    /**@typedef {[number, 'drop']} DomExecDescriptionI8 */
    /**@typedef {[number, 'breakpoint']} DomExecDescriptionI9 */
    /**@typedef {DomExecDescriptionI1|DomExecDescriptionI2|DomExecDescriptionI3|DomExecDescriptionI4} DomExecDescriptionG1 */
    /**@typedef {DomExecDescriptionI5|DomExecDescriptionI6|DomExecDescriptionI7|DomExecDescriptionI8} DomExecDescriptionG2 */
    /**@typedef {DomExecDescriptionI9} */
    /**@typedef {DomExecDescriptionG1|DomExecDescriptionG2|DomExecDescriptionI9} DomExecDescription */
    var DO_UPGRADES_RANDOM_RATE = 0.008; // 0.005
    var AsyncAutoBuy = /** @class */ (function () {
        /**@arg {AutoBuy} parent */
        function AsyncAutoBuy(parent) {
            this.parent = parent;
        }
        /**
         * @param {boolean} no_wait
         */
        AsyncAutoBuy.prototype.do_start_main_async = function (no_wait) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!!no_wait) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.next_timeout_async(this.timeout_ms, 'A')];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this.main_async()];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncAutoBuy.prototype.maybe_async_reset = function () {
            return __awaiter(this, void 0, void 0, function () {
                var loss_rate;
                return __generator(this, function (_b) {
                    loss_rate = this.parent.unit_promote_start();
                    if (this.parent.maybe_run_reset())
                        return [2 /*return*/, [true, loss_rate]];
                    return [2 /*return*/, [false, loss_rate]];
                });
            });
        };
        AsyncAutoBuy.prototype.bonus_async = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            window.bonusAll();
                            return [4 /*yield*/, this.fast_unit_async()];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncAutoBuy.prototype.initial_special_async = function () {
            return __awaiter(this, void 0, void 0, function () {
                var in_special;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.next_timeout_async(this.timeout_ms, '>')];
                        case 1:
                            _b.sent();
                            in_special = true;
                            _b.label = 2;
                        case 2:
                            if (!in_special) return [3 /*break*/, 6];
                            if (!this.parent.do_special()) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.next_timeout_async(this.timeout_ms, '^')];
                        case 3:
                            _b.sent();
                            return [3 /*break*/, 2];
                        case 4:
                            in_special = false;
                            _b.label = 5;
                        case 5: return [3 /*break*/, 2];
                        case 6: return [4 /*yield*/, this.next_timeout_async(this.timeout_ms, '#')];
                        case 7:
                            _b.sent();
                            return [4 /*yield*/, this.bonus_async()];
                        case 8:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncAutoBuy.prototype.rare_begin_async = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.parent.do_rare_begin_change();
                            return [4 /*yield*/, this.next_timeout_async(this.timeout_ms, '<')];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, this.initial_special_async()];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncAutoBuy.prototype.normal_decrease_async = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.parent.do_normal_decrease();
                            return [4 /*yield*/, this.next_timeout_async(this.timeout_ms, '-')];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncAutoBuy.prototype.large_decrease_async = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.parent.do_large_decrease();
                            return [4 /*yield*/, this.next_timeout_async(this.timeout_ms, '!')];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncAutoBuy.prototype.main_async = function () {
            return __awaiter(this, void 0, void 0, function () {
                var unit_upgradeable_trigger, _b, quit, loss_rate;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (this.main_running) {
                                throw new Error("Already running");
                            }
                            this.main_running = true;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, , 15, 16]);
                            _c.label = 2;
                        case 2:
                            if (!this.main_running) return [3 /*break*/, 14];
                            this.iter_count = 0;
                            _c.label = 3;
                        case 3:
                            unit_upgradeable_trigger = 30;
                            if (this.timeout_ms && this.timeout_ms > 3 * 60 * 1000) {
                                unit_upgradeable_trigger = 8;
                            }
                            if (!(this.parent.unit_upgradable_count > unit_upgradeable_trigger)) return [3 /*break*/, 5];
                            this.unit_upgradable_count = 0;
                            return [4 /*yield*/, this.rare_begin_async()];
                        case 4:
                            _c.sent();
                            _c.label = 5;
                        case 5:
                            if (!(this.iter_count < 6)) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.normal_decrease_async()];
                        case 6:
                            _c.sent();
                            return [3 /*break*/, 9];
                        case 7: return [4 /*yield*/, this.large_decrease_async()];
                        case 8:
                            _c.sent();
                            _c.label = 9;
                        case 9: return [4 /*yield*/, this.maybe_async_reset()];
                        case 10:
                            _b = _c.sent(), quit = _b[0], loss_rate = _b[1];
                            if (quit)
                                return [3 /*break*/, 14];
                            if (loss_rate > 0.08)
                                return [3 /*break*/, 11];
                            if (this.parent.pre_total == window.totalAtome)
                                return [3 /*break*/, 12];
                            _c.label = 11;
                        case 11: return [3 /*break*/, 3];
                        case 12: return [4 /*yield*/, this.faster_timeout_async()];
                        case 13:
                            _c.sent();
                            return [3 /*break*/, 2];
                        case 14: return [3 /*break*/, 16];
                        case 15:
                            this.main_running = false;
                            return [7 /*endfinally*/];
                        case 16:
                            if (this.main_running) {
                                console.log('no finally');
                                this.main_running = false;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncAutoBuy.prototype.fast_unit_async = function () {
            return __awaiter(this, void 0, void 0, function () {
                var count;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.fast_unit_running = true;
                            count = 0;
                            _b.label = 1;
                        case 1:
                            if (!this.fast_unit_running) return [3 /*break*/, 3];
                            this.parent.unit_promote_start();
                            if (this.parent.pre_total == window.totalAtome)
                                return [3 /*break*/, 3];
                            this.parent.do_fast_unit_step_change();
                            return [4 /*yield*/, this.next_timeout_async(this.timeout_ms, ':')];
                        case 2:
                            _b.sent();
                            count++;
                            if (count > 12)
                                this.fast_unit_running = false;
                            return [3 /*break*/, 1];
                        case 3:
                            this.parent.do_fast_unit_change();
                            return [4 /*yield*/, this.next_timeout_async(this.timeout_ms, '$')];
                        case 4:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncAutoBuy.prototype.faster_timeout_async = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.parent.do_timeout_inc([1.006, 1.005], 4);
                            return [4 /*yield*/, this.next_timeout_async(this.timeout_ms, '+')];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {number | undefined} timeout
         * @param {string} char
         */
        AsyncAutoBuy.prototype.next_timeout_async = function (timeout, char, silent) {
            if (silent === void 0) { silent = false; }
            return __awaiter(this, void 0, void 0, function () {
                var node;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            node = new AsyncTimeoutNode(timeout);
                            this.parent.root_node.append_child(node);
                            if (!silent) {
                                this.timeout_ms = timeout;
                                this.parent.update_timeout_element();
                            }
                            this.parent.state_history_append(char, silent);
                            return [4 /*yield*/, node.start_async(new AsyncTimeoutTarget)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return AsyncAutoBuy;
    }());
    var AutoBuy = /** @class */ (function () {
        function AutoBuy() {
            var _b;
            /**
             * @type {number[]}
             */
            this.large_diff = [];
            this.unit_upgradable_count = 0;
            this.root_node = new AsyncNodeRoot;
            this.with_async = new AsyncAutoBuy(this);
            this.timeout_ms = 0;
            this.iter_count = 0;
            this.epoch_len = 0;
            this.background_audio = null;
            this.state_history_arr = null;
            this.skip_save = false;
            this.has_real_time = false;
            /**
             * @type {never[]}
             */
            this.cint_arr = [];
            this.local_data_loader = new DataLoader(localStorage);
            this.state = new AutoBuyState(this.root_node);
            this.debug = this.state.debug;
            this.compressor = new MulCompression;
            this.state_history_arr = this.local_data_loader.load_str_arr('auto_buy_history_str', ["S"]);
            this.epoch_start_time = Date.now();
            this.original_map = new Map;
            /**@type {Map<string, (Node|string)>} */
            this.dom_map = new Map;
            this.debug_arr = [];
            this.flags = new Set();
            /**@type {any} */
            var this_as_any = this;
            /**@type {{[x:symbol]:string}} */
            var sym_indexed_this = this_as_any;
            for (var i = 0; i < debug_id_syms.length; i++) {
                var val = debug_id_syms[i].deref();
                if (val && sym_indexed_this[val.sym])
                    (_b = this.debug_arr).push.apply(_b, sym_indexed_this[val.sym].split(",").map(function (e) { return e.trim(); }));
            }
            this.timeout_arr = this.local_data_loader.load_int_arr_cb('auto_buy_timeout_str', function (_e) {
                var src = [300];
                src.length = 16;
                var data_len = 1;
                while (data_len < src.length) {
                    src.copyWithin(data_len, 0);
                    data_len *= 2;
                }
                return src;
            });
        }
        AutoBuy.prototype.async_compress = function () {
            this.state_history_arr = this.compressor.compress_array(this.state_history_arr);
            this.update_history_element();
        };
        AutoBuy.prototype.pre_init = function () {
            this.background_audio = document.querySelector("#background_audio");
            if (!this.background_audio)
                throw new Error("Missing element querySelector('#background_audio')");
            if (this.background_audio instanceof HTMLAudioElement) {
                this.background_audio.onloadeddata = null;
                this.background_audio.volume = AUDIO_ELEMENT_VOLUME;
            }
            else {
                throw new Error("querySelector('#background_audio') is not an instance of HTMLAudioElement");
            }
            this.async_pre_init().then(function () {
                l_log_if(LOG_LEVEL_INFO, 'pre_init done');
            });
            this.dom_pre_init();
        };
        AutoBuy.prototype.async_pre_init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var e_2, raw_instructions, instructions, handler;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.background_audio)
                                throw 1;
                            if (!(this.background_audio instanceof HTMLAudioElement))
                                throw 1;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.background_audio.play()];
                        case 2: return [2 /*return*/, _b.sent()];
                        case 3:
                            e_2 = _b.sent();
                            l_log_if(LOG_LEVEL_INFO, "failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
                            return [3 /*break*/, 4];
                        case 4:
                            raw_instructions = "\n\t\t\tthis;\n\t\t\tcast_object,object_index;\n\t\t\tpush,target_obj;\n\t\t\tget;\n\t\t\tcast_object,object_index;\n\t\t\tpush,background_audio;\n\t\t\tget;\n\t\t\tcast_object,callable_index;\n\t\t\tpush,play;\n\t\t\tcall,int(2);\n\t\t\tcast_object,callable_index;\n\t\t\tpush,then;\n\t\t\tpush,%o;\n\t\t\tpush,%o;\n\t\t\tcall,int(4);\n\t\t\tdrop;\n\t\t\tglobal;\n\t\t\tcast_object,callable_index;\n\t\t\tpush,removeEventListener;\n\t\t\tpush,click;\n\t\t\tthis;\n\t\t\tcall,int(4);\n\t\t\tdrop";
                            instructions = SimpleStackVMParser.parse_instruction_stream_from_string(raw_instructions, [
                                function () {
                                    // LOG_LEVEL_INFO
                                    l_log_if(LOG_LEVEL_ERROR, 'play success');
                                },
                                /**@arg {any} err */
                                function (err) {
                                    l_log_if(LOG_LEVEL_ERROR, err);
                                }
                            ]);
                            handler = new EventHandlerVMDispatch(instructions, this);
                            window.addEventListener('click', handler);
                            return [2 /*return*/];
                    }
                });
            });
        };
        AutoBuy.prototype.save_state_history_arr = function () {
            if (this.skip_save)
                return;
            localStorage.auto_buy_history_str = this.state_history_arr.join(",");
        };
        /**
         * @param {string} forced_action
         */
        AutoBuy.prototype.get_timeout_arr_data = function (forced_action) {
            if (forced_action == "RESET")
                return this.timeout_arr.map(function (/** @type {number} */ e) { return ~~(e / 4); }).join(",");
            return this.timeout_arr.join(",");
        };
        AutoBuy.prototype.save_timeout_arr = function () {
            var _b;
            var forced_action, action_count;
            var action_data = localStorage.auto_buy_forced_action;
            if (action_data)
                _b = action_data.split(","), forced_action = _b[0], action_count = _b[1];
            localStorage.auto_buy_timeout_str = this.get_timeout_arr_data(forced_action);
            if (action_count !== void 0) {
                action_count = parseInt(action_count);
                if (Number.isFinite(action_count)) {
                    if (action_count > 0) {
                        localStorage.auto_buy_forced_action = [forced_action, action_count - 1];
                    }
                    else if (forced_action !== "NONE") {
                        localStorage.auto_buy_forced_action = "NONE,0";
                    }
                }
            }
        };
        AutoBuy.prototype.dom_pre_init = function () {
            var css_display_style = "#state_log>div{width:max-content}#state_log{top:0px;width:30px;position:fixed;z-index:101;font-family:monospace;font-size:22px;color:lightgray}";
            /**@type {DomExecDescription[]} */
            var create_state_log_arr = [
                [0, 'get', 'body'],
                [1, 'create', 'div', 'state_log', { id: 'state_log' }],
                [1, 'dup'],
                [1, 'append']
            ];
            /**
             * @this {AutoBuy}
             * */
            function css_promise_runner( /** @type {Boxed[]} */) {
                var styles_promise_arr = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    styles_promise_arr[_i] = arguments[_i];
                }
                return __awaiter(this, void 0, void 0, function () {
                    var css_arr, i, cur, e, fulfilled_res, rejected_res, i, cur, res, css_arr2, i, cur;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                css_arr = [];
                                for (i = 0; i < styles_promise_arr.length; i++) {
                                    cur = styles_promise_arr[i];
                                    l_log_if(LOG_LEVEL_INFO, 'css run', cur);
                                    if (typeof cur != 'object')
                                        continue;
                                    if (cur === null)
                                        continue;
                                    if (cur.type != 'promise')
                                        continue;
                                    if (cur.await_type === 'value') {
                                        css_arr.push(cur.value);
                                    }
                                }
                                return [4 /*yield*/, Promise.allSettled(css_arr)];
                            case 1:
                                e = _b.sent();
                                fulfilled_res = [];
                                rejected_res = [];
                                for (i = 0; i < e.length; i++) {
                                    cur = e[i];
                                    if (cur.status === 'fulfilled') {
                                        fulfilled_res.push(cur);
                                    }
                                    else {
                                        rejected_res.push(cur);
                                    }
                                }
                                res = fulfilled_res.map(function (e_1) { return e_1.value; });
                                css_arr2 = [];
                                for (i = 0; i < res.length; i++) {
                                    cur = res[i];
                                    l_log_if(LOG_LEVEL_INFO, 'css ss', cur);
                                    if (typeof cur != 'object')
                                        continue;
                                    if (cur === null)
                                        continue;
                                    if (cur.type != 'instance_box')
                                        continue;
                                    if (cur.instance_type != "CSSStyleSheet")
                                        continue;
                                    css_arr2.push(cur.value);
                                }
                                l_log_if(LOG_LEVEL_INFO, 'promise res2', css_arr2);
                                this.adopt_styles.apply(this, css_arr2);
                                if (rejected_res.length > 0) {
                                    l_log_if.apply(void 0, __spreadArray([LOG_LEVEL_ERROR, 'promise failure...'], rejected_res, false));
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var bound_this = this;
            /**@typedef {import("types/vm/mod.js").VoidPromiseBox} VMBoxedVoidPromise */
            /**@implements {VMBoxedVoidPromise} */
            var VMBoxedVoidPromiseR = /** @class */ (function () {
                /**@arg {VMBoxedVoidPromise['value']} value */
                function VMBoxedVoidPromiseR(value) {
                    /**@type {"promise"} */
                    this.type = "promise";
                    this.return_type = null;
                    this.await_type = null;
                    /**@type {"void_type"} */
                    this.promise_return_type_special = "void_type";
                    this.value = value;
                }
                /**@arg {"function"} _s */
                VMBoxedVoidPromiseR.prototype.get_matching_typeof = function (_s) {
                    return null;
                };
                return VMBoxedVoidPromiseR;
            }());
            /**@type {DomExecDescription[]} */
            var make_css_arr = [
                [
                    0, 'push', null,
                    new VMReturnsBoxedVoidPromiseR(function ( /** @type {Boxed[]} */) {
                        var a = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            a[_i] = arguments[_i];
                        }
                        l_log_if(LOG_LEVEL_INFO, 'void input', a);
                        var ret = css_promise_runner.call.apply(css_promise_runner, __spreadArray([bound_this], a, false));
                        l_log_if(LOG_LEVEL_INFO, 'void out', ret);
                        return new VMBoxedVoidPromiseR(ret);
                    })
                ],
                [
                    0, 'new', new VMBoxedCSSStyleSheetConstructorR(CSSStyleSheet), [],
                    function (/** @type {CSSStyleSheet} */ obj, /** @type {string} */ str) { return obj.replace(str); },
                    [css_display_style]
                ],
                [0, 'call', 3],
                /*drop the promise*/
                [0, 'drop']
            ];
            /**@type {DomExecDescription[]} */
            var raw_dom_arr = __spreadArray(__spreadArray(__spreadArray([], create_state_log_arr, true), [
                [2, 'create', 'div', 'history', "?3"],
                [2, 'append'],
                [2, 'create', 'div', 'timeout_element', "0"],
                [2, 'append'],
                [2, 'create', 'div', 'hours_played', "0.000 hours"],
                [2, 'append'],
                [2, 'create', 'div', 'ratio', 0..toFixed(2) + "%"],
                [2, 'append'],
                [2, 'create', 'div', 'ratio_change', 0..toExponential(3)],
                [2, 'append'],
                [1, 'drop'],
                [0, 'drop']
            ], false), make_css_arr, true);
            this.build_dom_from_desc(raw_dom_arr, this.dom_map);
        };
        /**
         * @param {CSSStyleSheet[]} styles
         */
        AutoBuy.prototype.adopt_styles = function () {
            var styles = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                styles[_i] = arguments[_i];
            }
            var dom_styles = document.adoptedStyleSheets;
            document.adoptedStyleSheets = __spreadArray(__spreadArray([], dom_styles, true), styles, true);
        };
        /**
         * @arg {(a:CSSStyleSheet, b:string)=>Promise<CSSStyleSheet>} callback
         * @arg {[CSSStyleSheet, string]} a
        */
        AutoBuy.prototype.use_boxed_style_sheet = function (callback) {
            var a = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                a[_i - 1] = arguments[_i];
            }
            var ret = callback.apply(void 0, a);
            var r2 = ret.then(function (v) {
                return new VMBoxedCSSStyleSheetR(v);
            });
            var res = new PromiseBoxImpl(r2);
            return res;
        };
        /**@typedef {[number, ...InstructionType]} InstructionWithDepth */
        /**
         * @param {DomExecDescription[]} raw_arr
         */
        AutoBuy.prototype.build_dom_from_desc = function (raw_arr, trg_map) {
            if (trg_map === void 0) { trg_map = new Map; }
            /**@type {InstructionWithDepth[]} */
            var stack = [];
            var map = trg_map;
            for (var i = 0; i < raw_arr.length; i++) {
                var cur_item = raw_arr[i];
                // let [depth, action, ...args] = cur_item;
                switch (cur_item[1]) {
                    case 'get':
                        {
                            var cur_element = void 0, query_arg = cur_item[2];
                            switch (query_arg) {
                                case 'body':
                                    cur_element = document.body;
                                    break;
                                default:
                                    cur_element = document.querySelector(query_arg);
                                    break;
                            }
                            if (!cur_element)
                                throw new Error("build from dom failed, element not found: \"" + query_arg + "\"");
                            stack.push([cur_item[0], "push", new VMBoxedDomValueR('get', cur_element)]);
                        }
                        break;
                    case 'new':
                        {
                            var depth = cur_item[0], class_box = cur_item[2], construct_arg_arr = cur_item[3], callback = cur_item[4], arg_arr = cur_item[5];
                            var fn_box = new FunctionBoxImpl(
                            /**
                             * @arg {AutoBuy} obj
                             * @arg {(obj: CSSStyleSheet, str: string) => Promise<CSSStyleSheet>} callback
                             * @arg {any} a
                             * @arg {any} b */
                            function (obj, callback, a, b) {
                                return obj.use_boxed_style_sheet(callback, a, b);
                            }.bind(null, this, callback));
                            stack.push(__spreadArray(__spreadArray([cur_item[0], 'push', null, fn_box], construct_arg_arr, true), [class_box], false), [cur_item[0], 'construct', 1 + construct_arg_arr.length], __spreadArray([depth, 'push'], arg_arr, true), [depth, 'call', 3 + arg_arr.length]);
                        }
                        break;
                    case 'create':
                        {
                            var depth = cur_item[0], element_type = cur_item[2], name_1 = cur_item[3], content = cur_item[4];
                            var cur_element = document.createElement(element_type);
                            if (typeof content == 'string')
                                cur_element.innerText = content;
                            else if (typeof content == 'object' && content.id) {
                                var dom_id = content.id;
                                if (typeof dom_id === 'string') {
                                    cur_element.id = dom_id;
                                }
                            }
                            else {
                                l_log_if(LOG_LEVEL_ERROR, 'bad typeof == %s for content in build_dom; content=%o', typeof content, content);
                                l_log_if(LOG_LEVEL_TRACE, "Info: case 'create' args are", element_type, name_1);
                            }
                            map.set(name_1, cur_element);
                            stack.push([depth, "push", new VMBoxedDomValueR('create', cur_element)]);
                        }
                        break;
                    case 'append':
                        {
                            var depth = cur_item[0];
                            /*peek at the return stack, up 1 depth*/
                            stack.push([depth, "peek", depth - 1, 0]);
                            stack.push(cur_item);
                        }
                        break;
                    case 'dup':
                    case 'breakpoint':
                    case 'drop':
                    case 'call': /*push the item*/
                    case 'push':
                        stack.push(cur_item);
                        break;
                    default:
                        {
                            /**@type {any} */
                            var any_cur = cur_item;
                            if (!(any_cur instanceof Array))
                                throw 1;
                            var action = any_cur[1];
                            l_log_if(LOG_LEVEL_ERROR, 'might need to handle', action);
                            debugger;
                        }
                        break;
                }
                if (this.debug_arr.includes('build_dom_from_desc'))
                    console.log('es', stack.at(-1));
            }
            var instructions = this.parse_dom_stack(stack);
            var builder_vm = new DomBuilderVM(instructions);
            builder_vm.run();
        };
        /**
         * @param {string} tag
         * @param {(string | number | any[])[]} log_args
         */
        AutoBuy.prototype.log_if = function (tag) {
            var log_args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                log_args[_i - 1] = arguments[_i];
            }
            if (this.debug_arr.includes(tag)) {
                console.log.apply(console, log_args);
            }
        };
        /**
         * @param {string} tag
         */
        AutoBuy.prototype.get_logging_level = function (tag, level) {
            if (level === void 0) { level = LOG_LEVEL_INFO; }
            if (this.debug_arr.includes(tag)) {
                return level - 1;
            }
            return level;
        };
        Object.defineProperty(AutoBuy.prototype, next_debug_id(), {
            get: function () {
                return '';
            },
            enumerable: false,
            configurable: true
        });
        /**@typedef {((InstructionType|['vm_call_at', InstructionType])[]|null)[]} DomInstructionStack */
        /**
         * @arg {import("api").NonNull<DomInstructionStack[0]>[0]} value @arg {number} stack_ptr
         * @arg {DomInstructionStack} stack
         * */
        AutoBuy.prototype.push_instruction_group = function (stack, stack_ptr, value) {
            var instructions_at = stack[stack_ptr];
            if (instructions_at) {
                instructions_at.push(value);
            }
            else {
                stack[stack_ptr] = [value];
            }
        };
        /** @arg {InstructionWithDepth[]} input_instructions @returns {InstructionType[]} */
        AutoBuy.prototype.parse_dom_stack = function (input_instructions) {
            var double_indirect_error_str = "Double indirect vm_call is hard to prove to the typechecker";
            /**@type {DomInstructionStack} */
            var stack = [];
            /**@type {number[]} */
            var depths = [];
            for (var i = 0; i < input_instructions.length; i++) {
                var cur = input_instructions[i];
                var cur_depth = cur[0], cur_instruction = cur.slice(1);
                this.push_instruction_group(stack, cur_depth, cur_instruction);
                var prev_depth = depths.at(-1);
                if (prev_depth != cur_depth && prev_depth) {
                    if (cur_depth > prev_depth) {
                        var instructions_at = stack[prev_depth];
                        if (!instructions_at)
                            throw new Error("");
                        var ins_start_item = instructions_at[0];
                        if (ins_start_item[0] === 'vm_call_at')
                            throw new Error(double_indirect_error_str);
                        this.push_instruction_group(stack, prev_depth - 1, ['vm_call_at', ins_start_item]);
                    }
                }
                depths.push(cur_depth);
            }
            /**@type {import("api").NonNull<DomInstructionStack[0]>} */
            var flat_stack = [];
            /**@type {InstructionType[]} */
            var instructions = [];
            for (var i = 0; i < stack.length; i++) {
                var cur_instructions = stack[i];
                if (!cur_instructions)
                    continue;
                flat_stack.push.apply(flat_stack, cur_instructions);
                flat_stack.push(["vm_return"]);
            }
            for (var i = 0; i < flat_stack.length; i++) {
                var instruction = flat_stack[i];
                if (instruction[0] === 'vm_call_at') {
                    var idx = flat_stack.indexOf(instruction[1]);
                    instructions.push(['vm_call', idx]);
                    continue;
                }
                instructions.push(instruction);
            }
            console.log('parse_dom_stack', stack, depths, instructions);
            return instructions;
        };
        AutoBuy.prototype.init_dom = function () {
            var font_size_px = 22;
            var t = this;
            this.state_history_arr_max_len = Math.floor(document.body.getClientRects()[0].width / (font_size_px * 0.55) / 2.1);
            var history = this.dom_map.get('history');
            if (history && typeof history == 'object')
                history.addEventListener('click', new EventHandlerDispatch(this, 'history_element_click_handler'));
            var ratio = this.dom_map.get('ratio');
            if (ratio && typeof ratio == 'object') {
                ratio.addEventListener('click', function () {
                    t.state.reset();
                });
            }
            var state_log = this.dom_map.get('state_log');
            if (state_log instanceof HTMLElement)
                state_log.style.fontSize = font_size_px + "px";
            window.addEventListener('unload', function () {
                t.save_state_history_arr();
                t.save_timeout_arr();
            });
        };
        AutoBuy.prototype.global_init = function () {
            if (window.g_auto_buy && window.g_auto_buy !== this) {
                window.g_auto_buy.destroy();
            }
            window.g_auto_buy = this;
        };
        AutoBuy.prototype.destroy = function () {
            this.root_node.destroy();
            for (var i = 0; i < this.cint_arr.length; i += 2) {
                var cint_item = this.cint_arr[i];
                switch (cint_item[0]) {
                    case 1:
                        clearTimeout(cint_item[1]);
                        break;
                    case 2:
                        clearInterval(cint_item[1]);
                        break;
                    default:
                        console.assert(false, 'cant destroy cint item (%o)', cint_item);
                        break;
                }
            }
        };
        AutoBuy.prototype.update_timeout_element = function () {
            if (this.timeout_ms) {
                var element = this.dom_map.get('timeout_element');
                if (element instanceof HTMLElement) {
                    element.innerText = this.get_millis_as_pretty_str(this.round(this.timeout_ms), 0); // (this.timeout_avg()[1]);
                }
            }
        };
        /**
         * @param {string | number} value
         * @param {string} pad_char
         * @param {number} char_num
         */
        AutoBuy.prototype.do_zero_pad = function (value, pad_char, char_num) {
            var string;
            if (typeof value === 'number') {
                string = value.toString();
            }
            else {
                string = value;
            }
            while (string.length < char_num) {
                string = pad_char + string;
            }
            return string;
        };
        /**
         * @param {number} timeout_milli
         * @param {number | undefined} milli_acc
         */
        AutoBuy.prototype.get_millis_as_pretty_str = function (timeout_milli, milli_acc) {
            var time_arr = [];
            var float_milliseconds = timeout_milli % 1000;
            var milli_len = 6;
            if (milli_acc === 0) {
                milli_len = 3;
            }
            time_arr[3] = this.do_zero_pad(float_milliseconds.toFixed(milli_acc), '0', milli_len);
            timeout_milli -= float_milliseconds;
            timeout_milli /= 1000;
            var int_seconds = timeout_milli % 60;
            time_arr[2] = this.do_zero_pad(int_seconds, '0', 2);
            timeout_milli -= int_seconds;
            timeout_milli /= 60;
            var int_minutes = timeout_milli % 60;
            time_arr[1] = this.do_zero_pad(int_minutes, '0', 2);
            timeout_milli -= int_minutes;
            timeout_milli /= 60;
            var int_hours = timeout_milli;
            time_arr[0] = this.do_zero_pad(int_hours, '0', 2);
            int_hours === 0 && (time_arr.shift(), int_minutes === 0 && (time_arr.shift(), int_seconds === 0 && time_arr.shift()));
            switch (time_arr.length) {
                case 1:
                    return time_arr[0] + 'ms';
                case 2:
                    return time_arr[0] + '.' + time_arr[1];
                case 3:
                    return time_arr.slice(0, 2).join(":") + '.' + time_arr[2];
                case 4:
                    return time_arr.slice(0, 3).join(":") + '.' + time_arr[3];
            }
            return time_arr.join(":");
        };
        /**
         * @param {number} hours_num
         */
        AutoBuy.prototype.get_hours_num_as_pretty_str = function (hours_num) {
            var int_hours = ~~hours_num;
            var time_arr = [];
            time_arr[0] = this.do_zero_pad(int_hours, '0', 2);
            var float_minutes = (hours_num - int_hours) * 60;
            var int_minutes = ~~float_minutes;
            time_arr[1] = this.do_zero_pad(int_minutes, '0', 2);
            var float_seconds = (float_minutes - int_minutes) * 60;
            var int_seconds = ~~float_seconds;
            time_arr[2] = this.do_zero_pad(int_seconds, '0', 2);
            var float_milliseconds = (float_seconds - int_seconds) * 1000;
            var float_milli_from_prev = float_milliseconds - 1000;
            if (float_milliseconds > 100 && float_milliseconds < 900) {
                this.has_real_time = true;
            }
            x: if (this.has_real_time) { }
            else if (float_milliseconds < 3e-9 && float_milliseconds > -3e-9) { }
            else if (float_milli_from_prev < 3e-9 && float_milli_from_prev > -3e-9) { }
            else {
                break x;
                // console.log(float_milliseconds, float_milliseconds - 1000);
            }
            var int_milliseconds = ~~float_milliseconds;
            if (int_milliseconds >= 1000) {
                int_milliseconds -= 1000;
                int_seconds++;
                if (int_seconds >= 60) {
                    int_seconds = 0;
                    int_minutes++;
                    if (int_minutes >= 60) {
                        int_minutes = 0;
                        int_hours++;
                        time_arr[0] = this.do_zero_pad(int_hours, '0', 2);
                        console.log('sec+ min+ hour+');
                    }
                    else {
                        console.log('sec+ min+');
                    }
                    time_arr[1] = this.do_zero_pad(int_minutes, '0', 2);
                }
                else {
                    console.log('sec+');
                }
                time_arr[2] = this.do_zero_pad(int_seconds, '0', 2);
            }
            time_arr[3] = this.do_zero_pad(int_milliseconds, '0', 3);
            int_hours === 0 && (time_arr.shift(), int_minutes === 0 && (time_arr.shift(), int_seconds === 0 && time_arr.shift()));
            switch (time_arr.length) {
                case 1:
                    return time_arr[0] + 'ms';
                case 2:
                    return time_arr[0] + '.' + time_arr[1];
                case 3:
                    return time_arr.slice(0, 2).join(":") + '.' + time_arr[2];
                case 4:
                    return time_arr.slice(0, 3).join(":") + '.' + time_arr[3];
            }
            return time_arr.join(":");
        };
        AutoBuy.prototype.update_hours_played = function () {
            var float_hours = ((window.timeplayed / 30) / 60);
            var time_played_str = this.get_hours_num_as_pretty_str(float_hours);
            var hours_played_e = this.dom_map.get('hours_played');
            if (hours_played_e instanceof HTMLElement)
                hours_played_e.innerText = time_played_str;
            this.dom_map.set('time_played_str', time_played_str);
        };
        AutoBuy.prototype.update_ratio_element = function () {
            var ratio = this.dom_map.get('ratio');
            if (!ratio)
                return;
            if (!(ratio instanceof HTMLElement))
                return;
            ratio.innerText = (this.state.ratio * 100).toFixed(2) + "%";
        };
        AutoBuy.prototype.update_ratio_change_element = function () {
            var last_ratio = this.state.last_ratio * 100;
            var cur_ratio = this.state.ratio * 100;
            var ratio_diff = cur_ratio - last_ratio;
            var char_value = "+";
            if (ratio_diff < 0)
                char_value = '';
            var ratio_change = this.dom_map.get('ratio_change');
            if (ratio_change && ratio_change instanceof HTMLElement)
                ratio_change.innerText = char_value + ratio_diff.toExponential(3);
        };
        AutoBuy.prototype.update_history_element = function () {
            var history = this.dom_map.get('history');
            if (history && history instanceof HTMLElement) {
                var sample_len = this.state_history_arr_max_len;
                if (!sample_len)
                    return;
                var end_sample = array_sample_end(this.state_history_arr, sample_len).join(" ");
                history.innerText = end_sample;
            }
        };
        AutoBuy.prototype.next_update = function () {
            if (this.flags.has('do_reset_dom')) {
                this.flags["delete"]('do_reset_dom');
                return;
            }
            this.set_update_timeout();
        };
        AutoBuy.prototype.set_update_timeout = function () {
            this.next_timeout(this.update, 125, 'update', true);
        };
        AutoBuy.prototype.update = function () {
            this.state.update();
            // spell:words timeplayed
            this.update_hours_played();
            this.update_timeout_element();
            this.update_ratio_element();
            this.update_ratio_change_element();
            this.next_update();
        };
        AutoBuy.prototype.update_async = function () {
        };
        AutoBuy.prototype.init = function () {
            this.next_timeout(this.init_impl, 200, 'init', true);
        };
        AutoBuy.prototype.set_secondinterval = function () {
            var disabled = false;
            if (disabled)
                return;
            //spell:words secondinterval
            if (window.secondinterval !== void 0)
                clearInterval(window.secondinterval);
            var rate = 66 / 2000;
            var time_base = performance.now();
            var interval_id = setInterval(function () {
                var real_time = performance.now();
                var time_diff = real_time - time_base;
                time_base = real_time;
                var real_rate = time_diff / 2000;
                // we lost some time here, the diff was too large (got a 10 hours playtime from putting my pc to sleep)
                if (time_diff > 2000) {
                    // assume a max of 2 seconds passed
                    window.timeplayed++;
                    return;
                }
                window.timeplayed += real_rate;
            }, 66);
            window.secondinterval = interval_id;
            this.root_node.append_child(new IntervalIdNodeRef(interval_id, function () {
                window.secondinterval = void 0;
            }));
        };
        AutoBuy.prototype.set_timeplayed_update_interval = function () {
            this.root_node.append_raw(setInterval(function () {
                var doc = window.doc;
                var rounding = window.rounding;
                var totalAtome = window.totalAtome;
                var timeplayed = window.timeplayed;
                var calcPres = window.calcPres;
                doc.title = rounding(totalAtome, false, 1).toString() + " atoms";
                //spell:words atomsaccu presnbr
                var atomsaccu_e = doc.getElementById('atomsaccu');
                if (atomsaccu_e)
                    atomsaccu_e.innerHTML = rounding(window.atomsaccu, false, 0);
                var timeplayed_e = doc.getElementById('timeplayed');
                if (timeplayed_e)
                    timeplayed_e.innerHTML = (Math.round(timeplayed / 30) / 60).toFixed(2) + " hours";
                var presnbr_e = doc.getElementById('presnbr');
                if (presnbr_e)
                    presnbr_e.innerHTML = "<br>" + (calcPres() * 100).toFixed(0) + " % APS boost";
            }, 2000), false);
        };
        AutoBuy.prototype.replace_timeplayed_timer = function () {
            this.set_secondinterval();
            this.set_timeplayed_update_interval();
        };
        AutoBuy.prototype.init_impl = function () {
            this.global_init();
            this.init_dom();
            this.state.init();
            this.next_update();
            this.main();
            this.original_map.set('lightreset', window.lightreset);
            window.lightreset = lightreset_inject;
            window.specialclick = specialclick_inject;
            if (window.secondinterval) {
                this.replace_timeplayed_timer();
            }
        };
        AutoBuy.prototype.state_history_clear_for_reset = function () {
            this.state_history_arr = ["R"];
            localStorage.auto_buy_history_str = "R";
        };
        /**
         * @param {string} value
         */
        AutoBuy.prototype.state_history_append = function (value, silent) {
            if (silent === void 0) { silent = false; }
            this.epoch_len++;
            if (silent)
                return;
            if (!value)
                throw new Error("Invalid state append requested");
            var last = this.state_history_arr.at(-1);
            this.state_history_arr.push(value);
            if (this.state.debug)
                console.log('history append', last, value);
            while (this.state_history_arr.length > 120)
                this.state_history_arr.shift();
            Promise.resolve().then(this.async_compress.bind(this));
        };
        /**
         * @param {Event} _event
         */
        AutoBuy.prototype.history_element_click_handler = function (_event) {
            this.root_node.destroy();
            this.set_update_timeout();
            this.set_auto_buy_timeout();
            // we destroyed the node this was attached to,
            // replace it again (it was there, we destroyed it, now please put it back)
            this.set_timeplayed_update_interval();
        };
        AutoBuy.prototype.set_auto_buy_timeout = function () {
            if (this.timeout_ms) {
                this.timeout_ms = ~~(this.timeout_ms * 0.9);
            }
            else {
                this.timeout_ms = 25;
            }
            this.start_main_async(true);
        };
        AutoBuy.prototype.timeout_avg = function () {
            var first = this.timeout_arr[0];
            var min = first;
            var max = first;
            var total = 0;
            for (var i = 0; i < this.timeout_arr.length; i++) {
                var cur = this.timeout_arr[i];
                total += cur;
                if (cur > max) {
                    max = cur;
                }
                if (cur < min) {
                    min = cur;
                }
            }
            ;
            var avg = total / this.timeout_arr.length;
            return [min, avg, max];
        };
        AutoBuy.prototype.calc_timeout_ms = function () {
            var _this = this;
            var _b;
            while (this.timeout_arr.length > 60)
                this.timeout_arr.shift();
            var max = 0;
            var total = 0;
            for (var i = 0; i < this.timeout_arr.length; i++) {
                total += this.timeout_arr[i];
                max = Math.max(this.timeout_arr[i], max);
            }
            ;
            var val = total / this.timeout_arr.length;
            var num = val; // max / val;
            (_b = this.last_value) !== null && _b !== void 0 ? _b : (this.last_value = num);
            var diff = this.last_value - num;
            this.last_value = num;
            this.large_diff.push(num);
            var sorted_diff_arr = this.large_diff.map(function (e) { return e - num; }).sort(function (a, b) { return a - b; });
            var diff_want_mul = 1;
            var diff_cur = diff;
            while (diff_cur > -1 && diff_cur < 1 && diff_want_mul < 1e18) {
                diff_cur *= 10;
                diff_want_mul *= 10;
            }
            diff_want_mul *= 1000;
            var zero_idx = sorted_diff_arr.indexOf(0);
            var zs = zero_idx - 8;
            var z_loss = 0;
            if (zs < 0) {
                z_loss = zs * -1;
                zs = 0;
            }
            var ez_log = sorted_diff_arr.map(function (e) {
                if (e === 0)
                    return e;
                return _this.round(e * diff_want_mul);
            });
            l_log_if(LOG_LEVEL_INFO, 'calc_timeout_ms sorted_diff index', zero_idx, 'diff is', this.round(diff * diff_want_mul) / diff_want_mul);
            l_log_if(LOG_LEVEL_INFO, 'calc_timeout_ms l_diff %o %o\n%o', ez_log.slice(0, 8), ez_log.slice(-8), ez_log.slice(zs, zero_idx + z_loss + 8));
            return this.round(val);
        };
        AutoBuy.prototype.is_epoch_over = function () {
            var epoch_diff = Date.now() - this.epoch_start_time;
            return epoch_diff > 60 * 5 * 1000;
        };
        AutoBuy.prototype.start_main_async = function (no_wait) {
            if (no_wait === void 0) { no_wait = false; }
            return this.with_async.do_start_main_async(no_wait).then(function (_e) { }, function (e) {
                console.log('err', e);
                console.log('canceled main_async');
            });
        };
        AutoBuy.prototype.main = function () {
            console.log('start main_async');
            this.timeout_ms = this.calc_timeout_ms();
            this.start_main_async();
        };
        AutoBuy.prototype.do_large_decrease = function () {
            this.do_timeout_dec([1.005], 60); // 60
        };
        AutoBuy.prototype.do_normal_decrease = function () {
            this.do_timeout_dec([1.004], 80); // 80
        };
        AutoBuy.prototype.do_rare_begin_change = function () {
            this.do_timeout_inc([1.008, 1.03], 10);
        };
        AutoBuy.prototype.unit_promote_start = function () {
            var totalAtome = window.totalAtome;
            this.timeout_ms = this.calc_timeout_ms();
            this.pre_total = totalAtome;
            this.do_unit_promote();
            var money_diff = this.pre_total - totalAtome;
            var loss_rate = money_diff / this.pre_total;
            if (this.pre_total != totalAtome) {
                this.unit_upgradable_count++;
            }
            if (this.pre_total != totalAtome && this.debug) {
                var log_args = [];
                var percent_change = (loss_rate * 100).toFixed(5);
                var money_str = totalAtome.toExponential(3);
                log_args.push(this.iter_count);
                log_args.push(percent_change);
                log_args.push(money_str);
                console.log.apply(console, log_args);
            }
            this.iter_count += 1;
            return loss_rate;
        };
        AutoBuy.prototype.do_fast_unit_step_change = function () {
            this.do_timeout_dec([1.006], 10);
        };
        AutoBuy.prototype.do_fast_unit_change = function () {
            this.do_timeout_dec([1.006], 10);
        };
        /**
         * @param {number} pow_base
         * @param {number} pow_num
         * @param {number} div
         */
        AutoBuy.prototype.get_timeout_change = function (pow_base, pow_num, div) {
            if (!this.timeout_ms)
                throw new Error("Invalid");
            var pow_res = Math.pow(pow_base, pow_num);
            var res = this.timeout_ms * pow_res;
            return res / div;
        };
        /**
         * @param {number} change
         */
        AutoBuy.prototype.update_timeout_inc = function (change) {
            if (window.__testing__) {
                return;
            }
            if (!this.timeout_ms)
                throw new Error("Invalid");
            var value = this.round(this.timeout_ms + change);
            l_log_if(LOG_LEVEL_INFO, 'inc', this.timeout_ms, value - this.timeout_ms);
            this.timeout_arr.push(value);
        };
        /**
         * @param {number} change
         */
        AutoBuy.prototype.update_timeout_dec = function (change) {
            if (window.__testing__) {
                return;
            }
            if (!this.timeout_ms)
                throw new Error("Invalid");
            var value = this.round(this.timeout_ms - change);
            if (value < 25)
                value = 25;
            l_log_if(LOG_LEVEL_INFO, 'dec', this.timeout_ms, this.timeout_ms - value);
            this.timeout_arr.push(value);
        };
        /**
         * @param {number} value
         */
        AutoBuy.prototype.round = function (value) {
            return ~~value;
        };
        /**
         * @param {number[]} pow_terms
         * @param {number} div
         */
        AutoBuy.prototype.do_timeout_dec = function (pow_terms, div) {
            var change = this.get_timeout_change(pow_terms[0], Math.log(window.totalAtome), div);
            this.update_timeout_dec(change);
        };
        /**
         * @param {number[]} pow_terms
         * @param {number} div
         */
        AutoBuy.prototype.do_timeout_inc = function (pow_terms, div) {
            var iter_term = Math.pow(pow_terms[1], this.iter_count);
            var change = this.get_timeout_change(pow_terms[0], Math.log(window.totalAtome), div);
            this.update_timeout_inc(change * iter_term);
        };
        /**
         * @param {string} msg
         * @param {Error} err
         */
        AutoBuy.prototype.next_timeout_async_err_log = function (msg, err) {
            /**@type {{stack:string}} */
            var stack_trace = { stack: "Error\n    at <anonymous>" };
            if (err.stack === void 0)
                Error.captureStackTrace(stack_trace);
            var err_stack_tmp = null;
            if (err.stack)
                err_stack_tmp = err.stack;
            else
                err_stack_tmp = stack_trace.stack;
            var err_stack = err_stack_tmp.split("\n").slice(1);
            /**
             * @param {string} str
             */
            function rm(str) {
                if (err_stack.length === 0)
                    return false;
                if (err_stack[0].includes(str)) {
                    err_stack = err_stack.slice(1);
                    return true;
                }
                return false;
            }
            while (true) {
                if (rm("at AutoBuy.next_timeout_async"))
                    continue;
                if (rm("at AutoBuy.large_decrease_async"))
                    continue;
                if (rm("at AutoBuy.normal_decrease_async"))
                    continue;
                if (rm("at AutoBuy.faster_timeout_async"))
                    continue;
                if (rm("at AutoBuy.main_async"))
                    continue;
                break;
            }
            if (err_stack.length > 0) {
                console.log("%s\n%s", msg, err_stack.map(function (e) {
                    if (e.slice(0, 4) == '    ')
                        e = e.slice(4);
                    if (e.slice(0, 3) == 'at ')
                        e = e.slice(3);
                    return e;
                }).join("\n"));
            }
        };
        /**
         * @param {number | undefined} timeout
         * @param {string} char
         */
        AutoBuy.prototype[labeled_sym("next_timeout_async")] = function (timeout, char) {
            console.log('next_timeout_async', char, timeout);
            var err = new Error;
            this.next_timeout_async_err_log('next_timeout_async stk', err);
        };
        /**
         * @param {()=>void} trg_fn
         * @param {number | undefined} timeout
         * @param {string} char
         */
        AutoBuy.prototype.next_timeout = function (trg_fn, timeout, char, silent) {
            if (silent === void 0) { silent = false; }
            var node = new TimeoutNode(timeout);
            this.root_node.append_child(node);
            node.start(new TimeoutTarget(this, trg_fn));
            if (!silent) {
                this.timeout_ms = timeout;
                this.update_timeout_element();
            }
            this.state_history_append(char, silent);
        };
        AutoBuy.prototype.do_unit_promote = function () {
            do_auto_unit_promote();
        };
        /**
         * @param {{ done: any; cost: number; }} special_buyable
         */
        AutoBuy.prototype.is_special_done = function (special_buyable) {
            return !special_buyable.done && special_buyable.cost < window.totalAtome;
        };
        AutoBuy.prototype.next_special = function () {
            return window.allspec.findIndex(this.is_special_done);
        };
        AutoBuy.prototype.do_special = function () {
            var ret = false;
            for (var index = this.next_special();; index = this.next_special()) {
                if (index > -1) {
                    window.specialclick(index);
                    ret = true;
                }
                else
                    break;
            }
            return ret;
        };
        AutoBuy.prototype.maybe_run_reset = function () {
            if (!this.timeout_ms)
                return false;
            var count = 0;
            count += +(this.timeout_ms > 30 * 1000);
            count += +(this.state.ratio > 1);
            count += +this.is_epoch_over();
            count += +(this.state.locked_cycle_count < 100);
            switch (count) {
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                default: console.log('maybe_run_reset count', count);
            }
            if (this.state.ratio > 1 && this.is_epoch_over() && this.state.locked_cycle_count < 100) {
                this.do_game_reset();
                return true;
            }
            return false;
        };
        AutoBuy.prototype.do_game_reset = function () {
            if (!this.timeout_ms) {
                this.timeout_ms = 300;
            }
            ;
            this.next_timeout(this.game_reset_step_1, this.round(this.timeout_ms / 3), '1R');
            this.on_repeat_r();
        };
        AutoBuy.prototype.do_audio_mute_toggle = function () {
            if (!AudioMuted) {
                // this.background_audio.muted=!this.background_audio.muted;
                window.mute();
            }
        };
        AutoBuy.prototype.game_reset_step_1 = function () {
            this.do_audio_mute_toggle();
            this.next_timeout(this.game_reset_step_2, 60 * 5 * 1000, '2R');
        };
        AutoBuy.prototype.game_reset_step_2 = function () {
            this.do_audio_mute_toggle();
            this.next_timeout(this.game_reset_finish, 60 * 5 * 1000, '3R');
        };
        AutoBuy.prototype.game_reset_finish = function () {
            this.update_hours_played();
            var str = this.dom_map.get("time_played_str");
            if (typeof str == 'string') {
                this.dispatch_on_game_reset_finish(str);
            }
            else {
                this.dispatch_on_game_reset_finish("0.000");
            }
        };
        /**@arg {string} time_played */
        AutoBuy.prototype.dispatch_on_game_reset_finish = function (time_played) {
            this.state.on_game_reset_finish(time_played);
            this.on_game_reset_finish(time_played);
        };
        /**@arg {string} time_played */
        AutoBuy.prototype.on_game_reset_finish = function (time_played) {
            console.info('fire lightreset at %s', time_played);
            window.lightreset();
        };
        AutoBuy.prototype.on_repeat_r = function () {
            this.next_timeout(this.on_repeat_r, 1 * 1000, 'r');
        };
        return AutoBuy;
    }());
    function do_auto_unit_promote() {
        var arUnit = window.arUnit;
        var Get_Unit_Type = window.Get_Unit_Type;
        var getUnitPromoCost = window.getUnitPromoCost;
        var Find_ToNext = window.Find_ToNext;
        var totalAtome = window.totalAtome;
        var _targets = window._targets;
        var _targets_achi = window._targets_achi;
        var totalAchi = window.totalAchi;
        var mainCalc = window.mainCalc;
        var tonext = window.tonext;
        var out = [], maxed = [];
        for (var k = 0; k < arUnit.length; k++) {
            var afford = false;
            if (arUnit[k][16] == true || k == 0) {
                var type = Get_Unit_Type(k);
                var tmp = getUnitPromoCost(k);
                var cost = tmp;
                var next = Find_ToNext(k);
                if (next < 0) {
                    maxed[k] = true;
                }
                ;
                for (var i = 1; i <= 100; i++) {
                    if (totalAtome >= cost) {
                        tmp = tmp + (tmp * arUnit[k][3]) / 100;
                        var tar = (arUnit[k][4] * 1) + i;
                        var a = _targets.indexOf(tar);
                        var reduction = 1;
                        ib: if (a > -1 && tar <= 1000) {
                            for (var k2 in type[2])
                                if (type[2][k2] != k && arUnit[type[2][k2]][4] < tar)
                                    break ib;
                            var c = _targets_achi.indexOf(totalAchi() + 1);
                            if (c > -1)
                                reduction *= (1 - ((c + 1) * 0.01));
                            reduction *= 1 - ((a + 1) * 0.01);
                        }
                        tmp *= reduction;
                        cost += tmp;
                    }
                    else
                        break;
                    if (i == next || (maxed[k] && i == 100))
                        afford = true;
                }
                if (afford)
                    out[k] = true;
                else
                    out[k] = false;
            }
        }
        var res = out.lastIndexOf(true);
        if (res < 0)
            return;
        if (maxed[res])
            for (var y = 0; y < 100; y++)
                mainCalc(res);
        else
            tonext(res);
    }
    var auto_buy_obj = new AutoBuy;
    /**@typedef {import("./rebuild_the_universe_auto_typed_v0.2.js").AsyncTrigger} AsyncTriggerT */
    /**@implements {AsyncTriggerT} */
    var AsyncTrigger = /** @class */ (function () {
        function AsyncTrigger() {
            /**
             * @type {((value: any) => void)|null}
             */
            this.m_notify_result = null;
            /**
             * @type {((arg0?: any) => void)|null}
             */
            this.m_notify_error = null;
            this.notify_promise = null;
            this.m_set_flag = true;
            this.trigger_handler = null;
            this.m_can_notify = false;
            /**@type {null| ((value: any) => void)} */
            var accept_fn = null;
            /**@type {null | ((reason?: any) => void)} */
            var reject_fn = null;
            this.promise_set = new Promise(function (accept, reject) {
                accept_fn = accept;
                reject_fn = reject;
            });
            if (accept_fn && reject_fn) {
                this.m_set_result = accept_fn;
                this.m_set_error = reject_fn;
            }
            else {
                this.m_set_result = this.default_accept.bind(this);
                this.m_set_error = this.default_reject.bind(this);
            }
            this.m_set_flag = false;
        }
        /**
         * @param {any} _value
         */
        AsyncTrigger.prototype.default_accept = function (_value) {
            return;
        };
        /**
         * @param {any} error
         */
        AsyncTrigger.prototype.default_reject = function (error) {
            throw error;
        };
        /**
         * @param {any} cnt
         */
        AsyncTrigger.prototype.set = function (cnt) {
            if (!this.m_set_flag) {
                this.m_set_result(cnt);
                this.m_set_flag = true;
            }
        };
        /**
         * @param {any} opt_error
         */
        AsyncTrigger.prototype.set_error = function (opt_error) {
            if (!this.m_set_flag) {
                if (opt_error)
                    this.m_set_error(opt_error);
                else
                    this.m_set_error(null);
            }
        };
        AsyncTrigger.prototype.wait = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_b) {
                    ret = this.promise_set;
                    return [2 /*return*/, ret];
                });
            });
        };
        /**
         * @param {any} cnt
         */
        AsyncTrigger.prototype.notify = function (cnt) {
            if (this.m_can_notify && this.m_notify_result) {
                this.m_notify_result(cnt);
                this.m_can_notify = false;
            }
        };
        /**
         * @param {any} error
         */
        AsyncTrigger.prototype.notify_error = function (error) {
            if (this.m_can_notify && this.m_notify_error) {
                this.m_notify_error(error);
                this.m_can_notify = false;
            }
        };
        AsyncTrigger.prototype.notified = function () {
            return __awaiter(this, void 0, void 0, function () {
                var t;
                return __generator(this, function (_b) {
                    t = this;
                    this.notify_promise = new Promise(function (accept, reject) {
                        t.m_notify_result = accept;
                        t.m_notify_error = reject;
                    });
                    this.m_can_notify = true;
                    return [2 /*return*/];
                });
            });
        };
        return AsyncTrigger;
    }());
    var AsyncSemaphore = /** @class */ (function () {
        function AsyncSemaphore() {
            /**@type {any[]} */
            this.notify_waiters_vec = [];
            this.count = 0;
        }
        /**@arg {number} cnt */
        AsyncSemaphore.prototype.inc = function (cnt) {
            return __awaiter(this, void 0, void 0, function () {
                var wait_trigger;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wait_trigger = new AsyncTrigger;
                            _b.label = 1;
                        case 1:
                            if (!(this.count > 0)) return [3 /*break*/, 3];
                            if (!this.notify_waiters_vec.includes(wait_trigger)) {
                                this.notify_waiters_vec.push(wait_trigger);
                            }
                            return [4 /*yield*/, wait_trigger.wait()];
                        case 2:
                            _b.sent();
                            wait_trigger.notify(cnt);
                            return [3 /*break*/, 1];
                        case 3:
                            this.count += cnt;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**@arg {number} cnt */
        AsyncSemaphore.prototype.dec = function (cnt) {
            return __awaiter(this, void 0, void 0, function () {
                var waiter, used_count;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.count -= cnt;
                            if (!(this.count <= 0)) return [3 /*break*/, 4];
                            _b.label = 1;
                        case 1:
                            waiter = this.notify_waiters_vec.shift();
                            if (!waiter)
                                return [3 /*break*/, 4];
                            waiter.set(cnt);
                            return [4 /*yield*/, waiter.notified()];
                        case 2:
                            used_count = _b.sent();
                            cnt -= used_count;
                            _b.label = 3;
                        case 3:
                            if (cnt > 0) return [3 /*break*/, 1];
                            _b.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return AsyncSemaphore;
    }());
    /**
     * @this {any[]}
     * @param {any} e
     * @param {number} i
     */
    function map_to_tuple(e, i) {
        return [e, this[i]];
    }
    /**@type {<T, U>(a:T[], b:U[])=>[T, U][]} */
    function to_tuple_arr(keys, values) {
        /**@type {[typeof keys[0], typeof values[0]][]} */
        var ret = [];
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var v = values[i];
            /**@type {[typeof k, typeof v]} */
            var item = [k, v];
            ret.push(item);
        }
        return ret;
    }
    /**
     * @param {number | undefined} timeout
     * @param {TimerHandler} a
     */
    function promise_set_timeout(timeout, a) {
        setTimeout(a, timeout);
    }
    /**
     * @param {number | undefined} timeout
     */
    function do_async_wait(timeout) {
        return new Promise(promise_set_timeout.bind(null, timeout));
    }
    void do_async_wait;
    /**
     * @param {string[]} arr
     * @param {number} rem_target_len
     */
    function array_sample_end(arr, rem_target_len) {
        arr = arr.slice(-300);
        var rem_len = char_len_of(arr);
        while (rem_len > rem_target_len) {
            if (!arr.length)
                break;
            var val = arr.shift();
            if (val === void 0)
                continue;
            rem_len -= val.length + 1;
        }
        return arr;
    }
    /**
     * @param {any[]} arr
     */
    function char_len_of(arr) {
        return arr.reduce(function (a, b) { return a + b.length; }, 0) + arr.length;
    }
    function lightreset_inject() {
        window.g_auto_buy.state_history_clear_for_reset();
        window.g_auto_buy.skip_save = true;
        window.addEventListener('unload', function () {
            window.g_auto_buy.skip_save = false;
            localStorage.auto_buy_timeout_str = "300,300,300,300";
            localStorage.long_wait = 12000;
        });
        var original = window.g_auto_buy.original_map.get('lightreset');
        if (!original) {
            alert('unable to light reset game');
            throw new Error("Missing original lightreset");
        }
        original();
    }
    /**
     * @param {number} that
     */
    function specialclick_inject(that) {
        var allspec = window.allspec;
        var totalAtome = window.totalAtome;
        var atomsinvest = window.atomsinvest;
        var doc = window.doc;
        var gritter = window.gritter;
        var specialsbought = window.specialsbought, noti = window.noti;
        var rounding = window.rounding, calcDiff = window.calcDiff, arUnit = window.arUnit, atomepersecond = window.atomepersecond;
        var arrayNames = window.arrayNames, plurials = window.plurials, toTitleCase = window.toTitleCase;
        var updateprogress = window.updateprogress, seeUnit = window.seeUnit, checkspec = window.checkspec, achiSpec = window.achiSpec;
        if (allspec[that].done == undefined)
            allspec[that].done = false;
        if (allspec[that].cost <= totalAtome && allspec[that].done == false) {
            var specialsbought_e = doc.getElementById('specialsbought');
            if (specialsbought_e)
                specialsbought_e.innerText = rounding(++specialsbought, false, 0);
            if (that == 74) {
            }
            atomsinvest += allspec[that].cost;
            var atomsinvest_e = doc.getElementById("atomsinvest");
            if (atomsinvest_e)
                atomsinvest_e.innerText = rounding(atomsinvest, false, 0);
            allspec[that].done = true;
            totalAtome -= allspec[that].cost;
            var diff1 = calcDiff(that);
            for (var a in arUnit[that][17])
                arUnit[that][17][a] *= 100;
            arUnit[that][5] *= 100;
            var spec_aps = 0;
            if (arUnit[that][4] > 0) {
                spec_aps = (calcDiff(that) - diff1);
                atomepersecond += spec_aps;
            }
            //spell:ignore noti plurials
            if (noti)
                gritter('Power-up !', toTitleCase(plurials(arrayNames[that])) + " X100 APS", null, "+" + rounding(spec_aps, false, 0) + " APS", "");
            //spell:ignore updateprogress
            updateprogress(that);
            $('#spec' + that).remove();
            (that < 74) ? seeUnit(that + 1) : seeUnit(that - 1);
            seeUnit(that);
            //spell:ignore checkspec
            checkspec();
            //spell:ignore achiSpec
            achiSpec();
        }
        window.totalAtome = totalAtome;
        window.atomsinvest = atomsinvest;
        window.atomepersecond = atomepersecond;
        window.specialsbought = specialsbought;
    }
    var ProxyHandlers = /** @class */ (function () {
        /**
         * @param {any} root
         */
        function ProxyHandlers(root) {
            this.weak_root = new WeakRef(root);
            this.count_arr = [0];
        }
        /**
         * @param {string} type
         * @param {any} call_args
         * @param {any[]} from
         */
        ProxyHandlers.prototype.generic = function (type, call_args, from) {
            var keep_vec = this.weak_root.deref();
            if (keep_vec === null) {
                console.log('ProxyHandlers reset KeepSome after gc collect');
                keep_vec = new KeepSome;
                this.weak_root = new WeakRef(keep_vec);
            }
            keep_vec.push(from.concat([null, type, 1, call_args]));
        };
        /**
         * @param {[o: object, k: PropertyKey, v: any, r?: any]} call_args
         * @param {any[]} from
         */
        ProxyHandlers.prototype.set_ = function (call_args, from) {
            this.generic('set', call_args, from);
            return Reflect.set.apply(Reflect, call_args);
        };
        /**
         * @param {[o: object, k: PropertyKey, r?: any]} call_args
         * @param {any[]} from
         */
        ProxyHandlers.prototype.get_ = function (call_args, from) {
            this.generic('get', call_args, from);
            return Reflect.get.apply(Reflect, call_args);
        };
        /**
         * @param {[f: Function, o: any, l: ArrayLike<any>]} call_args
         * @param {any[]} from
         */
        ProxyHandlers.prototype.apply_ = function (call_args, from) {
            this.generic('apply', call_args, from);
            return Reflect.apply.apply(Reflect, call_args);
        };
        /**
         * @param {[o: object, k: PropertyKey, o: PropertyDescriptor]} call_args
         * @param {any[]} from
         */
        ProxyHandlers.prototype.defineProperty_ = function (call_args, from) {
            this.generic('defineProperty', call_args, from);
            return Reflect.defineProperty.apply(Reflect, call_args);
        };
        /**
         * @param {[o: object, k: PropertyKey]} call_args
         * @param {any[]} from
         */
        ProxyHandlers.prototype.getOwnPropertyDescriptor_ = function (call_args, from) {
            this.generic('getOwnPropertyDescriptor', call_args, from);
            return Reflect.getOwnPropertyDescriptor.apply(Reflect, call_args);
        };
        return ProxyHandlers;
    }());
    void ProxyHandlers;
    var KeepSome = /** @class */ (function () {
        function KeepSome() {
            this.m_2d_vec = [];
        }
        /**@arg {number} value*/
        KeepSome.prototype.push = function (value) {
            var tmp_val = null;
            var set_index = 0;
            this.push_at(set_index, value);
            while (this.m_2d_vec[set_index].length > 50) {
                tmp_val = this.m_2d_vec[set_index].shift();
                if (tmp_val === void 0)
                    break;
                if (Math.random() > 0.9) {
                    set_index++;
                    this.push_at(set_index, tmp_val);
                    console.log('psp', 1);
                    var off = 0;
                    while (this.m_2d_vec[set_index - off].length < 25) {
                        tmp_val = this.m_2d_vec[set_index - off - 1].shift();
                        if (tmp_val === void 0)
                            break;
                        this.m_2d_vec[set_index - off].push(tmp_val);
                    }
                    off++;
                    if (set_index - off < 0)
                        continue;
                    console.log('psp', 2);
                    while (this.m_2d_vec[set_index - off].length < 40) {
                        tmp_val = this.m_2d_vec[set_index - off - 1].shift();
                        if (tmp_val === void 0)
                            break;
                        this.m_2d_vec[set_index - off].push(tmp_val);
                    }
                    off++;
                    if (set_index - off < 0)
                        continue;
                    console.log('psp', 3);
                    while (this.m_2d_vec[set_index - off].length < 40) {
                        tmp_val = this.m_2d_vec[set_index - off - 1].shift();
                        if (tmp_val === void 0)
                            break;
                        this.m_2d_vec[set_index - off].push(tmp_val);
                    }
                    off++;
                    if (set_index - off < 0)
                        continue;
                    console.log('psp', 4);
                    while (this.m_2d_vec[set_index - off].length < 40) {
                        tmp_val = this.m_2d_vec[set_index - off - 1].shift();
                        if (tmp_val === void 0)
                            break;
                        this.m_2d_vec[set_index - off].push(tmp_val);
                    }
                }
                if (this.m_2d_vec[set_index].length <= 50 && set_index > 0) {
                    set_index--;
                }
            }
        };
        /**
         * @param {number} index
         * @param {number} value
         */
        KeepSome.prototype.push_at = function (index, value) {
            while (index >= this.m_2d_vec.length) {
                this.m_2d_vec.push([]);
            }
            this.m_2d_vec[index].push(value);
        };
        /**
         * @param {number[]} a
         */
        KeepSome.prototype.push_va = function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            for (var _b = 0, a_1 = a; _b < a_1.length; _b++) {
                var x = a_1[_b];
                this.push(x);
            }
        };
        return KeepSome;
    }());
    /**
     * @param {any} obj
     * @param {PropertyKey} name
     * @param {any} value
     * @param {any[]} props
     */
    function define_property_value(obj, name, value) {
        var props = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            props[_i - 3] = arguments[_i];
        }
        var _b = props[0], writable = _b === void 0 ? true : _b, _c = props[1], enumerable = _c === void 0 ? true : _c, _d = props[2], configurable = _d === void 0 ? true : _d;
        Object.defineProperty(obj, name, {
            value: value,
            writable: writable,
            enumerable: enumerable,
            configurable: configurable
        });
    }
    void define_property_value;
    /**
     * @param {{ [x: string]: any; }} obj
     * @param {string} key
     */
    function reload_if_def(obj, key) {
        if (obj[key]) {
            location.reload();
            document.body.innerHTML = "";
            document.head.innerHTML = "";
            document.documentElement.outerHTML = "";
            return true;
        }
        return false;
    }
    /**
     * @param {typeof $} value
     */
    function got_jquery(value) {
        Object.defineProperty(window, '$', {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true
        });
        use_jquery();
    }
    function use_jquery() {
        /**@type {typeof $} */
        var jq = window.$;
        if (!jq)
            return;
        if (typeof jq != 'function')
            return;
        var res = jq('head');
        var r_proto = Object.getPrototypeOf(res);
        r_proto.lazyload = function ( /** @type {any} */) {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
        };
        return jq;
    }
    void reload_if_def;
    /**
     * @param {undefined} [_value]
     */
    function proxy_jquery(_value) {
        var val = use_jquery();
        set_jq_proxy(val);
    }
    /**
     * @param {typeof $ | undefined} value
     */
    function set_jq_proxy(value) {
        var s_value = value;
        Object.defineProperty(window, '$', {
            get: function () {
                return s_value;
            },
            set: function (value) {
                s_value = value;
                got_jquery(value);
                return true;
            },
            enumerable: true,
            configurable: true
        });
    }
    /**
     * @param {Function} func
     * @param {any} this_v
     * @param {ArrayLike<any>} args
     */
    function pace_finish_proxy_apply(func, this_v, args) {
        auto_buy_obj.init();
        window.Pace.bar.finish = func;
        return Reflect.apply(func, this_v, args);
    }
    var seen_elements = new WeakSet;
    /**
     * @param {HTMLScriptElement} e
     */
    function remove_bad_dom_script_element_callback(e) {
        if (seen_elements.has(e))
            return;
        seen_elements.add(e);
        if (!e.src)
            return;
        if (e.src.includes("analytics.js") && e.src.includes("google")) {
            e.remove();
            return;
        }
        if (e.src.includes("platform.js")) {
            e.remove();
            return;
        }
        //spell:disable-next-line
        if (e.src.indexOf("opentracker") > -1) {
            e.remove();
            return;
        }
        //spell:disable-next-line
        if (e.src.includes("pagead/js/adsbygoogle.js")) {
            e.remove();
            return;
        }
        if (e.src.includes("/js/platform.js")) {
            e.remove();
            return;
        }
        if (new URL(e.src).origin != location.origin)
            return;
        if (e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1) {
            e.remove();
            return;
        }
    }
    function do_dom_filter() {
        Array.prototype.forEach.call(document.querySelectorAll("script"), remove_bad_dom_script_element_callback);
    }
    function on_game_data_set() {
        do_dom_filter();
        auto_buy_obj.pre_init();
        auto_buy_obj.init();
        return;
        if (window.Pace.bar.progress == 100) {
            auto_buy_obj.init();
            return;
        }
        window.Pace.bar.finish = new Proxy(window.Pace.bar.finish, {
            apply: pace_finish_proxy_apply
        });
    }
    function wait_for_game_data() {
        if (window._SM_Data) {
            on_game_data_set();
        }
        else {
            setTimeout(wait_for_game_data, 0);
        }
    }
    function action_1() {
        if (window._SM_Data) {
            on_game_data_set();
        }
        else {
            wait_for_game_data();
        }
        do_dom_filter();
    }
    /**
     * @param {HTMLScriptElement} elm
     */
    function dom_add_elm_filter(elm) {
        if (elm && elm.nodeName === "SCRIPT") {
            if (!elm.src) {
                console.log(elm);
                return true;
            }
            if (elm.src && new URL(elm.src).origin === location.origin) {
                do_dom_filter();
                return true;
            }
            return false;
        }
        return true;
    }
    function enable_jquery_proxy_if_needed() {
        var enable_proxy = true;
        if (enable_proxy) {
            proxy_jquery();
        }
    }
    /**@arg {(value: any) => void} promise_accept */
    function do_load_fire_promise(promise_accept) {
        var _b;
        (_b = document.firstChild) === null || _b === void 0 ? void 0 : _b.remove();
        promise_accept(null);
    }
    function page_url_no_protocol() {
        return location.href.slice(location.protocol.length);
    }
    /**@arg {PopStateEvent} e */
    function popstate_event_handler(e) {
        console.log('popstate', e.state, location.href);
        if (e.state === null) {
            var non_proto_url = page_url_no_protocol();
            if (non_proto_url == "//rebuildtheuniverse.com/mjz_version") {
                history.go(-1);
            }
            else if (non_proto_url == "//rebuildtheuniverse.com/?type=mjz_version") {
                history.go(-1);
            }
        }
        if (e.state) {
        }
        else {
        }
    }
    function reset_global_event_handlers() {
        window.onpopstate = popstate_event_handler;
    }
    var BaseMutationObserver = /** @class */ (function () {
        function BaseMutationObserver() {
            /**@type {MutationObserver|null} */
            this.observer = null;
        }
        BaseMutationObserver.prototype.disconnect = function () {
            if (!this.observer)
                return;
            this.observer.disconnect();
        };
        return BaseMutationObserver;
    }());
    var DetachedMutationObserver = /** @class */ (function (_super) {
        __extends(DetachedMutationObserver, _super);
        /** @param {Node} target */
        function DetachedMutationObserver(target) {
            var _this = _super.call(this) || this;
            var mutationObserver = new MutationObserver(_this.callback);
            var options = {
                subtree: true,
                childList: true,
                attributes: true,
                attributeOldValue: true,
                characterData: true,
                characterDataOldValue: true
            };
            mutationObserver.observe(target, options);
            _this.observer = mutationObserver;
            return _this;
        }
        /** @type {(_mutations: MutationRecord[], observer: MutationObserver & {observer_state?:1|2})=>void} */
        DetachedMutationObserver.prototype.callback = function (_mutations, observer) {
            observer.disconnect();
        };
        return DetachedMutationObserver;
    }(BaseMutationObserver));
    var LoadMutationObserver = /** @class */ (function (_super) {
        __extends(LoadMutationObserver, _super);
        /**
         * @param {Node} target
         * @param {(mut_vec: MutationRecord[], mut_observer: MutationObserver) => void} callback
         */
        function LoadMutationObserver(target, callback) {
            var _this = _super.call(this) || this;
            _this.m_callback = callback;
            var mutationObserver = new MutationObserver(_this.callback.bind(_this));
            var options = {
                childList: true,
                subtree: true
            };
            mutationObserver.observe(target, options);
            _this.observer = mutationObserver;
            return _this;
        }
        /** @type {MutationCallback} */
        LoadMutationObserver.prototype.callback = function (mutations, observer) {
            this.m_callback(mutations, observer);
            observer.disconnect();
        };
        return LoadMutationObserver;
    }(BaseMutationObserver));
    /**@type {BaseMutationObserver[]} */
    var mut_observers = [];
    window.g_mut_observers = mut_observers;
    /**@type {<T extends U['prototype'], U extends {new ():V; prototype:V}, V>(a:any, b:U)=>a is T} */
    function cast_T_extends_U_type(T_value, U_value) {
        if (T_value instanceof U_value) {
            return true;
        }
        return false;
    }
    /**@type {<T extends U['prototype'], U extends {new ():V; prototype:V}, V>(a:any, b:U)=>T|null} */
    function cast_value_T_to_U(a, b) {
        if (cast_T_extends_U_type(a, b)) {
            return a;
        }
        return null;
    }
    /**@type {(this:Node, node: Node, child: Node | null)=>boolean}*/
    function insert_before_enabled(node, child) {
        if (node instanceof HTMLScriptElement) {
            var should_insert_1 = dom_add_elm_filter(node);
            if (!should_insert_1)
                return false;
        }
        if (child instanceof HTMLScriptElement) {
            var should_insert_2 = dom_add_elm_filter(child);
            if (!should_insert_2)
                return false;
        }
        return true;
    }
    function main() {
        if (location.pathname.match('test')) {
            return;
        }
        reset_global_event_handlers();
        enable_jquery_proxy_if_needed();
        document.addEventListener('onContentLoaded', do_dom_filter);
        Node.prototype.insertBefore = new Proxy(Node.prototype.insertBefore, {
            /**@arg {[Node, Node]} parameters */
            apply: function (target, thisValue, parameters) {
                if (insert_before_enabled.apply(void 0, parameters)) {
                    return Reflect.apply(target, thisValue, parameters);
                }
            }
        });
        var document_write_list = new DocumentWriteList;
        document_write_list.attach_proxy(document);
        document_write_list.document_write_proxy;
        window.document_write_list = document_write_list;
        document.stop = function () { };
        function nop_timeout() {
            console.log('nop timeout');
            return -1;
        }
        var real_st = setTimeout;
        var real_si = setInterval;
        window.setTimeout = nop_timeout;
        window.setInterval = nop_timeout;
        /**
         * @param {any[]} v
         */
        function no_aev() {
            var v = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                v[_i] = arguments[_i];
            }
            console.log('aev', v);
        }
        var orig_aev = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = no_aev;
        function do_fetch_load() {
            return __awaiter(this, void 0, void 0, function () {
                function on_html_replace() {
                    rc++;
                    did_rep = true;
                    return "";
                }
                var orig_url, loc_url, prev_state, next_gen, hist_state, skip, rb_html, la, arr, any_cur, rb_html_tmp, rc, did_rep, json_rep_1, rem_str_1, script_num, loaded_scripts_count;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            reset_global_event_handlers();
                            window.setTimeout = real_st;
                            window.setInterval = real_si;
                            EventTarget.prototype.addEventListener = orig_aev;
                            return [4 /*yield*/, new Promise(function (a) {
                                    window.addEventListener('load', function lis() {
                                        setTimeout(a);
                                        window.removeEventListener('load', lis);
                                    });
                                })];
                        case 1:
                            _b.sent();
                            reset_global_event_handlers();
                            orig_url = location.href;
                            loc_url = location.origin + location.pathname;
                            prev_state = history.state;
                            next_gen = 0;
                            if (prev_state && prev_state.gen) {
                                next_gen = prev_state.gen + 1;
                            }
                            hist_state = {
                                gen: next_gen
                            };
                            skip = true;
                            if (skip)
                                return [3 /*break*/, 3];
                            return [4 /*yield*/, new Promise(function (a) {
                                    if (localStorage.justReset === 'true') {
                                        return a(null);
                                    }
                                    window.g_do_load = do_load_fire_promise.bind(null, a);
                                    document.writeln("<head></head><body><a href onclick=\"g_do_load()\">load with fetch</a></body>");
                                    reset_global_event_handlers();
                                    document.close();
                                })];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            reset_global_event_handlers();
                            history.pushState(hist_state, '', orig_url);
                            return [4 /*yield*/, fetch(loc_url)];
                        case 4: return [4 /*yield*/, (_b.sent()).text()];
                        case 5:
                            rb_html = _b.sent();
                            {
                                la = mut_observers.pop();
                                if (!la)
                                    throw new Error("mut_observers underflow");
                                la.disconnect();
                            }
                            set_jq_proxy(window.$);
                            arr = [];
                            any_cur = arr;
                            window.adsbygoogle = any_cur;
                            window.adsbygoogle.op = window.adsbygoogle.push;
                            window.adsbygoogle.push = function (e) {
                                var _b;
                                // console.log('ads by google push');
                                var cs = document.currentScript;
                                /**@type {Element|null} */
                                var ls = null;
                                /**@type {Element|null} */
                                var rs;
                                if (!cs)
                                    return;
                                (_b = window.g_cs) !== null && _b !== void 0 ? _b : (window.g_cs = []);
                                window.g_cs.push(cs);
                                var prev = cs.previousElementSibling;
                                if (prev && prev instanceof HTMLElement && prev.dataset.adSlot) {
                                    var ad_slot = cs.previousElementSibling;
                                    if (prev.previousElementSibling)
                                        ls = prev.previousElementSibling;
                                    if (cs.nextElementSibling)
                                        rs = cs.nextElementSibling;
                                    if (ad_slot)
                                        ad_slot.remove();
                                    cs.remove();
                                    while (ls && ls instanceof HTMLScriptElement && ls.src && ls.src.includes("adsbygoogle")) {
                                        var ls_tmp = ls.previousElementSibling;
                                        ls.remove();
                                        ls = ls_tmp;
                                    }
                                }
                                window.adsbygoogle.op(e);
                                do_dom_filter();
                            };
                            rb_html_tmp = rb_html.replace(/https:\/\/apis.google.com\/js\/platform.js/, "");
                            //spell:disable-next-line
                            rb_html_tmp = rb_html_tmp.replace("//script.opentracker.net/?site=rebuildtheuniverse.com", "");
                            rc = 0;
                            did_rep = true;
                            json_rep_1 = "\"<script>\\n  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\\n  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\\n\\n  ga('create', 'UA-63134422-1', 'auto');\\n  ga('send', 'pageview');\\n\\n</script>\"";
                            rem_str_1 = JSON.parse(json_rep_1);
                            while (did_rep) {
                                did_rep = false;
                                //spell:disable-next-line
                                rb_html_tmp = rb_html_tmp.replace("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", on_html_replace);
                                if (did_rep)
                                    continue;
                                rb_html_tmp = rb_html_tmp.replace(rem_str_1, on_html_replace);
                            }
                            script_num = __spreadArray([], rb_html_tmp.matchAll(/<\s*script.*?>/g), true).length;
                            loaded_scripts_count = 0;
                            console.log(rc);
                            mut_observers.push(new LoadMutationObserver(document, function (mut_vec, mut_observer) {
                                var log_data_vec = [];
                                log_data_vec.push(mut_vec.length, document.body != null);
                                /**@type {HTMLScriptElement[]} */
                                var added_scripts = [];
                                /**@type {HTMLScriptElement[]} */
                                var removed_scripts = [];
                                for (var i = 0; i < mut_vec.length; i++) {
                                    var mut_rec = mut_vec[i];
                                    var add_node_list = mut_rec.addedNodes;
                                    for (var j = 0; j < add_node_list.length; j++) {
                                        var cur_node = add_node_list[j];
                                        if (!cur_node) {
                                            debugger;
                                            continue;
                                        }
                                        if (cur_node instanceof HTMLScriptElement) {
                                            added_scripts.push(cur_node);
                                        }
                                    }
                                    var remove_node_list = mut_rec.removedNodes;
                                    for (var j = 0; j < remove_node_list.length; j++) {
                                        var cur_node = remove_node_list[j];
                                        if (cur_node instanceof HTMLScriptElement) {
                                            removed_scripts.push(cur_node);
                                        }
                                    }
                                }
                                if (document.body)
                                    log_data_vec.push('b', document.body.children.length);
                                else
                                    log_data_vec.push('h', document.head.children.length);
                                log_data_vec.push(document.querySelectorAll("script").length);
                                loaded_scripts_count += added_scripts.length;
                                if (loaded_scripts_count >= script_num) {
                                    l_log_if(LOG_LEVEL_INFO, 'observer script count', loaded_scripts_count, script_num);
                                    console.info.apply(console, __spreadArray(['load observer '], log_data_vec, false));
                                    reset_global_event_handlers();
                                    mut_observer.disconnect();
                                }
                            }));
                            mut_observers[0].disconnect();
                            window.g_page_content = {
                                request_content: rb_html,
                                cur: rb_html_tmp
                            };
                            reset_global_event_handlers();
                            document.writeln(rb_html_tmp);
                            reset_global_event_handlers();
                            action_1();
                            document.close();
                            reset_global_event_handlers();
                            window.onunload = function () {
                                console.info('unload');
                            };
                            window.onbeforeunload = function () {
                                var _b;
                                console.info('before unload');
                                if (((_b = history.state) === null || _b === void 0 ? void 0 : _b.gen) !== void 0 && history.state.prev === void 0) {
                                    // https://rebuildtheuniverse.com/mjz_version/
                                    history.replaceState({ prev: history.state, gen: history.state.gen + 1 }, "", orig_url);
                                }
                            };
                            return [2 /*return*/];
                    }
                });
            });
        }
        function on_dom_load() {
            window.setTimeout = real_st;
            window.setInterval = real_si;
            EventTarget.prototype.addEventListener = orig_aev;
            document.addEventListener('DOMContentLoaded', function () {
                action_1();
            });
        }
        function do_page_replace() {
            mut_observers.push(new DetachedMutationObserver(document));
            reset_global_event_handlers();
            document.writeln("");
            reset_global_event_handlers();
            do_fetch_load();
            document.close();
        }
        var page_url = location.href;
        var non_proto_url = page_url_no_protocol();
        if (non_proto_url == "//rebuildtheuniverse.com/mjz_version") {
            do_page_replace();
        }
        else if (non_proto_url == "//rebuildtheuniverse.com/?type=mjz_version") {
            do_page_replace();
        }
        else if (page_url == "https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/?type=mjz_version") {
            do_page_replace();
        }
        else if (non_proto_url == "//rebuildtheuniverse.com/?type=real") {
            on_dom_load();
        }
        else if (page_url === "https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/?type=real") {
            on_dom_load();
        }
        else if (non_proto_url == "//rebuildtheuniverse.com/") {
            window.setTimeout = real_st;
            window.setInterval = real_si;
            EventTarget.prototype.addEventListener = orig_aev;
            document_write_list.destroy();
        }
        else if (page_url === "https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/") {
            window.setTimeout = real_st;
            window.setInterval = real_si;
            EventTarget.prototype.addEventListener = orig_aev;
            document_write_list.destroy();
        }
        else {
            console.log('handle location pathname', location.pathname);
        }
    }
    console.log('re main 1');
    main();
})();
