(function(namespace, $){
	var pageapp = function(){},
		o = pageapp.prototype;

    o.childlistRechargeInit = function(filter, option){
    	var list = $(filter),
    		balance = option.balance,
            pageloading = $("#pageloading"),
            pagealert = $("#pagealert");
        pageAlertInit(pagealert);
    	if(isNaN(balance)){
    		balance = 0;
    	}
    	list.on("click", ".rechargelink", function(){
    		var that = $(this),
    			uid = that.attr("child-id"),
    			num = prompt("请输入充值金额，当前余额：" + balance+" 元。");
    		if(!num){
    			return false;
    		}
    		num = parseInt(num);
    		if(isNaN(num)){
                pagealert.show().find("p").html("请输入数字");
    			return false;
    		}
    		if(num > balance){
                pagealert.show().find("p").html("当前余额不足");
    			return false;
    		}
    		$.post(option.purl, {'coin':num,'id':uid}, function(data){
				//alert(data['msg'])
                if(data.seccess == 1){
                    pagealert.show().find("p").html("充值成功！").end().on("closefun", function(){
                        window.location.href = window.location.href;
                    });;
                }else{
                    pagealert.show().find("p").html(data.msg);
                }
    		}, "json");
    	});
    };

	namespace.pageapp = new pageapp;

})(this, jQuery);// JavaScript Document