/**
* @desc 原型链继承
* 存在问题：
*       1、原型中包含的引用类型属性将被所有实例共享；
*       2、子类在实例化的时候不能给父类构造函数传参
* @author 张和潮
* @date 2022年06月23日 16:05:40
*/
function Animal() {
    this.colors = ['black', 'white']
}

Animal.prototype.getColors = function(){
    return this.colors;
}

function Dog(){}

Dog.prototype = new Animal()

let dog1 = new Dog()

dog1.colors.push('brown')
let dog2 = new Dog()

console.log(dog2.colors); // ['black', 'white', 'brown']



/**
* @desc 借用构造函数实现继承
* @params 引用类型共享问题以及传参问题。但是由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法。
* @author 张和潮
* @date 2022年06月23日 16:35:31
*/
function Animal(name){
    this.name = this.name;
    this.getName = function(){
        return this.name;
    }
}

function Dog(name){
    Animal.call(this, name)
}

Dog.prototype = new Animal()



/**
* @desc 组合继承
* 组合继承结合了原型链和盗用构造函数，将两者的优点集中了起来。
* 基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。
* 这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。
* @author 张和潮
* @date 2022年06月23日 17:55:03
*/
function Animal(name) {
    this.name = name;
    this.colors = ['black', 'white'];
}
Animal.prototype.getName = function(){
    return this.name
}

function Dog(name, age) {
    Animal.call(this, name);
    this.age = age;
}

Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

const dog11 = new Dog('奶昔', 2)
dog1.colors.push('brown');

const dog22 = new Dog('哈蛤', 1)
console.log(dog22);


/**
* @desc class 实现继承
* @author 张和潮
* @date 2022年06月23日 18:06:41
*/
class Animal {
    constructor(name) {
        this.name = name
    } 
    getName() {
        return this.name
    }
}
class Dog extends Animal {
    constructor(name, age) {
        super(name)
        this.age = age
    }
}