/**
* @desc 手写Object.create()
* @desc 将传入的对象作为原型
* @author 张和潮
* @date 2021年11月19日 23:08
*/
function create(obj) {
    function F(){};

    F.prototype = obj;
    return new F();
}