console.log(motor);
var rootPath = motor.imageRootPath + '/';
var motorList = motor.color;
//默认加载第一款
var $index = 0;
//默认加载向右 frontImage    向左 backImage
var $Position = "frontImage";
//motot颜色 加载数据
for(var i in motorList){
    //加载颜色
    $("#content .click ol").append('<li onclick=""><image src="' + rootPath + motorList[i].icon + '"></image><i class="active"></i></li>');
}
//切换颜色 重置
$("#content .left .click ol li").on('click',function(){
    $index = $(this).index();
    $(this).find("i").css("display","block");
    $(this).siblings().find("i").css("display","none");
    $("#priceList").html("");
	$(".tit>.type").text(motorList[$index].modelName);
	$(".name").children().eq(0).text(motorList[$index].modelName);
    $("#motoColor").text(motorList[$index].name);
    $(".money1>span").text(accounting.formatMoney(motorList[$index].price,""));
    $(".money2>span").text(accounting.formatMoney(motorList[$index].price,""));
    _loadMotor();
    _loadAccessory();
    $('#main ul').animate({left:0});
    num = 0;
    oldNum = 0;
})
//切换方向
$(".click ul li").on("click",function () {
    var _index = $(this).index();
    $(this).children().eq(0).attr("src","img/buttom_"+_index+".png");
    $(this).siblings().children().eq(0).attr("src","img/buttom_0"+_index+".png");
    $Position = _index == 0 ? "frontImage" : "backImage";
    for(var i=0,len=$("#motors-f img").length;i<len;i++){
        if(_index == 1){
            $("#motors-f img").eq(i).attr("src",$("#motors-f img").eq(i).attr("src").replace("/F/","/R/"));
        }else{
            $("#motors-f img").eq(i).attr("src",$("#motors-f img").eq(i).attr("src").replace("/R/","/F/"));
        }
    }
})
//加载默认样式
$(".tit>.type").text(motorList[$index].modelName);
$(".name").children().eq(0).text(motorList[$index].modelName);
$("#content .click ol li").eq($index).find("i").css("display","block");
$("#motoColor").text(motorList[$index].name);
$(".money1>span").text(accounting.formatMoney(motorList[$index].price,""));
$(".money2>span").text(accounting.formatMoney(motorList[$index].price,""));
//加载
function _loadMotor() {
    $("#motors-f").html("");
    $("#motors-f").append('<img class="fadeIn" src="' + rootPath + motorList[$index][$Position] + '" />');
    for(var i in motorList[$index].accessoryList){
        //标配
        if(motorList[$index].accessoryList[i].type == "S"){
            $("#motors-f").append('<img class="fadeIn" style="z-index:' + motorList[$index].accessoryList[i].layer + ';display: block;" src="' + rootPath + motorList[$index].accessoryList[i][$Position] + '" data-id="'+motorList[$index].accessoryList[i].id+'" />');
        }
        //选配
        if(motorList[$index].accessoryList[i].type == "O"){
            $("#motors-f").append('<img class="fadeIn" style="z-index:' + motorList[$index].accessoryList[i].layer + ';display: none;" src="' + rootPath + motorList[$index].accessoryList[i][$Position] + '" data-id="'+motorList[$index].accessoryList[i].id+'" />');
        }
    }
}
_loadMotor();
//点击360
$(".rotate").on("click",function () {
    $("#tankuang-bg").css("display",'block');
    document.documentElement.style.overflow = "hidden";
    var path = motorList[$index].aroundImages[0].image;
    $("#image360").attr("src",rootPath+motorList[$index].aroundImages[0].image);
    $("#image360").reel({
        images:rootPath + path.slice(0,path.match(/\/[0-9]{3}\./)['index']+1) + "###" + path.slice(path.match(/\/[0-9]{3}\./)['index']+4,path.length),
        frames:20,
        frame:4,
        cw:true,
        rows:4,
        row:2,
        speed:0,
        preloader:0,
        velocity:"2.0"
    })
})
//	关闭360
$("#tankuang-bg .bg-close").on('click',function(){
    $("#tankuang-bg").css("display",'none');
    document.documentElement.style.overflow = "";
})
//加载配件
function _loadAccessory() {
    $("#parts").html("");
    var len = 0;
    for(var j in motorList[$index].accessoryList){
        //选配type
        if(motorList[$index].accessoryList[j].type == "O"){
            len += 1
            $("#parts").append('<li>'+
                '<img data-index="'+j+'" src="'+rootPath+motorList[$index].accessoryList[j].image+'" type="button" class="btn btn-primary btn-lg imgActive" data-toggle="modal" data-target="#myModal"/>'+
                '<img src="./img/parts_selected.png" data-id="'+motorList[$index].accessoryList[j].id+'" style="display: none;pointer-events: none" />'+
                //'<em></em>'+
                '<select disabled="disabled" name="">'+
                '<option value="'+motorList[$index].accessoryList[j].colorName+'">'+motorList[$index].accessoryList[j].colorName+'</option>'+
                '</select>'+
                '<p>'+motorList[$index].accessoryList[j].name+'</p>'+
                '<span>'+motorList[$index].accessoryList[j].subtitle+'</span>'+
                '<i type="button" onclick="accessoryDetail('+$index+','+ j +')" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal1"></i>'+
                '</li>')
        }
    }
    $("#parts").width(234 * len);
}
_loadAccessory();
//配件详情
accessoryDetail = function(_index,j) {
    $(".modal-body1").find("img").attr('src',rootPath + motorList[_index].accessoryList[j].image);
    $(".modal-footer1>p>i").html(motorList[_index].accessoryList[j].price);
    $(".paretsName").html(motorList[_index].accessoryList[j].name);
    $(".paretsNumber").html("Code " + motorList[_index].accessoryList[j].shortName);
}
//选中配件
$("#parts").on('click',"li .imgActive",function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var _index = $(this).attr("data-index");
    var accessory = motorList[$index].accessoryList[_index];
	 if( $(this).parent().find(" img[data-id='8a828084687581b70168e5f5b9050060'] ").css("display") == "none" ){
		$("#motors-f img[data-id='8a828084687581b70168e06937480043']").addClass("hidden");
	}
	if( $(this).parent().find(" img[data-id='8a828084687581b70168e5f5b9050060'] ").css("display") == "block" ){
		$("#motors-f img[data-id='8a828084687581b70168e06937480043']").removeClass("hidden");
	}
    if(accessory.dependentList.length === 0 && accessory.dependentByList.length === 0){
        //没有依赖
        if($(this).next().css("display") == "none"){
            projectList(accessory,"add");
        }else if($(this).next().css("display") == "block"){
            projectList(accessory,"remove");
        }
        $(this).next().css("display") == "none" ? $(this).next().css("display","block") : $(this).next().css("display","none");
        $("#motors-f img[data-id="+accessory.id+"]").css("display") == "none" ? $("#motors-f img[data-id="+accessory.id+"]").css("display","block") : $("#motors-f img[data-id="+accessory.id+"]").css("display","none");
    }else{
        //有依赖关系
        if($(this).next().css("display") === "none"){
            //显示配件
            if(accessory.dependentList.length === 0){
                $(this).next().css("display","block");
                $("#motors-f img[data-id="+accessory.id+"]").css("display","block");
                projectList(accessory,"add");
            }else{
                var idArr = [],textArr = [];
                for(var i in accessory.dependentList){
                    if($("#parts img[data-id="+accessory.dependentList[i].id+"]").css("display") === "none"){
                        idArr.push(accessory.dependentList[i]);
                        textArr.push('<li> - '+accessory.dependentList[i].name+'</li>');
                    }
                }
                addAccessory($(this),accessory,idArr,textArr);
            }
        }else{
            //隐藏配件
            for(var i in accessory.dependentByList){
                $("#parts img[data-id="+accessory.dependentByList[i].id+"]").css("display","none");
                $("#motors-f img[data-id="+accessory.dependentByList[i].id+"]").css("display","none");
                projectList(accessory.dependentByList[i],"remove");
            }
            $(this).next().css("display","none");
            $("#motors-f img[data-id="+accessory.id+"]").css("display","none");
            projectList(accessory,"remove");
        }
    }
});
//添加配件
function addAccessory(ele,accessory,arr,textArr) {
    if(arr.length === 0){
        //当前配件已经显示
        $("#parts img[data-id="+accessory.id+"]").css("display","block");
        $("#motors-f img[data-id="+accessory.id+"]").css("display","block");
        projectList(accessory,"add");
        return;
    }
    $(".modalAddList").html(textArr);
    $("#myModal").modal();
    //点击确认
    determine = function() {
        ele.next().css("display","block");
        $("#motors-f img[data-id="+accessory.id+"]").css("display","block");
        projectList(accessory,"add");
        for(var i in arr){
            $("#parts img[data-id="+arr[i].id+"]").css("display","block");
            $("#motors-f img[data-id="+arr[i].id+"]").css("display","block");
            projectList(arr[i],"add",true);
        }
    }
}
//项目清单操作
var projectList = function(obj,type,IsDependent){
    if(type == "add"){
        if(IsDependent){
            motorList[$index].accessoryList.map(function (t) {
                if(obj.id === t.id){
                    obj.price = t.price;
                }
            })
        }
        $("#priceList").append('<li name='+obj.id+'>'+
            '<div class="listName">'+
            '<span>'+obj.name+'</span>'+
            '<span class="listPrice"><b>'+accounting.formatMoney(obj.price,"")+'</b>&nbsp;RMB</span>'+
            '</div>'+
            '<div class="listCla">'+
            '<span>'+obj.colorName+'</span>'+
            '<span><img src="img/delete.png" onclick="removeList(\''+obj.id+'\')" /></span>'+
            '</div>'+
            '</li>')
        addAttrSelect(obj.id);
    }else if(type == "remove"){
        var id = obj.id;
        $("#priceList").find("li[name="+id+"]").remove();
        removeAttrSelect(obj.id);
    }
    initMoney();
}
initMoney = function(){
    //	accounting.unformat	换整
    //	accounting.formatMoney	换货币
    //货币
    var len = $("#priceList").children().length;
    var sum = 0;
    for(var i=0;i<len;i++){
        sum += Number(accounting.unformat($(".listPrice>b").eq(i).html()));
    }
    var num = Number(sum.toFixed(2));
    $(".money2>span").html(accounting.formatMoney(num+accounting.unformat($(".money1>span").html()),""));
}
//清除列表样式
removeList = function(id){
    $("#priceList").find("li[name="+id+"]").remove();
    $("#parts img[data-id="+id+"]").css("display","none");
    $("#motors-f img[data-id="+id+"]").css("display","none");
    motorList[$index].accessoryList.map(function (t) {
        if(id === t.id && t.dependentByList.length !== 0){
            for(var i in t.dependentByList){
                $("#parts img[data-id="+t.dependentByList[i].id+"]").css("display","none");
                $("#motors-f img[data-id="+t.dependentByList[i].id+"]").css("display","none");
                removeAttrSelect(t.dependentByList[i].id);
                projectList(t.dependentByList[i],"remove");
            }
        }
    })
    initMoney();
}
//	点击视频
$(".video").on("click",function(){
    $("#video")[0].play();
    $("#videoModel-bg").css("display","block");
    document.documentElement.style.overflow = "hidden";
})
$("#videoModel-bg .bg-close").on("click",function(){
    $("#video")[0].pause();
    $("#videoModel-bg").css("display","none");
    document.documentElement.style.overflow = "";
})
//	点击图库
$(".mapDepot").on('click',function(){
    $("#picModel").css("display",'block');
    document.documentElement.style.overflow = "hidden";
})
$("#picModel .bg-close").on('click',function(){
    $("#picModel").css("display",'none');
    document.documentElement.style.overflow = "";
})
//	点击图库中的图片
var picIndex = 0;
$('#popupPic .small ul li').on('click',function(){
    picIndex=$(this).index();
    move();
})
$('.prev1').on('click',function(){
    picIndex--;
    if(picIndex<0){
        picIndex=$("#popupPic .small ul li").length-1;
    }
    move();
})
$('.next1').on('click',function(){
    picIndex++;
    if(picIndex>$("#popupPic .small ul li").length-1){
        picIndex=0;
    }
    move();
})
function move(){
    $("#popupPic .small ul li span").eq(picIndex).addClass('hover').parent().siblings().children().removeClass('hover');
    $('#popupPic .big .bigPic img').attr({"src":$("#popupPic .small ul li span").eq(picIndex).siblings().children().attr("src")});
}
$("#popupPic .small ul li span").eq(picIndex).addClass('hover').parent().siblings().children().removeClass('hover');
$("#popupPic .bigPic").html('<img src="'+$("#popupPic .small ul li").eq(picIndex).find("img").attr("src")+'" />');
//添加 样式
function addAttrSelect(id){
    $('#main .data2 ul li img[data-id='+id+']').next("select").css("color","#333");
    $('#main .data2 ul li img[data-id='+id+']').next("select").removeAttr("disabled");
}
//移除 样式
function removeAttrSelect(id){
    $('#main .data2 ul li img[data-id='+id+']').next("select").css("color","#ccc");
    $('#main .data2 ul li img[data-id='+id+']').next("select").attr("disabled","disabled");
}
//	配件滚动
var num = 0;
var oldNum = 0;
$('.prev').attr("disabled",false);
$('.next').attr("disabled",false);
$('.next').on('click',function(){
    if($("#parts li").length <= 5){
        return false;
    }
    if(num!=-($("#main .data2 ul li").length-5)){
        num--;
        var $end = num*234;
        $('#main ul').animate({left:$end})
        oldNum = num;
    }
    else if(num==-($("#main .data2 ul li").length-5)){
        $('.prev').attr('disabled',true);
    }
})
$('.prev').on('click',function(){
    if($("#parts li").length <= 5){
        return false;
    }
    if(num!=0){
        num++;
        var $end = num*234;
        $('#main ul').animate({left:$end});
        oldNum = num;
    }
    else if(num==0){
        $('.next').attr('disabled',true);
    }
})