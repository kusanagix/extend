$(function(){

layui.use(['layer', 'form','element'], function(){
var form = layui.form;
var element = layui.element;
// var laydate = layui.laydate;
var layer = layui.layer;
});

var header_height=$('.aciklama-header').height();


//Site çapında kaydırma çubuğu etkinlikleri
$(window).scroll(function(){
if($(window).scrollTop()>=header_height){
$('.aciklama-header').addClass('fixed');
}else{
$('.aciklama-header').removeClass('fixed');
}
});



//Makale, yazı sayfası sol sütun widget'ı kayan
if($('.aciklama-single-left-bar').length>0){
var elm = $('.aciklama-single-left-bar'); 
var startPos = $(elm).offset().top; //Mevcut modülün tepesinden olan mesafeyi hesaplayın
$.event.add(window, "scroll", function() { 
var p2 = $(window).scrollTop()+header_height;//artı gezinme çubuğu yüksekliği
if(p2>startPos){
elm.css({'position':'fixed','top':'60px','margin-left':'-60px','left':'inherit'});
}else{
elm.css({'position':'absolute'});	
}
});
}//Bir modülün var olup olmadığını kontrol edin




//Pop-up arama 


//Aramayı açmak için tıklayın
$('li.search').on('click', function(event){
event.preventDefault();
$('.aciklama-pop-search').addClass('show');
$('body').css('overflow','hidden');
$('.aciklama-pop-search-content input').focus();
});

//Aramayı kapatmak için tıklayın
$('.aciklama-pop-search .close').click(function() {
$('.aciklama-pop-search').removeClass('show');
$('body').css('overflow','auto');
});

//按esc键关闭 弹窗搜索
$(document).keyup(function(event){
if(event.which=='27'){
$('.aciklama-pop-search').removeClass('show');
$('body').css('overflow','auto');
}
});

//bir arama gönder
$(".aciklama-pop-search-content span").click(function(){
search_val =$.trim($(".aciklama-pop-search-content input").val());
if(search_val==''){
layer.msg('Arama içeriği boş olamaz!');
return false;
}
window.location.href=aciklama.home_url+'/?s='+search_val;
});

// Aramaya girin
$(".aciklama-pop-search-content input").keypress(function(e) {  
if(e.which == 13) {  
search_val =$.trim($(".aciklama-pop-search-content input").val());
if(search_val==''){
layer.msg('Arama içeriği boş olamaz!');
return false;
}
window.location.href=aciklama.home_url+'/?s='+search_val;
}  
}); 


//Forum ajax araması Aramaya girin
$("#aciklama-bbs-search").keypress(function(e) {  
if(e.which == 13) {  
jinsom_ajax_bbs_search();
}  
}); 



//Pop-up arka plan kapak formunu değiştir
$('.aciklama-member-change-bg,.aciklama-member-change-bg-head .close').click(function() {
if($('.aciklama-member-change-bg-form').css('display')=='none'){
$(".aciklama-member-change-bg-form").show();
$(".aciklama-member-change-bg-form").animate({bottom:"0px"});
}else{
$(".aciklama-member-change-bg-form").animate({bottom:"-300px"});
function d(){$(".aciklama-member-change-bg-form").hide();}setTimeout(d,300);
}
});


//Kullanıcı merkezi arka plan kapağını değiştir
$('.aciklama-member-change-bg-content li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
bg=$(this).attr('bg');
color=$(this).attr('color');
number=$(this).attr('number');
author_id=$('.aciklama-member-main').attr('data');
$('.aciklama-member-main').css('background-color',color);
$('.aciklama-member-bg').css('background-image','url('+bg+')');
$.ajax({
type: "POST",
url:  aciklama.module_url+"/action/skin.php",
data: {number:number,author_id:author_id},
success: function(msg){
if(msg.code==2){
jinsom_recharge_vip_form();
function c(){layer.msg(msg.msg);}setTimeout(c,1000);
}
}
});
});

//Daha fazla bilgi için kişisel ana sayfa
$(".aciklama-member-left-profile-more").click(function(){
$('.aciklama-member-left-profile-hide').show();
$(this).hide();
});

// --------------------------下拉事件-------------





//Dinamik sağ üst açılır
$('.aciklama-posts-list,.aciklama-post-list,.aciklama-search-content,.aciklama-topic-post-list').on('click','.aciklama-post-setting',function(event){
event.stopPropagation();
$(this).children(".aciklama-post-setting-box").toggle(100);
});
//Makalenin sol sütunundaki otomatik içindekiler tablosu
$('#aciklama-single-title-list').click(function(event){
event.stopPropagation();
$(this).children(".aciklama-single-title-list-content").toggle(0);
});
//Kişisel ana sayfa siyahı çekin ve aşağı çekin
$('.aciklama-member-follow-info span:last-child').click(function(event){
event.stopPropagation();
$(this).children(".aciklama-member-follow-box").toggle(100);
});
//bildirim çubuğu
$('.aciklama-notice').click(function(event){
event.stopPropagation();
$(this).children('ul').toggle(0);
$(this).find('.number').remove();//titremeyi kaldır

if($('.aciklama-notice-content li').length==0&&$('.aciklama-notice-content .a .aciklama-notice-empty').length==0){
$('.aciklama-notice-content .a,.aciklama-notice-content .b,.aciklama-notice-content .c').html(aciklama.loading);
$.ajax({   
url:aciklama.jinsom_ajax_url+"/action/notice.php",//Güncellemeler/gönderiler hakkında haberler alın
type:'POST',   
data:{notice:1},    
success:function(msg){
$('.aciklama-notice-content .aciklama-load').remove();
item_arr=msg.item.data;
like_arr=msg.like.data;
follow_arr=msg.follow.data;
item='';
like='';
follow='';


if(msg.item.code==1){
for (var i = 0; i < item_arr.length; i++) {
type=item_arr[i].type;
if(type=='cash'||type=='reg'||type=='post_agree'||type=='post_refuse'||type=='bbs-apply-refuse'||type=='order-send'){
item+='\
<li class="clear">\
'+item_arr[i].status+'\
<a href="'+item_arr[i].post_link+'" class="url">\
'+item_arr[i].action+'\
</a>\
<span>'+item_arr[i].time+'</span>\
</li>';
}else{
item+='\
<li class="clear">\
'+item_arr[i].status+'\
<a href="'+item_arr[i].author_link+'" target="_blank" class="name">'+item_arr[i].user_name+'</a>\
<a href="'+item_arr[i].post_link+'" target="_blank" class="url">\
'+item_arr[i].action+'\
</a>\
<span>'+item_arr[i].time+'</span>\
</li>';
}
}
}else{
item='<div class="aciklama-notice-empty">Güncellemeler, gönderiler ve sistemler hakkındaki haberler burada görüntülenecek</div>';	
}
$('.aciklama-notice-content .a').html(item);

if(msg.follow.code==1){
for (var i = 0; i < follow_arr.length; i++) {
follow+='\
<li class="clear">\
'+follow_arr[i].status+'\
<a href="'+follow_arr[i].author_link+'" target="_blank" class="name">'+follow_arr[i].user_name+'</a>\
<a href="'+follow_arr[i].author_link+'" target="_blank" class="url">\
'+follow_arr[i].action+'\
</a>\
<span>'+follow_arr[i].time+'</span>\
</li>';
}
}else{
follow='<div class="aciklama-notice-empty">Biri sizi takip ettiğinde burada görünün</div>';	
}
$('.aciklama-notice-content .b').html(follow);

if(msg.like.code==1){
for (var i = 0; i < like_arr.length; i++) {
like+='\
<li class="clear">\
'+like_arr[i].status+'\
<a href="'+like_arr[i].author_link+'" target="_blank" class="name">'+like_arr[i].user_name+'</a>\
<a href="'+like_arr[i].post_link+'" target="_blank" class="url">\
'+like_arr[i].action+'\
</a>\
<span>'+like_arr[i].time+'</span>\
</li>';
}
}else{
like='<div class="aciklama-notice-empty">Birisi gönderinizi/gönderinizi beğendiğinde burada gösterilir</div>';	
}
$('.aciklama-notice-content .c').html(like);


$('.aciklama-notice-content li').click(function(e){//Tıkladıktan sonra kırmızı noktayı kaldırın
$(this).children('m').remove();
});


}   
});
}


});



//Kapatmayı yasaklamak için bildirim çubuğu içerik alanını tıklayın
$(".aciklama-header-right").on("click",'.aciklama-notice ul', function(e){
e.stopPropagation();
});

//Etkinlikleri devret
$(document).on('click', function(event){
$('.aciklama-post-setting-box').hide();
$('.aciklama-smile-form').hide();//emojiyi göster
$('.aciklama-single-title-list-content').hide();//Makalenin sol sütunundaki otomatik içindekiler tablosu
$('.aciklama-notice ul').hide();
$('.aciklama-member-follow-box').hide();
});


//IM
$('.aciklama-chat-header-user').click(function(){
$(this).addClass('on');
$(this).siblings().removeClass('on');
$(".aciklama-chat-content-group").animate({left:'240px'},250);
$(".aciklama-chat-content-recent").animate({left:'240px'},250);
$('.aciklama-chat-clear-icon').hide();
});
$('.aciklama-chat-header-group').click(function(){
$(this).addClass('on');
$(this).siblings().removeClass('on');
$(".aciklama-chat-content-group").animate({left:'0px'},250);
$(".aciklama-chat-content-recent").animate({left:'240px'},250);
$('.aciklama-chat-clear-icon').hide();
});
$('.aciklama-chat-header-recent').click(function(){
$(this).addClass('on');
$(this).siblings().removeClass('on');
$(".aciklama-chat-content-group").animate({left:'0px'},250);
$(".aciklama-chat-content-recent").animate({left:'0px'},250);
$('.aciklama-chat-clear-icon').show();
});
//Ekran yüksekliğini otomatik olarak takip et
screen_height=$(window).height()-139;
$(".aciklama-chat-content").css('height',screen_height+'px');
$(window).resize(function() { 
screen_height=$(window).height()-139;
$(".aciklama-chat-content").css('height',screen_height+'px');
});



//anlık iletiyi kapat
$('.aciklama-chat-close-icon').click(function(){
$(".aciklama-chat").animate({right:'-280px'},280);
});
//打开IM
$('.aciklama-right-bar-im').click(function(){
$(this).children('.number').remove();
$(".aciklama-chat").animate({right:'0px'},280);
$('.aciklama-chat-content-recent-user').empty();
$('.aciklama-chat-content-follow-user').empty();
$('.aciklama-chat-content-group').empty();
$('.aciklama-chat-content-recent-user').append('<div class="aciklama-chat-loading"></div>');
$('.aciklama-chat-content-follow-user').append('<div class="aciklama-chat-loading"></div>');
$('.aciklama-chat-content-group').append('<div class="aciklama-chat-loading"></div>');
$.ajax({
type: "POST",
url:aciklama.module_url+"/chat/user-list.php",
data: {recent:1},
success: function(msg){
$('.aciklama-chat-content-recent-user').empty();
$('.aciklama-chat-content-recent-user').append(msg);  
}
});


$.ajax({
type: "POST",
url:aciklama.module_url+"/chat/user-list.php",
data: {group:1},
success: function(msg){
$('.aciklama-chat-content-group').empty();
$('.aciklama-chat-content-group').append(msg);  
}
});

$.ajax({
type: "POST",
url:aciklama.module_url+"/chat/user-list.php",
data: {follow:1},
success: function(msg){
$('.aciklama-chat-content-follow-user').empty();
$('.aciklama-chat-content-follow-user').append(msg);  
}
});

});



// Mesaj göndermek için girin - bire bir
$('body').on('keypress','.aciklama-chat-textarea',function(e){
if(e.which == 13) {  
e.preventDefault();
jinsom_send_msg();//Bir mesaj göndermek
}  
}); 


// Mesaj göndermek için girin - grup
$('body').on('keypress','.aciklama-chat-textarea-group',function(e){
if(e.which == 13) {  
e.preventDefault();
jinsom_send_group_msg();//Grup sohbet mesajı gönder
}  
}); 




jinsom_post_js();//ajax后加载要执行的脚本




//Kenar çubuğu küçük işlev anahtarı tarama sıralama
$('.aciklama-content-sort>li').click(function() {
$(this).addClass('on').siblings().removeClass('on');
name=$(this).attr('data');
if(name=='rand'){
$('.aciklama-right-bar li.sort').attr('title','Rastgele sıra').html('<i class="aciklama-icon aciklama-suijibofang"></i>');	
}if(name=='comment_count'){
$('.aciklama-right-bar li.sort').attr('title','Popüler sıralama').html('<i class="aciklama-icon aciklama-huo"></i>');	
}else{
$('.aciklama-right-bar li.sort').attr('title','Sırayla görüntüle').html('<i class="aciklama-icon aciklama-shunxu-"></i>');	
}
SetCookie('sort',name);	
window.location.reload();
});	

//Kenar çubuğu kayan düğme tarama sıralama geçişi
$('.aciklama-right-bar li.sort').click(function() {
$('.aciklama-content-sort>li').removeClass('on');
if($(this).children().hasClass('aciklama-suijibofang')){
$(this).attr('title','Sırayla görüntüle').html('<i class="aciklama-icon aciklama-shunxu-"></i>');
$('.aciklama-content-sort>li[data="normal"]').addClass('on');
name='normal';
}else if($(this).children().hasClass('aciklama-shunxu-')){//Popüler bir sıralı anahtar ise
$(this).attr('title','Popüler sıralama').html('<i class="aciklama-icon aciklama-huo"></i>');
$('.aciklama-content-sort>li[data="comment_count"]').addClass('on');
name='comment_count';
}else{
$(this).attr('title','Rastgele sıra').html('<i class="aciklama-icon aciklama-suijibofang"></i>');
$('.aciklama-content-sort>li[data="rand"]').addClass('on');
name='rand';	
}
SetCookie('sort',name);	
window.location.reload();
});	

//Kişisel ana sayfanın sağ tarafında, sol tarafında araçlar askıya alınır
$('.aciklama-content-right,.aciklama-member-left,.aciklama-publish-single-form .left').JinsomSidebarFixed({additionalMarginTop: 50});





// -------------------------------Aşağıdakiler optimize edilecek


//Başa dönüş
$(".totop").click(function(){
$('html,body').animate({ scrollTop: 0 },500);
});
//en alta geri
$(".tobottom").click(function(){
$('html,body').animate({scrollTop:$('.aciklama-bottom').offset().top},500);
});

//kaydırma olayı
$(window).scroll(function(){
all_height=$(document).height();
height =$(document).scrollTop();//kaydırma çubuğu yüksekliği
if(height > 500){$(".totop").show()}else{$(".totop").hide();};
if((all_height-$(window).height()-height)<300){$(".tobottom").hide();}else{$(".tobottom").show();}
});



//dinamik stil
$(".aciklama-preference-content .post-style n").click(function(){
if($(this).html()=='Zaman ekseni'){
$(this).html('Dikdörtgen');
$(".aciklama-post-list").addClass('block').removeClass('time');
jinsom_set_cookie('post-style','post-style-block.css');
}else{
$(this).html('Zaman ekseni');
$(".aciklama-post-list").addClass('time').removeClass('block');  
jinsom_set_cookie('post-style','post-style-time.css');
}
});

//dinamik stil
$(".aciklama-preference-content .sidebar-style n").click(function(){
if($(this).html()=='左'){
$(this).html('右');
jinsom_set_cookie('sidebar-style','sidebar-style-right.css');
}else{
$(this).html('左'); 
jinsom_set_cookie('sidebar-style','sidebar-style-left.css');
}
});

//Tek sütun düzeni
$(".aciklama-preference-content .single-column").click(function(){
if($(this).children().hasClass('fa-toggle-off')){
$(this).html('Tek sütun düzeni<i class="fa fa-toggle-on"></i>');
jinsom_set_cookie('layout-style','layout-single.css');
}else{
$(this).html('Tek sütun düzeni<i class="fa fa-toggle-off"></i>');
jinsom_set_cookie('layout-style','layout-double.css');
}
});


//Mesaj aralığı
$(".aciklama-preference-content .post-space").click(function(){
if($(this).children().hasClass('fa-toggle-off')){
$(this).html('Mesaj aralığı<i class="fa fa-toggle-on"></i>');
jinsom_set_cookie('space-style','bbs-post-space-on.css');
}else{
$(this).html('Mesaj aralığı<i class="fa fa-toggle-off"></i>');
jinsom_set_cookie('space-style','bbs-post-space-off.css');
}
});


//Tercihler - Arka Plan Resmini Değiştir
$('.aciklama-preference-list').on('click','li',function(){
$(this).addClass('on').siblings().removeClass('on');
bg=$(this).attr('bg');
if(bg=='default'){
DelCookie('preference-bg');
$('#aciklama-bg-style').attr('href','');
}else{
jinsom_set_cookie('preference-bg',bg);
}
});



//Başlık bildirim çubuğu sekmesi değiştirme
$('.aciklama-notice-title').children().click(function(e){
e.stopPropagation();
$(this).siblings().removeClass('on');
$(this).addClass('on').children('.tip').remove();
num=$(this).index();
$(this).parent().next().children().hide();
$(this).parent().next().children().eq(num).show();
});
$('.aciklama-notice').on('click','a',function(e){//köpürmeyi kes
e.stopPropagation();
});

//Kenar çubuğu paylaşım bağlantısını kopyalayın
var clipboard = new ClipboardJS('#aciklama-copy-share-link');
clipboard.on('success', function(e) {
e.clearSelection();
$('#aciklama-copy-share-link').append('<g>Başarıyla kopyala！</g>');
function d(){$('#aciklama-copy-share-link').children('g').remove()}
setTimeout(d,1000);
});







});


//Şelale görüntü önyüklemesi
function jinsom_loadImage(url) {
var img = new Image(); 
img.src = url;
if (img.complete) {
return img.src;
}
img.onload = function () {
return img.src;
};
};


