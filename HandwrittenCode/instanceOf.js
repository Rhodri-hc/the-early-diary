/**
* @desc 手写 instanceof 方法
* @author 张和潮
* @date 2021年11月19日 23:11
*/
function instanceof(left, right) {
    // 获取对象的原型
    let proto = Object.getPrototypeOf(left);
    // 获取构造函数的 prototype 对象
    let prototype = right.prototype; 
  
    // 判断构造函数的 prototype 对象是否在对象的原型链上
    while (true) {
      if (!proto) return false;
      if (proto === prototype) return true;
  
      proto = Object.getPrototypeOf(proto);
    }
  }