var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = throttle3(getUserAction, 1000, {
    // trailing: false
    leading: false
});


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

/**
* @desc 节流第二版 
* @author 张和潮
* @date 2021年05月29日 13:21
*/
function throttle2(func, wait){
    let context, args;
    let pervious = 0;

    return function(){
        const now = +new Date()

        context = this;
        args = arguments;
        
        if(now - pervious > wait){
            func.apply(context, args)
            pervious = now;
        }
    }
}

/**
* @desc 节流第三版
* @author 张和潮
* @date 2021年05月29日 21:16
*/
function throttle3(func, wait, options = {}) {
    let context, args, timeout;
    let previous = 0;
    
    const later = function(){
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;

        func.apply(context, args);
        if(!timeout){
            context = args = null
        }
    }

    const throttle = function(){
        let now = new Date().getTime();

        if(!previous && options.leading === false){
            previous = now;
        }

        let remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if(remaining <= 0 || remaining > wait){
            if(timeout){
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if(!timeout){
                context = args = null;
            }
        }else if(!timeout && options.trailing !== false){
            timeout = setTimeout(later, remaining);
        }
    };
    return throttle;
}