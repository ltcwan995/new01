/**
 * Created by admin on 2016/10/19.
 */
$(function () {
    //banner();
    initProduct();
    $('#bao').tooltip();
});
//轮播图动态生成
function banner(){
    $(window).on("resize", function () {
        //图片的位置信息
        var imgInfo=[
            {
                bac:"url(images/slide_01_2000x410.jpg)",
                img:"images/slide_01_640x340.jpg"
            },
            {
                bac:"url(images/slide_02_2000x410.jpg)",
                img:"images/slide_02_640x340.jpg"
            },
            {
                bac:"url(images/slide_03_2000x410.jpg)",
                img:"images/slide_03_640x340.jpg"
            },
            {
                bac:"url(images/slide_04_2000x410.jpg)",
                img:"images/slide_04_640x340.jpg"
            }
        ];
        //判断当前设备是否是移动设备
        var isMobile = true;
        var width = $(window).width();
        if(width<768){
            isMobile = true;
        }else{
            isMobile = false;
        };
        //传入imgBox的数据
        var data={
            isMobile:isMobile,
            imgInfo:imgInfo
        };
        //渲染imgBox
        var html =template("imgBox",data);
        $("#inner").html("");
        $("#inner").append(html);
        //渲染pointBox
        var points = template("pointBox",{leg:imgInfo.length});
        $("#points").html("");
        $("#points").append(points);
        //实现滑动功能
        var isMove = false;
        var startX = 0;
        var moveX = 0;
        var distanceX=0;
        $("#inner").on("touchstart", function (e) {
            startX = e.originalEvent.touches[0].clientX;
        }).on("touchmove", function (e) {
            moveX = e.originalEvent.touches[0].clientX;
            isMove = true;
        }).on("touchend", function (e) {
            distanceX = moveX - startX;
            if(Math.abs(distanceX)>50&&isMove){
                if(distanceX<0){
                    //下一张
                    $('#carousel-example-generic').carousel('next');
                }else if(distanceX>0){
                    //上一张
                    $('#carousel-example-generic').carousel('prev');
                }
            }
        })
    }).trigger("resize");
}
function initProduct(){
    var $parent = $(".wjs_product_tabs_parent");
    var $ul = $parent.find("ul");
    var $lis = $ul.find("li");
    var sum = 0;
    $lis.each(function (index,item) {
        //width()取得是内容的宽度
        //innerWidth()取的是内容和内边距的宽度
        sum+= $(item).innerWidth();
        //console.log($(item).innerWidth());
    });
    //console.log(sum);
    $ul.width(sum);
    wjs.iScroll({
        swipeDom:$parent[0],//父容器的DOM元素
        swipeType:"x",//活动的方向
        swipeDistance:20//缓冲距离
    });
}
