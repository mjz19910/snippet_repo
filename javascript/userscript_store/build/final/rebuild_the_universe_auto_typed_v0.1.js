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
import { ArrayBox } from "../types/vm/ArrayBox";
import { WindowBox } from "../types/vm/WindowBox";
import { GlobalThisBox } from "../types/vm/GlobalThisBox";
import { IStackVMBox } from "../types/vm/IStackVMBox";
import { IndexedObject } from "../types/vm/IndexedObject";
import { IndexedFnBox } from "../types/vm/IndexedFunctionBox";
import { InstructionTypeArrayBox } from "../types/vm/InstructionTypeArrayBox";
function fire_timer(timer, remote_id) {
    timer.fire(remote_id);
}
var RemoteTimer = /** @class */ (function () {
    function RemoteTimer(api_info) {
        this.m_remote_to_local_timer_state_map = new Map;
        this.m_api_info = api_info;
        this.base_id = globalThis[this.m_api_info.set_single](timer_nop);
        globalThis[this.m_api_info.clear_single](this.base_id);
    }
    RemoteTimer.prototype.fire = function (remote_id) {
        var local_state = this.m_remote_to_local_timer_state_map.get(remote_id);
        if (!local_state)
            return;
        this.verify_timer_state(local_state, remote_id);
        if (!local_state.active) {
            debugger;
            console.log('fire inactive', remote_id, local_state);
            return;
        }
        ;
        if (local_state.type === TIMER_SINGLE) {
            postMessage({
                t: this.m_api_info.fire_single_msg_id,
                v: remote_id
            });
            this.m_remote_to_local_timer_state_map["delete"](remote_id);
        }
        else if (local_state.type === TIMER_REPEATING) {
            postMessage({
                t: this.m_api_info.fire_repeating_msg_id,
                v: remote_id
            });
        }
    };
    RemoteTimer.prototype.set = function (type_tag, remote_id, delay) {
        this.verify_timer_type_tag(type_tag);
        var local_id = -1;
        if (type_tag === TIMER_SINGLE) {
            local_id = globalThis[this.m_api_info.set_single](fire_timer, delay, this, remote_id);
        }
        if (type_tag === TIMER_REPEATING) {
            local_id = globalThis[this.m_api_info.set_repeating](fire_timer, delay, this, remote_id);
        }
        this.m_remote_to_local_timer_state_map.set(remote_id, {
            active: true,
            id: local_id,
            type: type_tag
        });
        return local_id;
    };
    RemoteTimer.prototype.verify_timer_type_tag = function (type_tag) {
        if (!this.validate_timer_type_tag(type_tag)) {
            throw new Error("type_tag verification failed on remote_worker");
        }
    };
    RemoteTimer.prototype.verify_timer_state = function (local_state, remote_id) {
        if (!this.validate_timer_state(local_state)) {
            console.info("Removed invalid local_state");
            globalThis[this.m_api_info.clear_single](local_state.id);
            globalThis[this.m_api_info.clear_repeating](local_state.id);
            this.m_remote_to_local_timer_state_map["delete"](remote_id);
            throw new Error("type_tag verification failed on remote_worker");
        }
    };
    RemoteTimer.prototype.validate_timer_type_tag = function (type_tag) {
        if (type_tag < TIMER_SINGLE || type_tag >= TIMER_TAG_COUNT) {
            console.assert(false, "Assertion failed in RemoteTimer.validate_timer_type_tag: type_tag=%o is out of range");
            console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", type_tag, TIMER_SINGLE, TIMER_TAG_COUNT);
            return false;
        }
        return true;
    };
    RemoteTimer.prototype.validate_timer_state = function (local_state) {
        return this.validate_timer_type_tag(local_state.type);
    };
    RemoteTimer.prototype.clear = function (remote_id) {
        if (this.m_remote_to_local_timer_state_map.has(remote_id)) {
            var local_state = this.m_remote_to_local_timer_state_map.get(remote_id);
            if (local_state) {
                this.verify_timer_state(local_state, remote_id);
                if (local_state.type === TIMER_SINGLE) {
                    globalThis[this.m_api_info.clear_single](local_state.id);
                }
                if (local_state.type === TIMER_REPEATING) {
                    globalThis[this.m_api_info.clear_repeating](local_state.id);
                }
                local_state.active = false;
            }
            this.m_remote_to_local_timer_state_map["delete"](remote_id);
        }
    };
    RemoteTimer.prototype.do_clear = function (clear_msg) {
        var remote_id = clear_msg.v;
        this.clear(remote_id);
        var reply_data = {
            t: clear_msg.t,
            v: remote_id
        };
        var reply_message = {
            t: this.m_api_info.timer_reply_msg_id,
            v: reply_data
        };
        var message = {
            t: 100,
            v: reply_message
        };
        postMessage(message);
        return;
    };
    return RemoteTimer;
}());
var RemoteWorkerState = /** @class */ (function () {
    function RemoteWorkerState() {
        this.m_timer = null;
        this.unique_script_id = 1;
    }
    RemoteWorkerState.prototype.set_timer = function (timer) {
        this.m_timer = timer;
    };
    RemoteWorkerState.prototype.timer_set = function (type, remote_id, timeout) {
        if (this.m_timer)
            return this.m_timer.set(type, remote_id, timeout);
    };
    RemoteWorkerState.prototype.do_timer_clear = function (timer_clear_msg) {
        if (this.m_timer)
            return this.m_timer.do_clear(timer_clear_msg);
    };
    return RemoteWorkerState;
}());
export { RemoteWorkerState };
var TIMER_SINGLE = 1;
var TIMER_REPEATING = 2;
var TIMER_TAG_COUNT = 3;
var AUDIO_ELEMENT_VOLUME = 0.58;
var cint_arr = [];
function down_convert_type(v) {
    return true;
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
        this.end_symbol = Symbol(void 0);
        this.attached_document = document;
        this.document_write = document.write;
        var proxy_for_write = {
            other: this,
            apply: function (target, thisArg, argArray) {
                this.other.write(target, thisArg, argArray);
            }
        };
        this.document_write_proxy = new Proxy(document.write, proxy_for_write);
        if (this.document_write_proxy)
            document.write = this.document_write_proxy;
    }
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
    DocumentWriteList.prototype.write = function (target, thisArg, argArray) {
        console.assert(target === this.document_write);
        console.assert(thisArg === this.attached_document);
        this.list.push(argArray, null);
    };
    DocumentWriteList.prototype.destroy = function (should_try_to_destroy) {
        if (this.attached_document && this.document_write_proxy) {
            console.assert(this.attached_document.write === this.document_write_proxy);
            if (this.attached_document.write !== this.document_write_proxy) {
                if (should_try_to_destroy) {
                    return false;
                }
                throw new Error("Unable to destroy DocumentWriteList: document.write is not equal to document_write_proxy");
            }
            if (this.document_write) {
                if (down_convert_type(this.document_write)) {
                    this.attached_document.write = this.document_write;
                }
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
export { DocumentWriteList };
var UniqueIdGenerator = /** @class */ (function () {
    function UniqueIdGenerator(start) {
        this.m_current = start;
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
        this.m_accept = accept;
        this.m_reject = reject;
        this.alive = true;
    }
    PromiseExecutorHandle.prototype.accept = function (value) {
        if (!this.alive)
            throw new Error("accept called on dead PromiseExecutorHandle");
        var accept = this.m_accept;
        if (accept)
            accept(value);
        this.close();
    };
    PromiseExecutorHandle.prototype.reject = function (error) {
        if (this.alive)
            throw new Error("accept called on dead PromiseExecutorHandle");
        var reject = this.m_reject;
        if (reject)
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
    var RemoteWorkerState = /** @class */ (function () {
        function RemoteWorkerState() {
            this.m_timer = null;
            this.unique_script_id = 1;
        }
        RemoteWorkerState.prototype.set_timer = function (timer) {
            this.m_timer = timer;
        };
        RemoteWorkerState.prototype.timer_set = function (timer_type_tag, remote_id, timeout) {
            if (this.m_timer)
                return this.m_timer.set(timer_type_tag, remote_id, timeout);
        };
        RemoteWorkerState.prototype.do_timer_clear = function (timer_clear_msg) {
            if (this.m_timer)
                return this.m_timer.do_clear(timer_clear_msg);
        };
        return RemoteWorkerState;
    }());
    function timer_nop() { }
    ;
    function fire_timer(timer, remote_id) {
        timer.fire(remote_id);
    }
    var RemoteTimer = /** @class */ (function () {
        function RemoteTimer(api_info) {
            this.m_remote_to_local_timer_state_map = new Map;
            this.m_api_info = api_info;
            this.base_id = globalThis[this.m_api_info.set_single](timer_nop);
            globalThis[this.m_api_info.clear_single](this.base_id);
        }
        RemoteTimer.prototype.fire = function (remote_id) {
            var local_state = this.m_remote_to_local_timer_state_map.get(remote_id);
            if (!local_state)
                return;
            this.verify_timer_state(local_state, remote_id);
            if (!local_state.active) {
                debugger;
                console.log('fire inactive', remote_id, local_state);
                return;
            }
            ;
            if (local_state.type === TIMER_SINGLE) {
                postMessage({
                    t: this.m_api_info.fire_single_msg_id,
                    v: remote_id
                });
                this.m_remote_to_local_timer_state_map["delete"](remote_id);
            }
            else if (local_state.type === TIMER_REPEATING) {
                postMessage({
                    t: this.m_api_info.fire_repeating_msg_id,
                    v: remote_id
                });
            }
        };
        RemoteTimer.prototype.set = function (type_tag, remote_id, delay) {
            this.verify_timer_type_tag(type_tag);
            var local_id = -1;
            if (type_tag === TIMER_SINGLE) {
                local_id = globalThis[this.m_api_info.set_single](fire_timer, delay, this, remote_id);
            }
            if (type_tag === TIMER_REPEATING) {
                local_id = globalThis[this.m_api_info.set_repeating](fire_timer, delay, this, remote_id);
            }
            this.m_remote_to_local_timer_state_map.set(remote_id, {
                active: true,
                id: local_id,
                type: type_tag
            });
            return local_id;
        };
        RemoteTimer.prototype.verify_timer_type_tag = function (type_tag) {
            if (!this.validate_timer_type_tag(type_tag)) {
                throw new Error("type_tag verification failed on remote_worker");
            }
        };
        RemoteTimer.prototype.verify_timer_state = function (local_state, remote_id) {
            if (!this.validate_timer_state(local_state)) {
                console.info("Removed invalid local_state");
                globalThis[this.m_api_info.clear_single](local_state.id);
                globalThis[this.m_api_info.clear_repeating](local_state.id);
                this.m_remote_to_local_timer_state_map["delete"](remote_id);
                throw new Error("type_tag verification failed on remote_worker");
            }
        };
        RemoteTimer.prototype.validate_timer_type_tag = function (type_tag) {
            if (type_tag < TIMER_SINGLE || type_tag >= TIMER_TAG_COUNT) {
                console.assert(false, "Assertion failed in RemoteTimer.validate_timer_type_tag: type_tag=%o is out of range");
                console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", type_tag, TIMER_SINGLE, TIMER_TAG_COUNT);
                return false;
            }
            return true;
        };
        RemoteTimer.prototype.validate_timer_state = function (local_state) {
            return this.validate_timer_type_tag(local_state.type);
        };
        RemoteTimer.prototype.clear = function (remote_id) {
            if (this.m_remote_to_local_timer_state_map.has(remote_id)) {
                var local_state = this.m_remote_to_local_timer_state_map.get(remote_id);
                if (local_state) {
                    this.verify_timer_state(local_state, remote_id);
                    if (local_state.type === TIMER_SINGLE) {
                        globalThis[this.m_api_info.clear_single](local_state.id);
                    }
                    if (local_state.type === TIMER_REPEATING) {
                        globalThis[this.m_api_info.clear_repeating](local_state.id);
                    }
                    local_state.active = false;
                    this.m_remote_to_local_timer_state_map["delete"](remote_id);
                }
            }
        };
        RemoteTimer.prototype.do_clear = function (clear_msg) {
            var remote_id = clear_msg.v;
            this.clear(remote_id);
            var reply_data = {
                t: clear_msg.t,
                v: remote_id
            };
            var reply_message = {
                t: this.m_api_info.timer_reply_msg_id,
                v: reply_data
            };
            var message = {
                t: 100,
                v: reply_message
            };
            postMessage(message);
            return;
        };
        return RemoteTimer;
    }());
    var remote_worker_state = new RemoteWorkerState;
    globalThis.remote_worker_state = remote_worker_state;
    remote_worker_state.set_timer(new RemoteTimer({
        async_reply_msg_id: 1,
        timer_reply_msg_id: 2,
        r_reply_msg_id: 100,
        fire_single_msg_id: 101,
        fire_repeating_msg_id: 102,
        l_reply_msg_id: 200,
        worker_update_code: 201,
        async_worker_ready_msg_id: 202,
        set_single_msg_id: 203,
        set_repeating_msg_id: 204,
        clear_single_msg_id: 205,
        clear_repeating_msg_id: 206,
        clear_any_msg_id: 207,
        set_single: "setTimeout",
        set_repeating: "setInterval",
        clear_single: "clearTimeout",
        clear_repeating: "clearInterval"
    }));
    onmessage = function (e) {
        var msg = e.data;
        switch (msg.t) {
            case 200 /*reply*/:
                {
                    var result = msg.v;
                    console.assert(false, "unhandled result on remote worker", result);
                }
                break;
            case 201 /*remote worker init*/:
                {
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
                        t: 100,
                        v: {
                            t: 1,
                            v: msg.t
                        }
                    };
                    postMessage(message);
                }
                break;
            case 202 /**/:
                {
                    var message = {
                        t: 100,
                        v: {
                            t: 1,
                            v: msg.t
                        }
                    };
                    postMessage(message);
                }
                break;
            case 203 /*remote timer set single*/:
                {
                    var user_msg = msg.v;
                    var remote_timer_id = remote_worker_state.timer_set(TIMER_SINGLE, user_msg.t, user_msg.v);
                    void remote_timer_id;
                }
                break;
            case 204 /*remote timer set repeating*/:
                {
                    var user_msg = msg.v;
                    var remote_timer_id = remote_worker_state.timer_set(TIMER_REPEATING, user_msg.t, user_msg.v);
                    void remote_timer_id;
                }
                break;
            case 205 /*remote timer do_clear single*/:
                {
                    var clear_msg = msg;
                    remote_worker_state.do_timer_clear(clear_msg);
                }
                break;
            case 206 /*remote timer do_clear repeating*/:
                {
                    var clear_msg = msg;
                    remote_worker_state.do_timer_clear(clear_msg);
                }
                break;
            default:
                {
                    console.assert(false, "RemoteWorker: Unhandled message", msg);
                }
                break;
        }
    };
}
export var window;
var WorkerState = /** @class */ (function () {
    function WorkerState(worker_code_blob, timer, executor_handle) {
        var has_blob = false;
        if (worker_code_blob instanceof Blob)
            has_blob = true;
        if (!has_blob)
            throw new Error("WorkerState requires a blob with javascript code to execute on a worker");
        if (!timer)
            throw new Error("WorkerState needs a timer");
        if (!executor_handle)
            throw new Error("WorkerState needs a executor_handle");
        if (executor_handle.closed())
            throw new Error("WorkerState needs a executor_handle that is not closed");
        this.rejected = false;
        this.valid = false;
        this.connected = false;
        this.worker_code = worker_code_blob;
        this.timer = timer;
        timer.set_worker_state(this);
        this.executor_handle = executor_handle;
        this.worker = null;
        this.worker_url = null;
        this.init();
    }
    WorkerState.prototype.init = function () {
        if (this.connected || this.valid) {
            this.destroy();
        }
        this.connected = false;
        var weak_worker_state = new WeakRef(this);
        this.worker_url = URL.createObjectURL(this.worker_code);
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
                case 100 /*worker_state dispatch_message*/: {
                    worker_state.dispatch_message(msg.v);
                    break;
                }
                case 101 /*worker_state.timer single fire*/: {
                    worker_state.timer.fire(TIMER_SINGLE, msg.v);
                    break;
                }
                case 102 /*worker_state.timer repeating fire*/: {
                    worker_state.timer.fire(TIMER_REPEATING, msg.v);
                    break;
                }
                case 300 /*worker_state destroy*/:
                    worker_state.destroy();
                    break;
                default: {
                    console.assert(false, "Main: Unhandled message", msg);
                    break;
                }
            }
        };
        this.valid = true;
        this.worker.postMessage({
            t: 202
        });
    };
    WorkerState.prototype.set_executor_handle = function (handle) {
        this.executor_handle = handle;
    };
    WorkerState.prototype.on_result = function (result) {
        switch (result) {
            case 201: {
                console.log("remote_worker onmessage function changed");
                break;
            }
            case 202: {
                if (this.executor_handle.closed()) {
                    console.assert(false, "WorkerState used with closed executor_handle");
                    break;
                }
                console.log("remote_worker ready");
                WorkerState.set_global_state(this);
                this.executor_handle.accept(this);
                this.connected = true;
                break;
            }
        }
    };
    WorkerState.prototype.dispatch_message = function (result) {
        switch (result.t) {
            case 1: {
                this.on_result(result.v);
                break;
            }
            case 2: {
                this.timer.on_result(result.v);
                break;
            }
            default: {
                console.assert(false, "unhandled result", result);
            }
        }
    };
    WorkerState.prototype.postMessage = function (data) {
        if (this.worker) {
            return this.worker.postMessage(data);
        }
        else {
            console.info("message lost %o", data);
            throw new Error("Tried to post a message and worker was null");
        }
    };
    WorkerState.has_global_state = function () {
        return window.hasOwnProperty("worker_state");
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
            this.destroy_old_worker_state(old_worker_state, 'delete_global_state');
        }
    };
    WorkerState.destroy_old_worker_state = function (worker_state_value, before_destroy_call_name) {
        if (before_destroy_call_name === 'delete_global_state') {
            this[before_destroy_call_name]();
        }
        else {
            console.assert(false, "before_destroy_name was not delete_global_state");
        }
        worker_state_value.destroy();
    };
    WorkerState.get_global_state = function () {
        return window[this.global_state_key];
    };
    WorkerState.set_global_state = function (worker_state_value) {
        window[this.global_state_key] = worker_state_value;
    };
    WorkerState.delete_global_state = function () {
        delete window[this.global_state_key];
    };
    Object.defineProperty(WorkerState, "global_state_key", {
        get: function () {
            return "g_worker_state";
        },
        enumerable: false,
        configurable: true
    });
    WorkerState.prototype.destroy = function () {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
            if (this.worker_url) {
                URL.revokeObjectURL(this.worker_url);
                this.worker_url = null;
            }
            if (!this.executor_handle.closed()) {
                this.executor_handle.reject(new Error("Worker destroyed before it was connected"));
            }
            this.connected = false;
        }
        ;
        this.timer.destroy();
        this.valid = false;
    };
    return WorkerState;
}());
function timer_nop() { }
var Timer = /** @class */ (function () {
    function Timer(api_info) {
        this.m_remote_id_to_main_state_map = new Map;
        this.weak_worker_state = null;
        this.m_api_map = new Map();
        this.m_api_info = api_info;
        if (api_info.set_single)
            this.m_api_map.set(api_info.set_single, window[api_info.set_single]);
        if (api_info.set_repeating)
            this.m_api_map.set(api_info.set_repeating, window[api_info.set_repeating]);
        if (api_info.clear_single)
            this.m_api_map.set(api_info.clear_single, window[api_info.clear_single]);
        if (api_info.clear_repeating)
            this.m_api_map.set(api_info.clear_repeating, window[api_info.clear_repeating]);
        if (api_info.set_single && api_info.clear_single) {
            this.base_id = window[api_info.set_single](timer_nop);
            window[api_info.clear_single](this.base_id);
        }
        else if (api_info.set_repeating && api_info.clear_repeating) {
            this.base_id = window[api_info.set_repeating](timer_nop);
            window[api_info.clear_repeating](this.base_id);
        }
        else {
            console.info('Timer ids not linked with underlying api');
            this.base_id = 1;
        }
        this.id_generator = new UniqueIdGenerator(this.base_id);
    }
    Timer.prototype.set_worker_state = function (worker_state_value) {
        this.weak_worker_state = new WeakRef(worker_state_value);
    };
    // If you cause any side effects, please
    // wrap this call in try{}finally{} and
    // revert all side effects...
    Timer.prototype.verify_timer_type_tag = function (type_tag) {
        if (!this.validate_timer_type_tag(type_tag)) {
            throw new Error("Verify failed in Timer.verify_timer_type_tag");
        }
    };
    Timer.prototype.verify_timer_state = function (main_state, remote_id) {
        if (!this.validate_timer_state(main_state)) {
            if (!this.weak_worker_state)
                throw new Error("Invalid state");
            var worker_state = this.weak_worker_state.deref();
            if (!worker_state)
                throw new Error("Invalid state");
            if (this.m_api_info.clear_any_msg_id) {
                worker_state.postMessage({
                    t: this.m_api_info.clear_any_msg_id,
                    v: remote_id
                });
            }
            else {
                throw new Error("Verify failed in Timer.verify_timer_state");
            }
        }
    };
    Timer.prototype.validate_timer_type_tag = function (type_tag) {
        if (type_tag < TIMER_SINGLE || type_tag >= TIMER_TAG_COUNT) {
            console.assert(false, "Assertion failure in Timer.validate_timer_type_tag: type_tag=%o is out of range");
            console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", type_tag, TIMER_SINGLE, TIMER_TAG_COUNT);
            return false;
        }
        return true;
    };
    Timer.prototype.validate_timer_state = function (main_state) {
        return this.validate_timer_type_tag(main_state.type);
    };
    Timer.prototype.fire = function (type, remote_id) {
        var main_state = this.get_main_state_by_id(remote_id);
        if (!main_state) {
            this.force_clear(type, remote_id);
            return;
        }
        if (main_state.active) {
            main_state.target_function.apply(null, main_state.target_arguments);
        }
        if (type === TIMER_SINGLE) {
            main_state.active = false;
            this.clear(type, remote_id);
        }
    };
    Timer.prototype.set = function (type, target_function, delay, target_arguments) {
        var remote_id = this.id_generator.next();
        var is_repeating = false;
        this.verify_timer_type_tag(type);
        if (type === TIMER_REPEATING) {
            is_repeating = true;
        }
        if (delay < 0)
            delay = 0;
        var main_state = {
            active: true,
            type: type,
            repeat: is_repeating,
            target_function: target_function,
            target_arguments: target_arguments,
            delay: delay
        };
        this.store_main_state_by_id(remote_id, main_state);
        if (!this.m_api_info.set_single_msg_id)
            throw new Error("Invalid state");
        if (!this.m_api_info.set_repeating_msg_id)
            throw new Error("Invalid state");
        if (!this.weak_worker_state)
            throw new Error("Invalid state");
        var worker_state = this.weak_worker_state.deref();
        if (!worker_state)
            throw new Error("Invalid state");
        var types = [0, 203, 204];
        var do_set_message_id = 0;
        if (type === TIMER_SINGLE)
            do_set_message_id = this.m_api_info.set_single_msg_id;
        if (type === TIMER_REPEATING)
            do_set_message_id = this.m_api_info.set_repeating_msg_id;
        if (do_set_message_id === 0)
            throw new Error("Invalid state");
        worker_state.postMessage({
            t: do_set_message_id,
            v: {
                t: remote_id,
                v: delay
            }
        });
        if (type === TIMER_REPEATING) {
            worker_state.postMessage({
                t: this.m_api_info.set_repeating_msg_id,
                v: {
                    t: remote_id,
                    v: delay
                }
            });
        }
        return remote_id;
    };
    Timer.prototype.is_main_state_stored_by_id = function (remote_id) {
        return this.m_remote_id_to_main_state_map.has(remote_id);
    };
    Timer.prototype.get_main_state_by_id = function (remote_id) {
        var main_state = this.m_remote_id_to_main_state_map.get(remote_id);
        if (!main_state)
            return null;
        this.verify_timer_state(main_state, remote_id);
        return main_state;
    };
    Timer.prototype.store_main_state_by_id = function (remote_id, main_state) {
        this.m_remote_id_to_main_state_map.set(remote_id, main_state);
    };
    Timer.prototype.delete_main_state_by_id = function (remote_id) {
        this.m_remote_id_to_main_state_map["delete"](remote_id);
    };
    Timer.prototype.main_state_entries = function () {
        return this.m_remote_id_to_main_state_map.entries();
    };
    Timer.prototype.on_result = function (timer_result_msg) {
        var timer_result_msg_id = timer_result_msg.t;
        switch (timer_result_msg_id) {
            case 205: {
                var remote_id = timer_result_msg.v;
                this.delete_main_state_by_id(remote_id);
                break;
            }
            case 206: {
                var remote_id = timer_result_msg.v;
                this.delete_main_state_by_id(remote_id);
                break;
            }
            default:
                console.log(timer_result_msg);
                debugger;
        }
    };
    Timer.prototype.force_clear = function (type, remote_id) {
        this.verify_timer_type_tag(type);
        if (!this.weak_worker_state)
            throw new Error("Invalid state");
        var worker_state = this.weak_worker_state.deref();
        var main_state = this.get_main_state_by_id(remote_id);
        if (main_state.active) {
            return this.clear(type, remote_id);
        }
        // we have to trust the user, go ahead and send the message
        // anyway (this can technically send structured cloneable objects)
        if (!worker_state)
            throw new Error("Invalid state");
        if (!this.m_api_info.clear_single_msg_id)
            throw new Error("Invalid state");
        if (!this.m_api_info.clear_repeating_msg_id)
            throw new Error("Invalid state");
        if (type === TIMER_SINGLE) {
            worker_state.postMessage({
                t: this.m_api_info.clear_single_msg_id,
                v: remote_id
            });
        }
        else if (type === TIMER_REPEATING) {
            worker_state.postMessage({
                t: this.m_api_info.clear_repeating_msg_id,
                v: remote_id
            });
        }
    };
    Timer.prototype.clear = function (type, remote_id) {
        this.verify_timer_type_tag(type);
        var main_state = this.get_main_state_by_id(remote_id);
        if (!main_state)
            return;
        if (!this.weak_worker_state)
            throw new Error("Invalid state");
        if (!this.m_api_info.clear_single_msg_id)
            throw new Error("Invalid state");
        if (!this.m_api_info.clear_repeating_msg_id)
            throw new Error("Invalid state");
        if (main_state.active) {
            var worker_state = this.weak_worker_state.deref();
            if (!worker_state)
                throw new Error("Invalid state");
            if (main_state.type === TIMER_SINGLE) {
                worker_state.postMessage({
                    t: this.m_api_info.clear_single_msg_id,
                    v: remote_id
                });
            }
            else if (main_state.type === TIMER_REPEATING) {
                worker_state.postMessage({
                    t: this.m_api_info.clear_repeating_msg_id,
                    v: remote_id
                });
            }
            main_state.active = false;
        }
    };
    Timer.prototype.destroy = function () {
        var api_info = this.m_api_info;
        var api_map = this.m_api_map;
        if (api_info.set_single)
            window[api_info.set_single] = api_map.get(api_info.set_single);
        if (api_info.set_repeating)
            window[api_info.set_repeating] = api_map.get(api_info.set_repeating);
        if (api_info.clear_single)
            window[api_info.clear_single] = api_map.get(api_info.clear_single);
        if (api_info.clear_repeating)
            window[api_info.clear_repeating] = api_map.get(api_info.clear_repeating);
        for (var _i = 0, _a = this.main_state_entries(); _i < _a.length; _i++) {
            var timer_map_entry = _a[_i];
            var main_state = timer_map_entry[1];
            if (main_state.type === TIMER_SINGLE) {
                // if the timer might get reset when calling the function while
                // the timer functions are reset to the underlying api
                main_state.target_function.apply(null, main_state.target_arguments);
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
function move_timers_to_worker_promise_executor(executor_accept, executor_reject) {
    if (globalThis.hasOwnProperty('remote_worker_state')) {
        postMessage({
            t: 300
        });
        executor_accept(null);
        return;
    }
    if (WorkerState.maybe_delete_old_global_state())
        return null;
    worker_code_function(function (verify_obj) {
        VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_SINGLE constant matches");
        VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_REPEATING constant matches");
        VERIFY(verify_obj.TIMER_TAG_COUNT === TIMER_TAG_COUNT, "TIMER_TAG_COUNT constant matches");
        VERIFY(Object.keys(verify_obj).length === 3, "keys(verify_obj).length is expected value");
        return;
    });
    var worker_code_blob = new Blob(["(", worker_code_function.toString(), ")()", "\n//# sourceURL=$__.0"]);
    var timer = new Timer({
        set_single_msg_id: 203,
        set_repeating_msg_id: 204,
        clear_single_msg_id: 205,
        clear_repeating_msg_id: 206,
        set_single: "setTimeout",
        clear_single: "clearTimeout",
        set_repeating: "setInterval",
        clear_repeating: "clearInterval"
    });
    var executor_handle = new PromiseExecutorHandle(executor_accept, executor_reject);
    var worker_state = new WorkerState(worker_code_blob, timer, executor_handle);
    var weak_worker_state = new WeakRef(worker_state);
    var setTimeout_global = setTimeout;
    function remoteSetTimeout(handler, timeout) {
        if (timeout === void 0) { timeout = 0; }
        var target_arguments = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            target_arguments[_i - 2] = arguments[_i];
        }
        if (!worker_state) {
            window.setTimeout = setTimeout_global;
            console.log('lost worker_state in timer');
            return setTimeout_global.apply(void 0, __spreadArray([handler, timeout], target_arguments, false));
        }
        return worker_state.timer.set(TIMER_SINGLE, handler, timeout, target_arguments);
    }
    var clearTimeout_global = clearTimeout;
    function remoteClearTimeout(id) {
        if (!worker_state) {
            window.clearTimeout = clearTimeout_global;
            console.log('lost worker_state in timer');
            return clearTimeout_global(id);
        }
        if (id !== void 0)
            worker_state.timer.clear(TIMER_SINGLE, id);
    }
    var setInterval_global = setInterval;
    function remoteSetInterval(handler, timeout) {
        if (timeout === void 0) { timeout = 0; }
        var target_arguments = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            target_arguments[_i - 2] = arguments[_i];
        }
        if (!worker_state) {
            window.setInterval = setInterval_global;
            console.log('lost worker_state in timer');
            return setInterval_global.apply(void 0, __spreadArray([handler, timeout], target_arguments, false));
        }
        return worker_state.timer.set(TIMER_REPEATING, handler, timeout, target_arguments);
    }
    var clearInterval_global = clearInterval;
    function remoteClearInterval(id) {
        if (!worker_state) {
            window.clearInterval = clearInterval_global;
            console.log('lost worker_state in timer');
            return clearInterval_global(id);
        }
        if (id !== void 0)
            worker_state.timer.clear(TIMER_REPEATING, id);
    }
    window.setTimeout = remoteSetTimeout;
    window.setInterval = remoteSetInterval;
    window.clearTimeout = remoteClearTimeout;
    window.clearInterval = remoteClearInterval;
    return {
        get: function () {
            return weak_worker_state.deref();
        }
    };
}
function remove_bad_dom_script_element() {
    function remove_element_callback(e) {
        if (!e.src)
            return;
        if (e.src instanceof URL) {
            if (e.src.origin != location.origin)
                return;
            if (e.src.pathname.indexOf("ads") > -1 || e.src.pathname.indexOf("track") > -1) {
                e.remove();
            }
            return;
        }
        if (typeof e.src === 'string') {
            if (new URL(e.src).origin != location.origin)
                return;
            if (e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1) {
                e.remove();
            }
        }
    }
    Array.prototype.forEach.call(document.querySelectorAll("script"), remove_element_callback);
}
;
var EventHandlerDispatch = /** @class */ (function () {
    function EventHandlerDispatch(target_obj, target_fn) {
        this.target_obj = target_obj;
        this.target_fn = target_fn;
    }
    EventHandlerDispatch.prototype.handleEvent = function (event) {
        this.target_fn.call(this.target_obj, event);
    };
    return EventHandlerDispatch;
}());
var SimpleStackVMParser = /** @class */ (function () {
    function SimpleStackVMParser() {
    }
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
    SimpleStackVMParser.parse_string_with_format_ident = function (str, format_list) {
        var format_index = str.indexOf('%');
        var format_type = str[format_index + 1];
        switch (format_type) {
            case 'o':
                return format_list.shift();
            default:
                console.log("%s", 'unsupported format spec %' + format_type);
        }
    };
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
    SimpleStackVMParser.raw_parse_handle_regexp_match = function (match_parts) {
        if (!match_parts)
            return;
        var str_data = match_parts[1].trim();
        if (str_data.startsWith("//"))
            return;
        while (str_data.startsWith("/*")) {
            var com_end = str_data.indexOf("*/");
            str_data = str_data.slice(com_end + 2).trim();
        }
        if (!str_data)
            return;
        return str_data.split(",");
    };
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
        } while (i++ < parser_max_match_iter);
        if (parts) {
            console.assert(false, 'SimpleStackVM Parser: Iteration limit exceeded (limit=%o)', parser_max_match_iter);
        }
        return arr;
    };
    SimpleStackVMParser.parse_instruction_stream_from_string = function (string, format_list) {
        var raw_instructions = this.parse_string_into_raw_instruction_stream(string);
        for (var i = 0; i < raw_instructions.length; i++) {
            var cur = raw_instructions[i];
            this.parse_current_instruction(cur, format_list);
        }
        var instructions = this.verify_raw_instructions(raw_instructions);
        return instructions;
    };
    SimpleStackVMParser.cook_instruction = function (instruction, left) {
        var m_opcode = instruction[0], m_parameters = instruction.slice(1);
        switch (m_opcode) {
            // variable argument count
            case 'push':
                left[0] = 0;
                return __spreadArray([m_opcode], m_parameters, true);
            // 2 arguments
            case 'call': {
                if (typeof m_parameters[0] === 'number') {
                    left[0] -= 2;
                    return [m_opcode, m_parameters[0]];
                }
                else {
                    throw new Error("TypeError: Call argument is not parameter count");
                }
            }
            // one argument
            case 'drop':
            case 'get':
            case 'return':
            case 'halt':
            case 'push_args':
            case 'this':
            case 'global':
            case 'breakpoint':
                left[0]--;
                return [m_opcode];
            default:
                console.info("Info: opcode=%o instruction_parameters=%o", m_opcode, m_parameters);
                throw new Error("Unexpected opcode when cooking instructions");
        }
    };
    SimpleStackVMParser.verify_raw_instructions = function (raw_instructions) {
        var instructions = [];
        for (var i = 0; i < raw_instructions.length; i++) {
            var instruction = raw_instructions[i];
            var left = [instruction.length];
            var cooked_instruction = this.cook_instruction(instruction, left);
            instructions.push(cooked_instruction);
            if (left[0] > 0) {
                throw new Error("Typechecking failure, data left when processing raw instruction stream");
            }
        }
        return instructions;
    };
    SimpleStackVMParser.match_regex = /(.+?)(;|$)/gm;
    return SimpleStackVMParser;
}());
var SimpleStackVM = /** @class */ (function () {
    function SimpleStackVM(instructions) {
        this.instructions = instructions;
        this.stack = [];
        this.instruction_pointer = 0;
        this.return_value = void 0;
        this.running = false;
    }
    SimpleStackVM.prototype.reset = function () {
        this.stack.length = 0;
        this.instruction_pointer = 0;
        this.return_value = void 0;
        this.running = false;
    };
    SimpleStackVM.prototype.push = function (value) {
        this.stack.push(value);
    };
    SimpleStackVM.prototype.pop = function () {
        return this.stack.pop();
    };
    SimpleStackVM.prototype.pop_arg_count = function (arg_count) {
        var ret = [];
        for (var i = 0; i < arg_count; i++) {
            if (this.stack.length <= 0) {
                throw new Error('stack underflow in pop_arg_count');
            }
            ret.unshift(this.pop());
        }
        return ret;
    };
    SimpleStackVM.prototype.run = function () {
        var _a;
        var run_arguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            run_arguments[_i] = arguments[_i];
        }
        this.running = true;
        while (this.instruction_pointer < this.instructions.length && this.running) {
            var cur_instruction = this.instructions[this.instruction_pointer];
            var cur_opcode = cur_instruction[0], instruction_parameters = cur_instruction.slice(1);
            switch (cur_opcode) {
                case 'push' /*Stack*/: {
                    for (var i = 1; i < cur_instruction.length; i++) {
                        var item = cur_instruction[i];
                        if (item instanceof Array) {
                            this.push(new InstructionTypeArrayBox(item));
                        }
                        else {
                            this.push(item);
                        }
                    }
                    break;
                }
                case 'drop' /*Stack*/: {
                    var drop = this.pop();
                    void drop;
                    break;
                }
                case 'get' /*Object*/: {
                    var name_1 = this.pop();
                    if (!name_1)
                        throw new Error("Invalid");
                    var obj = this.pop();
                    if (!obj)
                        throw new Error("Invalid");
                    if (obj instanceof IndexedObject && typeof name_1 === 'string') {
                        this.push(obj.value[name_1]);
                    }
                    break;
                }
                case 'call' /*Call*/: {
                    var number_of_arguments = instruction_parameters[0];
                    if (number_of_arguments === void 0) {
                        throw new Error("Invalid call operand");
                    }
                    if (typeof number_of_arguments != 'number')
                        throw new Error("Invalid");
                    var arg_arr = [];
                    for (var i = 0; i < number_of_arguments; i++) {
                        arg_arr.unshift(this.pop());
                    }
                    var name_to_call = this.pop();
                    var target = this.pop();
                    if (!target)
                        throw "Bad";
                    if (!name_to_call)
                        throw "Bad";
                    if (target instanceof IndexedFnBox && typeof name_to_call === 'string') {
                        var ret = (_a = target.value)[name_to_call].apply(_a, arg_arr);
                        switch (typeof ret) {
                            case 'function':
                            case 'object':
                                console.log('convert', ret);
                                throw new Error("Conversion needed");
                            case 'string':
                            case 'number':
                            case 'bigint':
                            case 'boolean':
                            case 'symbol':
                                this.push(ret);
                                break;
                            case 'undefined':
                                this.push(ret);
                                break;
                            default:
                                console.warn("return value unable to be pushed", ret);
                                throw new Error("Can't box return value");
                        }
                    }
                    break;
                }
                case 'return' /*Call*/:
                    this.return_value = this.pop();
                    break;
                case 'halt' /*Running*/:
                    this.running = false;
                    break;
                case 'push_args' /*Special*/:
                    this.push(new ArrayBox(run_arguments));
                    break;
                case 'this' /*Special*/:
                    this.push(new IStackVMBox(this));
                    break;
                case 'global' /*Special*/: {
                    if (window)
                        this.push(new WindowBox(window));
                    else
                        this.push(new GlobalThisBox(globalThis));
                    break;
                }
                case 'breakpoint' /*Debug*/: {
                    debugger;
                    break;
                }
                default /*Debug*/: {
                    console.log('unk opcode', cur_opcode);
                    throw new Error("halt");
                }
            }
            this.instruction_pointer++;
        }
        console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
        return this.return_value;
    };
    return SimpleStackVM;
}());
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
        if (!this.map_values()[index]) {
            this.map_values()[index] = 1;
        }
        else
            this.map_values()[index]++;
    };
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
    CompressionStatsCalculator.prototype.calc_compression_stats = function (arr, win_size) {
        this.reset();
        for (var i = 0; i < arr.length; i++) {
            if (i + win_size < arr.length) {
                this.add_item(arr.slice(i, i + win_size).join(","));
            }
        }
        return to_tuple_arr(this.map_keys(), this.map_values()).filter(function (e) { return e[1] !== void 0; });
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
        // await async_semaphore.inc(1);
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
        // await async_semaphore.dec(1);
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
    function AverageRatio(max_len, max_history_len, weight, human_duration, arr) {
        if (arr === void 0) { arr = []; }
        this.arr = arr;
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
                console.log("ratio", this.human_duration, (value * 100).toFixed(5));
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
var AsyncDelayNode = /** @class */ (function () {
    function AsyncDelayNode(root, target_obj, target_callback, label) {
        this.root = root;
        this.cint = -1;
        this.target_obj = target_obj;
        this.target_callback = target_callback;
        this.label = label;
        this.timeout = 0;
    }
    AsyncDelayNode.prototype.start = function () {
        this.root.on_child_start(this);
        this.cint = setTimeout(this.run, this.timeout, this);
    };
    AsyncDelayNode.prototype.run = function () {
        this.root.on_child_run(this);
        this.target_callback.call(this.target_obj);
    };
    return AsyncDelayNode;
}());
var AsyncNodeRoot = /** @class */ (function () {
    function AsyncNodeRoot() {
        this.children = [];
    }
    AsyncNodeRoot.prototype.on_child_start = function (record) {
        this.children.push(record);
    };
    AsyncNodeRoot.prototype.on_child_run = function (record) {
        var index = this.children.indexOf(record);
        this.children.splice(index, 1);
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
        if (!ratio_calc)
            throw new Error("Missing AverageRatio");
        return ratio_calc.can_average();
    };
    AverageRatioRoot.prototype.get_average = function (key) {
        var ratio_calc = this.map.get(key);
        if (!ratio_calc)
            throw new Error("Missing AverageRatio");
        return ratio_calc.get_average();
    };
    AverageRatioRoot.prototype.push_ratio = function (_a) {
        var key = _a[0], ratio_obj = _a[1];
        this.ordered_keys.push(key);
        this.map.set(key, ratio_obj);
    };
    AverageRatioRoot.prototype.push = function (value) {
        var cur = this.map.get(this.ordered_keys[0]);
        if (!cur)
            throw new Error("Missing AverageRatio");
        var res = cur.add(value, true, false);
        for (var i = 1; i < this.ordered_keys.length; i++) {
            var debug = false;
            var key = this.ordered_keys[i];
            cur = this.map.get(key);
            if (!cur)
                throw new Error("Missing AverageRatio");
            var prev = this.map.get(this.ordered_keys[i - 1]);
            if (key === '5min')
                debug = true;
            if (!prev)
                throw new Error("Missing AverageRatio");
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
        this.is_init_complete = false;
        this.avg = new AverageRatioRoot;
        this.prev_atomepersecond = 0;
        this.ratio_mult = 0;
        this.div = 0;
    }
    AutoBuyState.prototype.init = function () {
        if (window.atomepersecond === 0) {
            new AsyncDelayNode(this.root_node, this, this.init, 'not ready AutoBuyState.update').start();
            return;
        }
        this.val = window.totalAtome / window.atomepersecond;
        var rep_val = this.val / (100 * 4 * window.prestige);
        if (Number.isFinite(rep_val)) {
            for (var i = 0; i < 8; i++) {
                this.arr.push(rep_val * .75);
            }
        }
        this.prev_atomepersecond = window.atomepersecond;
        this.avg.push_ratio(['10sec', new AverageRatio(80, 80 * 6, .00, "10 seconds", [1])]);
        this.avg.push_ratio(['1min', new AverageRatio(6, 6 * 5 * 6, .65, "1 minute", [1])]);
        this.avg.push_ratio(['5min', new AverageRatio(5, 5 * 6 * 6, .15, "5 minutes", [1])]);
        this.avg.push_ratio(['30min', new AverageRatio(6, 6 * 6 * 4, .15, "30 minutes", [1])]);
        this.avg.push_ratio(['3hour', new AverageRatio(6, 6 * 4, .05, "3 hours", [1])]);
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
            debugger;
        }
        this.arr.unshift(value);
        this.avg.push(value);
        while (this.arr.length > this.arr_max_len) {
            this.arr.pop();
        }
        var new_ratio = this.calc_ratio();
        if (!Number.isFinite(new_ratio)) {
            console.assert(false, 'ratio result is not finite');
            debugger;
        }
        if (new_ratio)
            this.ratio = new_ratio;
    };
    AutoBuyState.prototype.update_ratio_mode = function () {
        switch (this.ratio_mode) {
            case 0:
                if (this.ratio > .4) {
                    this.ratio_mode++;
                    this.locked_cycles = 80 * 12;
                }
                break;
            case 1:
                if (this.ratio < .35) {
                    this.ratio_mode--;
                    this.locked_cycles = 80 * 3;
                }
                if (this.ratio > .60) {
                    this.ratio_mode++;
                    this.locked_cycles = 80 * 12;
                }
                break;
            case 2:
                if (this.ratio < .45) {
                    this.ratio_mode--;
                    this.locked_cycles = 80 * 3;
                }
                if (this.ratio > .85) {
                    this.ratio_mode++;
                    this.locked_cycles = 80 * 12;
                }
                break;
            case 3:
            default: {
                if (this.ratio < .9) {
                    this.ratio_mode--;
                    this.locked_cycles = 80 * 3;
                }
                if (this.ratio > 1.5) {
                    var offset = this.ratio_mode - 3;
                    console.log(offset);
                    if (this.ratio_mode > 3)
                        break;
                    this.ratio_mode++;
                    this.locked_cycles = 80 * 12;
                }
                break;
            }
        }
    };
    AutoBuyState.prototype.get_mul_modifier = function () {
        switch (this.ratio_mode) {
            case 0: return 8;
            case 1: return 4;
            case 2: return 2;
            case 3: return 1;
            default: {
                // 60*10*8/0.0002 ~= 1;
                return 0.05;
            }
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
        this.ratio_mult = window.prestige;
        this.div = 60 * this.ratio_mult * 8;
        if (window.atomepersecond === 0) {
            new AsyncDelayNode(this.root_node, this, this.update, 'not ready AutoBuyState.update').start();
            return;
        }
        this.val = window.totalAtome / window.atomepersecond / this.div;
        if (!Number.isFinite(this.val)) {
            console.log('fail', this.div, window.atomepersecond, window.totalAtome);
            new AsyncDelayNode(this.root_node, this, this.update, 'not ready AutoBuyState.update').start();
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
export { AutoBuyState };
var AutoBuy = /** @class */ (function () {
    function AutoBuy() {
        this.root_node = new AsyncNodeRoot;
        this.delay = 0;
        this.extra = 0;
        this.iter_count = 0;
        this.epoch_len = 0;
        this.background_audio = null;
        this.state = new AutoBuyState(this.root_node);
        this.cint_arr = [];
        this.skip_save = false;
        this.state_history_arr = [];
        this.compressor = new MulCompression;
        this.load_state_history_arr(["S"]);
        this.epoch_start_time = Date.now();
        this.delay_arr = [];
        this.display_style_sheet = new CSSStyleSheet;
        this.history_element = document.createElement("div");
        this.delay_element = document.createElement("div");
        this.hours_played_element = document.createElement("div");
        this.percent_ratio_element = document.createElement("div");
        this.percent_ratio_change_element = document.createElement("div");
        this.state_log_element = document.createElement("div");
        this.state_history_arr_max_len = 80;
    }
    AutoBuy.prototype.pre_init = function () {
        // find elements
        // find background_audio by id
        this.background_audio = document.querySelector("#background_audio");
        if (!this.background_audio)
            throw new Error("No background audio");
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
            var e_1, instructions, handler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.background_audio)
                            throw new Error("No background audio");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.background_audio.play()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        e_1 = _a.sent();
                        console.log("failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
                        return [3 /*break*/, 4];
                    case 4:
                        instructions = SimpleStackVMParser.parse_instruction_stream_from_string("\n\t\tthis;push,target_obj;get;push,background_audio;get;push,play;\n\t\t\tcall,int(0);\n\t\t\t\tpush,then;\n\t\t\t\tpush,%o;push,%o;\n\t\t\t\tcall,int(2);\n\t\t\t// comments work\n\t\t\t/*-2 +1 multiline too, (not split across lines yet)*/\n\t\tdrop;\n\t\tglobal;push,removeEventListener;push,click;this;\n\t\t\tcall,int(2);\n\t\tdrop\n\t\t", [function () { console.log('play success'); }, function (err) { console.log(err); }]);
                        handler = new EventHandlerVMDispatch(instructions, this);
                        globalThis.addEventListener('click', handler);
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
    AutoBuy.prototype.load_state_history_arr = function (arr) {
        if (localStorage.auto_buy_history_str)
            arr = localStorage.auto_buy_history_str.split(",");
        this.state_history_arr = arr;
    };
    AutoBuy.prototype.get_delay_arr_data = function (forced_action) {
        if (forced_action == "RESET")
            return this.delay_arr.map(function (e) { return ~~(e / 4); }).join(",");
        return this.delay_arr.join(",");
    };
    AutoBuy.prototype.save_delay_arr = function () {
        var _a;
        var forced_action, action_count;
        var action_data = localStorage.auto_buy_forced_action;
        if (action_data)
            _a = action_data.split(","), forced_action = _a[0], action_count = _a[1];
        localStorage.auto_buy_delay_str = this.get_delay_arr_data(forced_action);
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
        var style_string = "";
        this.display_style_sheet.replace("\n\t\t#state_log > div {width:max-content}\n\t\t#state_log {\n\t\t\ttop:0px;width:30px;position:fixed;z-index:101;\n\t\t\tfont-family:monospace;font-size:22px;color:lightgray;\n\t\t}");
        this.history_element.innerText = "?3";
        this.delay_element.innerText = "0";
        this.hours_played_element.innerText = "0.000 hours";
        this.percent_ratio_element.innerText = 0..toFixed(2) + "%";
        this.percent_ratio_change_element.innerText = 0..toExponential(3);
        this.state_log_element.id = "state_log";
        this.state_log_element.style = style_string;
        this.state_log_element.append(this.history_element);
        this.state_log_element.append(this.delay_element);
        this.state_log_element.append(this.hours_played_element);
        this.state_log_element.append(this.percent_ratio_element);
        this.state_log_element.append(this.percent_ratio_change_element);
        document.body.append(this.state_log_element);
        document.adoptedStyleSheets = __spreadArray(__spreadArray([], document.adoptedStyleSheets, true), [this.display_style_sheet], false);
    };
    AutoBuy.prototype.init_dom = function () {
        var font_size_px = 22;
        var t = this;
        this.state_history_arr_max_len = Math.floor(document.body.getClientRects()[0].width / (font_size_px * 0.55) / 2.1);
        this.history_element.addEventListener('click', new EventHandlerDispatch(this, this.history_element_click_handler));
        this.delay_element.innerText = this.delay_arr[0].toString();
        this.percent_ratio_element.addEventListener('click', function () {
            t.state.reset();
        });
        this.state_log_element.style.fontSize = font_size_px + "px";
        window.addEventListener('unload', function () {
            t.save_state_history_arr();
            t.save_delay_arr();
        });
    };
    AutoBuy.prototype.global_init = function () {
        if (window.g_auto_buy && window.g_auto_buy !== this)
            window.g_auto_buy.destroy();
        window.g_auto_buy = this;
    };
    AutoBuy.prototype.destroy = function () {
        for (var i = 0; i < this.cint_arr.length; i += 2) {
            var item = this.cint_arr[i];
            if (item[0] === 1)
                clearTimeout(item[1]);
            else if (item[0] === 2)
                clearTimeout(item[1]);
            console.log(item);
        }
    };
    AutoBuy.prototype.parse_single_int = function (string) {
        return parseInt(string);
    };
    AutoBuy.prototype.default_split = function (string) {
        return string.split(",");
    };
    AutoBuy.prototype.parse_delay_arr = function (data) {
        return this.default_split(data).map(this.parse_single_int);
    };
    AutoBuy.prototype.load_delay_arr = function () {
        var storage_data = localStorage.auto_buy_delay_str;
        if (!storage_data)
            return Array(12).fill(300);
        return this.parse_delay_arr(storage_data);
    };
    AutoBuy.prototype.update_dom = function () {
        this.hours_played_element.innerText = ((window.timeplayed / 30) / 60).toFixed(3) + " hours";
        if (!Number.isFinite(this.state.ratio)) {
            debugger;
        }
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
        // let cint = setTimeout(this.update_dom, 125, this);
        // this.cint_arr.push([1, cint, 'dom update_dom']);
    };
    AutoBuy.prototype.init = function () {
        this.delay_arr = this.load_delay_arr();
        // setTimeout(this.delayed_init, 200, this);
    };
    AutoBuy.prototype.delayed_init = function () {
        var t = this;
        this.global_init();
        this.init_dom();
        this.state.init();
        this.update_dom();
        this.main();
        var original_lightreset = window.lightreset;
        window.lightreset = lightreset_inject;
        window.specialclick = specialclick_inject;
        function lightreset_inject() {
            t.state_history_clear_for_reset();
            t.skip_save = true;
            window.addEventListener('unload', function () {
                t.skip_save = false;
                localStorage.auto_buy_delay_str = "300,300,300,300";
                localStorage.long_wait = 12000;
            });
            original_lightreset();
        }
    };
    AutoBuy.prototype.state_history_clear_for_reset = function () {
        this.state_history_arr = ["R"];
        localStorage.auto_buy_history_str = "R";
    };
    AutoBuy.prototype.state_history_append = function (value) {
        this.epoch_len++;
        var last = this.state_history_arr.at(-1);
        this.state_history_arr.push(value);
        if (this.state.debug)
            console.log('history append', last, value);
        while (this.state_history_arr.length > 120) {
            this.state_history_arr.shift();
        }
        function async_compress(self) {
            self.state_history_arr = self.compressor.compress_array(self.state_history_arr);
        }
        Promise.resolve(this).then(async_compress);
    };
    AutoBuy.prototype.history_element_click_handler = function (_event) {
        this.extra = this.calc_delay_extra();
        var cint = setTimeout(this.main, this.extra, this);
        this.cint_arr.push([1, cint]);
        this.delay_element.innerText = this.extra.toString();
        this.state_history_append(">");
    };
    AutoBuy.prototype.calc_delay_extra = function () {
        var max;
        while (this.delay_arr.length > 16) {
            this.delay_arr.shift();
        }
        ;
        for (var i = 0; i < this.delay_arr.length; i++) {
            this.extra += this.delay_arr[i];
            if (max !== void 0)
                max = Math.max(this.delay_arr[i], max);
            else
                max = this.delay_arr[i];
        }
        ;
        void max;
        return ~~(this.extra / this.delay_arr.length);
    };
    AutoBuy.prototype.is_epoch_over = function () {
        var epoch_diff = Date.now() - this.epoch_start_time;
        if (epoch_diff > 40 * 1000) {
            return true;
        }
        return false;
    };
    AutoBuy.prototype.main = function () {
        this.extra = this.calc_delay_extra();
        this.pre_total = window.totalAtome;
        do_auto_unit_promote();
        if (this.state.ratio > 1 && this.is_epoch_over())
            return this.reset_delay_init();
        if (this.pre_total != window.totalAtome)
            return this.step_iter_start();
        this.iter_count = 0;
        this.rare_begin_or_faster_delay();
    };
    AutoBuy.prototype.step_iter_start = function () {
        this.iter_count += 1;
        if (this.iter_count > 6) {
            return this.large_decrease();
        }
        else {
            return this.normal_decrease();
        }
        ;
    };
    AutoBuy.prototype.get_delay_change = function (pow_base, pow_num, div) {
        var pow_res = Math.pow(pow_base, pow_num);
        var res = this.extra * pow_res;
        return res / div;
    };
    AutoBuy.prototype.update_delay = function (change, decrease) {
        if (decrease === void 0) { decrease = false; }
        if (window.__testing__) {
            return;
        }
        var value = this.get_updated_delay(change, decrease);
        this.delay = value;
        this.delay_arr.push(value);
    };
    AutoBuy.prototype.get_updated_delay = function (change, decrease) {
        var value;
        if (decrease)
            value = this.extra - change;
        else
            value = this.extra + change;
        // floor the value
        return ~~value;
    };
    AutoBuy.prototype.do_delay_dec = function (pow_terms, div) {
        var iter_term = Math.pow(pow_terms[1], this.iter_count);
        var delay_change = this.get_delay_change(pow_terms[0], Math.log(window.totalAtome), div);
        this.update_delay(delay_change * iter_term, true);
        if (this.delay < 25)
            this.delay = 25;
    };
    AutoBuy.prototype.do_delay_inc = function (pow_terms, div) {
        var delay_change = this.get_delay_change(pow_terms[0], Math.log(window.totalAtome), div);
        this.update_delay(delay_change);
    };
    AutoBuy.prototype.large_decrease = function () {
        this.do_delay_dec([1.007, 1.05], 10);
        this.next_delay(this.main, this.extra, '!');
    };
    AutoBuy.prototype.normal_decrease = function () {
        this.do_delay_dec([1.006, 1.05], 10);
        this.next_delay(this.main, this.extra, '-');
    };
    AutoBuy.prototype.fast_unit_delay = function () {
        this.extra = this.calc_delay_extra();
        this.iter_count += 1;
        this.do_delay_dec([1.0065, 1.05], 10);
        this.next_delay(this.fast_unit, this.get_updated_delay(this.extra * 0.1, true), ':');
    };
    AutoBuy.prototype.next_delay = function (trg_fn, delay, char) {
        var cint = setTimeout(trg_fn.bind(this), delay);
        this.cint_arr.push([1, cint]);
        this.delay_element.innerText = delay.toString();
        this.state_history_append(char);
    };
    AutoBuy.prototype.rare_begin_or_faster_delay = function () {
        if (Math.random() < 0.05)
            return this.rare_begin();
        this.faster_delay();
    };
    AutoBuy.prototype.faster_delay = function () {
        this.do_delay_inc([1.007], 40);
        this.next_delay(this.main, this.extra, '+');
    };
    AutoBuy.prototype.fast_unit = function () {
        this.pre_total = window.totalAtome;
        do_auto_unit_promote();
        if (this.pre_total == window.totalAtome)
            this.slow_final();
        else
            this.fast_unit_delay();
    };
    AutoBuy.prototype.slow_final = function () {
        this.next_delay(this.main, this.extra, '$');
    };
    AutoBuy.prototype.bonus = function () {
        window.bonusAll();
        this.fast_unit_delay();
    };
    AutoBuy.prototype.special_delay = function () {
        this.next_delay(this.special, this.extra, '^');
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
    AutoBuy.prototype.bonus_delay = function () {
        this.next_delay(this.bonus, this.extra, '#');
    };
    AutoBuy.prototype.special = function () {
        if (this.do_special())
            this.special_delay();
        else
            this.bonus_delay();
    };
    AutoBuy.prototype.rare_begin = function () {
        this.do_delay_inc([1.008], 10);
        this.next_delay(this.initial_special, this.extra, '<');
    };
    AutoBuy.prototype.initial_special = function () {
        this.next_delay(this.special, this.extra, '>');
    };
    AutoBuy.prototype.reset_delay_trigger = function () {
        if (this.background_audio) {
            this.background_audio.muted = !this.background_audio.muted;
        }
        this.next_delay(this.reset_delay_start, 60 * 2 * 1000, 'trigger');
    };
    AutoBuy.prototype.reset_delay_start = function () {
        this.next_delay(this.reset_delay_start, 60 * 1000, 'reset_soon');
    };
    AutoBuy.prototype.reset_delay_run = function () {
        window.lightreset();
    };
    AutoBuy.prototype.reset_delay_init = function () {
        if (this.background_audio) {
            this.background_audio.muted = !this.background_audio.muted;
        }
        this.next_delay(this.reset_delay_start, 60 * 2 * 1000, 'reset_delay');
    };
    return AutoBuy;
}());
export { AutoBuy };
var auto_buy_obj = new AutoBuy;
var DoUnitPromoteExecutor = /** @class */ (function () {
    function DoUnitPromoteExecutor() {
    }
    DoUnitPromoteExecutor.prototype.run = function () {
        var out = [], maxed = [];
        for (var k = 0; k < window.arUnit.length; k++) {
            var afford = false;
            if (window.arUnit[k][16] == true || k == 0) {
                var type = window.Get_Unit_Type(k);
                var tmp = window.getUnitPromoCost(k);
                var cost = tmp;
                var next = window.Find_ToNext(k);
                if (next < 0) {
                    maxed[k] = true;
                }
                ;
                for (var i = 1; i <= 100; i++) {
                    if (window.totalAtome >= cost) {
                        tmp = tmp + (tmp * window.arUnit[k][3]) / 100;
                        var tar = (window.arUnit[k][4] * 1) + i;
                        var a = window._targets.indexOf(tar);
                        var reduction = 1;
                        if (a > -1 && tar <= 1000) {
                            var b = true;
                            for (var k2 in type[2]) {
                                var v2 = type[2][k2];
                                if (v2 != k && window.arUnit[v2][4] < tar) {
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
        if (res < 0) {
            return;
        }
        if (maxed[res]) {
            for (var y = 0; y < 100; y++) {
                window.mainCalc(res);
            }
        }
        else {
            window.tonext(res);
        }
    };
    return DoUnitPromoteExecutor;
}());
function do_auto_unit_promote() {
    var out = [], maxed = [];
    for (var k = 0; k < window.arUnit.length; k++) {
        var afford = false;
        if (window.arUnit[k][16] == true || k == 0) {
            var type = window.Get_Unit_Type(k);
            var tmp = window.getUnitPromoCost(k);
            var cost = tmp;
            var next = window.Find_ToNext(k);
            if (next < 0) {
                maxed[k] = true;
            }
            ;
            for (var i = 1; i <= 100; i++) {
                if (window.totalAtome >= cost) {
                    tmp = tmp + (tmp * window.arUnit[k][3]) / 100;
                    var tar = (window.arUnit[k][4] * 1) + i;
                    var a = window._targets.indexOf(tar);
                    var reduction = 1;
                    if (a > -1 && tar <= 1000) {
                        var b = true;
                        for (var k2 in type[2]) {
                            var v2 = type[2][k2];
                            if (v2 != k && window.arUnit[v2][4] < tar) {
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
    if (res < 0) {
        return;
    }
    if (maxed[res]) {
        for (var y = 0; y < 100; y++) {
            window.mainCalc(res);
        }
    }
    else {
        window.tonext(res);
    }
}
;
function map_to_tuple(e, i) {
    return [e, this[i]];
}
function to_tuple_arr(keys, values) {
    return keys.map(map_to_tuple, values);
}
function do_async_wait(delay) {
    function promise_exec(a) {
        setTimeout(a, delay);
    }
    return new Promise(promise_exec);
}
function array_sample_end(arr, rem_target_len) {
    arr = arr.slice(-300);
    var rem_len = char_len_of(arr);
    while (rem_len > rem_target_len) {
        var item = arr.shift();
        if (item !== void 0)
            rem_len -= item.length + 1;
    }
    return arr;
}
function char_len_of(arr) {
    return arr.reduce(function (a, b) { return a + b.length; }, 0) + arr.length;
}
//spell:words specialsbought atomsinvest checkspec specaps noti plurials updateprogress achiSpec
function specialclick_inject(that) {
    var allspec = window.allspec;
    var doc = window.doc;
    if (allspec[that].done == undefined)
        allspec[that].done = false;
    if (allspec[that].cost <= window.totalAtome && allspec[that].done == false) {
        var sb = doc.getElementById('specialsbought');
        if (!sb)
            throw new Error;
        sb.innerText = window.rounding(++window.specialsbought, false, 0);
        if (that == 74) {
        }
        window.atomsinvest += allspec[that].cost;
        var ae = doc.getElementById('atomsinvest');
        if (ae !== void 0 && ae !== null)
            ae.innerText = window.rounding(window.atomsinvest, false, 0);
        allspec[that].done = true;
        window.totalAtome -= allspec[that].cost;
        var diff1 = window.calcDiff(that);
        for (var a in window.arUnit[that][17])
            window.arUnit[that][17][a] *= 100;
        window.arUnit[that][5] *= 100;
        var specaps = 0;
        if (window.arUnit[that][4] > 0) {
            specaps = (window.calcDiff(that) - diff1);
            window.atomepersecond += specaps;
        }
        if (window.noti)
            window.gritter('Power-up !', window.toTitleCase(window.plurials(window.arrayNames[that])) + " X100 APS", null, "+" + window.rounding(specaps, false, 0) + " APS", "");
        window.updateprogress(that);
        window.$('#spec' + that).remove();
        (that < 74) ? window.seeUnit(that + 1) : window.seeUnit(that - 1);
        window.seeUnit(that);
        window.checkspec();
        window.achiSpec();
    }
}
function on_page_is_loaded() {
    remove_bad_dom_script_element();
    if (window.Pace.bar.progress == 100) {
        auto_buy_obj.init();
    }
    else {
        var original_pace_bar_finish_1 = window.Pace.bar.finish;
        window.Pace.bar.finish = function () {
            original_pace_bar_finish_1.call(this);
            auto_buy_obj.init();
        };
    }
}
var ProxyHandlers = /** @class */ (function () {
    function ProxyHandlers() {
    }
    ProxyHandlers.prototype.set_ = function (call_args, from) {
        return Reflect.set(call_args[0], call_args[1], call_args[2], call_args[3]);
    };
    ProxyHandlers.prototype.get_ = function (call_args, from) {
        return Reflect.get(call_args[0], call_args[1], call_args[2]);
    };
    ProxyHandlers.prototype.apply_ = function (call_args, from) {
        return Reflect.apply(call_args[0], call_args[1], call_args[2]);
    };
    ProxyHandlers.prototype.defineProperty_ = function (call_args, from) {
        return Reflect.defineProperty(call_args[0], call_args[1], call_args[2]);
    };
    ProxyHandlers.prototype.getOwnPropertyDescriptor_ = function (call_args, from) {
        return Reflect.getOwnPropertyDescriptor(call_args[0], call_args[1]);
    };
    return ProxyHandlers;
}());
var RandomKeepArray = /** @class */ (function (_super) {
    __extends(RandomKeepArray, _super);
    function RandomKeepArray() {
        return _super.call(this) || this;
    }
    RandomKeepArray.prototype.push = function (value) {
        var set_index = 0;
        var ret = this.push_at(set_index, value);
        while (this[set_index].length > 50) {
            value = this[set_index].shift();
            if (Math.random() > 0.9) {
                set_index++;
                this.push_at(set_index, value);
                console.log('psp', 1);
                var off = 0;
                while (this[set_index - off].length < 25) {
                    var val = this[set_index - off - 1].shift();
                    this[set_index - off].push(val);
                }
                off++;
                if (set_index - off < 0)
                    continue;
                console.log('psp', 2);
                while (this[set_index - off].length < 40) {
                    var val = this[set_index - off - 1].shift();
                    this[set_index - off].push(val);
                }
                off++;
                if (set_index - off < 0)
                    continue;
                console.log('psp', 3);
                while (this[set_index - off].length < 40) {
                    var val = this[set_index - off - 1].shift();
                    this[set_index - off].push(val);
                }
                off++;
                if (set_index - off < 0)
                    continue;
                console.log('psp', 4);
                while (this[set_index - off].length < 40) {
                    var val = this[set_index - off - 1].shift();
                    this[set_index - off].push(val);
                }
            }
            if (this[set_index].length <= 50 && set_index > 0) {
                set_index--;
            }
        }
        return ret;
    };
    RandomKeepArray.prototype.push_at = function (index, value) {
        while (index >= this.length) {
            return _super.prototype.push.call(this, []);
        }
        return this[index].push(value);
    };
    RandomKeepArray.prototype.push_va = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return this.push(a);
    };
    return RandomKeepArray;
}(Array));
function define_property_value(obj, name, value) {
    var props = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        props[_i - 3] = arguments[_i];
    }
    var _a = props[0], writable = _a === void 0 ? true : _a, _b = props[1], enumerable = _b === void 0 ? true : _b, _c = props[2], configurable = _c === void 0 ? true : _c;
    Object.defineProperty(obj, name, {
        value: value,
        writable: writable,
        enumerable: enumerable,
        configurable: configurable
    });
}
function got_jquery(jquery_func) {
    define_property_value(window, '$', jquery_func);
    var res = jquery_func('head');
    var r_proto = Object.getPrototypeOf(res);
    //cspell:words lazyload
    r_proto.lazyload = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        console.log.apply(console, __spreadArray(['lazyload'], a, false));
    };
    return jquery_func;
}
function reload_if_def(obj, key) {
    if (obj[key]) {
        document.body.innerHTML = "";
        document.head.innerHTML = "";
        debugger;
        setTimeout(function () { return location.reload(); });
        return true;
    }
    return false;
}
function proxy_jquery() {
    var val;
    if (window.$) {
        var res = window.$('head');
        var r_proto = Object.getPrototypeOf(res);
        r_proto.lazyload = function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            console.log.apply(console, __spreadArray(['lazyload'], a, false));
        };
        return;
    }
    Object.defineProperty(window, '$', {
        get: function () {
            if (val) {
                debugger;
            }
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
    if (args.length > 0) {
        throw new Error("pace apply used more than the expected arguments");
    }
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
function timer_wait_for_game_data(p_cint_item) {
    remove_cint_item(cint_arr, p_cint_item);
    WeakRef;
    var cint_item = [0, -1];
    var cint = setTimeout(wait_for_game_data, 0, cint_item);
    cint_item[1] = cint;
    cint_arr.push(cint_item);
}
function wait_for_game_data() {
    if (window._SM_Data) {
        on_game_data_set();
    }
    else {
        var cint_item = [0, -1];
        var cint = setTimeout(timer_wait_for_game_data, 0, cint_item);
        cint_item[1] = cint;
        cint_arr.push(cint_item);
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
    window.adsbygoogle = [];
    window.adsbygoogle.op = window.adsbygoogle.push;
    window.adsbygoogle.push = function (e) {
        window.adsbygoogle.op(e);
        remove_bad_dom_script_element();
    };
    var prev_node_prototype_insertBefore = Node.prototype.insertBefore;
    document.addEventListener('onContentLoaded', remove_bad_dom_script_element);
    var seen_proto = [];
    Node.prototype.insertBefore = function (node, child) {
        var res, p_res;
        if (node instanceof HTMLScriptElement) {
            var should_insert_1 = dom_add_elm_filter(node);
            if (!should_insert_1)
                return node;
        }
        if (child instanceof HTMLScriptElement) {
            var should_insert_1 = dom_add_elm_filter(child);
            if (!should_insert_1)
                return node;
        }
        res = node;
        p_res = Object.getPrototypeOf(res);
        if (!seen_proto.includes(p_res)) {
            seen_proto.push(p_res);
            console.log(res, p_res);
        }
        res = child;
        p_res = Object.getPrototypeOf(res);
        if (!seen_proto.includes(p_res)) {
            seen_proto.push(p_res);
            console.log(res, p_res);
        }
        return prev_node_prototype_insertBefore.call(this, node, child);
    };
    remove_bad_dom_script_element();
    window.on_on_timers_moved_first = true;
    var move_timers_to_worker = new Promise(move_timers_to_worker_promise_executor);
    move_timers_to_worker.then(on_timers_moved);
    setTimeout(remove_bad_dom_script_element, 0);
    window.document_write_list = new DocumentWriteList;
    document.stop = function () { };
}
main();
