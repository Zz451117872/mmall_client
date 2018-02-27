$(document).ready(function(){
	//加载我的购物车
	sendRequest("cart/my_cart_list.do",{},loadMyCartsFallback);
	
	//给购物车table中class值为dis_quantity 的委托点击事件
	$("#cart_item_table").delegate(".dis_quantity","click",function(event){
		event.stopPropagation();
		var cartId = $(this).attr("name");
		var quantity = Number($("#"+"quantity"+cartId+"").val())-1;
		if(quantity < 1)
		{
			sendRequest("cart/delete_by_cartids.do",{"cartIds":cartId},null);
		}else{
			$("#"+"quantity"+cartId+"").val(quantity);
			sendRequest("cart/update_quantity.do",{"cartId":cartId,"quantity":quantity},null);
		}										
	});
	//给购物车table中class值为add_quantity 的委托点击事件
	$("#cart_item_table").delegate(".add_quantity","click",function(event){		
		event.stopPropagation();
		var cartId = $(this).attr("name");
		var stock = $("#"+"stock"+cartId+"").text();
		var quantity = Number($("#"+"quantity"+cartId+"").val())+1;
		if(parseInt(quantity) > parseInt(stock))
		{
			quantity = stock;
		}else{
			sendRequest("cart/update_quantity.do",{"cartId":cartId,"quantity":quantity},null);
		}
		$("#"+"quantity"+cartId+"").val(quantity);						
	});
	//给购物车table 中和每一行tr 委托单击事件
	$("#cart_item_table").delegate("tr:not(:first)","click",function(){
		$(this).toggleClass("tr_selected_status");
		var cartItemId = $(this).attr("name");
		
		var changeTotalProce = $("#"+"productTotalPrice"+cartItemId+"").text();
		var changeTotalQuantity = $("#"+"quantity"+cartItemId+"").val();
		var checkStatus = $("#"+"cartItem"+cartItemId+"").prop("checked");
		if(checkStatus == true)
		{
			$("#"+"cartItem"+cartItemId+"").prop("checked",false);
			$("#currentTotalQuantity").text(dis($("#currentTotalQuantity").text(),changeTotalQuantity));
			$("#currentTotalPrice").text(dis($("#currentTotalPrice").text(),changeTotalProce));
		}else{
			$("#"+"cartItem"+cartItemId+"").prop("checked",true);
			$("#currentTotalQuantity").text(add($("#currentTotalQuantity").text(),changeTotalQuantity));
			$("#currentTotalPrice").text(add($("#currentTotalPrice").text(),changeTotalProce));
		}				
	});	
	//给 选择所有 按钮添加点击事件
	$("#select_all").click(function(){
		var checkStatus = $(this).prop("checked");
		if(checkStatus == false)
		{
			$(".selected_cart").each(function(){
				$(this).prop("checked",false);
			});
			$("#currentTotalQuantity").text(0);
			$("#currentTotalPrice").text(0);
		}else{
			$(".selected_cart").each(function(){
				$(this).prop("checked",true);
			});
			$("#currentTotalQuantity").text($("#cartTotalQuantity").text());
			$("#currentTotalPrice").text($("#cartTotalPrice").text());
		}	
	});

});
//生成预订单函数
function prepareOrder()
{
	var cartIds = "";
	var index = $(".selected_cart:checked").length;
	$(".selected_cart:checked").each(function(i){
		var cartId = $(this).attr("name");
		if(parseInt(i) == (parseInt(index)-1))
		{
			cartIds += cartId;
		}else{
			cartIds += cartId+",";
		}				
	});
	if(cartIds != null && cartIds != "")
	{
		location.href = "prepare_order.html?cartIds="+cartIds;
	}else{
		alert("请选择结算商品")
	}
}
//删除购物条目函数
function deleteCart()
{
	var cartIds = "";
	var index = $(".selected_cart:checked").length;
	$(".selected_cart:checked").each(function(i){
		var cartId = $(this).attr("name");
		if(parseInt(i) == (parseInt(index)-1))
		{
			cartIds += cartId;
		}else{
			cartIds += cartId+",";
		}				
	});
	if(cartIds != null && cartIds != "")
	{
		sendRequest("cart/delete_by_cartids.do",{"cartIds":cartIds},null);
	}else{
		alert("请选择删除商品")
	}
}
//加载我的购物 车回调函数
function loadMyCartsFallback(data)
{
	if(data != null)
		{
			var cartItems = data.cartItemVOList;
			if(cartItems != null)
			{
				$(".new_add_cart").remove();
				for(var i=0; i<cartItems.length; i++)
				{
					fillCartItemToPage(cartItems[i]);
				}
				$("#cartTotalPrice").text(data.cartTotalPrice);
				$("#cartTotalQuantity").text(data.cartTotalQuantity);
				$("#currentTotalPrice").text(data.cartTotalPrice);
				$("#currentTotalQuantity").text(data.cartTotalQuantity);
			}										
		}
}
//填充购物条目信息到页面
function fillCartItemToPage(cartItem)
{
	var tr = $("<tr name='"+cartItem.id+"' class='new_add_cart'></tr>");
	tr.addClass("tr_selected_status");
	var td = $("<td><input name='"+cartItem.id+"' checked='checked' id='"+"cartItem"+cartItem.id+"' class='selected_cart'  type='checkbox' /></td>");
	tr.append(td);
	td = $("<td>"+cartItem.id+"</td>");
	tr.append(td);
	td = $("<td>"+cartItem.productName+"</td>");
	tr.append(td);
	td = $("<td>"+cartItem.productSubtitle+"</td>");
	tr.append(td);
	td = $("<td><img src='"+cartItem.productMainImage+"' /></td>");
	tr.append(td);
	td = $("<td>"+cartItem.productPrice+"</td>");
	tr.append(td);
	
	var span = $("<span></span>");
	var disQuantity = $("<button name='"+cartItem.id+"' class='dis_quantity'>-</button>");
	var quantity = $("<input value='"+cartItem.quantity+"' readonly='readonly' id='"+"quantity"+cartItem.id+"' type='text'  style=' width: 30px;' />")
	var addQuantity = $("<button name='"+cartItem.id+"' class='add_quantity'>+</button>");
	
	span.append(disQuantity).append(quantity).append(addQuantity);
	tr.append(span);
	
	td = $("<td><span id='"+"stock"+cartItem.id+"'>"+cartItem.productStock+"</span></td>");
	tr.append(td);
	td = $("<td><span id='"+"productTotalPrice"+cartItem.id+"'>"+cartItem.productTotalPrice+"</span></td>");
	tr.append(td);
	td = $("<td>"+cartItem.createTime+"</td>");
	tr.append(td);
	
	$("#cart_item_table").append(tr);
}
