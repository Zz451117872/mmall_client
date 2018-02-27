

/*
 * 父页面实现分页功能 公共js文件
 */

//分页对象page包含属性（totalPage 总页数，url 请求地址，fallback 回调函数，data 请求的参数数据，fun 请求方法（sendRequest））
	
	window.page = new Object();
	window.page.totalPage;
	window.page.url="";
	window.page.fallback;
	window.page.data = {};
	window.page.fun = function(){
		alert("分页方法")
	};
	
	//上一页 或者 下一页
	function upOrDownPage(size)
	{		
		var pageNum = add( window.page.data.pageNum , size ); 
		if(parseInt(pageNum) <= parseInt(window.page.totalPage) && parseInt(pageNum) > 0)
		{
			window.page.data.pageNum = pageNum;
		}
		window.page.fun( window.page.url , window.page.data , window.page.fallback );
	}
	//选择第几页
	function selectPage(pageNum)
	{						
		if(parseInt(pageNum) <= parseInt(window.page.totalPage) && parseInt(pageNum) > 0)
		{
			window.page.data.pageNum = pageNum;
		}
		window.page.fun( window.page.url , window.page.data , window.page.fallback );
	}
	
	
	/*
	 * 更新分页参数
	 * totalPage：请求返回的结果集的总页数
	 * url: 请求地址的后缀
	 * data：请求的参数
	 * fallback：回调函数
	 * fun：请求方法
	 */
	function updateCommonData(totalPage,url,data,fallback,fun)
	{
		window.page.data = data;
		window.page.totalPage = totalPage;	
		window.page.url = url;
		window.page.fallback = fallback;
		window.page.fun = fun;
		
		//完美解决 谷歌浏览器 对 iframe 相关操作不兼容问题
		if( pageIframe.window.document.readyState != "complete"){ //onreadystatechange : loading, loaded, Interactive complete
			document.getElementById("pageIframeId").onload = function(){
				frames[0].init(window.page);
			};
		}else{
			frames[0].init(window.page);
		}				
	}

