$(document).ready(function(){
	
	$("#by_order_no").click(function(){
		var orderNo = $("#orderNo").val();
		if(orderNo != null && orderNo != "" && orderNo != "按订单号查询")
		{
			sendRequest("manager_order/order_detail.do",{"orderNo":orderNo},loadOrdersFallback);
			$("#orderNo").val("按订单号查询");
		}else{
			alert("请输入订单号");
		}
	});
	
	$("#by_username").click(queryOrderByMultiCondition);
	$("select").change(function(){
		queryOrderByMultiCondition();
		initPage();
	});
	
	$(".input_class").focus(function(){
		$(this).val("");
	});
			
		
	$("#order_table").delegate("tr:not(:first)","click",function(){
		var orderNo = $(this).attr("name");
		$("#order_table tr[name != "+orderNo+"]").removeClass("tr_selected_status");
		$(this).toggleClass("tr_selected_status");
		
		if($("#currentOrderNo").val() == orderNo)
		{
			$("#currentOrderNo").val("");
		}else{
			$("#currentOrderNo").val(orderNo);			
		}
	})
	
	$("#send_goods_button").click(function(){
		var orderNo = $("#currentOrderNo").val();
		if(orderNo != null && orderNo != "" && orderNo != "按订单号查询")
		{
			sendRequest("manager_order/send_goods.do",{"orderNo":orderNo},doSendGoodsFallback);
		}else{
			alert("请选择订单");
		}
	});
	
	$("#close_order_button").click(function(){
		var orderNo = $("#currentOrderNo").val();
		if(orderNo != null && orderNo != "" && orderNo != "按订单号查询")
		{
			sendRequest("manager_order/close_order.do",{"orderNo":orderNo},doCloseOrderFallback);
		}else{
			alert("请选择订单");
		}
	});
	
	$("#check_order_detail_button").click(function(){
		var orderNo = $("#currentOrderNo").val();
		if(orderNo != null && orderNo != "" && orderNo != "按订单号查询")
		{
			location.href = "order_detail.html?orderNo="+orderNo;
		}else{
			alert("请选择订单");
		}
	});
	
});

function initPage()
{
	var statusDesc = $("#order_status").val();
	if(statusDesc == 2)
	{
		$(".payed_class").show();
		$(".received_class").hide();
	}else if(statusDesc == 4)
	{
		$(".received_class").show();
		$(".payed_class").hide();
	}else{
		$(".received_class").hide();
		$(".payed_class").hide();
	}
}

function queryOrderByMultiCondition()
{	
	var username = $("#username").val();
	username = username == "" || username == "按用户查询" ? null : username;
	var orderStatus = $("#order_status").val();
	orderStatus = orderStatus == "" ? null : orderStatus;
	var createTime = $("#order_crate_time").val();
	createTime = createTime == 0 ? null : createTime;
	if(username == null && orderStatus == null && createTime == null)
	{
		alert("参数错误");	
		$(".new_add_tr").remove();
	}else{
		var data = {
			"username":username,
			"orderStatus":orderStatus,
			"createTime":createTime,
			"pageNum":1,
			"pageSize":3
		};
		sendRequest("manager_order/get_order_by_multi_condition.do",data,loadOrdersFallback);
		$("#username").val("按用户查询");
	}
}

function doSendGoodsFallback()
{
	var orderNo = $("#currentOrderNo").val();
	$("#"+"status"+orderNo+"").text("已发货");
	$("#"+"sendGoodsButton"+orderNo+"").remove();
	$("#"+"sendTime"+orderNo+"").val("发货中");
	queryOrderByMultiCondition();
}

function doCloseOrderFallback()
{
	var orderNo = $("#currentOrderNo").val();
	$("#"+"status"+orderNo+"").text("已关闭");
	$("#"+"closeOrderButton"+orderNo+"").remove();
	queryOrderByMultiCondition();
}

function loadOrdersFallback(result)
{
	$(".new_add_tr").remove();
	var parent = $("#order_table");
	var orders = result.list;
	if(orders != null)
	{
		for(var i=0; i<orders.length; i++)
		{			
			var data = getData(orders[i],"id,username,payment,payTypeDesc,postage,statusDesc,createTim,payTime,sendTime,endTime,closeTim");
			fillDataToTable(data,parent);
		}
	}else{
		var data = getData(result,"id,username,payment,payTypeDesc,postage,statusDesc,createTim,payTime,sendTime,endTime,closeTim");
		fillDataToTable(data,parent);
	}
	$("#currentOrderNo").val("");
}
