
/*
 * 公共分页页面js文件
 */
$(document).ready(function(){
	
	//上一页，父页面调用 
	$("#upPage").click(function(){		
		window.parent.upOrDownPage(-1);				
	});
	
	//下一页，父页面调用 
	$("#downPage").click(function(){
		window.parent.upOrDownPage(1);	
	});
	
	//跳到第几页，父页面调用 
	$("#jumpPage").click(function(){
		var pageNum = $("#jumpPageNum").val();
		window.parent.selectPage(pageNum);
	});	
	
	var quantity = 1;
	//当输入框获取焦点时，清空数据
	$("#jumpPageNum").focus(function(){		
		$(this).val("");		
	})
	//当输入框失去焦点时，计算正确的页码
	$("#jumpPageNum").blur(function(){
		var totalPage = $("#totalPage").val();
		var currentPage = $(this).val();		
		if(currentPage == "" || currentPage == null)
		{
			$(this).val(quantity);
		}else{
			if(currentPage <= 1)
			{
				$(this).val(1);
			}else if(parseInt(currentPage) >= parseInt(totalPage))
			{
				$(this).val(totalPage);
			}
		}
		quantity = $(this).val();
	});
	
});

// 分页页面初始化方法，父页面调用 
function init(page)
{	
	var currentPage = page.data.pageNum;
	var pageSize = page.data.pageSize;
	var totalPage = page.totalPage;
	//alert("currentPage:"+currentPage+" pageSize:"+pageSize +" totalPage:"+totalPage);
	$(".selectPage").remove();
	if(totalPage <= 5)
	{
		for(var i=totalPage ; i>0; i--)
		{
			var but = $("<button class='selectPage'>"+i+"</button>");
			$(but).on("click",function(){
				var pageNum = $(this).text();
				window.parent.selectPage(pageNum);
			});
			if(parseInt(i) == parseInt(currentPage))
			{
				$(but).css("background-color","red");
			}
			$("#upPage").after(but);
		}
	}else{
		var minPage = (Number)(currentPage) - 2;
		var maxPage = (Number)(currentPage) + 2;
		if(minPage < 1)
		{
			minPage = 1;
		}
		if(parseInt(maxPage) > parseInt(totalPage))
		{
			maxPage = totalPage;
		}
		for(var i=maxPage; i>= minPage; i--)
		{
			var but = $("<button class='selectPage'>"+i+"</button>");
			$(but).on("click",function(){
				var pageNum = $(this).text();
				window.parent.selectPage(pageNum);
			});
			if(parseInt(i) == parseInt(currentPage))
			{
				$(but).css("background-color","red");
			}
			$("#upPage").after(but);
		}
	}
	$("#jumpPageNum").val(currentPage);
	$("#totalPage").val(totalPage);
}

