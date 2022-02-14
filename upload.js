//上传类
$(function(){

//上传头像
$('#aciklama-upload-avatar').off('click').on('change', function(){
$('.aciklama-member-avatar span').css('display','inline-block');
$('.aciklama-member-avatar span').html('<i class="fa fa-spinner fa-spin"></i> 上传中...');

$("#aciklama-upload-avatar-form").ajaxSubmit({
dataType:'json',
success:function(data){
$('.aciklama-member-avatar span').hide();
$('.aciklama-member-avatar span').html('点击修改头像');
$('#aciklama-upload-avatar').val('');
if(data.code == 1){
$('.aciklama-member-avatar img').attr('src',data.file_url);
}else{
layer.msg(data.msg);
}
}, 
error:function(){
$('.aciklama-member-avatar span').hide();
$('.aciklama-member-avatar span').html('点击修改头像');
$('#aciklama-upload-avatar').val('');    
layer.msg('上传失败！'); 
} 
});
});


//上传本地视频
$('body').off('click').on('change','#aciklama-upload-video', function(){
var bar = $('.aciklama-video-bar');
var percent = $('.aciklama-video-percent');
var progress = $(".aciklama-video-progress");

$("#aciklama-upload-video-form").ajaxSubmit({
dataType:'json',
beforeSend: function() {
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal);
if(percentVal=='100%'){
percent.html('正在处理中...<i class="fa fa-spinner fa-spin"></i>');	
}
},
success:function(msg){
$('.aciklama-video-progress').hide();
layer.msg(msg.msg);
percent.children('i').remove();
$('#aciklama-upload-video').val('');
if(msg.code==0){
bar.width('0');
}else if(msg.code==1){
$('#aciklama-video-url').val(msg.file_url);
}


}, 
error:function(){
percent.children('i').remove();
layer.msg('上传失败！');
bar.width('0');
$('.aciklama-video-progress').hide();
$('#aciklama-upload-video').val('');
return false;
} 
});
});

//上传本地音乐
$('body').off('click').on('change','#aciklama-upload-music', function(){
var bar = $('.aciklama-music-bar');
var percent = $('.aciklama-music-percent');
var progress = $(".aciklama-music-progress");

$("#aciklama-upload-music-form").ajaxSubmit({
dataType:'json',
beforeSend: function() {
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal);
if(percentVal=='100%'){
percent.html('正在处理中...<i class="fa fa-spinner fa-spin"></i>');	
}
},
success:function(msg){
$('.aciklama-music-progress').hide();
layer.msg(msg.msg);
percent.children('i').remove();
$('#aciklama-upload-music').val('');
if(msg.code==0){
bar.width('0');
}else if(msg.code==1){
$('#aciklama-music-url').val(msg.file_url);
}


}, 
error:function(){
percent.children('i').remove();
layer.msg('上传失败！');
bar.width('0');
$('.aciklama-music-progress').hide();
$('#aciklama-upload-music').val('');
return false;
} 
});
});


//上传背景音乐
$('.aciklama-member-right').off('click').on('change','#aciklama-upload-user-bg-music', function(){
var bar = $('.aciklama-bg-music-bar');
var percent = $('.aciklama-bg-music-percent');
var progress = $(".aciklama-bg-music-progress");

$("#aciklama-upload-user-bg-music-form").ajaxSubmit({
beforeSend: function() {
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal);
},
success:function(msg){
$('.aciklama-bg-music-progress').hide();
layer.msg(msg.msg);

if(msg.code == 0){
bar.width('0');
}else if(msg.code == 1){
$('#aciklama-bg-music-url').val(msg.file_url);
$('#aciklama-upload-user-bg-music').val('');
}

}, 
error:function(){
layer.msg('上传失败！');
bar.width('0');
$('.aciklama-bg-music-progress').hide();
$('#aciklama-upload-user-bg-music').val('');
return false;
} 
});
});





//上传本地附件
$('body').off('click').on('change','#aciklama-insert-file-input', function(){
bar=$('.aciklama-file-bar');
percent=$('.aciklama-file-percent');
progress=$(".aciklama-file-progress");
if(percent.children('i').length==0){

$("#aciklama-insert-file-form").ajaxSubmit({
dataType : "json",
timeout: 120000,//120秒退出
beforeSend: function() {
$('#aciklama-insert-file').hide();
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal+' <i class="fa fa-spinner fa-spin"></i>');
if(percentVal=='100%'){
percent.html('正在处理中...<i class="fa fa-spinner fa-spin"></i>');	
}
},
success:function(data){
$('#aciklama-insert-file').show();
$('#aciklama-insert-file-input').val('');
if(data.code == 1){
$('#aciklama-insert-file-url').val(data.file_url);
$('#aciklama-insert-file-name').val(data.name);
percent.html('上传成功！100%').children('i').remove();
}else{
progress.hide();
percent.children('i').remove();
layer.msg(data.msg);
}
}, 
error:function(){
$('#aciklama-insert-file-input').val('');
layer.msg('上传失败！服务器配置问题！');
$('#aciklama-insert-file').show();
progress.hide();
return false;
} 
});

}
});




//上传
layui.use(['upload'], function(){
var upload = layui.upload;

//文章上传图片
upload.render({
elem: '#aciklama-single-upload',
url: aciklama.jinsom_ajax_url+'/upload/bbs.php',
multiple:true,
accept:'file',
before: function(obj){
$('#aciklama-single-upload').html('<i class="fa fa-spin fa-refresh">');
},
done: function(res, index, upload){
if(res.code == 1){
ue_single.focus();
ue_single.execCommand('inserthtml','<img src="'+res.file_url+'">');
}else{
layer.msg(res.msg);	
}
},
allDone: function(obj){
$('#aciklama-single-upload').html('<i class="fa fa-picture-o"></i>');
},
error: function(index, upload){
layer.msg('上传失败！');
$('#aciklama-single-upload').html('<i class="fa fa-picture-o"></i>');
}
});

//论坛上传图片
upload.render({
elem: '#aciklama-bbs-upload',
url: aciklama.jinsom_ajax_url+'/upload/bbs.php',
multiple:true,
accept:'file',
before: function(obj){
$('#aciklama-bbs-upload').html('<i class="fa fa-spin fa-refresh">');
},
done: function(res, index, upload){
if(res.code == 1){
ue.focus();
ue.execCommand('inserthtml','<img src="'+res.file_url+'">');
}else{
layer.msg(res.msg);	
}
},
allDone: function(obj){
$('#aciklama-bbs-upload').html('<i class="fa fa-picture-o"></i>');
},
error: function(index, upload){
layer.msg('上传失败！');
$('#aciklama-bbs-upload').html('<i class="fa fa-picture-o"></i>');
}
});

//文章权限区图片上传
upload.render({
elem: '#aciklama-single-pay-upload',
url: aciklama.jinsom_ajax_url+'/upload/bbs.php',
multiple:true,
accept:'file',
before: function(obj){
$('#aciklama-single-pay-upload').html('<i class="fa fa-spin fa-refresh">');
},
done: function(res, index, upload){
if(res.code == 1){
ue_single_pay.focus();
ue_single_pay.execCommand('inserthtml','<img src="'+res.file_url+'">');
}else{
layer.msg(res.msg);	
}
},
allDone: function(obj){
$('#aciklama-single-pay-upload').html('<i class="fa fa-picture-o"></i>');
},
error: function(index, upload){
layer.msg('上传失败！');
$('#aciklama-single-pay-upload').html('<i class="fa fa-picture-o"></i>');
}
});

//论坛上传图片==权限框框(付费区)
upload.render({
elem: '#aciklama-bbs-pay-upload',
url: aciklama.jinsom_ajax_url+'/upload/bbs.php',
multiple:true,
accept:'file',
before: function(obj){
$('#aciklama-bbs-pay-upload').html('<i class="fa fa-spin fa-refresh">');
},
done: function(res, index, upload){
if(res.code == 1){
ue_pay.focus();
ue_pay.execCommand('inserthtml','<img src="'+res.file_url+'">');
}else{
layer.msg(res.msg);	
}
},
allDone: function(obj){
$('#aciklama-bbs-pay-upload').html('<i class="fa fa-picture-o"></i>');
},
error: function(index, upload){
layer.msg('上传失败！');
$('#aciklama-bbs-pay-upload').html('<i class="fa fa-picture-o"></i>');
}
});

//论坛回复上传图片
upload.render({
elem: '#aciklama-bbs-comment-upload',
url: aciklama.jinsom_ajax_url+'/upload/bbs.php',
multiple:false,
accept:'file',
before: function(obj){
$('#aciklama-bbs-comment-upload').html('<i class="fa fa-spin fa-refresh">');
},
done: function(res, index, upload){
$('#aciklama-bbs-comment-upload').html('<i class="fa fa-picture-o"></i>');
if(res.code == 1){
ue.focus();
ue.execCommand('inserthtml','<img src="'+res.file_url+'">');
}else{
layer.msg(res.msg);	
}
},
error: function(index, upload){
layer.msg('上传失败！');
$('#aciklama-bbs-comment-upload').html('<i class="fa fa-picture-o"></i>');
}
});













});//layui











});