

//首页或个人主页获取内容数据
var jinsom_post_status=1;
function jinsom_post(type,obj){

if($('.aciklama-load-post').length==0){
$('.aciklama-post-list').prepend(aciklama.loading_post);
}

if(jinsom_post_status==0){
return false;	
}

$(obj).addClass('on').siblings().removeClass('on');

author_id=$(obj).attr('author_id');
jinsom_post_status=0;
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/data/post.php",
data: {type:type,author_id:author_id},
success: function(msg){   
$('.aciklama-post-list').html(msg);
jinsom_post_js();//ajax后加载要执行的脚本
jinsom_post_status=1;
}
});
}



//首页或个人主页加载更多数据
function jinsom_post_more(type,obj){
page=$(obj).attr('page');

author_id=$(obj).attr('author_id');

if($('.aciklama-load-post').length==0){
$(obj).before(aciklama.loading_post);
$(obj).hide();
}

$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/more/data.php",
data: {type:type,page:page,author_id:author_id},
success: function(msg){   
$('.aciklama-load-post').remove();
$(obj).show();
if(msg==0){
layer.msg('没有更多内容！');
$(obj).remove();
}else{
$(obj).before(msg);
page=parseInt(page)+1;
$(obj).attr('page',page);	
}
jinsom_post_js();//ajax后加载要执行的脚本
}
});
}


//ajax后加载要执行的脚本
function jinsom_post_js(){
$(".aciklama-post-read-more").click(function(){
if($(this).prev().hasClass('hidden')){
$(this).prev().removeClass('hidden');
$(this).html("收起内容");
}else{
$(this).prev().addClass('hidden');
$(this).html("查看全文");
}
});

//评论框点击变高
$('.aciklama-post-comments').focus(function(){
$(this).css('height','85px');
});

//资料小卡片
$(".aciklama-post-user-info-avatar").hover(function(){
$this=$(this);
$this.children('.aciklama-user-info-card').show()
author_id=$this.attr('user-data');
if($this.find('.aciklama-info-card').length==0){
$this.children('.aciklama-user-info-card').html(aciklama.loading_info);
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/stencil/info-card.php",
data: {author_id:author_id,info_card:1},
success: function(msg){
$this.children('.aciklama-user-info-card').html(msg);
}
});
}
},function(){
$(this).children('.aciklama-user-info-card').hide();
});


}



//搜索页面======ajax加载
function jinsom_ajax_search(type,obj){

if($('.aciklama-load-post').length==0){
$('.aciklama-search-content').prepend(aciklama.loading_post);
}

if(jinsom_post_status==0){
return false;	
}

keyword=$('#aciklama-search-val').val();
$(obj).addClass('on').siblings().removeClass('on');
jinsom_post_status=0;
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/ajax/search.php",
data: {type:type,keyword:keyword},
success: function(msg){   
$('.aciklama-search-content').html(msg);
jinsom_post_js();
jinsom_post_status=1;
}
});
}


//===========搜索页面加载更多
function jinsom_more_search(obj){
type=$(obj).attr('type');
page=$(obj).attr('data');
keyword=$('#aciklama-search-val').val();
if($('.aciklama-load-post').length==0){
$(obj).before(aciklama.loading_post);
$(obj).hide();
}
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/more/search.php",
data: {page:page,type:type,keyword:keyword},
success: function(msg){   
$('.aciklama-load-post').remove();
$(obj).show();
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


//=======================================话题页面加载数据===================
function jinsom_topic_data(type,obj){

if($('.aciklama-load-post').length==0){
$('.aciklama-topic-post-list').prepend(aciklama.loading_post);
}

if(jinsom_post_status==0){
return false;	
}
topic_id=$('.aciklama-topic-info').attr('data');
post_list=$('.aciklama-topic-post-list');
$(obj).addClass('on').siblings().removeClass('on');
jinsom_post_status=0;
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/data/topic.php",
data: {type:type,topic_id:topic_id},
success: function(msg){   
post_list.html(msg);
jinsom_post_js();
jinsom_post_status=1;
}
});
}


//加载更多话题
function jinsom_topic_data_more(type,obj){
topic_id=$('.aciklama-topic-info').attr('data');
page=$(obj).attr('data');
if($('.aciklama-load-post').length==0){
$(obj).before(aciklama.loading_post);
$(obj).hide();
}
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/data/topic.php",
data: {type:type,topic_id:topic_id,page:page},
success: function(msg){   
$('.aciklama-load-post').remove();
$(obj).show();
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



//电脑端动态加载更多评论
function jinsom_more_comment(post_id,obj){
if($('.aciklama-load-post').length==0){
$(obj).before(aciklama.loading_post);
$(obj).hide();
}
page=$(obj).attr('page');
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/more/post-comment.php",
data: {post_id:post_id,page:page},
success: function(msg){   
$('.aciklama-load-post').remove();
$(obj).show();
if(msg==0){
layer.msg('没有更多评论！');
$(obj).remove();
}else{
$('.aciklama-post-comment-list').append(msg);
paged=parseInt(page)+1;
$(obj).attr('page',paged);	
}

}
});

}