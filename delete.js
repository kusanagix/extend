
//=========================================etkinliği sil=================================


//Tek bir tıklama ile tüm hatırlatma mesajlarını temizleyin
function jinsom_delete_notice(){
layer.confirm('Tüm mesajları silmek istediğinizden emin misiniz?', {
btnAlign: 'c',
btn: ['Elbette','İptal'] 
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:aciklama.jinsom_ajax_url+"/delete/notice.php",
success: function(msg){ 
layer.closeAll('loading');
layer.msg(msg.msg);  
if(msg.code==1){
$('.aciklama-notice-content .a').html('<div class="aciklama-notice-empty">Güncellemeler, gönderiler ve sistemler hakkındaki haberler burada görüntülenecek</div>');
$('.aciklama-notice-content .b').html('<div class="aciklama-notice-empty">Biri sizi takip ettiğinde burada görünün</div>');
$('.aciklama-notice-content .c').html('<div class="aciklama-notice-empty">Birisi gönderinizi/gönderinizi beğendiğinde burada gösterilir</div>');
$('.aciklama-notice-title span').remove();
}
}
});
}); 
}

//Dinamik içeriği kaldır
function jinsom_delete_post(post_id,obj){
layer.confirm('Bu içeriği silmek istiyor musunuz?', {
btnAlign: 'c',
btn: ['Elbette','İptal']
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  aciklama.jinsom_ajax_url+"/delete/post.php",
data: {post_id:post_id,type:'post'},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
if($('.aciklama-main-content').hasClass('single')){//İçerik sayfasından silinirse, doğrudan ana sayfaya dönün
function d(){window.location.href='/';}setTimeout(d,2000);	
}else{
$(obj).parents('.aciklama-posts-list').fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function() {
$(this).remove();
});
});
}
}
}
});
});
}

//gönderi içeriğini sil
function jinsom_delete_bbs_post(post_id,bbs_id,obj){
layer.confirm('Bu içeriği silmek istiyor musunuz?',{
btnAlign: 'c',
btn: ['Elbette','İptal']
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  aciklama.jinsom_ajax_url+"/delete/post.php",
data: {post_id:post_id,bbs_id:bbs_id,type:'bbs'},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
if($('.aciklama-main-content').hasClass('single')){//İçerik sayfasından silinirse, doğrudan ana sayfaya dönün
function d(){window.location.href=msg.url;}setTimeout(d,2000);
}else{
$(obj).parents('.aciklama-posts-list').fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function() {
$(this).remove();
});
});
}
}
}
});
});
}


//Dinamik yorumları sil
function jinsom_delete_post_comments(comment_id,obj){//inceleme sayfam
layer.confirm('Yorumu silmek istediğinizden emin misiniz?', {
btnAlign: 'c',
btn: ['Elbette','İptal'] //buton
}, function(){
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:  aciklama.jinsom_ajax_url+"/delete/comment.php",
data: {comment_id:comment_id,type:'post'},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){//başarı
comment_dom=$(obj).parent('.aciklama-comment-footer');
comment_dom.siblings('.aciklama-comment-image-list').remove();
comment_dom.siblings('.aciklama-comment-content').html('<m class="delete"><i class="fa fa-trash"></i> Bu yorum silindi。</m>');
$(obj).remove();
}
}
});
}); 
}

//Birinci düzey gönderi yorumlarını sil
function jinsom_delete_bbs_comments(comment_id,bbs_id,obj){
if($(obj).parents('.right').children('.answer-icon').length>0){
layer.msg('Kabul edilen cevaplar silinemez!');	
return false;
}
layer.confirm('Yorumu silmek istediğinizden emin misiniz?', {
btnAlign: 'c',
btn: ['Elbette','İptal'] //buton
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  aciklama.jinsom_ajax_url+"/delete/comment.php",
data: {comment_id:comment_id,type:'bbs-post',bbs_id:bbs_id},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){//başarı
$(obj).parents('.aciklama-bbs-single-box').fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function() {
$(this).remove();
});
});
}

}
});
}); 
}

//İkincil gönderi yorumlarını sil
function jinsom_delete_bbs_comments_er(comment_id,bbs_id,obj){
layer.confirm('Yorumu silmek istediğinizden emin misiniz?', {
btnAlign: 'c',
btn: ['Elbette','İptal']
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  aciklama.jinsom_ajax_url+"/delete/comment.php",
data: {comment_id:comment_id,type:'bbs-post-floor',bbs_id:bbs_id},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$(obj).parents('li').fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function() {
$(this).remove();
});
});
}

}
});
}); 
}