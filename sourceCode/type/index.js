/**
* @desc  判断Undefined
* @author 张和潮
* @date 2022年07月21日 12:01:58
*/
function isUndefined(val) {
    return typeof val === 'undefined';
}

/**
* @desc 判断 buffer
* @author 张和潮
* @date 2022年07月21日 11:50:04
*/
function isBuffer(val){
    // 先判断不是 `undefined`和`null`
    // 再判断 `val`存在构造函数，因为`Buffer`本身是一个类
    // 最后通过自身的`isBuffer`方法判断
    return val !== null 
                && !isUndefined(val) 
                && val.constructor !== null 
                && !isUndefined(val.constructor)
                && typeof val.constructor.isBuffer === 'function' 
                && val.constructor.isBuffer(val);
}

/**
* @desc 判断FormData
* @author 张和潮
* @date 2022年07月21日 12:04:10
*/
function isFormData(val) {
    // `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
* @desc  判断 纯对象
* @author 张和潮
* @date 2022年07月21日 12:07:45
*/
function isPlainObject(val) {
    // 纯对象： 用{}或new Object()创建的对象。

    if (Object.prototype.toString.call(val) !== '[object Object]') {
      return false;
    }
  
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
  

/**
* @desc  判断文件类型
* @author 张和潮
* @date 2022年07月21日 12:10:34
*/
function isFile(val) {
    return Object.prototype.toString.call(val) === '[object File]';
}

/**
* @desc 判断Blob
* @author 张和潮
* @date 2022年07月21日 12:11:37
*/
function isBlob(val) {
    return Object.prototype.toString.call(val) === '[object Blob]';
}

/**
* @desc 判断是否是流
* @author 张和潮
* @date 2022年07月21日 12:12:06
*/
function isStream(val) {
    // 这里`isObject`、`isFunction`为上文提到的方法
    return isObject(val) && isFunction(val.pipe);
}

/**
* @desc 判断URLSearchParams
* @author 张和潮
* @date 2022年07月21日 12:13:56
*/
function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
* @desc 去除首尾空格
* @author 张和潮
* @date 2022年07月21日 12:15:21
*/
function trim(str) {
    // `trim`方法不存在的话，用正则
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
* @desc 判断标准浏览器环境
* @author 张和潮
* @date 2022年07月21日 12:16:01
*/
function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                             navigator.product === 'NativeScript' ||
                                             navigator.product === 'NS')) {
      return false;
    }
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    );
}

/**
* @desc 移除数组
* @author 张和潮
* @date 2022年07月21日 15:18:23
*/
const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1);
    }
};
/**
 * splice 其实是一个很耗性能的方法。删除数组中的一项，其他元素都要移动位置。
 * 
 * 引申：axios InterceptorManager 拦截器源码 中，拦截器用数组存储的。但实际移除拦截器时，只是把拦截器置为 null 。
 * 而不是用splice移除。最后执行时为 null 的不执行，同样效果。axios 拦截器这个场景下，不得不说为性能做到了很好的考虑。
 * 
 */

/**
* @desc 是不是函数
* @author 张和潮
* @date 2022年07月21日 15:27:13
*/
const isFunction = (val) => typeof val === 'function';

/**
* @desc 判断是不是 Promise
* @author 张和潮
* @date 2022年07月21日 15:26:36
*/
const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

/**
* @desc 判断是不是数字型的字符串key值
* @author 张和潮
* @date 2022年07月21日 15:34:13
*/
const isIntegerKey = (key) => isString(key) &&
                                key !== 'NaN' &&
                                key[0] !== '-' &&
                                '' + parseInt(key, 10) === key;

/**
* @desc cacheStringFunction 缓存
* @author 张和潮
* @date 2022年07月21日 15:46:22
*/
const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return ((str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
/**
* @desc 获取单例
* @author 张和潮
* @date 2022年07月21日 15:47:17
*/
var getSingle = function(fn){
    var result;
    return function(){
        return result || (result = fn.apply(this, arguments));
    }
};


/**
* @desc 判断是不是有变化
* @author 张和潮
* @date 2022年07月21日 15:48:49
*/
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);


/**
* @desc getGlobalThis 全局对象
* @author 张和潮
* @date 2022年07月21日 16:14:32
*/
let _globalThis;
const getGlobalThis = () => {
    return (_globalThis ||
        (_globalThis =
            typeof globalThis !== 'undefined'
                ? globalThis
                : typeof self !== 'undefined'
                    ? self
                    : typeof window !== 'undefined'
                        ? window
                        : typeof global !== 'undefined'
                            ? global
                            : {}));
};

/**
 * 
获取全局 this 指向。
初次执行肯定是 _globalThis 是 undefined。所以会执行后面的赋值语句。
如果存在 globalThis 就用 globalThis。MDN globalThis
如果存在self，就用self。在 Web Worker 中不能访问到 window 对象，但是我们却能通过 self 访问到 Worker 环境中的全局对象。
如果存在window，就用window。
如果存在global，就用global。Node环境下，使用global。
如果都不存在，使用空对象。可能是微信小程序环境下。
 
 */