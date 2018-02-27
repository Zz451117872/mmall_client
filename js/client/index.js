$(document).ready(function(){
	//初始化页面
	initPage();
	//加载所有产品分类信息
	sendRequest("category/client_get_top_category.do",{},loadCategoryInfoFallback);
	
	$("#keyword").focus(function(){
		$(this).val("");
	});
	//给 按产品名称关键字查看产品 按钮 添加失去焦点事件，加载满足条件的产品集合
	$("#keyword").blur(function(){
		var keyword = $(this).val();
		$("#search").attr("href","src/protal/product/product_list.html"+"?keyword="+keyword);
		$(this).val("请输入商品名称");
	});
	//给退出登录 按钮 添加点击事件
	$("#quit_button").click(function(){
		sendRequest("user/logout.do",{},quitFallback);
	});
	
});
//加载产品分类 回调函数
function loadCategoryInfoFallback(categorys)
{
	if(categorys != null)
	{
		$(".new_add_category").remove();
		for(var i=0; i<categorys.length; i++)
		{
			var div = $("<div class='new_add_category' style='width: 100%;'></div>");
			fillCategoryToPage(categorys[i],div);
			$("#product_category").append(div);
		}
	}
}
//填充产品分类信息到页面
function fillCategoryToPage(category,div)
{				
	var childs = category.childs;
	if(childs != null)
	{			
		var p = $("<p>"+category.name+"<br></p>");
		div.append(p);
		for(var i=0; i<childs.length; i++)
		{
			fillCategoryToPage(childs[i],div);
		}
	}else{
		var a= $("<a target='info_show'>"+category.name+"|&nbsp;"+"</a>");
		$(a).attr("href","src/protal/product/product_list.html"+"?categoryId="+category.id);
		div.append(a);
	}
}
//登录成功 与 未登录状态 显示不同的页面信息
function initPage()
{
	var mmall_username = $.cookie("mmall_username");
	if(mmall_username == null || mmall_username == "")
	{
		$(".is_nologin").show();
		$(".is_login").hide();		
	}else{
		$("#welcome").text("欢迎:"+mmall_username);
		$(".is_nologin").hide();
		$(".is_login").show();
	}
}

function quitFallback()
{	
	$.cookie("mmall_username","x",{'expires':-10,'path':'/mmall'});
	location.href = "index.html";
}
