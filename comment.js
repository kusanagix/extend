//===================================动态评论 、帖子回复（一级、二级）==================

//评论动态
function jinsom_comment_posts(post_id,obj,ticket,randstr){
content=$.trim($(obj).siblings('.aciklama-post-comments').val());
layer.load(1);
$.ajax({
type:"POST",
dataType:'json',
url:aciklama.jinsom_ajax_url+"/action/comment.php",
data: {content:content,post_id:post_id,ticket:ticket,randstr:randstr},
success: function(msg) {
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){//成功
$(obj).siblings('.aciklama-post-comments').val('');
$(obj).parent('.aciklama-comment-textarea').next('.aciklama-post-comment-list').prepend('\
<li>\
<div class="aciklama-comment-avatar">'+aciklama.avatar+aciklama.verify+'</div>\
<div class="aciklama-comment-header">\
<span class="aciklama-comment-up" onclick="jinsom_single_comment_up('+msg.id+',this)">\
<i class="fa fa-thumbs-o-up"></i><m>0</m>\
</span>\
<div class="aciklama-comment-info">'+aciklama.nickname_link+aciklama.lv+aciklama.vip+aciklama.honor+'</div>\
<span class="aciklama-comment-time">1秒前</span><span class="aciklama-comment-from">来自 电脑端</span>\
</div>\
<div class="aciklama-comment-content">'+msg.content+'</div>\
<div class="aciklama-comment-footer"></div>\
</li>');   
}else if(msg.code==2){//没有绑定手机号
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);
}
},
});
}


//回复帖子 一级回复
//type:回帖类型 1为一级回帖 2：为二级回帖
function jinsom_bbs_comment(post_id,bbs_id,ticket,randstr){
content =ue.getContent();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:aciklama.jinsom_ajax_url+"/action/comment-bbs.php",
data: {content:content,post_id:post_id,bbs_id:bbs_id,type:1,ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){//成功
if($('.aciklama-tips').hasClass('aciklama-comment-can-see')){//回复可见的自动刷新
function d(){window.location.reload();}setTimeout(d,2000);
}else{
content = msg.content.replace(/\\/g,'');
$(".aciklama-bbs-comment-list").append('\
<div class="aciklama-bbs-single-box clear">\
<div class="left">\
<?php echo $landlord;?>\
<div class="avatar">\
'+aciklama.vip_icon+'\
'+aciklama.avatar+'\
'+aciklama.verify+'\
</div>\
<div class="name">'+aciklama.nickname_link+'</div>\
<div class="info">\
<div class="lv">'+aciklama.lv+'</div>\
<div class="vip">'+aciklama.vip+'</div>\
<div class="honor">'+aciklama.honor+'</div>\
</div>\
</div>\
<div class="right">\
<div class="aciklama-bbs-single-content">'+content+'</div>\
<div class="aciklama-bbs-single-footer"><span class="delete" onclick="jinsom_delete_bbs_comments('+msg.id+','+bbs_id+',this);">删除</span><span>1秒前</span><span>电脑端</span></div>\
</div>\
</div>');
}
ue.execCommand('cleardoc');
}else if(msg.code==2){//没有绑定手机号
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);
}

}

});
}


//回复帖子 二级回复
function jinsom_bbs_comment_floor(comment_id,post_id,bbs_id,obj,ticket,randstr){
content =$(obj).siblings('.aciklama-post-comments').val();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:aciklama.jinsom_ajax_url+"/action/comment-bbs.php",
data: {content:content,comment_id:comment_id,post_id:post_id,bbs_id:bbs_id,type:2,ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){//成功
$(obj).siblings('.aciklama-bbs-comment-floor-list').append('\
<li class="clear">\
<div class="floor-left">\
'+aciklama.avatar+'\
'+aciklama.verify+'\
</div>\
<div class="floor-right">\
<div class="name">'+aciklama.nickname_link+'：<span class="content">'+msg.content+'</span></div>\
</div>\
<div class="bottom">\
<span>刚刚</span>\
<span>来自 电脑端</span>\
</div>\
</li>');
$(obj).siblings('.aciklama-post-comments').val('');
}else if(msg.code==2){//没有绑定手机号
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);
}

}
});
}



//评论表单toggle
function jinsom_comment_toggle(boj){
$(boj).parent().siblings('.aciklama-comment-form').toggle();
}




//ajax 加载更多评论
function jinsom_ajax_comment(post_id,number,page){
bbs_id=$('.aciklama-bbs-single-header').attr('data');
$('.aciklama-bbs-comment-list').append(aciklama.loading);
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/more/comment.php",
data: {page:page,post_id:post_id,number:number,bbs_id:bbs_id},
success: function(msg){   
if(msg==0){
layer.msg('没有更多内容！');
}else{
$('html,body').animate({scrollTop:$('.aciklama-single-topic-list').offset().top}, 800);
$('.aciklama-bbs-comment-list').html(msg);
$('.aciklama-post-comments').focus(function(){
$(this).css('height','85px');
});
}

}
});
}



//评论点赞
function jinsom_single_comment_up(comment_id,obj){
if(!aciklama.is_login){
jinsom_pop_login_style();	
return false;
}
if($(obj).hasClass('on')){
layer.msg('你已经点赞！');
}else{
number=parseInt($(obj).children('m').html())+1;	
$(obj).html('<i class="fa fa-thumbs-up"></i><m>'+number+'</m>');
$(obj).addClass('on');	
layer.msg('点赞成功！');	
$.ajax({
type: "POST",
url:aciklama.module_url+"/action/comment-up.php",
data: {comment_id:comment_id,type:2},//点赞
});

}
}