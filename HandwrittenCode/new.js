/**
* @desc 手写 new 操作符
* @author 张和潮
* @date 2021年11月21日 15:53
*/
/**
 * 在调用 new 的过程中会发生以上四件事情：
 * （1）首先创建了一个新的空对象
 * （2）设置原型，将对象的原型设置为函数的 prototype 对象
 * （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
 * （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
 */
function myNew(){
    let newObj = null;
    let constructor = Array.prototype.shift.call(arguments);
    let result = null;

    // 判断参数是否是一个函数
    if(typeof constructor !== "function"){
        return;
    }

    // 新建一个空对象，对象的原型为构造函数的 prototype 对象
    newObj = Object.create(constructor.prototype);
    // 将 this 指向新建对象，并执行函数
    result = constructor.apply(newObj, arguments);
    // 判断返回对象
    let isObj = result && (typeof result === "object" || type result === "function");
    // 判断返回结果
    return isObj ? result : newObj;
}

// 使用方法
// myNew(构造函数, 初始化参数)