
/*
 * 项目公共函数js文件
 */

//项目请求地址前缀
var url_prefix = "http://120.79.50.238:8021/mmall/";
//var url_prefix = "http://localhost:8021/apis/";

/*
 * 发送请求
 * url: 请求地址的后缀
 * data: 需要的参数
 * fallback: 请求成功后的回调函数 或者 返回页面
 */


function sendRequest(suffix_url,data,fallback)
{
	
	var url = url_prefix+suffix_url;
	$.ajax({
		'url':url,
		type:"POST",
		xhrFields:{
			withCredentials:true
		},
		dataType:"json",
		'data':data,
		success:function(result){
			if(result.status == 1)
			{				// 如果返回结果有list属性，则表明需要分页，则更新分页参数信息
				if(result.data !=null && result.data.list != null)
				{
					updateCommonData(result.data.pages , suffix_url , data , fallback , sendRequest );
				}
				
				if(fallback != null)
				{					
					if(fallback instanceof Function)
					{
						fallback(result.data);
					}else if( typeof(fallback) == "string"){
						location.href = fallback;
					}
				}else{
						location.reload();
					}
				
			}else{
				alert(result.msg);
			}
		}
	})
}
/*
 * 获取指定form组件的数据信息对象
 */
function getFormData(formId)
{
	var x = $("#"+formId+"").serializeArray();
	var data = {};  
	$.each(x, function(i, field){  		
		data[field.name] = field.value;
	}); 
	
//	for(var field in data)
//	{
//		if(data[field] == null || data[field] == "")
//		{
//			alert("参数缺失");
//			return null;
//		}
//	}
	return data;
}

//获取传入页面的指定参数
function getParams(param)
{
	var href = decodeURI(window.location.href);
	var hrefArr = href.split("?");
	var params = hrefArr[1];
	if(params != null && params != "")
	{
		var paramsArr = params.split("&");
		for(var i=0; i<paramsArr.length; i++)
		{
			var parameter = paramsArr[i].split("=");
			if(parameter[0] == param)
			{
				return parameter[1];
			}
		}
		return null;
	}
	return null;
}

//获取当前时间
function getCurrentTime()
{
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var datatime = year+"-"+month+"-"+day+"  "+hour+":"+minute+":"+second;
	return datatime;
}

/*
 * 填充数据到表格
 * data: 要填充的对象
 * emement_parent: 填充在哪个对象中
 */
function fillDataToTable(data,element_parent)
{
	if(data != null &&  element_parent != null)
	{
		var tag = createElement("tr");
		$(tag).attr("name",data.id);
		$(tag).attr("class","new_add_tr");
		
		for(var attribute in data)
		{
			if( data.hasOwnProperty(attribute) )
			{
				var td = createElement("td");
				$(td).text(data[attribute]);
				$(td).attr("name",data.id);
				$(td).attr("id",attribute + data.id);
				tag.append(td);
			}
		}
		element_parent.append(tag);		
	}
}

function fillDataToPage(data)
{
	if(data != null &&  element_parent != null)
	{
		for(var attribute in data)
		{
			if(data.hasOwnProperty(attribute))
			{
				$("#"+attribute+"").text(data[attribute]);
			}
		}
	}
}

//创建指定标签
function createElement(element_tag)
{
	if(element_tag != null && element_tag != "")
	{
		return $("<"+element_tag+"></"+element_tag+">");
	}
	return null;
}

/*
 * 从对象中获取指定属性的数据
 * data: 目标对象
 * attributes: 指定的属性字符串，逗号分割
 */
function getData(data,attributes)
{
	if(data != null)
	{
		var obj = {};
		var attributeArr = attributes.split(",");
		for(var i=0; i<attributeArr.length; i++)
		{
			obj[""+attributeArr[i]+""] = data[""+attributeArr[i]+""];
		}
		return obj;
	}
	return null;
}

function dis(a,b)
{
	if(isNaN(a) || isNaN(b))
	{
		alert("运算数不是数字："+a+" <=> "+b);
		return null;
	}
	return parseInt(a) - parseInt(b);
}

function add(a,b)
{
	if(isNaN(a) || isNaN(b))
	{
		alert("运算数不是数字："+a+" <=> "+b);
		return null;
	}
	return parseInt(a) + parseInt(b);
}

function gt(a,b)
{	
	if(isNaN(a) || isNaN(b))
	{
		alert("运算数不是数字："+a+" <=> "+b);
		return null;
	}
	if(parseInt(a) > parseInt(b))
	{
		return true;
	}
	return false;
}

function lt(a,b)
{	
	if(isNaN(a) || isNaN(b))
	{
		alert("运算数不是数字："+a+" <=> "+b);
		return null;
	}
	if(parseInt(a) < parseInt(b))
	{
		return true;
	}
	return false;
}

function ge(a,b)
{	
	if(isNaN(a) || isNaN(b))
	{
		alert("运算数不是数字："+a+" <=> "+b);
		return null;
	}
	if(parseInt(a) >= parseInt(b))
	{
		return true;
	}
	return false;
}

function le(a,b)
{	
	if(isNaN(a) || isNaN(b))
	{
		alert("运算数不是数字："+a+" <=> "+b);
		return null;
	}
	if(parseInt(a) <= parseInt(b))
	{
		return true;
	}
	return false;
}


function eq(a,b)
{	
	if(isNaN(a) || isNaN(b))
	{
		alert("运算数不是数字："+a+" <=> "+b);
		return null;
	}
	if(parseInt(a) == parseInt(b))
	{
		return true;
	}
	return false;
}