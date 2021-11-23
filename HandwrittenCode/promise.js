/**
* @desc 手写 Promise 
* @author 张和潮
* @date 2021年11月21日 17:09
*/

const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(){
    // 保存初始化状态
    let self = this;

    // 初始化状态
    this.state = PENDING;

    // 用于保存 resolved 或者 rejected 传入的值
    this.value = null;

    // 用于保存 resolve 的回调函数
    this.resolvedCallbacks = [];
    // 用于保存 reject 的回调函数
    this.rejectedCallbacks = [];

    // 状态转变为 resolved 的方法
    function resolve(value){
        // 判断传入元素是否为 Promise 值，
        // 如果是，则状态改变必须等待前一个状态改变后再进行改变
        if (value instanceof MyPromise) {
            return value.then(resolve, reject);
        }

        // 保证代码的执行顺序为本轮事件循环的末尾
        setTimeout(() => {
            // 只有状态为 pending 时才能转变
            if (self.state === PENDING) {
                // 修改状态
                self.state = RESOLVED;
                // 设置传入的值
                self.value = value;

                // 执行回调函数
                self.resolvedCallbacks.forEach(cb => {
                    cb(value);
                })
            }
        }, 0);
    }

    // 状态转变为 rejected 方法
    function reject(value) {
        // 保证代码的执行顺序为本轮事件循环的末尾
        setTimeout(() => {
            // 只有状态为 pending 时才能转变
            if (self.state === PENDING) {
                // 修改状态
                self.state = REJECTED;
                // 设置传入的值
                self.value = value;

                // 执行回调函数
                self.rejectedCallbacks.forEach(cb => {
                    cb(value);
                })
            }
        }, 0);
    }

    // 将两个方法传入函数执行
    try {
        fn(resolve, reject);
    } catch (error) {
        // 遇到错误时，捕获错误，执行 reject 函数
        reject(error);
    }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
    // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
    onResolved = 
        typeof onResolved === "function"
            ? onResolved
            : function(value) {
                return value;
              };
    
    onRejected = 
        typeof onResolved === "function"
            ? onResolved
            : function(error) {
                 throw error;
              };
    
    // 如果是等待状态，则将函数加入对应的列表中
    if (this.state === PENDING) {
        this.resolvedCallbacks.push(onResolved);
        this.rejectedCallbacks.push(onRejected);
    }

    // 如果状态已经凝固，则直接执行对应状态的函数
    if (this.state === RESOLVED) {
       onResolved(this.value); 
    }

    if (this.state === REJECTED) {
        onRejected(this.value);
    }
}

/**
* @desc 手写Promise.then
* @author 张和潮
* @date 2021年11月23日 21:56
*/
/**
 * then 方法返回一个新的 promise 实例，为了在 promise 状态
 * 发生变化时（resolve/ reject被调用时）在执行 then 里的函数，
 * 我们使用一个 callbacks 数组先把传给 then 的函数暂存起来，等状态
 * 改变时再调用。
 */
then(onFulfilled, onReject){
    // 保存前一个promise 的 this
    const self = this;
    return new MyPromise((resolve, reject)=> {
        // 封装前一个promise成功时执行的函数
        let fulfilled = () => {
            try {
                // 承前
                const result = onFulfilled(self.value);
                // 启后
                return result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
            } catch (error) {
                reject(error)
            }
        }

        // 封装前一个Promise 失败时执行的函数
        let rejected = () =>{
            try {
                const result = onReject(self.reason);
                return result instanceof MyPromise ? result.then(resolve, reject) : reject(result)
            } catch (error) {
                reject(error);
            }
        } 

        // 状态判断
        switch (self.status) {
            case PENDING:
                self.resolvedCallbacks.push(fulfilled);
                self.rejectedCallbacks.push(rejected);
                break;
        
            case RESOLVED: 
                fulfilled();
                break;
            
            case REJECTED: 
                rejected();
                break;
        }
    })
}