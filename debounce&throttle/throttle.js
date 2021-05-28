var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = throttle1(getUserAction, 1000, true);


/**
* @desc 节流第一版
* @author 张和潮
* @date 2021年05月28日 08:56:30
*/
function throttle1(func, wait){
    let timeout;
    let context, args;
    
    return function(){
        context = this;
        args = arguments;
        if(!timeout){
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args)
            },wait)
        }
    }
}