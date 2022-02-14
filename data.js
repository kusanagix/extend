

//=======================================话题页面加载数据===================
function jinsom_topic_data(type,obj){
if($('.aciklama-load').length>0){
return false;	
}
topic_id=$('.aciklama-topic-info').attr('data');
post_list=$('.aciklama-topic-post-list');
post_list.empty();
$(obj).addClass('on').siblings().removeClass('on');
post_list.append(aciklama.loading);
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/data/topic.php",
data: {type:type,topic_id:topic_id},
success: function(msg){   
post_list.children('.aciklama-load').remove();
post_list.append(msg);

//ajax后加载要执行的脚本
jinsom_post_js();

}
});
}


//加载更多话题
function jinsom_topic_data_more(type,obj){
topic_id=$('.aciklama-topic-info').attr('data');
page=$(obj).attr('data');
$(obj).html(aciklama.loading);
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/data/topic.php",
data: {type:type,topic_id:topic_id,page:page},
success: function(msg){   
$(obj).html('加载更多');
if(msg==0){
layer.msg('没有更多内容！');
$(obj).remove();
}else{
$(obj).before(msg);
paged=parseInt(page)+1;
$(obj).attr('data',paged);	
}

//ajax后加载要执行的脚本
jinsom_post_js();

}
});
}
