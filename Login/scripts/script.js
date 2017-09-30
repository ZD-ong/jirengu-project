//写一个方便选择元素的函数
function $(selector){
    return document.querySelector(selector);
}

function $$(selector){
    return document.querySelectorAll(selector);
}

//点击图标时，显示模态框
$('header .login').onclick = function(e){
    //阻止事件往上层documemt冒泡（后面的点击空白处关闭模态框会被冒泡事件影响）
    e.stopPropagation();
    $('.flip-modal').style.display = 'block';
}


//切换效果方法一：
//
// $$('.modal .login').forEach(function(node){
//     node.onclick = function(){
//         $('.flip-modal').classList.remove('register');
//         $('.flip-modal').classList.add('login');
//     }
// })
// $$('.modal .register').forEach(function(node){
//     node.onclick = function(){
//         $('.flip-modal').classList.remove('login');
//         $('.flip-modal').classList.add('register');
//     }
// })

//切换效果方法二：
$('.flip-modal').addEventListener('click', function(e){
    //阻止事件往上层documemt冒泡
    e.stopPropagation();
    if(e.target.classList.contains('login')){
        $('.flip-modal').classList.remove('register');
        $('.flip-modal').classList.add('login');
    }
    if(e.target.classList.contains('register')){
        $('.flip-modal').classList.remove('login');
        $('.flip-modal').classList.add('register');
    }
    //内部没有元素的时候不要用这个方法，会点中子元素
    if(e.target.classList.contains('close')){
        $('.flip-modal').style.display = 'none';
    }
});

//点击空白处关闭模态框
document.addEventListener('click', function(){
    $('.flip-modal').style.display = 'none';
});

//登陆界面表单的验证
$('.modal-login form').addEventListener('submit', function(e){
    //取消该事件，阻止一个input元素内非法字符的输入
    e.preventDafault();
    //如果正则没有匹配到包括字母数字下划线的3-8个字符，显示innerText
    if(!/^\w{3,8}$/.test($('.modal-login input[name-username]').value)){
        $('.modal-login .errormsg').innerText = '用户名需输入3-8个字符，包括字母数字下划线';
        return false;
    }
    //如果正则没有匹配到包括字母数字下划线子在内的6-10个字符，显示innerText
    if(!/^\w{6,10}$/.test($('.modal-login input[name=password]').value)){
        $('.modal-login .errormsg').innerText = '密码需要输入6-10个字符，包括数字字母下划线';
        return false;
    }
    //提交
    this.submit();
})

//注册界面表单验证
$('.modal-register form').addEventListener('submit', function(e){
    e.preventDefault()
    //如果正则没有匹配到包括字母数字下划线的3-8个字符，显示innerText
    if(!/^\w{3,8}$/.test($('.modal-register input[name=username]').value)){
      $('.modal-register .errormsg').innerText = '用户名需输入3-8个字符，包括字母数字下划线';
      return false;
    }
    if(/^hunger$|^ruoyu$/.test($('.modal-register input[name=username]').value)){
      $('.modal-register .errormsg').innerText = '用户名已存在';
      return false;
    }
    //如果正则没有匹配到包括字母数字下划线子在内的6-10个字符，显示innerText
    if(!/^\w{6,10}$/.test($('.modal-register input[name=password]').value)){
      $('.modal-register .errormsg').innerText = '密码需输入6-10个字符，包括字母数字下划线';
      return false;
    }
    //判断两次密码是否一样
    if($('.modal-register input[name=password]').value !== $('.modal-register input[name=password2]').value){
      $('.modal-register .errormsg').innerText = '两次输入的密码不一致'
      return false
    }
    //提交
    this.submit();      
  })