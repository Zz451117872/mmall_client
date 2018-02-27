$(document).ready(function(){
	
	sendRequest("manager_category/get_category.do",{
										"categoryId":null,
										"isFillChild":true,
										"pageNum":null,
										"pageSize":null
									},fillCategorysToPage);
	
	$("#product_table").delegate("tr:not(:first)","click",function(){
		var productId = $(this).attr("name");
		if($("#productId").val() == productId)
		{
			$("#productId").val("");
		}else{
			$("#productId").val(productId)
		}		
		$("table tr[name != "+productId+"]").removeClass("tr_selected_status");
		$(this).toggleClass("tr_selected_status");
		
		var productStatusButton = $("#"+"status"+productId+"").text() == "下架" ? "上架":"下架";
		$("#productStatusButton").text(productStatusButton);
	});
			
	$("#searchProductById").click(function(){
		var productId = $("#product_id").val();
		if(productId != null && productId != "" && productId != "按ID查找")
		{
			getProductByNameOrId(null,productId);
			$("#product_id").val("按ID查找");
		}
	});
	
	$("#searchProductByKeyword").click(function(){
		var keyword = $("#product_keyword").val();
		if(keyword != null && keyword != "" && keyword != "按关键字查找")
		{
			getProductsByKeywordOrCagetory(keyword,null,1,3);
			$("#product_keyword").val("按关键字查找");
		}
	});
	
	$("#product_category").change(function(){
		var categoryId = $(this).val();
		if(categoryId != null && categoryId != "" && categoryId != 0)
		{			
			getProductsByKeywordOrCagetory(null,categoryId,1,3);
		}
	});
	
	$(".input_class").focus(function(){
		$(this).val("");
	})
});

function productDetail()
{
	var productId = $("#productId").val();
	if(productId != null && productId != "")
	{
		location.href = "product_detail.html?productId="+productId;
	}else{
		alert("请选择产品");
	}
}

function updateProduct()
{
	var productId = $("#productId").val();
	var categoryId = $("#"+"categoryId"+productId+"").val();
	if(productId != null && productId != "")
	{
		location.href = "product_add_or_update.html?productId=?"+productId;
	}else{
		alert("请选择产品");
	}
}

function soldOut()
{
	var productId = $("#productId").val();
	if(productId != null && productId != "")
	{
		sendRequest("manager_product/sold_out_or_putaway.do",
		{
			"productId":productId
		},
		"product_list.html");
		
	}else{
		alert("请选择产品");
	}
}



function getProductByNameOrId(productName,productId)
{
	if( productName == null && productId == null ) return;
	sendRequest("manager_product/get_product_by_name_or_id.do",
		{
			"productName":productName,
			"productId":productId
		},
		getProductByNameOrIdFallback
	);
}

function getProductByNameOrIdFallback(product){
	$(".new_add_product").remove();					
	fillProductToPage(product);	
}

function getProductsByKeywordOrCagetory(keyword,categoryId,pageNum,pageSize)
{
	sendRequest("manager_product/get_products_by_keyword_or_category.do",{
				"keyword":keyword,
				"categoryId":categoryId,
				"pageNum":pageNum,
				"pageSize":pageSize,
				"orderBy":"createTime_asc"
				},fillProductsToPage);
}

function fillProductsToPage(result)
{
	$(".new_add_product").remove();
	if( result == null || result == "") return;
	var products = result.list;	
	if(products != null)
	{		
		for(var i=0; i<products.length; i++)
		{
			fillProductToPage(products[i]);							
		}
	}
}

function fillProductToPage(product)
{
	var tr = $("<tr name='"+product.id+"' class='new_add_product'></tr>");
	var td = $("<td>"+product.id+"</td>");
	tr.append(td);
	td = $("<td><input type='hidden' id='"+"categoryId"+product.id+"' />"+product.categoryName+"</td>");
	tr.append(td);
	td = $("<td id='"+"name"+product.id+"'>"+product.name	+"</td>");
	tr.append(td);
	td = $("<td id='"+"subtitle"+product.id+"'>"+product.subtitle+"</td>");
	tr.append(td);
	td = $("<td id='"+"mainImage"+product.id+"'><img src='"+product.mainImage+"'></img></td>");
	tr.append(td);
	td = $("<td id='"+"detail"+product.id+"'>"+product.detail+"</td>");
	tr.append(td);
	td = $("<td id='"+"price"+product.id+"'>"+product.price+"</td>");
	tr.append(td);
	td = $("<td id='"+"stock"+product.id+"'>"+product.stock+"</td>");
	tr.append(td);
	td = $("<td id='"+"status"+product.id+"'>"+product.statusDesc+"</td>");
	tr.append(td);
	td = $("<td >"+product.createTime+"</td>");
	tr.append(td);
	td = $("<td>"+product.updateTime+"</td>");
	tr.append(td);
	
	$("#product_table").append(tr);
}


function fillCategorysToPage(categorys)
{
	if(categorys != null)
	{
		$(".new_add_category").remove();
		for(var i=0; i<categorys.length; i++)
		{
			var _select = $("#product_category");
			fillCategoryToPage(categorys[i],_select,0);							
		}
	}
}

function fillCategoryToPage(category,_select,interval)
{
	var nbsp = "";
	for(var i=0; i<interval; i++)
	{
		nbsp = nbsp+"&nbsp;";
	}	
	var option = $("<option class='new_add_category' value='"+category.id+"'>"+nbsp+category.name+nbsp+"</option>");
	_select.append(option);
	if(category.childs != null)
	{
		for(var i=0; i<category.childs.length; i++)
		{
			fillCategoryToPage(category.childs[i],_select,interval+3);
		}
	}
}
