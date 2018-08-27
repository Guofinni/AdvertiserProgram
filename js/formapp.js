var allcookies = document.cookie;
function getCookie(cookie_name) {
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);
    if (cookie_pos != -1) {
        cookie_pos += cookie_name.length + 1;
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        if (cookie_end == -1) {
            cookie_end = allcookies.length;
        }
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));
    }
    return value;
}
(function(namespace, $){
	var formapp = function(){},
		o = formapp.prototype;

    o.childformInit = function(filter, option){
    	var form = $(filter);
    	bindEmpty(form, "#phone", form);
    	bindEmpty(form, "#uname", form);
    	bindEmpty(form, "#password", form);
    	form.find(".subbtn").on("click", function(){
        	var res = true;
			$("body").find("input[type!='hidden']").each(function(){
				if(!res) return;
				$(this).trigger("checkdata");
				if($(this).attr("data-checked") === "false"){
					res = false;
				}
			});
			return res;
		});
    };

    o.resetPwdformInit = function(filter, option){
    	var form = $(filter);
    	bindPhone(form, "#tel", form);
        bindPwd(form, "#password", form);
        bindRePwd(form, "#repassword", "#password", form);
    	bindYzm(form, "#code", form);
    	bindYzmBtn(form, option.yzmurl, "#getyzmbtn", "#tel", form);

    	form.find(".subbtn").on("click", function(){
        	var res = true;
			$("body").find("input[type!='hidden']").each(function(){
				if(!res) return;
				$(this).trigger("checkdata");
				if($(this).attr("data-checked") === "false"){
					res = false;
				}
			});
			return res;
		});
    };

    o.loginformInit = function(filter, option){
    	var form = $(filter);
    	bindEmpty(form, "#login_uname", form);
    	bindEmpty(form, "#login_password", form);

    	form.find(".subbtn").on("click", function(){
        	var res = true;
			$("body").find("input[type!='hidden']").each(function(){
				if(!res) return;
				$(this).trigger("checkdata");
				if($(this).attr("data-checked") === "false"){
					res = false;
				}
			});
			return res;
		});
    };

	namespace.formapp = new formapp;

	function bindEmpty(dom, filter, theMsgdom){
    	dom.find(filter).on("checkdata", function(){
			var v = $(this).val();
			if(datavalid.checkEmpty(v)){
				pageMsg("danger", "请填写" + $(this).attr("data-tip"), theMsgdom);
				$(this).attr("data-checked", "false");
			}else{
				$(this).attr("data-checked", "true");
			}
		}).on("blur", function(){
			$(this).trigger("checkdata");
		});
    }

    function bindPhone(dom, filter, theMsgdom){
    	dom.find(filter).on("checkdata", function(){
			var v = $(this).val();
			if(datavalid.checkEmpty(v)){
				pageMsg("danger", "请填写手机号码", theMsgdom);
				$(this).attr("data-checked", "false");
			}else if(!datavalid.checkPhone(v)){
				pageMsg("danger", "手机号码格式不正确", theMsgdom);
				$(this).attr("data-checked", "false");
			}else{
				$(this).attr("data-checked", "true");
			}
		}).on("blur", function(){
			$(this).trigger("checkdata");
		});
    }

    function bindPwd(dom, filter, theMsgdom){
    	dom.find(filter).on("checkdata", function(){
			var v = $(this).val();
			if(datavalid.checkEmpty(v)){
				pageMsg("danger", "请填写密码", theMsgdom);
				$(this).attr("data-checked", "false");
			}else{
				$(this).attr("data-checked", "true");
			}
		}).on("blur", function(){
			$(this).trigger("checkdata");
		});
    }

    function bindRePwd(dom, filter, refilter, theMsgdom){
    	dom.find(filter).on("checkdata", function(){
			var v = $(this).val(),
				re = $(refilter).val();
			if(datavalid.checkEmpty(v)){
				pageMsg("danger", "请填写确认密码", theMsgdom);
				$(this).attr("data-checked", "false");
			}else if(!datavalid.checkEqual(v, re)){
				pageMsg("danger", "两次密码填写不一致", theMsgdom);
				$(this).attr("data-checked", "false");
			}else{
				$(this).attr("data-checked", "true");
			}
		}).on("blur", function(){
			$(this).trigger("checkdata");
		});
    }

    function bindYzm(dom, filter, theMsgdom){
    	dom.find(filter).on("checkdata", function(){
			var v = $(this).val();
			if(datavalid.checkEmpty(v)){
				pageMsg("danger", "请填写验证码", theMsgdom);
				$(this).attr("data-checked", "false");
			}else{
				$(this).attr("data-checked", "true");
			}
		}).on("blur", function(){
			$(this).trigger("checkdata");
		});
    }

    function bindYzmBtn(dom, purl, btnf, telf, theMsgdom){
		dom.find(btnf).on("click", function(){
			var that = $(this),
				phone = dom.find(telf).val(),
				countdown = 60;
			if(that.hasClass("disabled") || that.attr("ajax-loading") == "true"){
				return;
			}
			if(phone == ""){
				pageMsg("danger", "请填写手机号码", theMsgdom);
				return;
			}
			if(!datavalid.checkPhone(phone)){
				pageMsg("danger", "手机号码格式不正确", theMsgdom);
				return;
			}
			that.attr("ajax-loading", "true");
			$.ajax({
	            type: "POST",
	            url: purl,
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            data: {
	                'phone': phone,
	                'vcode':getCookie("valid_code")
	            },
	            success: function(data){
	            	that.attr("ajax-loading", "false");
	                if(data.err == "0"){
	                	that.attr("disabled", "disabled").addClass("disabled").html("还有" + countdown + "秒");
	                	setTimeout(yzmcountdown, 1000);
	                }else{
	                	var tmp = "";
	                	if(data.err=="-1"){
                        	tmp = "手机格式错误";
	                    }else if(data.err=="-2"){
	                        tmp = "该手机已注册";
	                    }else{
	                        tmp = "获取验证码失败，请稍后重试";
	                    }
	                	pageMsg("danger", tmp, theMsgdom);
	                }
	            },
	            failure: function(errMsg){
                	pageMsg("danger", errMsg, theMsgdom);
	            	that.attr("ajax-loading", "false");
	            }
	        });
	        function yzmcountdown(){
	        	countdown--;
	        	if(countdown == -1){
	        		that.removeAttr("disabled").removeClass("disabled").html("获取验证码");
	        	}else{
		        	that.html("还有" + countdown + "秒");
		        	setTimeout(yzmcountdown, 1000);
		        }
	        }
		});
	}

})(this, jQuery);