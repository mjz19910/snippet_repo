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
import { InstructionTypeBox } from "./types/vm/VMBoxedInstructionType";
import { WindowBox } from "./types/vm/WindowBox";
import { StackVMBox } from "./types/vm/StackVMBox";
import { IndexedFnBox } from "./types/vm/box/IndexedFunctionBox";
import { NewableFunctionBox } from "./types/vm/NewableFunctionBox";
import { IndexedObject } from "types/vm/index_access/IndexedObject";
var RemoteWorkerState = /** @class */ (function () {
    function RemoteWorkerState() {
    }
    return RemoteWorkerState;
}());
'use strict';
var TIMER_SINGLE = 1;
var TIMER_REPEATING = 2;
var TIMER_TAG_COUNT = 3;
var AUDIO_ELEMENT_VOLUME = 0.58;
var cint_arr = [];
//spell:disable
var WorkerAsyncMessage = 1;
var TimeoutFireS = 101;
var TimeoutFireR = 102;
var WorkerUpdateMessageHandler = 201;
var TimeoutMessageR = 202;
var TimeoutSetS = 203;
var TimeoutSetR = 204;
var TimeoutClearS = 205;
var TimeoutClearR = 206;
var TimeoutClearA = 207;
var WorkerDestroyMessage = 300;
var WorkerUpdateMessageHandlerReply = 301;
var WorkerReadyReply = 302;
var ReplySetSingle = 303;
var ReplySetRepeating = 304;
var ReplyClearSingle = 305;
var ReplyClearRepeating = 306;
var ReplyClearAny = 307;
var ReplyMessage1 = 401;
var ReplyMessage2 = 402;
var ReplyFromWorker = 500;
var ReplyToWorker = 600;
var TimeoutSingleReply = 700;
var TimeoutRepeatingReply = 701;
var TimeoutSetTypes = 1001;
var TimeoutSetStringS = "setTimeout";
var TimeoutSetStringR = "setInterval";
var TimeoutClearStringS = "clearTimeout";
var TimeoutClearStringR = "clearInterval";
var WorkerFireReplyTypes = /** @class */ (function () {
    function WorkerFireReplyTypes() {
        this.single = TimeoutSingleReply;
        this.repeating = TimeoutRepeatingReply;
    }
    return WorkerFireReplyTypes;
}());
var WorkerReplyTypes = /** @class */ (function () {
    function WorkerReplyTypes() {
        this.fire = new WorkerFireReplyTypes;
    }
    return WorkerReplyTypes;
}());
var ReplySetMessages = /** @class */ (function () {
    function ReplySetMessages() {
        this.single = ReplySetSingle;
        this.repeating = ReplySetRepeating;
    }
    return ReplySetMessages;
}());
;
var ReplyClearMessages = /** @class */ (function () {
    function ReplyClearMessages() {
        this.single = ReplyClearSingle;
        this.repeating = ReplyClearRepeating;
        this.any = ReplyClearAny;
    }
    return ReplyClearMessages;
}());
var ReplyTypes = /** @class */ (function () {
    function ReplyTypes() {
        this.msg1 = ReplyMessage1;
        this.msg2 = ReplyMessage2;
        this.from_worker = ReplyFromWorker;
        this.to_worker = ReplyToWorker;
        this.destroy_worker = WorkerDestroyMessage;
        this.update_handler = WorkerUpdateMessageHandlerReply;
        this.ready = WorkerReadyReply;
        this.set = new ReplySetMessages;
        this.clear = new ReplyClearMessages;
    }
    return ReplyTypes;
}());
var MakeReplyData = /** @class */ (function () {
    function MakeReplyData(reply, info, from, _a) {
        this.t = reply;
        this.v = {
            t: info,
            v: from
        };
    }
    return MakeReplyData;
}());
var TimeoutSetStrings = /** @class */ (function () {
    function TimeoutSetStrings() {
        this.single = TimeoutSetStringS;
        this.repeating = TimeoutSetStringR;
    }
    return TimeoutSetStrings;
}());
var TimeoutSetInfo = /** @class */ (function () {
    function TimeoutSetInfo() {
        this.single = TimeoutSetS;
        this.repeating = TimeoutSetR;
    }
    return TimeoutSetInfo;
}());
var TimeoutClearInfo = /** @class */ (function () {
    function TimeoutClearInfo() {
        this.single = TimeoutClearS;
        this.repeating = TimeoutClearR;
        this.any = TimeoutClearA;
    }
    return TimeoutClearInfo;
}());
var TimeoutWorkerTypes = /** @class */ (function () {
    function TimeoutWorkerTypes() {
        this.reply = new WorkerReplyTypes;
        this.update_message_handler = WorkerUpdateMessageHandler;
        this.ready = TimeoutMessageR;
        this.set = new TimeoutSetInfo;
        this.clear = new TimeoutClearInfo;
        this.set_types = TimeoutSetTypes;
    }
    return TimeoutWorkerTypes;
}());
var TimeoutFireInfo = /** @class */ (function () {
    function TimeoutFireInfo() {
        this.single = TimeoutFireS;
        this.repeating = TimeoutFireR;
    }
    return TimeoutFireInfo;
}());
var TimerMessageTypes = /** @class */ (function () {
    function TimerMessageTypes() {
        this.async = WorkerAsyncMessage;
        this.reply = new ReplyTypes;
        this.fire = new TimeoutFireInfo;
        this.worker = new TimeoutWorkerTypes;
    }
    return TimerMessageTypes;
}());
var TimeoutClearStrings = /** @class */ (function () {
    function TimeoutClearStrings() {
        this.single = TimeoutClearStringS;
        this.repeating = TimeoutClearStringR;
    }
    return TimeoutClearStrings;
}());
var TimerApi = /** @class */ (function () {
    function TimerApi() {
        this.msg_types = new TimerMessageTypes;
        this.set_names = new TimeoutSetStrings;
        this.clear_names = new TimeoutClearStrings;
        this.handled = [];
        this.to_handle = [
            { t: TimeoutMessageR },
            { t: TimeoutSetS },
            { t: TimeoutSetR },
            { t: TimeoutClearS },
            new MakeReplyData(ReplyFromWorker, WorkerReadyReply, TimeoutMessageR, {}),
            // TimeoutSetTypeS
            new MakeReplyData(ReplyFromWorker, ReplySetSingle, {
                "var": 'local_id'
            }, {}),
            // TimeoutSetTypeR
            new MakeReplyData(ReplyFromWorker, ReplySetRepeating, {
                "var": 'local_id'
            }, {}),
            // TimeoutClearS
            new MakeReplyData(ReplyFromWorker, ReplyClearSingle, {
                "var": 'remote_id'
            }, {}),
            // TimeoutClearR
            new MakeReplyData(ReplyFromWorker, ReplyClearRepeating, {
                "var": 'remote_id'
            }, {})
        ];
    }
    return TimerApi;
}());
var g_timer_api = new TimerApi;
var message_types = g_timer_api.msg_types;
var ScriptStateHost = /** @class */ (function () {
    function ScriptStateHost() {
    }
    ScriptStateHost.event_target = {
        fns: [],
        addEventListener: function (fn) {
            this.fns.push(fn);
        },
        dispatchEvent: function (ev) {
            var l_fns = this.fns.slice();
            for (var i = 0; i < l_fns.length; i++) {
                var fn = l_fns[i];
                fn(ev);
            }
        }
    };
    return ScriptStateHost;
}());
var is_in_ignored_from_src_fn = false;
var is_in_userscript_fn = false;
var is_in_userscript = true;
var cur_event_fns = [];
function find_all_scripts_using_string_apis() {
    var scripts = new WeakSet;
    var scripts_holders = [];
    var scripts_tokens = [];
    var scripts_weak_arr = [];
    var script_registry;
    var script_id = 1;
    window.is_in_ignored_fn = function () {
        return is_in_ignored_from_src_fn;
    };
    ScriptStateHost.event_target.addEventListener(function (e) {
        is_in_userscript = false;
    });
    function type_verify_extract(val) {
        return true;
    }
    function retype_arr(in_val) {
        if (type_verify_extract(in_val)) {
            return in_val;
        }
        return null;
    }
    function register_obj_with_registry(obj) {
        var obj_id;
        var scripts_res = [];
        for (var i = 0; i < scripts_weak_arr.length; i++) {
            var elem = scripts_weak_arr[i];
            if (elem !== null) {
                scripts_res.push(elem);
            }
        }
        var obj_ref = scripts_weak_arr.find(function (e) { return e && e.ref.deref() === obj; });
        if (obj_ref) {
            obj_id = obj_ref.id;
            return obj_id;
        }
        obj_id = script_id;
        script_id++;
        var held_obj = {
            type: 'held',
            id: obj_id,
            key: Symbol(obj_id)
        };
        var token_sym = { token: Symbol(-obj_id) };
        scripts_holders.push(held_obj);
        scripts_tokens.push({ key: held_obj.key, ref: new WeakRef(token_sym) });
        scripts_weak_arr.push({
            key: held_obj.key,
            id: obj_id,
            ref: new WeakRef(obj)
        });
        script_registry.register(obj, held_obj, token_sym);
        return obj_id;
    }
    function replace_cb_with_safe_proxy(args, index) {
        var value = args[index];
        if (index && args && value instanceof Function) {
            if (is_in_userscript) {
                value.is_userscript_fn = true;
            }
            if (is_in_userscript_fn) {
                value.is_userscript_fn = true;
            }
            if (document.currentScript) {
                value.reg_id = register_obj_with_registry(document.currentScript);
            }
            args[index] = new Proxy(value, {
                apply: function () {
                    var a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        a[_i] = arguments[_i];
                    }
                    var ret;
                    var should_reset = false;
                    cur_event_fns.push(a[0]);
                    var idx = cur_event_fns.indexOf(a[0]);
                    if (a[0].is_userscript_fn) {
                        is_in_ignored_from_src_fn = true;
                        if (is_in_userscript_fn === false) {
                            is_in_userscript_fn = true;
                            should_reset = true;
                        }
                    }
                    try {
                        ret = Reflect.apply.apply(Reflect, a);
                    }
                    finally {
                        if (should_reset) {
                            is_in_userscript_fn = false;
                            should_reset = false;
                        }
                        is_in_ignored_from_src_fn = false;
                        delete cur_event_fns[idx];
                    }
                    delete cur_event_fns[idx];
                    return ret;
                }
            });
            args = [];
            index = -1;
        }
        value = null;
    }
    EventTarget.prototype.addEventListener = new Proxy(EventTarget.prototype.addEventListener, {
        apply: function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            // this will always be EventTarget.prototype.addEventListener (the real one)
            // let target_fn=a[0];
            cur_event_fns.push(a[0]);
            var idx = cur_event_fns.indexOf(a[0]);
            var target_obj = a[1];
            var call_args = a[2];
            replace_cb_with_safe_proxy(call_args, 1);
            // ignore any calls from this script
            if (!is_in_userscript) {
                debugger;
                console.log(target_obj, call_args);
            }
            var ret;
            try {
                ret = Reflect.apply.apply(Reflect, a);
            }
            finally {
                delete cur_event_fns[idx];
            }
            delete cur_event_fns[idx];
            return ret;
        }
    });
    window.requestAnimationFrame = new Proxy(requestAnimationFrame, {
        apply: function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            // let target_obj = a[1];
            var call_args = a[2];
            replace_cb_with_safe_proxy(call_args, 0);
            return Reflect.apply.apply(Reflect, a);
        }
    });
    window.proxy_set = [];
    window.proxy_set.push(EventTarget.prototype.addEventListener);
    Promise.prototype.then = new Proxy(Promise.prototype.then, {
        apply: function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            // let target_obj = a[1];
            var call_args = a[2];
            replace_cb_with_safe_proxy(call_args, 0);
            replace_cb_with_safe_proxy(call_args, 1);
            return Reflect.apply.apply(Reflect, a);
        }
    });
    function str_index_of_inject() {
        var cur_script = get_nearest_script();
        if (cur_script === void 0) {
            if (is_in_ignored_from_src_fn)
                return;
            if (!is_in_userscript)
                throw new Error("No");
            // a userscript is running
            return;
        }
        var had_script = scripts.has(cur_script);
        if (!had_script) {
            try {
                scripts.add(cur_script);
            }
            catch (e) {
                debugger;
            }
            var id = register_obj_with_registry(cur_script);
            console.log('new registry id', id);
        }
        if (!had_script) {
            if (cur_script.src.includes("opentracker")) {
                cur_script.remove();
                cur_script = null;
                throw new Error("No tracking");
            }
            console.log(cur_script);
        }
        cur_script = null;
    }
    String.prototype.indexOf = new Proxy(String.prototype.indexOf, {
        apply: function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            str_index_of_inject();
            return Reflect.apply.apply(Reflect, a);
        }
    });
    script_registry = new FinalizationRegistry(function cleanup(held) {
        var arr_key = held.arr_key;
        var weak_state_index = scripts_weak_arr.findIndex(function (e) { return e && e.key === arr_key; });
        var token_index = scripts_tokens.findIndex(function (e) { return e && e.key === arr_key; });
        if (weak_state_index === -1) {
            console.log('prev gc', held);
        }
        var token = null;
        var weak_state = null;
        if (token_index > -1)
            token = scripts_tokens[token_index];
        if (weak_state_index > -1)
            weak_state = scripts_weak_arr[weak_state_index];
        console.log('gc', weak_state_index, token_index, arr_key, token, weak_state);
        scripts_weak_arr[weak_state_index] = null;
        scripts_tokens[token_index] = null;
    });
    return [scripts_weak_arr, register_obj_with_registry];
}
void find_all_scripts_using_string_apis;
function has_reg_id(v) {
    if (v.hasOwnProperty('reg_id')) {
        return true;
    }
    return false;
}
var _a = find_all_scripts_using_string_apis(), weak_scripts = _a[0], register_obj_with_registry = _a[1];
void register_obj_with_registry;
function get_nearest_script() {
    var _a, _b, _c, _d, _e, _f;
    if (document.currentScript !== null) {
        return document.currentScript;
    }
    var cur_script;
    while (cur_event_fns.at(-1) === void 0 && cur_event_fns.length > 0) {
        cur_event_fns.pop();
    }
    var script_ghost = cur_event_fns.at(-1);
    if (!script_ghost)
        return null;
    if (has_reg_id(script_ghost))
        if (script_ghost && weak_scripts[script_ghost.reg_id - 1]) {
            var reg = weak_scripts[script_ghost.reg_id - 1];
            if (reg && reg.ref.deref()) {
                return reg.ref.deref();
            }
            else if (document.currentScript === null && !is_in_ignored_from_src_fn) {
                debugger;
            }
        }
    if (cur_script === void 0 && !is_in_userscript && !is_in_userscript_fn && !is_in_ignored_from_src_fn) {
        debugger;
    }
    script_ghost = cur_event_fns.at(-1);
    if (script_ghost)
        if (has_reg_id(script_ghost))
            if ((_c = (_b = (_a = weak_scripts[script_ghost.reg_id - 1]) === null || _a === void 0 ? void 0 : _a.ref) === null || _b === void 0 ? void 0 : _b.deref) === null || _c === void 0 ? void 0 : _c.call(_b)) {
                return (_f = (_e = (_d = weak_scripts[script_ghost.reg_id - 1]) === null || _d === void 0 ? void 0 : _d.ref) === null || _e === void 0 ? void 0 : _e.deref) === null || _f === void 0 ? void 0 : _f.call(_e);
            }
    ;
    var doc_script = document.currentScript;
    if (doc_script === null) {
        return null;
    }
    else {
        return doc_script;
    }
}
var DocumentWriteFnProxyHandler = /** @class */ (function () {
    function DocumentWriteFnProxyHandler() {
        this.other = null;
    }
    DocumentWriteFnProxyHandler.prototype.apply = function () {
        var _a;
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        if (this.other)
            (_a = this.other).write.apply(_a, a);
    };
    return DocumentWriteFnProxyHandler;
}());
var DocumentWriteList = /** @class */ (function () {
    function DocumentWriteList() {
        this.list = [];
        this.attached = false;
        this.end_symbol = Symbol(1);
        this.document_write = null;
        this.attached_document = null;
        this.document_write_proxy = null;
    }
    DocumentWriteList.prototype.write = function (target, thisArg, argArray) {
        console.assert(target === this.document_write);
        console.assert(thisArg === this.attached_document);
        this.list.push(argArray, null);
    };
    DocumentWriteList.prototype.attach_proxy = function (document) {
        if (this.attached) {
            var was_destroyed = this.destroy(true);
            if (!was_destroyed) {
                throw new Error("Can't reattach to document, document.write is not equal to DocumentWriteList.document_write_proxy");
            }
        }
        this.attached_document = document;
        this.document_write = document.write;
        var obj = new DocumentWriteFnProxyHandler;
        obj.other = this;
        this.document_write_proxy = new Proxy(document.write, obj);
        document.write = this.document_write_proxy;
    };
    DocumentWriteList.prototype.destroy = function (should_try_to_destroy) {
        if (this.attached_document && this.document_write_proxy) {
            console.assert(this.attached_document.write === this.document_write_proxy);
            if (this.attached_document.write !== this.document_write_proxy) {
                if (should_try_to_destroy) {
                    return false;
                }
                throw new Error("Unable to destroy: document.write is not equal to DocumentWriteList.document_write_proxy");
            }
            if (this.document_write)
                this.attached_document.write = this.document_write;
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
var PromiseExecutorHandle = /** @class */ (function () {
    function PromiseExecutorHandle(accept, reject) {
        this.m_closed = false;
        this.destroyed = false;
        this.m_accept = accept;
        this.m_reject = reject;
    }
    PromiseExecutorHandle.prototype.accept = function (value) {
        if (this.destroyed)
            throw new Error("accept called on destroyed PromiseExecutorHandle");
        var accept = this.m_accept;
        if (accept)
            accept(value);
        this.close();
    };
    PromiseExecutorHandle.prototype.reject = function (error) {
        if (this.destroyed)
            throw new Error("accept called on destroyed PromiseExecutorHandle");
        var reject = this.m_reject;
        reject(error);
        this.close();
    };
    PromiseExecutorHandle.prototype.closed = function () {
        return this.m_closed;
    };
    PromiseExecutorHandle.prototype.close = function () {
        this.m_closed = true;
        this.m_accept = null;
        this.m_reject = null;
    };
    PromiseExecutorHandle.prototype.destroy = function () {
        this.destroyed = true;
    };
    return PromiseExecutorHandle;
}());
function worker_code_function(verify_callback) {
    var TIMER_SINGLE = 1;
    var TIMER_REPEATING = 2;
    var TIMER_TAG_COUNT = 3;
    if (verify_callback) {
        verify_callback({
            TIMER_SINGLE: TIMER_SINGLE,
            TIMER_REPEATING: TIMER_REPEATING,
            TIMER_TAG_COUNT: TIMER_TAG_COUNT
        });
    }
    var RemoteTimerApi = /** @class */ (function () {
        function RemoteTimerApi(msg_types) {
            this.pre_msg_types = {
                worker: {
                    set_types: TimeoutSetTypes
                }
            };
            this.set_names = {
                single: TimeoutSetStringS,
                repeating: TimeoutSetStringR
            };
            this.clear_names = {
                single: TimeoutClearStringS,
                repeating: TimeoutClearStringR
            };
            this.msg_types = msg_types;
        }
        return RemoteTimerApi;
    }());
    var RemoteWorkerState = /** @class */ (function () {
        function RemoteWorkerState() {
            this.m_timer = null;
            this.unique_script_id = 1;
        }
        RemoteWorkerState.prototype.set_timer = function (timer) {
            this.m_timer = timer;
        };
        RemoteWorkerState.prototype.set = function (tag, remote_id, timeout) {
            if (this.m_timer)
                return this.m_timer.set(tag, remote_id, timeout);
        };
        RemoteWorkerState.prototype.clear = function (msg) {
            if (this.m_timer)
                return this.m_timer.do_clear(msg);
        };
        return RemoteWorkerState;
    }());
    function nop_fn() { }
    ;
    function fire_timer(timer, remote_id) {
        timer.fire(remote_id);
    }
    var remote_api_info_instance = null; //new RemoteTimerApi;
    var message_types = null; //remote_api_info_instance.msg_types;
    var reply_message_types = null; //message_types.reply;
    var fire_pause = [];
    var RemoteTimer = /** @class */ (function () {
        function RemoteTimer(api_info) {
            this.m_remote_id_to_state_map = new Map;
            if (!api_info) {
                this.m_api_info = null;
                return;
            }
            /**@type {RemoteTimerApi} */
            this.m_api_info = api_info;
            this.base_id = globalThis[this.m_api_info.set_names.single](nop_fn);
            globalThis[this.m_api_info.clear_names.single](this.base_id);
        }
        RemoteTimer.prototype.fire = function (remote_id) {
            var local_state = this.m_remote_id_to_state_map.get(remote_id);
            if (!local_state)
                return;
            this.validate_state(local_state, remote_id);
            if (!local_state.active) {
                console.log('fire inactive', remote_id, local_state);
                return;
            }
            ;
            var tag = local_state.type;
            var msg_id;
            var reply_id;
            if (!this.m_api_info)
                return;
            switch (tag) {
                case TIMER_SINGLE:
                    {
                        msg_id = this.m_api_info.msg_types.fire.single;
                        reply_id = this.m_api_info.msg_types.worker.reply.fire.single;
                    }
                    break;
                case TIMER_REPEATING:
                    {
                        msg_id = this.m_api_info.msg_types.fire.repeating;
                        reply_id = this.m_api_info.msg_types.worker.reply.fire.repeating;
                    }
                    break;
            }
            if (!msg_id) {
                console.assert(false, 'Unknown tag in RemoteWorker.fire', tag);
                console.info('TypeError like: let v:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o', TIMER_SINGLE, TIMER_REPEATING, tag);
                return;
            }
            if (fire_pause.includes(remote_id)) {
                return;
            }
            else {
                fire_pause.push(remote_id);
            }
            console.log('worker fire', msg_id, remote_id);
            postMessage({
                t: msg_id,
                v: {
                    t: reply_id,
                    v: remote_id
                }
            });
        };
        RemoteTimer.prototype.set = function (tag, remote_id, timeout) {
            // debugger;
            this.verify_tag(tag);
            var obj = {
                active: true,
                local_id: -1,
                type: tag
            };
            this.m_remote_id_to_state_map.set(remote_id, obj);
            /**@type {typeof this.m_api_info.set_names.single | typeof this.m_api_info.set_names.repeating} */
            var api_name;
            if (!this.m_api_info)
                return;
            switch (tag) {
                case TIMER_SINGLE:
                    api_name = this.m_api_info.set_names.single;
                    break;
                case TIMER_REPEATING:
                    api_name = this.m_api_info.set_names.repeating;
                    break;
            }
            if (!api_name)
                return;
            obj.local_id = globalThis[api_name](fire_timer, timeout, this, remote_id);
            return obj.local_id;
        };
        // Please verify your type tag is valid before changing any state, or you might end up in an invalid state
        RemoteTimer.prototype.verify_tag = function (tag) {
            if (!this.validate_tag(tag)) {
                throw new Error("tag verification failed in RemoteTimer");
            }
        };
        RemoteTimer.prototype.verify_state = function (state, remote_id) {
            if (!this.validate_state(state, remote_id)) {
                console.info("Removed invalid local_state");
                if (!this.m_api_info)
                    return;
                globalThis[this.m_api_info.clear_names.single](state.local_id);
                globalThis[this.m_api_info.clear_names.repeating](state.local_id);
                this.m_remote_id_to_state_map["delete"](remote_id);
                throw new Error("Tag verification failed in RemoteWorker");
            }
        };
        RemoteTimer.prototype.validate_tag = function (tag) {
            if (tag < TIMER_SINGLE || tag >= TIMER_TAG_COUNT) {
                console.assert(false, "Assertion failed in RemoteTimer.validate_tag: tag=%o is out of range");
                console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", tag, TIMER_SINGLE, TIMER_TAG_COUNT);
                return false;
            }
            return true;
        };
        RemoteTimer.prototype.validate_state = function (state, _remote_id) {
            return this.validate_tag(state.type);
        };
        RemoteTimer.prototype.clear = function (remote_id) {
            if (this.m_remote_id_to_state_map.has(remote_id)) {
                var state = this.m_remote_id_to_state_map.get(remote_id);
                this.verify_state(state, remote_id);
                if (!this.m_api_info)
                    return;
                if (state.type === TIMER_SINGLE) {
                    globalThis[this.m_api_info.clear_names.single](state.local_id);
                }
                if (state.type === TIMER_REPEATING) {
                    globalThis[this.m_api_info.clear_names.repeating](state.local_id);
                }
                state.active = false;
                this.m_remote_id_to_state_map["delete"](remote_id);
                return state.local_id;
            }
            return null;
        };
        RemoteTimer.prototype.do_clear = function (msg) {
            var remote_id = msg.v;
            var maybe_local_id = this.clear(remote_id);
            if (!message_types)
                return;
            if (!reply_message_types)
                return;
            if (maybe_local_id === void 0)
                return;
            if (maybe_local_id === null)
                return;
            // debugger;
            switch (msg.t) {
                case message_types.worker.clear.single:
                    {
                        // debugger;
                        var message = {
                            t: reply_message_types.from_worker,
                            v: {
                                t: message_types.reply.clear.single,
                                v: [remote_id, maybe_local_id, msg.t]
                            }
                        };
                        postMessage(message);
                    }
                    break;
                case message_types.worker.clear.repeating:
                    {
                        // debugger;
                        var message = {
                            t: reply_message_types.from_worker,
                            v: {
                                t: message_types.reply.clear.repeating,
                                v: [remote_id, maybe_local_id, msg.t]
                            }
                        };
                        postMessage(message);
                    }
                    break;
                default:
                    {
                        console.error("RemoteTimer.do_clear unexpected message");
                        debugger;
                    }
                    break;
            }
        };
        return RemoteTimer;
    }());
    var remote_worker_state = new RemoteWorkerState;
    globalThis.remote_worker_state = remote_worker_state;
    remote_worker_state.set_timer(new RemoteTimer(remote_api_info_instance));
    var stored_for_later_messages = [];
    onmessage = function (e) {
        var msg = e.data;
        if (!remote_worker_state.m_timer) {
            console.log('got message but don\'t have a timer');
            return;
        }
        if (!reply_message_types || !message_types) {
            stored_for_later_messages.push(e.data);
            return;
        }
        switch (msg.t) {
            case reply_message_types.to_worker /*reply*/:
                {
                    var result = msg.v;
                    console.assert(false, "unhandled result on remote worker", result);
                    debugger;
                }
                break;
            case message_types.worker.update_message_handler /*remote worker init*/:
                {
                    debugger;
                    var user_msg = msg.v;
                    var worker_str = "()"[0];
                    worker_str += user_msg.init;
                    worker_str += "()"[1];
                    worker_str += "()";
                    worker_str += "\n";
                    worker_str += "onmessage=";
                    worker_str += user_msg.onmessage;
                    worker_str += "\n";
                    worker_str += "//# sourceURL=$__.";
                    worker_str += remote_worker_state.unique_script_id;
                    eval(worker_str);
                    remote_worker_state.unique_script_id++;
                    var message = {
                        t: reply_message_types.from_worker,
                        v: {
                            t: 1,
                            v: msg.t
                        }
                    };
                    postMessage(message);
                }
                break;
            case message_types.worker.ready /**/:
                {
                    // debugger;
                    var message = {
                        t: reply_message_types.from_worker,
                        v: {
                            t: message_types.reply.ready,
                            v: msg.t
                        }
                    };
                    postMessage(message);
                }
                break;
            case message_types.worker.set.single /*remote timer set single*/:
                {
                    // debugger;
                    var user_msg = msg.v;
                    console.log('worker set single', user_msg.t, user_msg.v);
                    var local_id = remote_worker_state.set(TIMER_SINGLE, user_msg.t, user_msg.v);
                    if (!local_id)
                        return;
                    var message = {
                        t: reply_message_types.from_worker,
                        v: {
                            t: message_types.reply.set.single,
                            v: [local_id, msg.t, user_msg.t, user_msg.v]
                        }
                    };
                    postMessage(message);
                }
                break;
            case message_types.worker.set.repeating /*remote timer set repeating*/:
                {
                    // debugger;
                    var user_msg = msg.v;
                    console.log('worker set repeating', user_msg.t, user_msg.v);
                    var local_id = remote_worker_state.set(TIMER_REPEATING, user_msg.t, user_msg.v);
                    if (!local_id)
                        return;
                    var message = {
                        t: reply_message_types.from_worker,
                        v: {
                            t: message_types.reply.set.repeating,
                            v: [local_id, msg.t, user_msg.t, user_msg.v]
                        }
                    };
                    postMessage(message);
                }
                break;
            case message_types.worker.clear.single /*remote timer do_clear single*/:
                {
                    // debugger;
                    remote_worker_state.clear(msg);
                }
                break;
            case message_types.worker.clear.repeating /*remote timer do_clear repeating*/:
                {
                    // debugger;
                    remote_worker_state.clear(msg);
                }
                break;
            default:
                {
                    console.assert(false, "RemoteWorker: Unhandled message", msg);
                    debugger;
                }
                break;
        }
    };
}
var WorkerState = /** @class */ (function () {
    function WorkerState(worker_code_blob, timer, executor_handle) {
        this.flags = new Map;
        this.flags.set('has_blob', false);
        if (worker_code_blob instanceof Blob)
            this.flags.set('has_blob', true);
        if (!this.flags.get('has_blob'))
            throw new Error("WorkerState requires a blob with javascript code to execute on a worker");
        if (!timer)
            throw new Error("WorkerState needs a timer");
        this.flags.set('rejected', false);
        this.flags.set('valid', false);
        this.flags.set('connected', false);
        this.flags.set('failed', false);
        this.worker_code = worker_code_blob;
        this.timer = timer;
        timer.set_worker_state(this);
        this.executor_handle = executor_handle;
        this.worker = null;
        this.worker_url = null;
    }
    WorkerState.prototype.set_failed = function (has_failed) {
        this.flags.set('failed', has_failed);
    };
    WorkerState.prototype.init = function () {
        if (this.flags.get('connected') || this.flags.get('valid')) {
            this.destroy();
        }
        this.flags.set('connected', false);
        var weak_worker_state = new WeakRef(this);
        this.worker_url = URL.createObjectURL(this.worker_code);
        if (this.flags.get('failed'))
            return;
        this.worker = new Worker(this.worker_url);
        this.worker.onmessage = function onmessage(e) {
            var msg = e.data;
            var worker_state = weak_worker_state.deref();
            if (!worker_state) {
                console.log('lost worker state');
                this.terminate();
                return;
            }
            switch (msg.t) {
                case TimeoutFireS /*worker_state.timer single fire*/: {
                    worker_state.timer.fire(TIMER_SINGLE, msg.v);
                    break;
                }
                case TimeoutFireS /*worker_state.timer repeating fire*/: {
                    worker_state.timer.fire(TIMER_REPEATING, msg.v);
                    break;
                }
                case WorkerDestroyMessage /*worker_state destroy*/:
                    worker_state.destroy();
                    break;
                case ReplyMessage1:
                case ReplyMessage2 /*worker_state dispatch_message_unpacked*/: {
                    debugger;
                    worker_state.dispatch_message(msg);
                    break;
                }
                case ReplyFromWorker /*worker_state dispatch_message*/: {
                    worker_state.dispatch_message(msg.v);
                    break;
                }
                default: {
                    console.assert(false, "Main: Unhandled message", msg);
                    debugger;
                    break;
                }
            }
        };
        this.flags.set('valid', true);
        this.worker.postMessage({
            t: message_types.worker.ready
        });
    };
    WorkerState.prototype.set_executor_handle = function (handle) {
        this.executor_handle = handle;
    };
    WorkerState.prototype.on_result = function (result) {
        if (!this.executor_handle)
            return;
        switch (result.v) {
            case message_types.worker.update_message_handler: {
                console.assert(result.t === WorkerUpdateMessageHandlerReply);
                console.log("remote_worker onmessage function changed");
                break;
            }
            case message_types.worker.ready: {
                console.assert(result.t === WorkerReadyReply);
                if (this.executor_handle.closed()) {
                    console.assert(false, "WorkerState used with closed executor_handle");
                    break;
                }
                l_log_if(LOG_LEVEL_VERBOSE, "remote_worker ready");
                WorkerState.set_global_state(this);
                this.executor_handle.accept(this);
                this.flags.set('connected', true);
                break;
            }
        }
    };
    WorkerState.prototype.dispatch_message = function (result) {
        switch (result.t) {
            case WorkerUpdateMessageHandlerReply:
                {
                    debugger;
                    this.on_result(result);
                }
                break;
            case WorkerReadyReply:
                {
                    // debugger;
                    this.on_result(result);
                }
                break;
            case ReplyMessage1:
                {
                    debugger;
                    this.on_result(result);
                }
                break;
            case ReplyMessage2:
                {
                    debugger;
                    this.timer.on_result(result);
                }
                break;
            case ReplySetSingle:
                {
                    // debugger;
                    this.timer.on_reply(result);
                }
                break;
            case ReplySetRepeating:
                {
                    // debugger;
                    this.timer.on_reply(result);
                }
                break;
            case message_types.reply.clear.single:
                {
                    // debugger;
                    this.timer.on_reply(result);
                }
                break;
            case message_types.reply.clear.repeating:
                {
                    // debugger;
                    this.timer.on_reply(result);
                }
                break;
            case TimeoutClearR:
                {
                    // debugger;
                    this.timer.on_reply(result);
                }
                break;
            case TimeoutClearS:
                {
                    // debugger;
                    this.timer.on_reply(result);
                }
                break;
            default: {
                console.assert(false, "unhandled result", result);
                debugger;
            }
        }
    };
    WorkerState.prototype.postMessage = function (data) {
        if (this.worker)
            return this.worker.postMessage(data);
    };
    WorkerState.has_old_global_state_value = function (worker_state_value) {
        return this.has_global_state() && !this.equals_global_state(worker_state_value);
    };
    WorkerState.equals_global_state = function (worker_state_value) {
        return this.get_global_state() === worker_state_value;
    };
    WorkerState.maybe_delete_old_global_state_value = function (worker_state_value) {
        if (this.has_old_global_state_value(worker_state_value)) {
            this.delete_old_global_state();
        }
    };
    WorkerState.maybe_delete_old_global_state = function () {
        if (this.has_global_state()) {
            this.delete_old_global_state();
            return true;
        }
        return false;
    };
    WorkerState.delete_old_global_state = function () {
        var old_worker_state = this.get_global_state();
        if (old_worker_state) {
            var before_destroy_call_name = 'delete_global_state';
            this.destroy_old_worker_state(old_worker_state, before_destroy_call_name);
        }
    };
    WorkerState.destroy_old_worker_state = function (worker_state_value, before_destroy_call_name) {
        this[before_destroy_call_name]();
        worker_state_value.destroy();
    };
    WorkerState.has_global_state = function () {
        return window.hasOwnProperty(this.global_state_key);
    };
    WorkerState.get_global_state = function () {
        return window[this.global_state_key];
    };
    WorkerState.set_global_state = function (worker_state_value) {
        this.maybe_delete_old_global_state_value(worker_state_value);
        window[this.global_state_key] = worker_state_value;
    };
    WorkerState.delete_global_state = function () {
        delete window[this.global_state_key];
    };
    WorkerState.prototype.destroy = function () {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
            if (this.worker_url)
                URL.revokeObjectURL(this.worker_url);
            this.worker_url = null;
            this.flags.set('connected', false);
            this.flags.set('valid', false);
            if (this.executor_handle && !this.executor_handle.closed()) {
                this.executor_handle.reject(new Error("Worker destroyed before it was connected"));
            }
        }
        ;
        this.timer.destroy();
    };
    WorkerState.global_state_key = "g_worker_state";
    return WorkerState;
}());
function timer_nop() { }
var TimerState = /** @class */ (function () {
    function TimerState(tag, is_repeating, target_fn, target_args, timeout) {
        this.active = true;
        this.type = tag;
        this.repeat = is_repeating;
        this.target_fn = target_fn;
        this.target_args = target_args;
        this.timeout = timeout;
    }
    return TimerState;
}());
var Timer = /** @class */ (function () {
    function Timer(id_generator, api_info) {
        this.id_generator = id_generator;
        this.m_remote_id_to_state_map = new Map;
        this.weak_worker_state = null;
        this.m_api_map = new Map;
        this.m_api_info = api_info;
        this.set_api_names(api_info.set_names, api_info.clear_names);
    }
    Timer.prototype.set_map_names = function (names) {
        this.m_api_map.set(names.single, window[names.single]);
        this.m_api_map.set(names.repeating, window[names.repeating]);
    };
    Timer.prototype.set_api_names = function (set, clear) {
        this.set_map_names(set);
        this.set_map_names(clear);
        this.base_id = window[set.single](timer_nop);
        window[clear.single](this.base_id);
        this.id_generator.set_current(this.base_id);
    };
    Timer.prototype.set_worker_state = function (worker_state_value) {
        this.weak_worker_state = new WeakRef(worker_state_value);
    };
    // If you cause any side effects, please
    // wrap this call in try{}finally{} and
    // revert all side effects...
    Timer.prototype.verify_tag = function (tag) {
        if (!this.validate_tag(tag)) {
            throw new Error("Verify failed in Timer.verify_tag");
        }
    };
    Timer.prototype.verify_state = function (state, remote_id) {
        if (!this.weak_worker_state)
            return;
        if (!this.validate_state(state)) {
            var worker_state = this.weak_worker_state.deref();
            if (!worker_state)
                return;
            worker_state.postMessage({
                t: this.m_api_info.msg_types.worker.clear.any,
                v: remote_id
            });
            throw new Error("Verify failed in Timer.verify_timer_state");
        }
    };
    Timer.prototype.validate_tag = function (tag) {
        if (tag != TIMER_SINGLE && tag != TIMER_REPEATING) {
            console.assert(false, "Assertion failure in Timer.validate_tag: tag=%o is out of range");
            console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", tag, TIMER_SINGLE, TIMER_TAG_COUNT);
            return false;
        }
        return true;
    };
    Timer.prototype.validate_state = function (state) {
        return this.validate_tag(state.type);
    };
    Timer.prototype.fire = function (tag, remote_id) {
        var state = this.get_state_by_remote_id(remote_id);
        if (!state) {
            this.force_clear(tag, remote_id);
            return;
        }
        if (!this.weak_worker_state)
            return;
        var should_reset_user_fn = false;
        var should_reset_ign = false;
        if (typeof state.target_fn != 'string')
            cur_event_fns.push(state.target_fn);
        var idx = -1;
        if (typeof state.target_fn != 'string')
            cur_event_fns.indexOf(state.target_fn);
        try {
            if (state.active) {
                if (state.target_fn.is_userscript_fn) {
                    if (is_in_ignored_from_src_fn === false) {
                        is_in_ignored_from_src_fn = true;
                        should_reset_ign = true;
                    }
                    if (is_in_userscript_fn === false) {
                        is_in_userscript_fn = true;
                        should_reset_user_fn = true;
                    }
                }
                if (state.target_fn instanceof Function) {
                    state.target_fn.apply(null, state.target_args);
                }
                else {
                    var fn = new Function(state.target_fn);
                    state.target_fn = fn;
                    state.target_fn.apply(null, state.target_args);
                }
            }
        }
        finally {
            if (should_reset_ign)
                is_in_ignored_from_src_fn = false;
            if (should_reset_user_fn)
                is_in_userscript_fn = false;
            delete cur_event_fns[idx];
            if (tag === TIMER_SINGLE) {
                state.active = false;
                this.clear(tag, remote_id);
            }
            var worker_state = this.weak_worker_state.deref();
            if (!worker_state)
                return;
            worker_state.postMessage({
                t: this.m_api_info.msg_types.worker.reply.fire.single,
                v: remote_id
            });
        }
    };
    Timer.prototype.set = function (tag, target_fn, timeout, target_args) {
        var remote_id = this.id_generator.next();
        var is_repeating = false;
        this.verify_tag(tag);
        if (tag === TIMER_REPEATING) {
            is_repeating = true;
        }
        if (typeof timeout === 'string') {
            var tmp_timeout = parseInt(timeout, 10);
            if (!Number.isNaN(tmp_timeout)) {
                timeout = tmp_timeout;
            }
            else {
                timeout = 30;
            }
        }
        if (!timeout || timeout < 0)
            timeout = 0;
        var state = new TimerState(tag, is_repeating, target_fn, target_args, timeout);
        if (is_in_userscript) {
            target_fn.is_userscript_fn = true;
        }
        if (is_in_userscript_fn) {
            target_fn.is_userscript_fn = true;
        }
        // if(document.currentScript){
        // 	target_fn.reg_id=register_obj_with_registry(document.currentScript);
        // }
        // if(get_nearest_script()){
        // 	target_fn.reg_id=register_obj_with_registry(get_nearest_script());
        // }
        this.store_state_by_remote_id(state, remote_id);
        this.send_worker_set_message(tag, {
            t: remote_id,
            v: timeout
        });
        return remote_id;
    };
    Timer.prototype.send_worker_set_message = function (tag, obj) {
        if (!this.weak_worker_state)
            return;
        var worker_state = this.weak_worker_state.deref();
        if (!worker_state) {
            console.assert(false, 'tried to send_worker_message, but the gc collected the worker_state, referenced with a WeakRef (weak_worker_state)');
            return;
        }
        var msg_id;
        switch (tag) {
            case TIMER_SINGLE:
                msg_id = this.m_api_info.msg_types.worker.set.single;
                break;
            case TIMER_REPEATING:
                msg_id = this.m_api_info.msg_types.worker.set.repeating;
                break;
        }
        if (!msg_id) {
            console.assert(false, 'Unknown timer_tag', tag);
            console.info('TypeError like: let v:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o', TIMER_SINGLE, TIMER_REPEATING, tag);
            return;
        }
        worker_state.postMessage({
            t: msg_id,
            v: obj
        });
    };
    Timer.prototype.is_state_stored_by_remote_id = function (remote_id) {
        return this.m_remote_id_to_state_map.has(remote_id);
    };
    Timer.prototype.get_state_by_remote_id = function (remote_id) {
        var state = this.m_remote_id_to_state_map.get(remote_id);
        if (!state)
            return null;
        this.verify_state(state, remote_id);
        return state;
    };
    Timer.prototype.store_state_by_remote_id = function (state, remote_id) {
        this.m_remote_id_to_state_map.set(remote_id, state);
    };
    Timer.prototype.delete_state_by_remote_id = function (remote_id) {
        this.m_remote_id_to_state_map["delete"](remote_id);
    };
    Timer.prototype.remote_id_to_state_entries = function () {
        return this.m_remote_id_to_state_map.entries();
    };
    Timer.prototype.on_result = function (result) {
        console.log(result);
        debugger;
        switch (result.t) {
            case this.m_api_info.msg_types.worker.clear.single: {
                var remote_id = result.v;
                if (!remote_id)
                    return;
                this.delete_state_by_remote_id(remote_id);
                break;
            }
            case this.m_api_info.msg_types.worker.clear.repeating: {
                var remote_id = result.v;
                if (!remote_id)
                    return;
                this.delete_state_by_remote_id(remote_id);
                break;
            }
            default:
                console.assert(false, 'on_result timer_result_msg needs a handler for', result.t);
        }
    };
    Timer.prototype.on_reply = function (result) {
        switch (result.t) {
            case this.m_api_info.msg_types.worker.clear.single: {
                debugger;
                var remote_id = result.v;
                this.delete_state_by_remote_id(remote_id);
                break;
            }
            case this.m_api_info.msg_types.worker.clear.repeating: {
                debugger;
                var remote_id = result.v;
                this.delete_state_by_remote_id(remote_id);
                break;
            }
            case ReplySetSingle:
                {
                    //debugger;
                }
                break;
            case ReplySetRepeating:
                {
                    // debugger;
                }
                break;
            case ReplyClearSingle:
                {
                    debugger;
                }
                break;
            case message_types.reply.clear.repeating:
                {
                    // debugger;
                }
                break;
            default:
                console.log('reply', result);
                console.assert(false, 'on_result msg needs a handler for', result);
                debugger;
        }
    };
    Timer.prototype.force_clear = function (tag, remote_id) {
        if (!this.weak_worker_state)
            return;
        this.verify_tag(tag);
        var worker_state = this.weak_worker_state.deref();
        if (!worker_state)
            return;
        var state = this.get_state_by_remote_id(remote_id);
        if (!state)
            throw new Error("No state for id");
        if (state.active) {
            return this.clear(tag, remote_id);
        }
        // we have to trust the user, go ahead and send the message
        // anyway (this can technically send structured cloneable objects)
        if (tag === TIMER_SINGLE) {
            worker_state.postMessage({
                t: this.m_api_info.msg_types.worker.clear.single,
                v: remote_id
            });
        }
        else if (tag === TIMER_REPEATING) {
            worker_state.postMessage({
                t: this.m_api_info.msg_types.worker.clear.repeating,
                v: remote_id
            });
        }
    };
    Timer.prototype.clear = function (tag, remote_id) {
        this.verify_tag(tag);
        if (remote_id === void 0)
            return;
        var state = this.get_state_by_remote_id(remote_id);
        if (!this.weak_worker_state)
            return;
        if (state === null || state === void 0 ? void 0 : state.active) {
            var worker_state = this.weak_worker_state.deref();
            if (!worker_state)
                return;
            if (state.type === TIMER_SINGLE) {
                worker_state.postMessage({
                    t: this.m_api_info.msg_types.worker.clear.single,
                    v: remote_id
                });
            }
            else if (state.type === TIMER_REPEATING) {
                worker_state.postMessage({
                    t: this.m_api_info.msg_types.worker.clear.repeating,
                    v: remote_id
                });
            }
            state.active = false;
        }
    };
    Timer.prototype.destroy = function () {
        var api_info = this.m_api_info;
        var api_map = this.m_api_map;
        window[api_info.set_names.single] = api_map.get(api_info.set_names.single);
        window[api_info.set_names.repeating] = api_map.get(api_info.set_names.repeating);
        window[api_info.clear_names.single] = api_map.get(api_info.clear_names.single);
        window[api_info.clear_names.repeating] = api_map.get(api_info.clear_names.repeating);
        for (var _i = 0, _a = this.remote_id_to_state_entries(); _i < _a.length; _i++) {
            var state_entry = _a[_i];
            var id = state_entry[0];
            void id;
            var state = state_entry[1];
            if (state.type === TIMER_SINGLE) {
                // if the timer might get reset when calling the function while
                // the timer functions are reset to the underlying api
                if (state.target_fn instanceof Function) {
                    state.target_fn.apply(null, state.target_args);
                }
                else {
                    eval(state.target_fn);
                }
            }
        }
        this.m_api_map.clear();
    };
    return Timer;
}());
var VerifyError = /** @class */ (function (_super) {
    __extends(VerifyError, _super);
    function VerifyError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "VerifyError";
        return _this;
    }
    return VerifyError;
}(Error));
function VERIFY(assert_result, assert_message) {
    if (!assert_result) {
        throw new VerifyError(assert_message);
    }
}
function do_worker_verify(verify_obj) {
    VERIFY(verify_obj.TIMER_SINGLE === TIMER_SINGLE, "TIMER_SINGLE constant matches");
    VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_REPEATING constant matches");
    VERIFY(verify_obj.TIMER_TAG_COUNT === TIMER_TAG_COUNT, "TIMER_TAG_COUNT constant matches");
    VERIFY(Object.keys(verify_obj).length === 3, "keys(verify_obj).length is expected value");
    return;
}
function move_timers_to_worker_promise_executor(executor_accept, executor_reject) {
    var failed = false;
    if (globalThis.remote_worker_state) {
        postMessage({ t: WorkerDestroyMessage });
        executor_accept(null);
        return;
    }
    if (WorkerState.maybe_delete_old_global_state())
        return null;
    try {
        worker_code_function(do_worker_verify);
    }
    catch (e) {
        console.log(e);
        executor_accept(null);
        failed = true;
    }
    var worker_code_blob = new Blob(["(", worker_code_function.toString(), ")()", "\n//# sourceURL=$__.0"]);
    var id_generator = new UniqueIdGenerator;
    var timer = new Timer(id_generator, new TimerApi);
    var executor_handle = null;
    if (!failed) {
        executor_handle = new PromiseExecutorHandle(executor_accept, executor_reject);
    }
    var worker_state = new WorkerState(worker_code_blob, timer, executor_handle);
    worker_state.set_failed(failed);
    worker_state.init();
    var weak_worker_state = new WeakRef(worker_state);
    var setTimeout_global = setTimeout;
    function remoteSetTimeout(handler, timeout) {
        var target_args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            target_args[_i - 2] = arguments[_i];
        }
        if (!worker_state) {
            window.setTimeout = setTimeout_global;
            l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
            return setTimeout_global.apply(void 0, __spreadArray([handler, timeout], target_args, false));
        }
        return worker_state.timer.set(TIMER_SINGLE, handler, timeout, target_args);
    }
    var clearTimeout_global = clearTimeout;
    /**@arg {number} id */
    function remoteClearTimeout(id) {
        if (!worker_state) {
            window.clearTimeout = clearTimeout_global;
            l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
            return clearTimeout_global(id);
        }
        worker_state.timer.clear(TIMER_SINGLE, id);
    }
    var setInterval_global = setInterval;
    function remoteSetInterval(handler, timeout) {
        var target_args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            target_args[_i - 2] = arguments[_i];
        }
        if (!worker_state) {
            window.setInterval = setInterval_global;
            l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
            return setInterval_global.apply(void 0, __spreadArray([handler, timeout], target_args, false));
        }
        return worker_state.timer.set(TIMER_REPEATING, handler, timeout, target_args);
    }
    var clearInterval_global = clearInterval;
    function remoteClearInterval(id) {
        if (!worker_state) {
            window.clearInterval = clearInterval_global;
            l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
            return clearInterval_global(id);
        }
        worker_state.timer.clear(TIMER_REPEATING, id);
    }
    window.remoteSetTimeout = remoteSetTimeout;
    window.remoteSetInterval = remoteSetInterval;
    window.remoteClearTimeout = remoteClearTimeout;
    window.remoteClearInterval = remoteClearInterval;
    if (!failed) {
        window.setTimeout = remoteSetTimeout;
        window.setInterval = remoteSetInterval;
        window.clearTimeout = remoteClearTimeout;
        window.clearInterval = remoteClearInterval;
    }
    return {
        get: function () {
            return weak_worker_state.deref();
        }
    };
}
var seen_elements = new WeakSet;
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
    if (new URL(e.src).origin != location.origin)
        return;
    if (e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1) {
        e.remove();
        return;
    }
}
function remove_bad_dom_script_element() {
    Array.prototype.forEach.call(document.querySelectorAll("script"), remove_bad_dom_script_element_callback);
}
;
var EventHandlerDispatch = /** @class */ (function () {
    function EventHandlerDispatch(target_obj, target_fn) {
        this.target_obj = target_obj;
        this.target_fn = target_fn;
    }
    EventHandlerDispatch.prototype.do_handle_event = function (event) {
        this.target_fn.call(this.target_obj, event);
    };
    EventHandlerDispatch.prototype.handleEvent = function (v) {
        this.do_handle_event(v);
    };
    return EventHandlerDispatch;
}());
var AbstractVM = /** @class */ (function () {
    function AbstractVM() {
    }
    return AbstractVM;
}());
var BaseVMCreate = /** @class */ (function (_super) {
    __extends(BaseVMCreate, _super);
    function BaseVMCreate(instructions) {
        var _this = _super.call(this) || this;
        _this.flags = new Map;
        _this.instructions = instructions;
        _this.instruction_pointer = 0;
        _this.running = false;
        return _this;
    }
    BaseVMCreate.prototype.reset = function () {
        this.instruction_pointer = 0;
        this.running = false;
    };
    BaseVMCreate.prototype.is_in_instructions = function (value) {
        return value >= 0 && value < this.instructions.length;
    };
    BaseVMCreate.prototype.execute_instruction = function (instruction) {
        switch (instruction[0]) {
            default: {
                console.info('Unknown opcode', instruction[0]);
                throw new Error('Halt: bad opcode (' + instruction[0] + ')');
            }
            case 'je':
                {
                    var target = instruction[1];
                    if (this.is_in_instructions(target)) {
                        throw new Error("RangeError: Jump target is out of instructions range");
                    }
                    if (this.flags.get('equal')) {
                        this.instruction_pointer = target;
                    }
                }
                break;
            case 'jmp':
                {
                    var target = instruction[1];
                    if (this.is_in_instructions(target)) {
                        throw new Error("RangeError: Jump target is out of instructions range");
                    }
                    this.instruction_pointer = target;
                }
                break;
            case 'halt' /*Running*/:
                this.running = false;
                break;
        }
    };
    BaseVMCreate.prototype.run = function () {
        this.running = true;
        while (this.instruction_pointer < this.instructions.length && this.running) {
            var instruction = this.instructions[this.instruction_pointer];
            this.execute_instruction(instruction);
            this.instruction_pointer++;
        }
        return null;
    };
    return BaseVMCreate;
}(AbstractVM));
function trigger_debug_breakpoint() {
    debugger;
}
var local_logging_level = 3;
function l_log_if(level) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (level <= local_logging_level) {
        console.log.apply(console, args);
    }
}
var LOG_LEVEL_ERROR = 1;
void LOG_LEVEL_ERROR;
var LOG_LEVEL_WARN = 2;
var LOG_LEVEL_INFO = 3;
void LOG_LEVEL_INFO;
var LOG_LEVEL_VERBOSE = 4;
var LOG_LEVEL_TRACE = 5;
void LOG_LEVEL_TRACE;
var BaseStackVM = /** @class */ (function (_super) {
    __extends(BaseStackVM, _super);
    function BaseStackVM(instructions) {
        var _this = _super.call(this, instructions) || this;
        _this.stack = [];
        _this.return_value = void 0;
        return _this;
    }
    BaseStackVM.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.stack.length = 0;
        this.return_value = void 0;
    };
    BaseStackVM.prototype.push = function (value) {
        this.stack.push(value);
    };
    BaseStackVM.prototype.pop = function () {
        if (this.stack.length === 0) {
            throw new Error("stack underflow");
        }
        var pop_value = this.stack.pop();
        return pop_value;
    };
    BaseStackVM.prototype.pop_arg_count = function (operand_number_of_arguments) {
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
    BaseStackVM.prototype.execute_instruction = function (instruction) {
        var _a, _b;
        switch (instruction[0]) {
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
            case 'get' /*Object*/:
                {
                    var target_name = this.pop();
                    if (target_name === void 0)
                        break;
                    var target_obj = this.pop();
                    if (target_obj === void 0)
                        break;
                    if (typeof target_obj != 'object')
                        break;
                    if (typeof target_name != 'string')
                        break;
                    if (target_obj instanceof IndexedObject) {
                        this.push(target_obj.value[target_name]);
                    }
                }
                break;
            case 'call' /*Call*/:
                {
                    var number_of_arguments = instruction[1];
                    if (number_of_arguments === void 0)
                        return;
                    if (typeof number_of_arguments != 'number')
                        return;
                    if (number_of_arguments <= 1) {
                        throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
                    }
                    var _c = this.pop_arg_count(number_of_arguments), target_this = _c[0], target_fn = _c[1], arg_arr = _c.slice(2);
                    if (!(target_fn instanceof Function))
                        break;
                    var ret_1 = target_fn.apply(target_this, arg_arr);
                    this.push(ret_1);
                }
                break;
            case 'construct' /*Construct*/:
                {
                    var number_of_arguments = instruction[1];
                    if (typeof number_of_arguments != 'number')
                        return;
                    var _d = this.pop_arg_count(number_of_arguments), construct_target = _d[0], construct_arr = _d.slice(1);
                    if (construct_target instanceof Function) {
                        var obj = new ((_a = construct_target).bind.apply(_a, __spreadArray([void 0], construct_arr, false)))();
                        this.push(obj);
                    }
                    else if (construct_target instanceof NewableFunctionBox) {
                        var obj = new ((_b = construct_target.value).bind.apply(_b, __spreadArray([void 0], construct_arr, false)))();
                        this.push(obj);
                    }
                    else {
                        console.assert(false, 'try to construct non function');
                        debugger;
                    }
                    l_log_if.apply(void 0, __spreadArray([LOG_LEVEL_VERBOSE, instruction], this.stack.slice(this.stack.length - number_of_arguments), false));
                }
                break;
            case 'return' /*Call*/:
                var ret = this.pop();
                this.return_value = ret;
                break;
            case 'modify_operand':
                {
                    var target = instruction[1], offset = instruction[2];
                    if (typeof offset != 'number')
                        return;
                    if (typeof target === 'number') {
                        if (this.is_in_instructions(target)) {
                            throw new Error("RangeError: Destination is out of instructions range");
                        }
                        var instruction_modify = new InstructionTypeBox(this.instructions[target]);
                        var value = this.pop();
                        if (typeof value === 'string') {
                            instruction_modify.value[offset] = value;
                        }
                        var verify_state = [instruction_modify.value.length];
                        var out_ins = [];
                        for (var i = 0; i < instruction_modify.value.length; i++) {
                            var cur = instruction_modify.value[i];
                            if (typeof cur === 'string') {
                                out_ins.push(cur);
                            }
                            else {
                                console.log('need type for', cur);
                            }
                        }
                        var valid_instruction = SimpleStackVMParser.verify_instruction(out_ins, verify_state);
                        this.instructions[target] = valid_instruction;
                        console.log('new verify state', verify_state);
                        console.assert(verify_state[0] === 0, "not all of the operands typechecked");
                    }
                }
                break;
            case 'push_pc':
                {
                    this.push(this.instruction_pointer);
                }
                break;
            default:
                _super.prototype.execute_instruction.call(this, instruction);
                break;
        }
    };
    BaseStackVM.prototype.run = function () {
        this.running = true;
        while (this.instruction_pointer < this.instructions.length && this.running) {
            var instruction = this.instructions[this.instruction_pointer];
            this.execute_instruction(instruction);
            this.instruction_pointer++;
        }
        console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
        return this.return_value;
    };
    return BaseStackVM;
}(BaseVMCreate));
var SimpleStackVM = /** @class */ (function (_super) {
    __extends(SimpleStackVM, _super);
    function SimpleStackVM(instructions) {
        var _this = _super.call(this, instructions) || this;
        _this.args_vec = null;
        return _this;
    }
    SimpleStackVM.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.args_vec = null;
    };
    SimpleStackVM.prototype.execute_instruction_raw = function (instruction) {
        var _a;
        switch (instruction[0]) {
            case 'this' /*Special*/:
                this.push(new StackVMBox(this));
                break;
            // TODO: if you ever use this on a worker, change
            // it to use globalThis...
            case 'global' /*Special*/:
                this.push(new WindowBox(window));
                break;
            case 'breakpoint' /*Debug*/:
                trigger_debug_breakpoint();
                break;
            case 'call' /*Call*/:
                {
                    // TODO: Fix the other code to use the call handling from
                    // the base class
                    // Currently we support applying functions
                    // this is closer to what you expect, not to just get
                    // the name of a member to call
                    var number_of_arguments = instruction[1];
                    var _b = this.pop_arg_count(number_of_arguments), target_obj = _b[0], target_name = _b[1], arg_arr = _b.slice(2);
                    if (typeof target_name == 'string') {
                        if (target_obj instanceof IndexedFnBox) {
                            var ret = (_a = target_obj.value)[target_name].apply(_a, arg_arr);
                            this.push(ret);
                        }
                    }
                }
                break;
            default:
                _super.prototype.execute_instruction.call(this, instruction);
                break;
        }
    };
    SimpleStackVM.prototype.run = function () {
        var run_arguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            run_arguments[_i] = arguments[_i];
        }
        this.args_vec = run_arguments;
        return _super.prototype.run.call(this);
    };
    return SimpleStackVM;
}(BaseStackVM));
var SimpleStackVMParser = /** @class */ (function () {
    function SimpleStackVMParser() {
    }
    /**@arg {string[] | number[]} cur @arg {number} arg_loc*/
    SimpleStackVMParser.parse_int_arg = function (cur_item) {
        if (typeof cur_item == 'string') {
            var arg = cur_item;
            if (arg[3] === '()'[0] && arg.at(-1) === "()"[1]) {
                var str_int = arg.slice(4, -1);
                return parseInt(str_int, 10);
            }
        }
    };
    SimpleStackVMParser.parse_string_with_format_ident = function (str, format_list) {
        var format_index = str.indexOf('%');
        var format_type = str[format_index + 1];
        switch (format_type) {
            case 'o':
                var obj = format_list.shift();
                if (!obj)
                    throw new Error("Format list underflow");
                return obj;
            default:
                console.log("%s", 'unsupported format spec %' + format_type);
        }
    };
    SimpleStackVMParser.parse_current_instruction = function (cur, format_list) {
        var arg_loc = 1;
        var arg = cur[arg_loc];
        while (arg) {
            if (typeof arg != 'string') {
                arg_loc++;
                arg = cur[arg_loc];
                continue;
            }
            if (arg.slice(0, 3) === 'int') {
                var int_res = this.parse_int_arg(arg);
                if (!int_res)
                    throw new Error("Failed to parse int");
                cur[arg_loc] = int_res;
            }
            if (arg.includes('%')) {
                var res = this.parse_string_with_format_ident(arg, format_list);
                if (!res)
                    throw new Error("Failed to parse format ident");
                cur[arg_loc] = res;
            }
            arg_loc++;
            arg = cur[arg_loc];
        }
    };
    SimpleStackVMParser.raw_parse_handle_regexp_match = function (m) {
        var iter = m[1].trim();
        if (iter.startsWith("//"))
            return [];
        while (iter.startsWith("/*")) {
            var j = iter.indexOf("*/");
            iter = iter.slice(j + 2).trim();
        }
        if (!iter)
            return [];
        return iter.split(",");
    };
    SimpleStackVMParser.parse_string_into_raw_instruction_stream = function (string) {
        var parser_max_match_iter = 390;
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
    SimpleStackVMParser.parse_instruction_stream_from_string = function (string, format_list) {
        var raw_instructions = this.parse_string_into_raw_instruction_stream(string);
        for (var i = 0; i < raw_instructions.length; i++) {
            var raw_instruction = raw_instructions[i];
            this.parse_current_instruction(raw_instruction, format_list);
        }
        var instructions = this.verify_raw_instructions(raw_instructions);
        return instructions;
    };
    SimpleStackVMParser.verify_instruction = function (instruction, left) {
        var m_opcode = instruction[0], m_operands = instruction.slice(1);
        switch (m_opcode) {
            // variable argument count
            case 'push':
                left[0] = 0;
                return __spreadArray([m_opcode], m_operands, true);
            case 'call' /*1 argument*/:
                left[0] -= 2;
                if (typeof m_operands[0] === 'number' && Number.isFinite(m_operands[0]))
                    return [m_opcode, m_operands[0]];
                else {
                    console.info("Can't verify that call instruction is valid, argument (%o) is not a number or not finite", m_operands[0]);
                    throw new Error("TypeError: Invalid argument");
                }
            case 'drop':
            case 'get':
            case 'return':
            case 'halt':
            case 'push_args':
            case 'this':
            case 'global':
            case 'breakpoint' /*opcode*/:
                left[0]--;
                return [m_opcode];
            default:
                console.info("Info: opcode=%o instruction_parameters=%o", m_opcode, m_operands);
                throw new Error("Unexpected opcode");
        }
    };
    SimpleStackVMParser.verify_raw_instructions = function (raw_instructions) {
        var instructions = [];
        for (var i = 0; i < raw_instructions.length; i++) {
            var instruction = raw_instructions[i];
            var left = [instruction.length];
            var valid_instruction = this.verify_instruction(instruction, left);
            instructions.push(valid_instruction);
            if (left[0] > 0)
                throw new Error("Typechecking failure, data left when processing raw instruction stream");
        }
        return instructions;
    };
    return SimpleStackVMParser;
}());
SimpleStackVMParser.match_regex = /(.+?)(;|$)/gm;
var EventHandlerVMDispatch = /** @class */ (function (_super) {
    __extends(EventHandlerVMDispatch, _super);
    function EventHandlerVMDispatch(instructions, target_obj) {
        var _this = _super.call(this, instructions) || this;
        _this.target_obj = target_obj;
        return _this;
    }
    EventHandlerVMDispatch.prototype.handleEvent = function (event) {
        this.reset();
        this.run(event);
    };
    return EventHandlerVMDispatch;
}(SimpleStackVM));
var CompressionStatsCalculator = /** @class */ (function () {
    function CompressionStatsCalculator() {
        this.hit_counts = [];
        this.cache = [];
    }
    CompressionStatsCalculator.prototype.map_values = function () {
        return this.hit_counts;
    };
    CompressionStatsCalculator.prototype.map_keys = function () {
        return this.cache;
    };
    CompressionStatsCalculator.prototype.add_hit = function (index) {
        if (!this.hit_counts[index]) {
            this.hit_counts[index] = 1;
        }
        else
            this.hit_counts[index]++;
    };
    CompressionStatsCalculator.prototype.add_item = function (key) {
        var index = this.cache.indexOf(key);
        if (index == -1)
            index = this.cache.push(key);
        else
            this.add_hit(index);
    };
    CompressionStatsCalculator.prototype.reset = function () {
        this.cache.length = 0;
        this.hit_counts.length = 0;
    };
    CompressionStatsCalculator.prototype.calc_compression_stats = function (arr, win_size) {
        this.reset();
        for (var i = 0; i < arr.length; i++) {
            if (i + win_size < arr.length) {
                this.add_item(arr.slice(i, i + win_size).join(","));
            }
        }
        var mk = this.map_keys();
        var mv = this.map_values();
        var tuple_of = to_tuple_arr(mk, mv);
        return tuple_of.filter(function (e) { return e[1] !== void 0; });
    };
    CompressionStatsCalculator.prototype.calc_for_stats_window_size = function (stats_arr, arr, win_size) {
        stats_arr[win_size - 1] = this.calc_compression_stats(arr, win_size);
    };
    CompressionStatsCalculator.prototype.calc_for_stats_index = function (stats_arr, arr, index) {
        stats_arr[index] = this.calc_compression_stats(arr, index + 1);
    };
    return CompressionStatsCalculator;
}());
var BaseCompression = /** @class */ (function () {
    function BaseCompression() {
    }
    BaseCompression.prototype.did_compress = function (src, dst) {
        return dst.length < src.length;
    };
    BaseCompression.prototype.did_decompress = function (src, dst) {
        return dst.length > src.length;
    };
    BaseCompression.prototype.compress_result = function (src, dst) {
        if (this.did_compress(src, dst))
            return [true, dst];
        return [false, src];
    };
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
        _this.compression_stats = [];
        return _this;
    }
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
                        continue;
                    }
                }
            }
            ret.push(item);
        }
        return this.compress_result(arr, ret);
    };
    MulCompression.prototype.try_decompress = function (arr) {
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (i + 1 < arr.length) {
                var _a = [item[0], item.slice(1)], item_type = _a[0], num_data = _a[1];
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
    MulCompression.prototype.compress_array = function (arr) {
        var _a, _b;
        var success, res;
        _a = this.try_decompress(arr), success = _a[0], res = _a[1];
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
        _b = this.try_compress(arr), success = _b[0], res = _b[1];
        if (success)
            return res;
        return arr;
    };
    return MulCompression;
}(BaseCompression));
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
var AverageRatio = /** @class */ (function () {
    // @AverageRatio
    function AverageRatio(max_len, max_history_len, weight, human_duration, initial_arr) {
        if (initial_arr === void 0) { initial_arr = []; }
        this.arr = initial_arr;
        this.history = [];
        this.count = 0;
        this.len = max_len;
        this.history_len = max_history_len;
        this.weight = weight;
        this.human_duration = human_duration;
    }
    AverageRatio.prototype.add = function (value, from_prev, debug) {
        if (debug === void 0) { debug = false; }
        if (from_prev) {
            if (debug)
                console.log("ratio add", this.human_duration, (value * 100).toFixed(5));
            this.arr.unshift(value);
            this.history.unshift(value);
            if (this.history.length > this.history_len)
                this.history.pop();
            if (this.arr.length > this.len)
                this.arr.pop();
            this.count++;
            if (this.count > this.len) {
                this.count = 0;
                return true;
            }
        }
        else {
            this.arr[0] = value;
        }
        return false;
    };
    AverageRatio.prototype.can_average = function () {
        return this.arr.length > 1;
    };
    AverageRatio.prototype.get_average = function () {
        return calc_ratio(this.arr);
    };
    return AverageRatio;
}());
var AbstractTarget = /** @class */ (function () {
    function AbstractTarget() {
    }
    AbstractTarget.prototype.fire = function () {
        throw new Error("Attempt to call an abstract class");
    };
    return AbstractTarget;
}());
var TimeoutTarget = /** @class */ (function (_super) {
    __extends(TimeoutTarget, _super);
    function TimeoutTarget(obj, callback, description) {
        var _this = _super.call(this) || this;
        _this.once = true;
        _this.obj = obj;
        _this.callback = callback;
        _this.description = description;
        return _this;
    }
    TimeoutTarget.prototype.fire = function () {
        this.callback.call(this.obj);
    };
    return TimeoutTarget;
}(AbstractTarget));
var IntervalTarget = /** @class */ (function (_super) {
    __extends(IntervalTarget, _super);
    function IntervalTarget(obj, callback, description) {
        var _this = _super.call(this) || this;
        _this.once = false;
        _this.obj = obj;
        _this.callback = callback;
        _this.description = description;
        return _this;
    }
    IntervalTarget.prototype.fire = function () {
        this.callback.call(this.obj);
    };
    return IntervalTarget;
}(AbstractTarget));
void IntervalTarget;
var PromiseTimeoutTarget = /** @class */ (function () {
    function PromiseTimeoutTarget(description) {
        this.description = description;
        this.promise_accept = null;
        this.callback = null;
        this.m_promise = new Promise(this.promise_executor.bind(this));
    }
    PromiseTimeoutTarget.prototype.get_promise = function () {
        return this.m_promise;
    };
    PromiseTimeoutTarget.prototype.promise_executor = function (accept, reject) {
        void reject;
        this.promise_accept = accept;
        this.callback = this.on_result.bind(this);
    };
    PromiseTimeoutTarget.prototype.on_result = function (value) {
        this.m_promise = null;
        if (this.promise_accept)
            this.promise_accept(value);
    };
    PromiseTimeoutTarget.prototype.fire = function () {
        var callback = this.callback;
        if (callback)
            callback();
    };
    return PromiseTimeoutTarget;
}());
var AsyncTimeoutTarget = /** @class */ (function (_super) {
    __extends(AsyncTimeoutTarget, _super);
    function AsyncTimeoutTarget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncTimeoutTarget.prototype.wait = function () {
        return this.get_promise();
    };
    return AsyncTimeoutTarget;
}(PromiseTimeoutTarget));
var BaseNode = /** @class */ (function () {
    function BaseNode() {
        this.parent = null;
    }
    BaseNode.prototype.set_parent = function (parent) {
        this.parent = parent;
    };
    BaseNode.prototype.remove = function () {
        if (this.parent)
            this.parent.remove_child(this);
    };
    BaseNode.prototype.run = function () {
        // do nothing
    };
    BaseNode.prototype.destroy = function () {
        this.remove();
    };
    return BaseNode;
}());
var BaseTimeoutNode = /** @class */ (function (_super) {
    __extends(BaseTimeoutNode, _super);
    function BaseTimeoutNode(timeout) {
        var _this = _super.call(this) || this;
        _this.timeout = timeout;
        return _this;
    }
    BaseTimeoutNode.prototype.get_timeout = function () {
        return this.timeout;
    };
    return BaseTimeoutNode;
}(BaseNode));
var TimeoutIdNode = /** @class */ (function (_super) {
    __extends(TimeoutIdNode, _super);
    function TimeoutIdNode(id, is_timeout_flag) {
        if (id === void 0) { id = null; }
        var _this = _super.call(this, void 0) || this;
        _this.id = id;
        _this.m_is_timeout = is_timeout_flag;
        return _this;
    }
    return TimeoutIdNode;
}(BaseTimeoutNode));
var TimeoutNode = /** @class */ (function (_super) {
    __extends(TimeoutNode, _super);
    function TimeoutNode(timeout) {
        if (timeout === void 0) { timeout = 0; }
        var _this = _super.call(this, timeout) || this;
        _this.id = null;
        _this.target = null;
        return _this;
    }
    TimeoutNode.prototype.set_target = function (target) {
        this.target = target;
    };
    TimeoutNode.prototype.set = function () {
        this.id = setInterval(this.run.bind(this), this.timeout);
    };
    TimeoutNode.prototype.start = function (target) {
        if (target)
            this.target = target;
        this.set();
    };
    TimeoutNode.prototype.run = function () {
        this.id = null;
        this.remove();
    };
    TimeoutNode.prototype.destroy = function () {
        if (this.id !== null)
            clearTimeout(this.id);
    };
    return TimeoutNode;
}(BaseTimeoutNode));
var IntervalNode = /** @class */ (function (_super) {
    __extends(IntervalNode, _super);
    function IntervalNode(timeout) {
        if (timeout === void 0) { timeout = 0; }
        var _this = _super.call(this, timeout) || this;
        _this.id = null;
        _this.target = null;
        return _this;
    }
    IntervalNode.prototype.set = function () {
        this.id = setInterval(this.run.bind(this), this.timeout);
    };
    IntervalNode.prototype.set_target = function (target) {
        this.target = target;
    };
    IntervalNode.prototype.start = function (target) {
        if (target)
            this.set_target(target);
        this.set();
    };
    IntervalNode.prototype.destroy = function () {
        if (this.id !== null)
            clearInterval(this.id);
    };
    return IntervalNode;
}(BaseTimeoutNode));
var AsyncTimeoutNode = /** @class */ (function (_super) {
    __extends(AsyncTimeoutNode, _super);
    function AsyncTimeoutNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncTimeoutNode.prototype.run = function () {
        _super.prototype.run.call(this);
        if (this.target)
            this.target.fire();
    };
    AsyncTimeoutNode.prototype.start_async = function (target) {
        if (target) {
            this.target = target;
            this.set();
            return target.wait();
        }
        throw new Error("unable to start_async without anything to wait for");
    };
    return AsyncTimeoutNode;
}(TimeoutNode));
var AsyncNodeRoot = /** @class */ (function () {
    function AsyncNodeRoot() {
        this.children = [];
    }
    AsyncNodeRoot.prototype.set = function (target_fn, timeout, repeat) {
        if (repeat === void 0) { repeat = false; }
        var node;
        if (repeat) {
            node = new TimeoutNode(timeout);
        }
        else {
            node = new IntervalNode(timeout);
        }
        this.append_child(node);
        node.start({
            fire: function () {
                target_fn();
            }
        });
    };
    AsyncNodeRoot.prototype.append_raw = function (timeout_id, is_timeout_id) {
        this.append_child(new TimeoutIdNode(timeout_id, is_timeout_id));
    };
    AsyncNodeRoot.prototype.append_child = function (record) {
        record.remove();
        record.set_parent(this);
        this.children.push(record);
    };
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
            console.log('timer destroy', item);
            item.destroy();
            item = this.children.shift();
        } while (item);
    };
    return AsyncNodeRoot;
}());
var AverageRatioRoot = /** @class */ (function () {
    function AverageRatioRoot() {
        this.map = new Map;
        this.ordered_keys = [];
    }
    AverageRatioRoot.prototype.set_ordered_keys = function (ordered_keys) {
        this.ordered_keys = ordered_keys;
    };
    AverageRatioRoot.prototype.can_average = function (key) {
        var ratio_calc = this.map.get(key);
        if (ratio_calc)
            return ratio_calc.can_average();
    };
    AverageRatioRoot.prototype.get_average = function (key) {
        var ratio_calc = this.map.get(key);
        if (ratio_calc)
            return ratio_calc.get_average();
        return 0;
    };
    AverageRatioRoot.prototype.push_ratio = function (_a) {
        var key = _a[0], ratio_obj = _a[1];
        this.ordered_keys.push(key);
        this.map.set(key, ratio_obj);
    };
    AverageRatioRoot.prototype.push = function (value) {
        var cur = this.map.get(this.ordered_keys[0]);
        if (!cur)
            return;
        var res = cur.add(value, true, false);
        for (var i = 1; i < this.ordered_keys.length; i++) {
            var debug = false;
            var key = this.ordered_keys[i];
            cur = this.map.get(key);
            if (!cur)
                continue;
            var prev = this.map.get(this.ordered_keys[i - 1]);
            if (!prev)
                continue;
            if (key === '30min')
                debug = true;
            res = cur.add(prev.get_average(), res, debug);
        }
    };
    return AverageRatioRoot;
}());
var AutoBuyState = /** @class */ (function () {
    function AutoBuyState(root) {
        this.root_node = root;
        this.debug = false;
        this.arr = [];
        this.ratio = 0;
        this.compressor_stats = [];
        this.arr_max_len = 5 * 60;
        this.val = 1;
        this.ratio_mode = 0;
        this.locked_cycles = 0;
        this.prev_atomepersecond = 0;
        this.ratio_mult = 0;
        this.div = 0;
        this.is_init_complete = false;
        this.avg = new AverageRatioRoot;
    }
    AutoBuyState.prototype.init = function () {
        if (window.atomepersecond === 0) {
            var node = new AsyncTimeoutNode(0);
            this.root_node.append_child(node);
            node.start(new TimeoutTarget(this, this.init, 'not ready AutoBuyState.update'));
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
        var ratio_names = ['10sec', '1min', '5min', '30min', '3hour'];
        var ratio_counts = [80, 6, 5, 6, 6];
        var ratio_mul = [0, .65, .15, .15, .05];
        var ratio_human = ["10 seconds", "1 minute", "5 minutes", "30 minutes", "3 hours"];
        function mul_3(arr, i) {
            var _a = arr.slice(i), a = _a[0], _b = _a[1], b = _b === void 0 ? 1 : _b, _c = _a[2], c = _c === void 0 ? 10 : _c;
            return a * b * c;
        }
        //@AverageRatio
        function create_ratio(i) {
            return new AverageRatio(ratio_counts[i], mul_3(ratio_counts, i), ratio_mul[i], ratio_human[i], [rep_val]);
        }
        for (var i = 0; i < 5; i++) {
            var obj = create_ratio(i);
            this.avg.push_ratio([ratio_names[i], obj]);
        }
        this.prev_atomepersecond = window.atomepersecond;
        this.is_init_complete = true;
    };
    AutoBuyState.prototype.calc_ratio = function () {
        if (this.avg.can_average('30min'))
            return this.avg.get_average('30min');
        if (this.avg.can_average('5min'))
            return this.avg.get_average('5min');
        if (this.avg.can_average('1min'))
            return this.avg.get_average('1min');
        if (this.avg.can_average('10sec'))
            return this.avg.get_average('10sec');
        return 0;
    };
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
        this.ratio = new_ratio;
    };
    AutoBuyState.prototype.update_ratio_mode = function () {
        switch (this.ratio_mode) {
            case 0:
                if (this.ratio > .4)
                    this.do_ratio_lock(1, 80 * 12);
                break;
            case 1:
                if (this.ratio < .35)
                    this.do_ratio_lock(-1, 80 * 3);
                if (this.ratio > .60)
                    this.do_ratio_lock(1, 80 * 12);
                break;
            case 2:
                if (this.ratio < .45)
                    this.do_ratio_lock(-1, 80 * 3);
                if (this.ratio > .85)
                    this.do_ratio_lock(1, 80 * 12);
                break;
            case 3:
                if (this.ratio < .9)
                    this.do_ratio_lock(-1, 80 * 3);
                if (this.ratio > 1.5)
                    this.on_very_high_ratio();
                break;
            default:
                if (this.ratio < .9)
                    this.do_ratio_lock(-1, 80 * 6);
                if (this.ratio > 1.5)
                    this.on_very_high_ratio(2);
                break;
        }
    };
    AutoBuyState.prototype.do_ratio_lock = function (mode_change_direction, num_of_cycles) {
        this.ratio_mode += mode_change_direction;
        this.locked_cycles = num_of_cycles;
    };
    AutoBuyState.prototype.on_very_high_ratio = function (mul) {
        if (mul === void 0) { mul = 1; }
        console.log('high ratio', this.ratio_mode, mul, (~~(this.ratio * 100)) / 100);
        this.do_ratio_lock(1, 80 * 12 * mul);
    };
    AutoBuyState.prototype.get_mul_modifier = function () {
        switch (this.ratio_mode) {
            case 0: return 3;
            case 1: return 2;
            case 2: return 1.5;
            case 3: return 1;
            default: return 0.4;
        }
    };
    AutoBuyState.prototype.get_near_val = function () {
        var log_val = this.avg.get_average('5min');
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
        return [log_val, log_mul_count];
    };
    AutoBuyState.prototype.cycle_log = function () {
        var _a = this.get_near_val(), num = _a[0], exponent = _a[1];
        console.log('ratio cycle lock %se%o %s%o %s%o', (~~(num * 1000)) / 1000, exponent, 'mode=', this.ratio_mode, 'cc=', this.locked_cycles);
    };
    AutoBuyState.prototype.update = function () {
        if (typeof window.prestige == 'undefined') {
            console.log('fail', this.div, window.atomepersecond, window.totalAtome);
            var node = new AsyncTimeoutNode(80);
            this.root_node.append_child(node);
            node.start(new TimeoutTarget(this, this.update, 'not ready AutoBuyState.update'));
            return;
        }
        this.ratio_mult = window.prestige;
        this.div = 60 * this.ratio_mult * 8;
        this.val = window.totalAtome / window.atomepersecond / this.div;
        if (!Number.isFinite(this.val)) {
            this.val = 1;
            console.log('fail', this.div, window.atomepersecond, window.totalAtome);
            var node = new AsyncTimeoutNode(80);
            this.root_node.append_child(node);
            node.start(new TimeoutTarget(this, this.update, 'not ready AutoBuyState.update'));
            return;
        }
        this.val *= this.get_mul_modifier();
        this.append_value(this.val);
        if (this.locked_cycles > 0) {
            this.locked_cycles--;
        }
        else {
            this.update_ratio_mode();
            if (this.locked_cycles > 0)
                this.cycle_log();
        }
    };
    AutoBuyState.prototype.reset = function () {
        this.ratio *= 0.75;
        for (var i = 0; i < this.arr.length; i++) {
            this.arr[i] *= 0.75;
        }
    };
    return AutoBuyState;
}());
var MiniDom = /** @class */ (function () {
    function MiniDom(elements) {
    }
    MiniDom.prototype.build_dom = function () {
    };
    return MiniDom;
}());
var debug_id_gen = new UniqueIdGenerator;
var debug_id_syms = [];
function next_debug_id() {
    var id = debug_id_gen.next();
    var sym = Symbol(id);
    debug_id_syms.push(new WeakRef({ sym: sym }));
    return sym;
}
void next_debug_id;
var AbstractBox = /** @class */ (function () {
    function AbstractBox() {
        this.type = 'AbstractBox';
        this.value = null;
    }
    return AbstractBox;
}());
void AbstractBox;
var DomValueBox = /** @class */ (function () {
    function DomValueBox(from, value) {
        this.type = 'DomValueBox';
        this.from = from;
        this.value = value;
    }
    return DomValueBox;
}());
var DomBuilderVM = /** @class */ (function (_super) {
    __extends(DomBuilderVM, _super);
    function DomBuilderVM(instructions) {
        var _this = _super.call(this, instructions) || this;
        _this.exec_stack = [];
        _this.jump_instruction_pointer = null;
        return _this;
    }
    DomBuilderVM.prototype.execute_instruction_raw = function (instruction) {
        l_log_if.apply(void 0, __spreadArray(__spreadArray([LOG_LEVEL_VERBOSE], instruction, false), [null], false));
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
                    this.instructions = instruction[1];
                    this.jump_instruction_pointer = 0;
                    l_log_if.apply(void 0, __spreadArray([LOG_LEVEL_VERBOSE, 'exec'], instruction[1], false));
                }
                break;
            case 'peek':
                {
                    var op_1 = instruction[1], op_2 = instruction[2];
                    var peek_stack = this.exec_stack[op_1][0];
                    var base_ptr = peek_stack.at(-1);
                    var at = peek_stack[base_ptr - op_2 - 1];
                    this.push(at);
                    l_log_if(LOG_LEVEL_VERBOSE, 'peek, pushed value', at, op_2, 'base ptr', base_ptr, 'ex_stack', op_1);
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
                    this.verify_dom_box(target);
                    this.verify_dom_box(child_to_append);
                    if (child_to_append.from !== 'create') {
                        console.warn('Are you sure you want to move elements around? child_to_append was not an element you created', child_to_append);
                    }
                    if (this.can_use_box(target) && this.can_use_box(child_to_append)) {
                        if (target.value && child_to_append.value) {
                            target.value.appendChild(child_to_append.value);
                        }
                        else {
                            console.assert(false, 'box has no value');
                        }
                    }
                    else {
                        console.warn('not using box');
                    }
                    l_log_if(LOG_LEVEL_VERBOSE, 'append to dom', [target, child_to_append]);
                }
                break;
            default /*Debug*/:
                _super.prototype.execute_instruction.call(this, instruction);
                break;
        }
    };
    DomBuilderVM.prototype.can_use_box = function (box) {
        return box.from === 'get' || box.from === 'create';
    };
    DomBuilderVM.prototype.verify_dom_box = function (box) {
        if (box.type === void 0)
            throw new Error("Invalid Box (no type)");
        if (box.type != 'DomValueBox')
            throw new Error("Unbox failed not a DomValueBox");
        if (typeof box.from != 'string')
            throw new Error("Unbox failed Box.from is not a string");
        if (typeof box.value != 'object')
            throw new Error("Unbox failed: Box is not boxing an object");
    };
    DomBuilderVM.prototype.run = function () {
        this.running = true;
        while (this.instruction_pointer < this.instructions.length && this.running) {
            var instruction = this.instructions[this.instruction_pointer];
            this.execute_instruction_raw(instruction);
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
                    if (!exec_top) {
                        throw new Error("Invalid");
                    }
                    this.stack = exec_top[0], this.instructions = exec_top[1];
                    var base_ptr = this.stack.pop();
                    var next_ip = this.stack.pop();
                    if (typeof next_ip != 'number')
                        throw new Error("Invalid");
                    this.instruction_pointer = next_ip;
                    l_log_if(LOG_LEVEL_VERBOSE, 'returned to', this.instruction_pointer, this.exec_stack.length);
                    continue;
                }
                l_log_if(LOG_LEVEL_VERBOSE, 'reached end of instruction stream, nothing to return too', instruction, this.instructions, this.instruction_pointer);
            }
        }
        console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
        return this.return_value;
    };
    return DomBuilderVM;
}(BaseStackVM));
var DataLoader = /** @class */ (function () {
    function DataLoader(storage) {
        this.parse_int = DataLoader.int_parser;
        this.store = storage;
        this.null_sym = Symbol('null');
    }
    DataLoader.prototype.load_str_arr = function (key, def_value) {
        var data = this.store.getItem(key);
        if (data === null)
            return this.create_default(def_value);
        return data.split(",");
    };
    DataLoader.prototype.load_int_arr = function (key, def_value) {
        var storage_data = this.store.getItem(key);
        if (storage_data === null)
            return this.create_default(def_value);
        return this.parse_int_arr(storage_data);
    };
    DataLoader.prototype.default_split = function (string) {
        return string.split(",");
    };
    DataLoader.prototype.parse_int_arr = function (data) {
        return this.default_split(data).map(DataLoader.int_parser);
    };
    DataLoader.prototype.create_default = function (value_or_factory) {
        var value = this.null_sym;
        if (typeof value_or_factory === 'function') {
            // this is a value factory
            return value_or_factory();
        }
        var cc = Object.getPrototypeOf(value_or_factory).constructor;
        try {
            // get it as an object, the convert back to unboxed if possible
            value = (new cc(value_or_factory)).valueOf();
        }
        catch (_a) { }
        if (value === this.null_sym) {
            // none of them worked, it is a default value that you can't construct and call valueOf on
            return value_or_factory;
        }
        return value;
    };
    //spell:words externref
    DataLoader.int_parser = new WebAssembly.Function({ parameters: ['externref'], results: ['f64'] }, parseInt);
    return DataLoader;
}());
var AutoBuy = /** @class */ (function () {
    function AutoBuy() {
        var _a;
        this.root_node = new AsyncNodeRoot;
        this.extra = 0;
        this.iter_count = 0;
        this.epoch_len = 0;
        this.background_audio = null;
        this.state_history_arr = null;
        this.skip_save = false;
        this.cint_arr = [];
        this.local_data_loader = new DataLoader(localStorage);
        this.state = new AutoBuyState(this.root_node);
        this.debug = this.state.debug;
        this.compressor = new MulCompression;
        this.state_history_arr = this.local_data_loader.load_str_arr('auto_buy_history_str', ["S"]);
        this.epoch_start_time = Date.now();
        this.original_map = new Map;
        this.dom_map = new Map;
        this.debug_arr = [];
        for (var i = 0; i < debug_id_syms.length; i++) {
            var val = debug_id_syms[i].deref();
            if (val && this[val.sym]) {
                var obj1 = (this)[val.sym];
                var split_data = obj1.split(",");
                (_a = this.debug_arr).push.apply(_a, split_data.map(function (e) { return e.trim(); }));
            }
        }
        this.timeout_arr = this.local_data_loader.load_int_arr('auto_buy_timeout_str', function (e) {
            var src = [300];
            src.length = 16;
            var data_len = 1;
            while (src.at(-1) != src[0]) {
                src.copyWithin(data_len, 0);
                data_len *= 2;
            }
            return src;
        });
    }
    AutoBuy.prototype.async_compress = function () {
        this.state_history_arr = this.compressor.compress_array(this.state_history_arr);
    };
    AutoBuy.prototype.pre_init = function () {
        // find elements; find background_audio by id
        this.background_audio = document.querySelector("#background_audio");
        if (!this.background_audio)
            throw new Error("Missing expected element");
        // change the audio element's volume, and remove
        // the event listener that will change the volume
        this.background_audio.onloadeddata = null;
        this.background_audio.volume = AUDIO_ELEMENT_VOLUME;
        this.async_pre_init().then(function () {
            console.log('pre_init done');
        });
        this.dom_pre_init();
    };
    AutoBuy.prototype.async_pre_init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var instructions, handler;
            return __generator(this, function (_a) {
                if (!this.background_audio)
                    throw new Error("Missing expected element");
                try {
                    return [2 /*return*/, this.background_audio.play()];
                }
                catch (e) {
                    is_in_ignored_from_src_fn = true;
                    console.log("failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
                }
                instructions = SimpleStackVMParser.parse_instruction_stream_from_string("\n\t\t\tthis;push,target_obj;get;push,background_audio;get;push,play;\n\t\t\t\tcall,int(2);\n\t\t\t\t\tpush,then;\n\t\t\t\t\tpush,%o;push,%o;\n\t\t\t\t\tcall,int(2);\n\t\t\t\t// comments work\n\t\t\t\t/*-2 +1 multiline too, (not split across lines yet)*/\n\t\t\tdrop;\n\t\t\tglobal;push,removeEventListener;push,click;this;\n\t\t\t\tcall,int(2);\n\t\t\tdrop\n\t\t\t", [function () { console.log('play success'); }, function (err) { console.log(err); }]);
                handler = new EventHandlerVMDispatch(instructions, this);
                globalThis.addEventListener('click', handler);
                is_in_ignored_from_src_fn = false;
                return [2 /*return*/];
            });
        });
    };
    AutoBuy.prototype.save_state_history_arr = function () {
        if (this.skip_save)
            return;
        localStorage.auto_buy_history_str = this.state_history_arr.join(",");
    };
    AutoBuy.prototype.get_timeout_arr_data = function (forced_action) {
        if (forced_action == "RESET")
            return this.timeout_arr.map(function (e) { return ~~(e / 4); }).join(",");
        return this.timeout_arr.join(",");
    };
    AutoBuy.prototype.save_timeout_arr = function () {
        var _a;
        var forced_action, action_count;
        var action_data = localStorage.auto_buy_forced_action;
        if (action_data)
            _a = action_data.split(","), forced_action = _a[0], action_count = _a[1];
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
        var _this = this;
        var css_display_style = "\n\t\t\t#state_log>div{width:max-content}\n\t\t\t#state_log{top:0px;width:30px;position:fixed;z-index:121;font-family:monospace;font-size:22px;color:lightgray}";
        function style_sheet_gen(instance, args) {
            instance.replace(args[0]);
        }
        this.display_style_sheet = new CSSStyleSheet;
        this.display_style_sheet.replace(css_display_style);
        // dom element init; init history_element
        this.history_element = document.createElement("div");
        this.history_element.innerText = "?3";
        // init timeout_element
        this.timeout_element = document.createElement("div");
        this.timeout_element.innerText = "0";
        // init hours_played_element
        this.hours_played_element = document.createElement("div");
        this.hours_played_element.innerText = "0.00000 hours";
        // init percent_ratio_element
        this.percent_ratio_element = document.createElement("div");
        this.percent_ratio_element.innerText = 0..toFixed(2) + "%";
        // init percent_ratio_change_element
        this.percent_ratio_change_element = document.createElement("div");
        this.percent_ratio_change_element.innerText = 0..toExponential(3);
        // init state_log_element
        this.state_log_element = document.createElement("div");
        this.state_log_element.id = "state_log";
        // dom element attach
        // attach history_element
        this.state_log_element.append(this.history_element);
        // attach timeout_element
        this.state_log_element.append(this.timeout_element);
        // attach hours_played_element
        this.state_log_element.append(this.hours_played_element);
        // attach percent_ratio_element
        this.state_log_element.append(this.percent_ratio_element);
        // attach percent_ratio_change_element
        this.state_log_element.append(this.percent_ratio_change_element);
        // attach state_log_element
        document.body.append(this.state_log_element);
        // attach display_style_sheet
        this.adopt_styles(this.display_style_sheet);
        var create_state_log_arr = [
            [0, 'get', 'body'],
            [1, 'create', 'div', 'state_log', { id: 'state_log' }], [1, 'append'],
        ];
        function retype_promise_helper(v) {
            return v.status === 'fulfilled';
        }
        function retype_promise_settled_results(v) {
            var out = [];
            for (var i = 0; i < v.length; i++) {
                var cur = v[i];
                if (retype_promise_helper(cur)) {
                    out.push(cur);
                }
            }
            return out;
        }
        var call_arg_arr = [];
        var make_css_arr = [
            __spreadArray([0, 'push', null, function () {
                    var styles_promise_arr = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        styles_promise_arr[_i] = arguments[_i];
                    }
                    return __awaiter(_this, void 0, void 0, function () {
                        var e, fulfilled, res, err;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.allSettled(styles_promise_arr)];
                                case 1:
                                    e = _a.sent();
                                    fulfilled = retype_promise_settled_results(e);
                                    res = fulfilled.map(function (e_2) { return e_2.value; });
                                    this.adopt_styles.apply(this, res);
                                    err = e.filter(function (e_3) { return e_3.status != 'fulfilled'; });
                                    if (err.length > 0)
                                        console.log.apply(console, __spreadArray(['promise failure...'], err, false));
                                    return [2 /*return*/];
                            }
                        });
                    });
                }], call_arg_arr, true),
            [0, 'new', CSSStyleSheet, [],
                function (obj, str) { return obj.replace(str); },
                [css_display_style]],
            [0, 'call', 2 + 1 + call_arg_arr.length],
            // drop the promise
            [0, 'drop'],
        ];
        var raw_dom_arr = __spreadArray(__spreadArray(__spreadArray([], create_state_log_arr, true), [
            [2, 'create', 'div', 'history', "?3"], [2, 'append'],
            [2, 'create', 'div', 'delay', "0"], [2, 'append'],
            [2, 'create', 'div', 'hours_played', "0.000 hours"], [2, 'append'],
            [2, 'create', 'div', 'ratio', 0..toFixed(2) + "%"], [2, 'append'],
            [2, 'create', 'div', 'ratio_change', 0..toExponential(3)], [2, 'append'],
            [1, 'drop'],
            [0, 'drop']
        ], false), make_css_arr, true);
        try {
            raw_dom_arr = __spreadArray(__spreadArray(__spreadArray([], create_state_log_arr, true), [
                [0, 'drop']
            ], false), make_css_arr, true);
            this.build_dom_from_desc(raw_dom_arr, this.dom_map);
        }
        catch (e) {
            console.log(e);
        }
        ;
    };
    AutoBuy.prototype.adopt_styles = function () {
        var styles = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            styles[_i] = arguments[_i];
        }
        var dom_styles = document.adoptedStyleSheets;
        document.adoptedStyleSheets = __spreadArray(__spreadArray([], dom_styles, true), styles, true);
    };
    AutoBuy.prototype.build_dom_from_desc = function (raw_arr, trg_map, dry_run) {
        if (trg_map === void 0) { trg_map = new Map; }
        if (dry_run === void 0) { dry_run = false; }
        var stack = [];
        var map = trg_map;
        if (dry_run)
            stack.push([0, "enable_dry_mode"]);
        for (var i = 0; i < raw_arr.length; i++) {
            var cur_item = raw_arr[i];
            var depth = cur_item[0], action = cur_item[1], args = cur_item.slice(2);
            switch (action) {
                case 'get':
                    {
                        var cur_element = void 0, query_arg = args[0];
                        switch (query_arg) {
                            case 'body':
                                cur_element = document.body;
                                break;
                            default:
                                cur_element = document.querySelector(query_arg);
                                break;
                        }
                        stack.push([depth, "push", new DomValueBox('get', cur_element)]);
                    }
                    break;
                case 'new':
                    {
                        var _class = args[0], construct_arg_arr = args[1], callback = args[2], arg_arr = args[3];
                        stack.push(__spreadArray(__spreadArray([depth, "push", null, callback], construct_arg_arr, true), [_class], false));
                        stack.push([depth, "construct", 1 + construct_arg_arr.length]);
                        stack.push(__spreadArray([depth, "push"], arg_arr, true));
                        stack.push([depth, "call", 3 + arg_arr.length]);
                    }
                    break;
                case 'create':
                    {
                        var element_type = args[0], name_1 = args[1], content = args[2];
                        var cur_element = document.createElement(element_type);
                        if (typeof content == 'string') {
                            cur_element.innerText = content;
                        }
                        else if (typeof content == 'object') {
                            if (content.id)
                                cur_element.id = content.id;
                        }
                        else {
                            console.log('bad typeof == %s for content in build_dom; content=%o', typeof content, content);
                            console.info("Info: case 'create' args are", element_type, name_1);
                        }
                        map.set(name_1, cur_element);
                        stack.push([depth, "push", new DomValueBox('create', cur_element)]);
                    }
                    break;
                case 'append':
                    {
                        // peek at the return stack, up 1 depth
                        stack.push([depth, "peek", depth - 1, 0]);
                        stack.push(cur_item);
                    }
                    break;
                case 'drop':
                case 'call': // push the item
                case 'push':
                    stack.push(cur_item);
                    break;
                default:
                    {
                        console.log('might need to handle', action);
                        debugger;
                    }
                    break;
            }
            if (this.debug_arr.includes('build_dom_from_desc'))
                console.log('es', stack.at(-1));
        }
        var _a = this.parse_dom_desc(stack), left_stack = _a[0], tree = _a[1];
        if (left_stack.length > 0) {
            console.assert(false, 'failed to parse everything (parse tree probably has errors)');
        }
        this.apply_dom_desc(tree);
    };
    AutoBuy.prototype.parse_dom_desc = function (input_stack) {
        var stack = [];
        var tree = [];
        for (var x = 0, i = 0; i < input_stack.length; i++) {
            var cur_stack = input_stack[i];
            var y = cur_stack[0], item = cur_stack.slice(1);
            if (this.debug_arr.includes('parse_dom_desc'))
                console.log(item);
            while (y > x) {
                stack.push(tree);
                tree = [];
                x++;
            }
            while (y < x) {
                var prev = tree;
                tree = stack.pop();
                tree.push([x, prev]);
                x--;
            }
            tree.push([y, item]);
        }
        return [stack, tree];
    };
    AutoBuy.prototype.log_if = function (tag) {
        var log_args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            log_args[_i - 1] = arguments[_i];
        }
        if (this.debug_arr.includes(tag)) {
            console.log.apply(console, log_args);
        }
    };
    AutoBuy.prototype.get_logging_level = function (tag, level) {
        if (level === void 0) { level = LOG_LEVEL_VERBOSE; }
        if (this.debug_arr.includes(tag)) {
            return level - 1;
        }
        return level;
    };
    /* 		get [next_debug_id()](){
        return 'apply_dom_desc';
    } */
    AutoBuy.prototype.apply_dom_desc = function (tree) {
        this.run_dom_desc(tree);
    };
    AutoBuy.prototype.run_dom_desc = function (tree, stack, cur_depth, items, depths) {
        if (stack === void 0) { stack = []; }
        if (cur_depth === void 0) { cur_depth = 0; }
        if (items === void 0) { items = []; }
        if (depths === void 0) { depths = []; }
        for (var i = 0; i < tree.length; i++) {
            var cur = tree[i];
            switch (cur[0] - cur_depth) {
                case 1:
                    {
                        this.log_if('apply_dom_desc', 'rdc stk');
                        stack.push(['children', items.length - 1, cur]);
                    }
                    break;
                case 0:
                    {
                        items.push(cur[1]);
                        depths.push(cur[0]);
                    }
                    break;
                default: {
                    console.assert(false, 'handle depth change in apply_dom_desc');
                    this.log_if('apply_dom_desc', cur[0] - cur_depth);
                }
            }
        }
        if (stack.length === 0)
            return [items, depths];
        var _a = stack.pop(), tag = _a[0], items_index = _a[1], _b = _a[2], data_depth = _b[0], data = _b[1];
        var log_level = this.get_logging_level('apply_dom_desc');
        l_log_if(log_level, tag, items[items_index], data_depth, data);
        var deep_res = this.run_dom_desc(data, stack, cur_depth + 1);
        var ret_items = items.slice();
        var off = 1;
        ret_items.splice(items_index + off++, 0, ['exec', deep_res[0]]);
        this.log_if('apply_dom_desc', deep_res[0], deep_res[1]);
        this.log_if('apply_dom_desc', ret_items, depths, stack);
        var builder_vm = new DomBuilderVM(ret_items);
        builder_vm.run();
        return [ret_items, depths];
    };
    AutoBuy.prototype.init_dom = function () {
        var _a, _b;
        var font_size_px = 22;
        var t = this;
        // general init
        this.state_history_arr_max_len = Math.floor(document.body.getClientRects()[0].width / (font_size_px * 0.55) / 2.1);
        // dom element init; init history_element
        (_a = this.history_element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', new EventHandlerDispatch(this, this.history_element_click_handler));
        // init timeout_element
        if (this.timeout_element)
            this.timeout_element.innerText = this.timeout_arr[0];
        // init hours_played_element; init percent_ratio_element
        (_b = this.percent_ratio_element) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
            t.state.reset();
        });
        // init percent_ratio_change_element; init state_log_element
        if (this.state_log_element)
            this.state_log_element.style.fontSize = font_size_px + "px";
        // event listeners; window unload
        window.addEventListener('unload', function () {
            t.save_state_history_arr();
            t.save_timeout_arr();
        });
    };
    AutoBuy.prototype.global_init = function () {
        var cur_this = this;
        if (window.g_auto_buy && window.g_auto_buy !== cur_this) {
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
                    {
                        clearTimeout(cint_item[1]);
                    }
                    break;
                case 2:
                    {
                        clearInterval(cint_item[1]);
                    }
                    break;
                default:
                    {
                        console.assert(false, 'cant destroy cint item (%o)', cint_item);
                    }
                    break;
            }
        }
    };
    AutoBuy.prototype.update_dom = function () {
        if (!this.hours_played_element)
            return;
        if (!this.percent_ratio_element)
            return;
        if (!this.percent_ratio_change_element)
            return;
        if (!this.history_element)
            return;
        if (!this.state_history_arr_max_len)
            return;
        // spell:words timeplayed
        this.hours_played_element.innerText = ((window.timeplayed / 30) / 60).toFixed(7) + " hours";
        var last_ratio = this.state.ratio * 100;
        this.state.update();
        var cur_ratio = this.state.ratio * 100;
        this.percent_ratio_element.innerText = cur_ratio.toFixed(2) + "%";
        var ratio_diff = cur_ratio - last_ratio;
        var extra_diff_char = "+";
        if (ratio_diff < 0)
            extra_diff_char = '';
        this.percent_ratio_change_element.innerText = extra_diff_char + ratio_diff.toExponential(3);
        this.history_element.innerText = array_sample_end(this.state_history_arr, this.state_history_arr_max_len).join(" ");
        this.next_timeout(this.update_dom, 125, 'update_dom', true);
    };
    AutoBuy.prototype.init = function () {
        this.next_timeout(this.init_impl, 210 - 10, 'init', true);
    };
    AutoBuy.prototype.dom_reset = function () {
        this.update_dom();
    };
    AutoBuy.prototype.replace_timeplayed_timer = function () {
        //spell:words secondinterval
        clearInterval(window.secondinterval);
        var rate = 66 / (2110 - 110);
        var time_base = performance.now();
        window.secondinterval = setInterval(function () {
            var real_time = performance.now();
            var time_diff = real_time - time_base;
            time_base = real_time;
            var real_rate = time_diff / (2300 - 300);
            window.timeplayed += real_rate;
        }, 66);
        this.root_node.append_raw(setInterval(function () {
            window.doc.title = window.rounding(window.totalAtome, false, 1).toString() + " atoms";
            var atomsaccu = window.doc.getElementById('atomsaccu');
            var timeplayed_e = window.doc.getElementById('timeplayed');
            var presnbr_e = window.doc.getElementById('timeplayed');
            if (!atomsaccu)
                return;
            if (!timeplayed_e)
                return;
            if (!presnbr_e)
                return;
            //spell:words atomsaccu presnbr
            atomsaccu.innerHTML = window.rounding(window.atomsaccu, false, 0);
            timeplayed_e.innerHTML = (Math.round(window.timeplayed / 30) / 60).toFixed(2) + " hours";
            presnbr_e.innerHTML = "<br>" + (window.calcPres() * 100).toFixed(0) + " % APS boost";
        }, (230 - 300)), false);
    };
    AutoBuy.prototype.init_impl = function () {
        var t = this;
        this.global_init();
        this.init_dom();
        this.state.init();
        this.update_dom();
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
    AutoBuy.prototype.state_history_append = function (value, silent) {
        if (silent === void 0) { silent = false; }
        Promise.resolve().then(this.async_compress.bind(this));
        this.epoch_len++;
        if (silent)
            return;
        var last = this.state_history_arr.at(-1);
        this.state_history_arr.push(value);
        if (this.state.debug)
            console.log('history append', last, value);
        while (this.state_history_arr.length > 120)
            this.state_history_arr.shift();
    };
    AutoBuy.prototype.history_element_click_handler = function (event) {
        this.root_node.destroy();
        this.dom_reset();
        this.reset();
    };
    AutoBuy.prototype.reset = function () {
        var timeout = 3000;
        if (this.extra < timeout)
            timeout = this.extra;
        this.next_timeout(this.main, timeout, '@');
    };
    AutoBuy.prototype.calc_timeout_extra = function () {
        var _a;
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
        var num = max / val;
        (_a = this.last_value) !== null && _a !== void 0 ? _a : (this.last_value = num);
        var diff = this.last_value - num;
        if (diff > .1 || diff < -.1) {
            this.last_value = num;
            console.log('timeout_arr num', num, 'differing from last by', diff);
        }
        return this.round(val);
    };
    AutoBuy.prototype.is_epoch_over = function () {
        var epoch_diff = Date.now() - this.epoch_start_time;
        return epoch_diff > 60 * 5 * 1000;
    };
    AutoBuy.prototype.main = function () {
        function r(v) {
            return ~~v;
        }
        var loss_rate = this.unit_promote_start();
        if (loss_rate > 0 || loss_rate < 0) {
            console.log('loss', r(loss_rate * 100 * 10) / 10);
        }
        if (this.maybe_run_reset())
            return;
        if (this.pre_total != window.totalAtome)
            return this.step_iter_start();
        this.iter_count = 0;
        if (Math.random() < 0.005)
            return this.rare_begin();
        this.faster_timeout();
    };
    AutoBuy.prototype.maybe_async_reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loss_rate;
            return __generator(this, function (_a) {
                loss_rate = this.unit_promote_start();
                if (this.maybe_run_reset())
                    return [2 /*return*/, [true, loss_rate]];
                return [2 /*return*/, [false, loss_rate]];
            });
        });
    };
    AutoBuy.prototype.main_async = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, quit, loss_rate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.iter_count = 0;
                        _b.label = 1;
                    case 1:
                        if (!(this.iter_count < 6)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.normal_decrease_async()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.large_decrease_async()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [4 /*yield*/, this.maybe_async_reset()];
                    case 6:
                        _a = _b.sent(), quit = _a[0], loss_rate = _a[1];
                        if (quit)
                            return [2 /*return*/];
                        if (loss_rate > 0.08)
                            return [3 /*break*/, 7];
                        if (this.pre_total == window.totalAtome)
                            return [3 /*break*/, 8];
                        _b.label = 7;
                    case 7: return [3 /*break*/, 1];
                    case 8:
                        if (Math.random() < 0.005)
                            this.rare_begin();
                        else
                            this.faster_timeout_use_async();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutoBuy.prototype.large_decrease_async = function () {
        throw new Error("Method not implemented.");
    };
    AutoBuy.prototype.normal_decrease_async = function () {
        throw new Error("Method not implemented.");
    };
    AutoBuy.prototype.step_iter_start = function () {
        if (this.iter_count > 6)
            return this.large_decrease();
        else
            return this.normal_decrease();
    };
    AutoBuy.prototype.fast_unit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var running, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        running = true;
                        _a.label = 1;
                    case 1:
                        if (!running) return [3 /*break*/, 3];
                        this.unit_promote_start();
                        if (this.pre_total == window.totalAtome)
                            return [3 /*break*/, 3];
                        promise = this.async_timeout_step();
                        return [4 /*yield*/, promise];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        this.async_timeout_step_finish();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutoBuy.prototype.async_timeout_step = function () {
        throw new Error("Method not implemented.");
    };
    AutoBuy.prototype.unit_promote_start = function () {
        this.extra = this.calc_timeout_extra();
        this.pre_total = window.totalAtome;
        this.do_unit_promote();
        var money_diff = this.pre_total - window.totalAtome;
        var loss_rate = money_diff / this.pre_total;
        if (this.pre_total != window.totalAtome && this.debug) {
            var log_args = [];
            var percent_change = (loss_rate * 100).toFixed(5);
            var money_str = window.totalAtome.toExponential(3);
            log_args.push(this.iter_count);
            log_args.push(percent_change);
            log_args.push(money_str);
            console.log.apply(console, log_args);
        }
        this.iter_count += 1;
        return loss_rate;
    };
    AutoBuy.prototype.async_next_timeout_step = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.do_timeout_dec([1.006], 10);
                return [2 /*return*/, this.next_timeout_async(this.extra, ':')];
            });
        });
    };
    AutoBuy.prototype.async_timeout_step_finish = function () {
        this.do_timeout_dec([1.006], 10);
        this.next_timeout(this.main, this.extra, '$');
    };
    AutoBuy.prototype.large_decrease = function () {
        this.do_timeout_dec([1.008], 10);
        this.next_timeout(this.main, this.extra, '!');
    };
    AutoBuy.prototype.normal_decrease = function () {
        this.do_timeout_dec([1.006], 10);
        this.next_timeout(this.main, this.extra, '-');
    };
    AutoBuy.prototype.rare_begin = function () {
        this.do_timeout_inc([1.008, 1.03], 10);
        this.next_timeout(this.initial_special, this.extra, '<');
    };
    AutoBuy.prototype.faster_timeout_use_async = function () {
        this.do_timeout_inc([1.007, 1.01], 50);
        this.next_timeout(this.main_async, this.extra, 'A');
    };
    AutoBuy.prototype.faster_timeout = function () {
        this.do_timeout_inc([1.007, 1.01], 50);
        this.next_timeout(this.main, this.extra, '+');
    };
    AutoBuy.prototype.get_timeout_change = function (pow_base, pow_num, div) {
        var pow_res = Math.pow(pow_base, pow_num);
        var res = this.extra * pow_res;
        return res / div;
    };
    AutoBuy.prototype.update_timeout_inc = function (change) {
        if (window.__testing__) {
            return;
        }
        var value = this.round(this.extra + change);
        this.timeout_arr.push(value);
    };
    AutoBuy.prototype.update_timeout_dec = function (change) {
        if (window.__testing__) {
            return;
        }
        var value = this.round(this.extra - change);
        if (value < 25)
            value = 25;
        this.timeout_arr.push(value);
    };
    AutoBuy.prototype.round = function (value) {
        return ~~value;
    };
    AutoBuy.prototype.do_timeout_dec = function (pow_terms, div) {
        var change = this.get_timeout_change(pow_terms[0], Math.log(window.totalAtome), div);
        this.update_timeout_dec(change);
    };
    AutoBuy.prototype.do_timeout_inc = function (pow_terms, div) {
        var iter_term = Math.pow(pow_terms[1], this.iter_count);
        var change = this.get_timeout_change(pow_terms[0], Math.log(window.totalAtome), div);
        this.update_timeout_inc(change * iter_term);
    };
    AutoBuy.prototype.next_timeout_async = function (timeout, char, silent) {
        if (silent === void 0) { silent = false; }
        return __awaiter(this, void 0, void 0, function () {
            var node, att, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!silent && this.timeout_element)
                            this.timeout_element.innerText = timeout.toString();
                        this.state_history_append(char, silent);
                        node = new AsyncTimeoutNode(timeout);
                        this.root_node.append_child(node);
                        att = new AsyncTimeoutTarget(char);
                        promise = node.start_async(att);
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutoBuy.prototype.next_timeout = function (trg_fn, timeout, char, silent) {
        if (silent === void 0) { silent = false; }
        var node = new AsyncTimeoutNode(timeout);
        this.root_node.append_child(node);
        node.start(new TimeoutTarget(this, trg_fn, char));
        if (!silent && this.timeout_element)
            this.timeout_element.innerText = timeout.toString();
        this.state_history_append(char, silent);
    };
    AutoBuy.prototype.do_unit_promote = function () {
        do_auto_unit_promote();
    };
    AutoBuy.prototype.slow_final = function () {
        this.next_timeout(this.main, this.extra, '$');
    };
    AutoBuy.prototype.bonus = function () {
        window.bonusAll();
        this.fast_unit();
    };
    AutoBuy.prototype.special_timeout = function () {
        this.next_timeout(this.special, this.extra, '^');
    };
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
    AutoBuy.prototype.special = function () {
        if (this.do_special())
            this.next_timeout(this.special, this.extra, '^');
        else
            this.next_timeout(this.bonus, this.extra, '#');
    };
    AutoBuy.prototype.initial_special = function () {
        this.next_timeout(this.special, this.extra, '>');
    };
    AutoBuy.prototype.maybe_run_reset = function () {
        var count = 0;
        count += (this.extra > 15 * 1000);
        count += this.state.ratio > 1;
        count += this.is_epoch_over();
        switch (count) {
            case 0:
            case 1: break;
            default: console.log('mrc', count);
        }
        if (this.state.ratio > 1 && this.is_epoch_over() || this.extra > 15 * 1000) {
            this.next_timeout(this.reset_timeout_trigger, 5 * 1000, 'reset_timeout_begin');
            return true;
        }
        return false;
    };
    AutoBuy.prototype.reset_timeout_init = function () {
        if (this.background_audio) {
            this.background_audio.muted = !this.background_audio.muted;
        }
        this.next_timeout(this.reset_timeout_trigger, 60 * 2 * 1000, 'reset_timeout');
    };
    AutoBuy.prototype.reset_timeout_trigger = function () {
        if (this.background_audio) {
            this.background_audio.muted = !this.background_audio.muted;
        }
        this.next_timeout(this.reset_timeout_start, 60 * 2 * 1000, 'reset_timeout');
    };
    AutoBuy.prototype.reset_timeout_start = function () {
        this.next_timeout(this.reset_timeout_run, 60 * 1000, 'reset_timeout');
    };
    AutoBuy.prototype.reset_timeout_run = function () {
        window.lightreset();
    };
    return AutoBuy;
}());
function do_auto_unit_promote() {
    var arUnit = window.arUnit;
    var Get_Unit_Type = window.Get_Unit_Type;
    var getUnitPromoCost = window.getUnitPromoCost;
    var Find_ToNext = window.Find_ToNext;
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
                if (window.totalAtome >= cost) {
                    tmp = tmp + (tmp * arUnit[k][3]) / 100;
                    var tar = (arUnit[k][4] * 1) + i;
                    var a = window._targets.indexOf(tar);
                    var reduction = 1;
                    if (a > -1 && tar <= 1000) {
                        var b = true;
                        for (var k2 in type[2]) {
                            var v2 = type[2][k2];
                            if (v2 != k && arUnit[v2][4] < tar) {
                                b = false;
                            }
                        }
                        if (b) {
                            var c = window._targets_achi.indexOf(window.totalAchi() + 1);
                            if (c > -1) {
                                reduction *= (1 - ((c + 1) * 0.01));
                            }
                            reduction *= 1 - ((a + 1) * 0.01);
                        }
                    }
                    tmp *= reduction;
                    cost += tmp;
                }
                else {
                    break;
                }
                if (i == next || (maxed[k] && i == 100)) {
                    afford = true;
                }
            }
            if (afford) {
                out[k] = true;
            }
            else {
                out[k] = false;
            }
        }
    }
    var res = out.lastIndexOf(true);
    if (res < 0)
        return;
    if (maxed[res]) {
        for (var y = 0; y < 100; y++) {
            window.mainCalc(res);
        }
    }
    else {
        window.tonext(res);
    }
}
var auto_buy_obj = new AutoBuy;
var AsyncTrigger = /** @class */ (function () {
    function AsyncTrigger() {
        this.notify_promise = null;
        this.m_set_flag = true;
        this.trigger_handler = null;
        this.m_can_notify = false;
        this.m_notify_result = null;
        this.m_notify_error = null;
        var accept_fn = null;
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
    AsyncTrigger.prototype.default_accept = function (value) {
        return value;
    };
    AsyncTrigger.prototype.default_reject = function (error) {
        throw error;
    };
    AsyncTrigger.prototype.set = function (cnt) {
        if (!this.m_set_flag && this.m_set_result) {
            this.m_set_result(cnt);
            this.m_set_flag = true;
        }
    };
    AsyncTrigger.prototype.set_error = function (opt_error) {
        if (!this.m_set_flag && this.m_set_error) {
            if (opt_error)
                this.m_set_error(opt_error);
            else
                this.m_set_error(null);
        }
    };
    AsyncTrigger.prototype.wait = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                ret = this.promise_set;
                return [2 /*return*/, ret];
            });
        });
    };
    AsyncTrigger.prototype.notify = function (cnt) {
        if (this.m_can_notify && this.m_notify_result) {
            this.m_notify_result(cnt);
            this.m_can_notify = false;
        }
    };
    AsyncTrigger.prototype.notify_error = function (error) {
        if (this.m_can_notify && this.m_notify_error) {
            this.m_notify_error(error);
            this.m_can_notify = false;
        }
    };
    AsyncTrigger.prototype.notified = function () {
        return __awaiter(this, void 0, void 0, function () {
            var t;
            return __generator(this, function (_a) {
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
export { AsyncTrigger };
function map_to_tuple(e, i) {
    return [e, this[i]];
}
function to_tuple_arr(keys, values) {
    return keys.map(map_to_tuple, values);
}
function promise_set_timeout(timeout, a) {
    setTimeout(a, timeout);
}
function do_async_wait(timeout) {
    return new Promise(promise_set_timeout.bind(null, timeout));
}
void do_async_wait;
function array_sample_end(arr, rem_target_len) {
    arr = arr.slice(-300);
    var rem_len = char_len_of(arr);
    while (rem_len > rem_target_len) {
        var cur = arr.shift();
        if (!cur)
            break;
        rem_len -= cur.length + 1;
    }
    return arr;
}
function char_len_of(arr) {
    return arr.reduce(function (a, b) { return a + b.length; }, 0) + arr.length;
}
function lightreset_inject() {
    window.g_auto_buy.state_history_clear_for_reset();
    window.g_auto_buy.skip_save = true;
    window.addEventListener('unload', function () {
        window.g_auto_buy.skip_save = false;
        localStorage.auto_buy_timeout_str = "300,300,300,300";
        localStorage.long_wait = (6000 * 2);
    });
    var original = window.g_auto_buy.original_map.get('lightreset');
    if (original)
        original();
}
function specialclick_inject(that) {
    if (window.allspec[that].done == undefined)
        window.allspec[that].done = false;
    if (window.allspec[that].cost <= window.totalAtome && window.allspec[that].done == false) {
        var specialsbought_e = window.doc.getElementById('specialsbought');
        var atomsinvest_e = window.doc.getElementById('atomsinvest');
        if (!specialsbought_e || !atomsinvest_e)
            throw new Error("Invalid");
        specialsbought_e.innerText = window.rounding(++window.specialsbought, false, 0);
        if (that == 74) {
        }
        window.atomsinvest += window.allspec[that].cost;
        atomsinvest_e.innerText = window.rounding(window.atomsinvest, false, 0);
        window.allspec[that].done = true;
        window.totalAtome -= window.allspec[that].cost;
        var diff1 = window.calcDiff(that);
        for (var a in window.arUnit[that][17])
            window.arUnit[that][17][a] *= 100;
        window.arUnit[that][5] *= 100;
        var spec_aps = 0;
        if (window.arUnit[that][4] > 0) {
            spec_aps = (window.calcDiff(that) - diff1);
            window.atomepersecond += spec_aps;
        }
        //spell:ignore noti plurials
        if (window.noti)
            window.gritter('Power-up !', window.toTitleCase(window.plurials(window.arrayNames[that])) + " X100 APS", null, "+" + window.rounding(spec_aps, false, 0) + " APS", "");
        //spell:ignore updateprogress
        window.updateprogress(that);
        $('#spec' + that).remove();
        (that < 74) ? window.seeUnit(that + 1) : window.seeUnit(that - 1);
        window.seeUnit(that);
        //spell:ignore checkspec
        window.checkspec();
        //spell:ignore achiSpec
        window.achiSpec();
    }
}
var ProxyHandlers = /** @class */ (function () {
    function ProxyHandlers(root) {
        this.weak_root = new WeakRef(root);
        this.count_arr = [0];
    }
    ProxyHandlers.prototype.so_init = function () {
        var val = Array(12).fill(function (idx) {
            if (idx > window.da.length)
                return window.da.at(-1)(idx - 1);
            return window.da[idx - 1](idx - 1);
        });
        window.da = __spreadArray([function () { return window.g_proxy_state.hand.stack_overflow_check(); }], val, true);
    };
    ProxyHandlers.prototype.stack_overflow_check = function () {
        window.g_proxy_state.hand.count_arr[0]++;
        if (window.g_proxy_state.hand.count_arr[0] < window.g_proxy_state.hand.count_arr[1]) {
            return window.g_proxy_state.hand.stack_overflow_check();
        }
        return window.g_proxy_state.hand.count_arr[0];
    };
    ProxyHandlers.prototype.generic = function (type, call_args, from) {
        var keep_vec = this.weak_root.deref();
        if (keep_vec === null) {
            console.log('ProxyHandlers reset KeepSome after gc collect');
            keep_vec = new KeepSome;
            this.weak_root = new WeakRef(keep_vec);
        }
        if (keep_vec)
            keep_vec.push(from.concat([null, type, 1, call_args]));
    };
    ProxyHandlers.prototype.set_ = function (call_args, from) {
        this.generic('set', call_args, from);
        return Reflect.set.apply(Reflect, call_args);
    };
    ProxyHandlers.prototype.get_ = function (call_args, from) {
        this.generic('get', call_args, from);
        return Reflect.get.apply(Reflect, call_args);
    };
    ProxyHandlers.prototype.apply_ = function (call_args, from) {
        this.generic('apply', call_args, from);
        return Reflect.apply.apply(Reflect, call_args);
    };
    ProxyHandlers.prototype.defineProperty_ = function (call_args, from) {
        this.generic('defineProperty', call_args, from);
        return Reflect.defineProperty.apply(Reflect, call_args);
    };
    ProxyHandlers.prototype.getOwnPropertyDescriptor_ = function (call_args, from) {
        this.generic('getOwnPropertyDescriptor', call_args, from);
        return Reflect.getOwnPropertyDescriptor.apply(Reflect, call_args);
    };
    return ProxyHandlers;
}());
void ProxyHandlers;
var KeepSome = /** @class */ (function () {
    function KeepSome() {
        this.array = [];
    }
    KeepSome.prototype.push = function (value) {
        var set_index = 0;
        var ret = this.push_at(set_index, value);
        while (this.array[set_index].length > 50) {
            var sr = this.array[set_index].shift();
            if (!sr)
                throw new Error("This should not happen (popped from an array with length > 50)");
            value = sr;
            if (Math.random() > 0.9) {
                set_index++;
                this.push_at(set_index, value);
                console.log('psp', 1);
                var off = 0;
                while (this.array[set_index - off].length < 25) {
                    var val = this.array[set_index - off - 1].shift();
                    if (!val)
                        break;
                    this.array[set_index - off].push(val);
                }
                off++;
                if (set_index - off < 0)
                    continue;
                console.log('psp', 2);
                while (this.array[set_index - off].length < 40) {
                    var val = this.array[set_index - off - 1].shift();
                    if (!val)
                        break;
                    this.array[set_index - off].push(val);
                }
                off++;
                if (set_index - off < 0)
                    continue;
                console.log('psp', 3);
                while (this.array[set_index - off].length < 40) {
                    var val = this.array[set_index - off - 1].shift();
                    if (!val)
                        break;
                    this.array[set_index - off].push(val);
                }
                off++;
                if (set_index - off < 0)
                    continue;
                console.log('psp', 4);
                while (this.array[set_index - off].length < 40) {
                    var val = this.array[set_index - off - 1].shift();
                    if (!val)
                        break;
                    this.array[set_index - off].push(val);
                }
            }
            if (this.array[set_index].length <= 50 && set_index > 0) {
                set_index--;
            }
        }
        return ret;
    };
    KeepSome.prototype.push_at = function (index, value) {
        while (index >= this.array.length) {
            this.array.push([]);
        }
        this.array[index].push(value);
    };
    KeepSome.prototype.push_va = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        for (var _a = 0, a_1 = a; _a < a_1.length; _a++) {
            var x = a_1[_a];
            this.push(x);
        }
    };
    return KeepSome;
}());
function reload_if_def(obj, key) {
    if (obj[key]) {
        location.reload();
        document.body.innerHTML = "";
        document.head.innerHTML = "";
        document.documentElement.innerHTML = "";
        return true;
    }
    return false;
}
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
    var jq = window.$;
    if (!jq)
        return;
    var res = jq('head');
    var r_proto = Object.getPrototypeOf(res);
    r_proto.lazyload = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
    };
    return jq;
}
void reload_if_def;
function proxy_jquery() {
    var val = use_jquery();
    Object.defineProperty(window, '$', {
        get: function () {
            return val;
        },
        set: function (value) {
            val = value;
            got_jquery(value);
            return true;
        },
        enumerable: true,
        configurable: true
    });
}
function pace_finish_proxy_apply(func, this_v, args) {
    auto_buy_obj.init();
    window.Pace.bar.finish = func;
    return Reflect.apply(func, this_v, args);
}
function on_game_data_set() {
    remove_bad_dom_script_element();
    auto_buy_obj.pre_init();
    if (window.Pace.bar.progress == 100) {
        auto_buy_obj.init();
        return;
    }
    window.Pace.bar.finish = new Proxy(window.Pace.bar.finish, {
        apply: pace_finish_proxy_apply
    });
}
function remove_cint_item(cint_arr, cint_item) {
    var idx = cint_arr.indexOf(cint_item);
    cint_arr.splice(idx, 1);
}
function wait_for_game_data(cint_item) {
    if (cint_item === void 0) { cint_item = null; }
    if (cint_item) {
        remove_cint_item(cint_arr, cint_item);
    }
    if (window._SM_Data) {
        on_game_data_set();
    }
    else {
        var cint_item_1 = [0, -1];
        var cint = setTimeout(wait_for_game_data, 0, cint_item_1);
        cint_item_1[1] = cint;
        cint_arr.push(cint_item_1.join(","));
    }
}
function on_timers_moved(timers) {
    if (window._SM_Data) {
        on_game_data_set();
    }
    else {
        wait_for_game_data();
    }
    remove_bad_dom_script_element();
}
function dom_add_elm_filter(elm) {
    if (elm && elm.nodeName === "SCRIPT") {
        if (!elm.src) {
            console.log(elm);
            return true;
        }
        if (elm.src && new URL(elm.src).origin === location.origin) {
            remove_bad_dom_script_element();
            return true;
        }
        return false;
    }
    return true;
}
function main() {
    var enable_proxy = true;
    window.cint_arr = cint_arr;
    if (enable_proxy) {
        proxy_jquery();
    }
    var adsbygoogle = window.adsbygoogle;
    var new_arr = [];
    window.adsbygoogle = new_arr;
    adsbygoogle.op = adsbygoogle.push;
    adsbygoogle.push = function (e) {
        adsbygoogle.op(e);
        remove_bad_dom_script_element();
    };
    var prev_node_prototype_insertBefore = Node.prototype.insertBefore;
    document.addEventListener('onContentLoaded', remove_bad_dom_script_element);
    Node.prototype.insertBefore = function (node, child) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        console.assert(rest.length === 0, "unexpected arguments for overwritten Node.prototype.insertBefore");
        var should_insert_1, should_insert_2;
        if (node instanceof HTMLScriptElement) {
            should_insert_1 = dom_add_elm_filter(node);
        }
        if (child instanceof HTMLScriptElement) {
            should_insert_2 = dom_add_elm_filter(child);
        }
        if (!should_insert_1 || !should_insert_2)
            return node;
        return prev_node_prototype_insertBefore.call(this, node, child);
    };
    remove_bad_dom_script_element();
    window.on_on_timers_moved_first = true;
    var move_timers_to_worker = new Promise(move_timers_to_worker_promise_executor);
    move_timers_to_worker.then(on_timers_moved);
    setTimeout(remove_bad_dom_script_element, 0);
    window.document_write_list = new DocumentWriteList;
    window.document_write_list.attach_proxy(document);
    document.stop = function () { };
}
main();
ScriptStateHost.event_target.dispatchEvent({ type: 'userscript', state: 'done' });
