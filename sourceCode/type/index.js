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