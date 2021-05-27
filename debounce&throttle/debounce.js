var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = debounce2(getUserAction, 1000, true);

/**
* @desc 防抖第一版
* @author 张和潮
* @date 2021年05月27日 22:55
*/
function debounce1(func, wait) {
    let timeout;
    
    return function(){
        let context = this;
        let args = arguments;

        clearTimeout(timeout);

        timeout = setTimeout(() =>{
            func.apply(context, args)
        }, wait)
    }
}

/**
* @desc 防抖第二版：增加是否立即执行
* @author 张和潮
* @date 2021年05月27日 23:01
*/
function debounce2(func, wait, immediate){
    let timeout;

    return function() {
        let context = this;
        let args = arguments;

        if (timeout) {
            clearTimeout(timeout)
        }
        if (immediate) {
            let canCall = !timeout;
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if (canCall) {
                func.apply(context. args)
            }   
        }else{
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}