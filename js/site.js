$(document).ready(function(){
    $(".ad_client_list div.col-sm-2").each(function(index, element){
        var img_url = $(this).find('input').attr('value');
        var div_element = $(this).find('div');

        window.img = '<img src="'+img_url+'" width=90 height=90/>';
        $(div_element).html('<iframe src="javascript:parent.img;" class="img-circle" frameBorder="0" scrolling="no" width=90 height=90 marginwidth=0 marginheight=0></iframe>');
    });
    $(".top_user_icon").mouseenter(function(){
        $(this).popover("show");
    });
    $(".top_user_icon").mouseleave(function(){
        $(this).popover("hide");
    });
});

/*左侧栏高度*/
window.onload=function()
{
var ss = document.getElementById('nav-left');
var mainCol = window.document.getElementById('cont-right');
var hMainCol =  mainCol .offsetHeight;
ss.style.height=hMainCol+"px";
}


        /*table删除*/
		function deleteRow(r)
		{
		var i=r.parentNode.parentNode.rowIndex;
		var angelweb=confirm("确定要删除记录吗？");
   		if(angelweb){
			document.getElementById('myTable').deleteRow(i);
		}
		}
		
        /*table黑名单移除*/
		function deleteblacklist(r)
		{
		var i=r.parentNode.parentNode.rowIndex;
		var angelweb=confirm("确定要移除此条记录吗？");
   		if(angelweb){
			document.getElementById('blacklist').deleteRow(i);
		}
		}
        /*table编辑与保存*/
            function changeState(d){
				var edit = document.getElementById('edit'+d);
				var item = document.getElementById("item"+d).getElementsByTagName("td");
				var item_length = item.length-1
				var item_value = new Array(item_length);
				 
				for(i = 0; i < item_length; i++){
					item_value[i] = item[i].innerHTML;
				}

                if(edit.innerHTML == '编辑'){
                    edit.innerHTML= '保存';
                    for(i = 0; i < item_length; i++){
                        item[i].innerHTML = '<input type="txt" class="item_input" value="'+item_value[i]+'">';
                    }
                    statu = 1;
                }else{
                    edit.innerHTML= '编辑';
                    var item_input = document.getElementsByClassName('item_input');
                    for(i = 0; i < item_length; i++){
                        item_value[i] = item_input[i].value;
                    }
                    for(i = 0; i < item_length; i++){
                        item[i].innerHTML = item_value[i];
                    }
                    statu = 0
                }
                return false;
            }



/*table分页*/

  var theTable = document.getElementById("table2");
     var totalPage = document.getElementById("spanTotalPage");
     var pageNum = document.getElementById("spanPageNum");


     var spanPre = document.getElementById("spanPre");
     var spanNext = document.getElementById("spanNext");
     var spanFirst = document.getElementById("spanFirst");
     var spanLast = document.getElementById("spanLast");


     var numberRowsInTable = theTable.rows.length;
     var pageSize = 3;
     var page = 1;


     //下一页
     function next() {


         hideTable();


         currentRow = pageSize * page;
         maxRow = currentRow + pageSize;
         if (maxRow > numberRowsInTable) maxRow = numberRowsInTable;
         for (var i = currentRow; i < maxRow; i++) {
             theTable.rows[i].style.display = '';
         }
         page++;


         if (maxRow == numberRowsInTable) { nextText(); lastText(); }
         showPage();
         preLink();
         firstLink();
     }


     //上一页
     function pre() {


         hideTable();


         page--;


         currentRow = pageSize * page;
         maxRow = currentRow - pageSize;
         if (currentRow > numberRowsInTable) currentRow = numberRowsInTable;
         for (var i = maxRow; i < currentRow; i++) {
             theTable.rows[i].style.display = '';
         }




         if (maxRow == 0) { preText(); firstText(); }
         showPage();
         nextLink();
         lastLink();
     }


     //第一页
     function first() {
         hideTable();
         page = 1;
         for (var i = 0; i < pageSize; i++) {
             theTable.rows[i].style.display = '';
         }
         showPage();
         preText();
         nextLink();
         lastLink();
		 firstLink()
		 firstText()
     }


     //最后一页
     function last() {
         hideTable();
         page = pageCount();
         currentRow = pageSize * (page - 1);
         for (var i = currentRow; i < numberRowsInTable; i++) {
             theTable.rows[i].style.display = '';
         }
         showPage();


         preLink();
         nextText();
         firstLink();
     }


     function hideTable() {
         for (var i = 0; i < numberRowsInTable; i++) {
             theTable.rows[i].style.display = 'none';
         }
     }


     function showPage() {
         pageNum.innerHTML = page;
     }


     //总共页数
     function pageCount() {
         var count = 0;
         if (numberRowsInTable % pageSize != 0) count = 1;
         return parseInt(numberRowsInTable / pageSize) + count;
     }


     //显示链接
     function preLink() { spanPre.innerHTML = "<li id='spanPre'><a href='javascript:pre();'>上一页</a></li>"; }
     function preText() { spanPre.innerHTML = "上一页"; }


     function nextLink() { spanNext.innerHTML = "<a href='javascript:next();'>下一页</a>"; }
     function nextText() { spanNext.innerHTML = "下一页"; }


     function firstLink() { spanFirst.innerHTML = "<a href='javascript:first();'>第一页</a>"; }
     function firstText() { spanFirst.innerHTML = "第一页"; }


     function lastLink() { spanLast.innerHTML = "<a href='javascript:last();'>最后一页</a>"; }
     function lastText() { spanLast.innerHTML = "最后一页"; }


     //隐藏表格
     function hide() {
         for (var i = pageSize; i < numberRowsInTable; i++) {
             theTable.rows[i].style.display = 'none';
			  
         }
		
         totalPage.innerHTML = pageCount();
         pageNum.innerHTML = '1';


         nextLink();
         lastLink();
     }


     hide();
	 
	 if(pageCount()<=1){
	  var pages = document.getElementById("table_page");
		pages.style.display = 'none';
	  }
