//========================案例模块============================================

//弹出添加案例表单
function jinsom_add_case_form(){
layer.load(1);
$.ajax({
type: "POST",
url:aciklama.module_url+"/stencil/case.php",
data: {add_link_form:1},
success: function(msg){
layer.closeAll('loading');

layer.open({
title:'添加案例',
type: 1,
area: ['350px','auto'],
fixed: false,
resize:false,
skin: 'aciklama-add-case-form',
anim: 0,
content:msg
});	
layui.use('form', function(){
var form = layui.form;
form.render();
});

}
});
}

//提交添加案例
function jinsom_add_case(){
name=$('#aciklama-case-add-form [name="name"]').val();
if(name==''){layer.msg('请输入案例名称！');return false;}
data=$('#aciklama-case-add-form').serialize();
layer.load(1);
$.ajax({
type: "POST",
url:aciklama.module_url+"/action/case.php",
data: data,
success: function(msg){
layer.closeAll('loading');
layer.msg('添加成功！');
function a(){window.location.reload();}
setTimeout(a,2500); 
}
});

}


//弹出更新案例表单
function jinsom_update_case_form(case_id){
layer.load(1);
$.ajax({
type: "POST",
url:aciklama.module_url+"/stencil/case-update.php",
data: {case_id:case_id},
success: function(msg){
layer.closeAll('loading');

layer.open({
title:'修改案例',
type: 1,
fixed: false,
resize:false,
area: ['350px','auto'],
offset: '0px',
skin: 'aciklama-add-case-form',
anim: 0,
content:msg
});	
layui.use('form', function(){
var form = layui.form;
form.render();
});

}
});
}

//提交修改案例表单
function jinsom_update_case(case_id){
name=$('#aciklama-case-add-form [name="name"]').val();
if(name==''){layer.msg('请输入案例名称！');return false;}
data=$('#aciklama-case-add-form').serialize();
data+='&case_id='+case_id;
layer.load(1);
$.ajax({
type: "POST",
url:aciklama.module_url+"/update/case.php",
data: data,
success: function(msg){
layer.closeAll('loading');
layer.msg('修改成功！');
function a(){window.location.reload();}
setTimeout(a,2500); 
}
});
}

//删除案例
function jinsom_delete_case(case_id){
layer.confirm('确定要删除么', {
btn: ['确定','取消']
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:aciklama.module_url+"/delete/case.php",
data: {case_id:case_id},
success: function(msg){
layer.closeAll();
layer.msg('删除成功！');
$('#aciklama-case-'+case_id).fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function() {
$(this).remove();
});
});
}
});

});
}

//统计案例访问次数
function jinsom_case_visit(case_id){
times=$('#aciklama-case-'+case_id).find('n').html();
$('#aciklama-case-'+case_id).find('n').html(parseInt(times)+1);	
$.ajax({
type: "POST",
url:aciklama.module_url+"/action/case-visit.php",
data: {case_id:case_id},
success: function(msg){}
});
}

//案例分类切换
function jinsom_case_data(obj,type){
$(obj).addClass('on').siblings().removeClass('on');
$('.aciklama-link-content').html(aciklama.loading);
$.ajax({
type: "POST",
url:aciklama.module_url+"/action/case-data.php",
data: {type:type},
success: function(msg){
$('.aciklama-link-content').html(msg);
}
});	
}