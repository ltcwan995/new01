/**
 * Created by Lenovo on 2016/4/18.
 */

function scroll(){
    //1.判断，浏览器如果支持window.pageYOffset;那么直接使用
    if(window.pageYOffset != undefined){
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        };
        //2.要看浏览器也面有没有DTD约束。如果没有执行document.body.scrollTop;
    }else if(document.compatMode === "BackCompat"){
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        };
    }
    return {
        top: document.documentElement.scrollTop,
        left: document.documentElement.scrollLeft
    };
    //3.否则执行document.documentElement.scrollTop;
    //4.返回一个json,key分别问top和left；
}


//缓动框架
function animate(obj,target){
    //要用定时器，先清定时器（定时器最好绑定在要移动的盒子上）
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        //3.缓动公式
        //获取步长
        var step = (target-obj.offsetTop)/10;
        //处理步长，让他<0下取整，>0向上取整。这样，我们能够取到-1和1.
        step = step>0?Math.ceil(step):Math.floor(step);
        obj.style.top = obj.offsetTop+step+"px";
        //运动到指定位置
        if(target==obj.offsetTop){
            clearInterval(obj.timer);
        }
    },20)
}