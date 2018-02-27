
/*
 * 输入框输入规则检查 公共js文件
 */
// 输入规则检查 ajax请求地址
var remoteUrl = url_prefix + "user/check_valid.do";

//检查手机号码
jQuery.validator.addMethod("checkPhone",function(value,element){
	var tel = /^1[34578]\d{9}$/;
	return tel.test(value);
},"请输入正确的手机号");
//检查电话号码
jQuery.validator.addMethod("checkMobile",function(value,element){
	var tel = /^[0-9]{4}-[0-9]{7}$/;
	return tel.test(value);
},"请输入正确的座机号");
//检查邮编
jQuery.validator.addMethod("checkZip",function(value,element){
	var tel = /^[0-9]{6}$/;
	return tel.test(value);
},"请填写正确的6位邮政编码");
//检查新输入密码
jQuery.validator.addMethod("checkNewPassword",function(value,element,params){	
	var target = $(""+params+"").val();
	return target != value;
},"新密码不能与原密码一样");
//获取验证器对象
function getValidater(formId)
{
	var validater = $("#"+formId+"").validate({
		onfocusout: function(element) { $(element).valid(); }
	});
	return validater;
}
// 邮箱规则
var emailRules = {
	required:true,
	email:true,
	remote:{
		url:remoteUrl,
		xhrFields:{
			withCredentials:true
		},
		type:"post",
		dataType:"json",
		data:{
			name:function(){
				return $("#email").attr("name");
			},
			value:function(){
				return $("#email").val();
			}
		}
	}
};
//手机号码规则
var phoneRules = {
	required:true,
	checkPhone:true,
	remote:{
		url:remoteUrl,
		xhrFields:{
			withCredentials:true
		},
		type:"post",
		dataType:"json",
		data:{
			name:function(){
				return $("#phone").attr("name");
			},
			value:function(){
				return $("#phone").val();
			}
		}
	}
};
//用户名规则 
var usernameRules = {
	required:true,
	minlength:3,
	maxlength:10,
	remote:{
		url:remoteUrl,
		xhrFields:{
			withCredentials:true
		},
		type:"post",
		dataType:"json",
		data:{
			name:function(){
				return $("#username").attr("name");
			},
			value:function(){
				return $("#username").val();
			}
		}
	}
};
//邮编规则
var zipRules = {
	required:true,
	checkZip:true
};
