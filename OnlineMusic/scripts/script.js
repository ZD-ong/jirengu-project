var musicList = [];
var currentIndex = 0;
var clock;
var audio = new Audio();
audio.autoplay = true;

getMusicList(function(List){
    musicList = List;
    loadMusic(List[currentIndex]);
});

audio.ontimeupdate = function(){
    $('.content .info .progress .bar .progress-now').style.width = (this.currentTime/this.duration)*100 + '%';
    $('.play .play-bar .play-progress-now').style.width = (this.currentTime/this.duration)*100 + '%';
}

audio.onplay= function(){
    clock = setInterval(function(){
    var min = Math.floor(audio.currentTime/60);
    var sec = Math.floor(audio.currentTime)%60 + '';
    sec = sec.length === 2? sec : '0' + sec;
    $('.content .info .time').innerText = min + ':' + sec;
    $('.play .play-time').innerText = min + ':' + sec;
    }, 1000);
    if(audio.play){
        $('.pause').classList.remove('icon-play');
        $('.pause').classList.add('icon-stop');
    }else{
        $('.pause').classList.remove('icon-stop');
        $('.pause').classList.add('icon-play');
    }
}
audio.onpause = function(){
    clearInterval(clock);
}
audio.onended = function(){
    currentIndex = (++currentIndex)%musicList.length;
    loadMusic(musicList[currentIndex]);
}


function $(selector){
    return document.querySelector(selector);
}
function $$(selector){
    return document.querySelectorAll(selector);
}

$('.content .main .control .control-panel .pause').onclick = function(){
    if(audio.paused){
        audio.play();
        this.classList.remove('icon-play');
        this.classList.add('icon-stop');
    }else{
        audio.pause();
        this.classList.remove('icon-stop');
        this.classList.add('icon-play');
    }
}

//踩过的坑，具体看上面绑定的onplay
// audio.onplay = function(){
//     if(audio.paused){
//         audio.play();
//         this.classList.remove('icon-play');
//         this.classList.add('icon-stop');
//     }else{
//         audio.pause();
//         this.classList.remove('icon-stop');
//         this.classList.add('icon-play');
//     }
// }


$('.content .main .control .control-panel .icon-next').onclick = function(){
    currentIndex = (++currentIndex)%musicList.length;
    console.log(currentIndex);
    loadMusic(musicList[currentIndex]);
}

$('.content .info .progress .bar').onclick = function(e){
    console.log(e);
    var precent = e.offsetX / parseInt(getComputedStyle(this).width);
    console.log(precent);
    audio.currentTime = audio.duration * precent;
}


//踩过的坑，this 就已经选中了
// $('.musicbox .play').onclick = function(){
//     if(audio.paused){
//       audio.play()
//       this.querySelector('.fa').classList.remove('fa-play')
//       this.querySelector('.fa').classList.add('fa-pause')
//     }else {
//       audio.pause()
//       this.querySelector('.fa').classList.add('fa-play')
//       this.querySelector('.fa').classList.remove('fa-pause')
//     }
//   }




function getMusicList(callback){
    var xhr =new XMLHttpRequest();
    xhr.open('GET', 'music.json', true);
    xhr.onload = function(){
        if((xhr.status >=200 && xhr.status <300) || xhr.status ===304){
            callback(JSON.parse(this.responseText));
        }else{
            console.log('获取数据失败')
        }
    }
    xhr.onerror = function(){
        console.log('网络异常');
    }
    xhr.send();
}
function loadMusic(musicObj){
    $('.content .info .song-name').innerText = musicObj.title;
    $('.content .info .author').innerText = musicObj.author;
    $('.content .info .album-name').innerText = musicObj.album;
    $('.content .info .description').innerText = musicObj.description;
    $('.content .main .control .album-img').innerHTML ='<img src="' + musicObj.img + '">';
    $('.cover').style.backgroundImage = 'url(' + musicObj.img + ')';
    //play中的数据
    $('.play .play-img').innerHTML ='<img src="' + musicObj.img + '">';
    $('.play .play-title').innerText = musicObj.title;
    $('.play .play-author').innerText = musicObj.author;

    audio.src = musicObj.src;
}

//figure的方法，不成功
// $('.footer .album-list').onclick = function(e){
//     console.log(e.target);//<img>
//     console.log(this);//albumlist
//     console.log(this.children);//figure数组
//     if(e.target.tagName.toLowerCase() === 'img'){
//         for(let i = 0; i < this.children.length; i++){
//             if(this.children[i] === e.target){
//                 currentIndex = i;
//             }
//         }
//     }
//     console.log(currentIndex);//0
//     loadMusic(musicList[currentIndex]);
// }

// $$(".album-list img).forEach(function(e,i){
// 	e.onclick = function(){
// 		playMusic(music[i])
// })

//获取全部的图片，这个坑就是多用console.log进行不断调试，确定你绑定事件的到底是哪一个元素
$$('.album-list img').forEach(function(e,i){
    console.log(e);
    if(e.tagName.toLowerCase() === 'img'){
        e.onclick = function(){
            loadMusic(musicList[i]);
        }
    }
    
})



// 使用li包裹图片依然失败
// $('.footer .album-list ul').onclick = function(e){
//     console.log(e.target);
//     console.log(this);
//     console.log(this.children);
//     if(e.target.tagName.toLowerCase() === 'li'){
//         for(var i = 0; i < this.children.length; i++){
//             if(this.children[i] === e.target){
//                 currentIndex = i;
//             }
//         }
//     }
//     console.log(currentIndex);//0
//     loadMusic(musicList[currentIndex]);
// }

//div方法
// var albumImg = document.querySelectorAll('.footer .album-list .pic img');
// albumImg.onclick = function(e){
//     console.log(e.target);
//     console.log(this);
//     console.log(this.children);
//     if(e.target.tagName.toLowerCase() === 'img'){
//         for(var i = 0; i < this.children.length; i++){
//             if(this.children[i] === e.target){
//                 currentIndex = i;
//             }
//         }
//     }
//     console.log(currentIndex);//0
//     loadMusic(musicList[currentIndex]);
// }


//方方老师让写的index函数。。。没写出来
// var albumList = $('.footer .album-list');
// //var img = document.querySelectorAll('.footer .album-list figure img');
// var img = $('#album1');

// function elementIndex(element) {
//     let albumList = img.parentNode.children;
//     for (let index = 0; i < albumList.length; i++) {
//       if (albumList[i] === img) {
//         return i;
//       }
//     }
//     return -1;
//   }
  
//点击图标时，显示模态框
$('.header .login').onclick = function(e){
    //阻止事件往上层documemt冒泡（后面的点击空白处关闭模态框会被冒泡事件影响）
    e.stopPropagation();
    $('.flip-modal').style.display = 'block';
    $('#show-modal').classList.add('modal-bg');
}

$('.flip-modal').onclick = function(e){
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
    //内部有元素的时候不要用这个方法，会点中子元素
    if(e.target.classList.contains('icon-close')){
        $('.flip-modal').style.display = 'none';
        $('#show-modal').classList.remove('modal-bg');
    }
}

document.onclick = function(){
    $('.flip-modal').style.display = 'none';
    $('#show-modal').classList.remove('modal-bg');
}

//登陆界面表单的验证
$('.modal-login form').addEventListener('submit', function(e){
    //取消该事件，阻止一个input元素内非法字符的输入
    e.preventDefault();
    //如果正则没有匹配到包括字母数字下划线的3-8个字符，显示innerText
    if(!/^\w{3,8}$/.test($('.modal-login input[name=username]').value)){
        $('.modal-login .errormsg').innerText = '用户名需输入3-8个字符，包括字母数字下划线';
        return false;
      }
    //如果正则没有匹配到包括字母数字下划线子在内的6-10个字符，显示innerText
    if(!/^\w{6,10}$/.test($('.modal-login input[name=password]').value)){
        $('.modal-login .errormsg').innerText = '密码需输入6-10个字符，包括字母数字下划线';
        return false;
      }
    //提交
    this.submit();
})


// $('.modal-login form').addEventListener('submit', function(e){
//     e.preventDefault()
//     if(!/^\w{3,8}$/.test($('.modal-login input[name=username]').value)){
//       $('.modal-login .errormsg').innerText = '用户名需输入3-8个字符，包括字母数字下划线'
//       return false
//     }
//     if(!/^\w{6,10}$/.test($('.modal-login input[name=password]').value)){
//       $('.modal-login .errormsg').innerText = '密码需输入6-10个字符，包括字母数字下划线'
//       return false
//     }
//     this.submit()      
//   })

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


  //鼠标10秒不动显示play页面
function change(){
    $('.content').classList.add('hide');
    $('.play').classList.remove('hide');
}

var changeKey = setInterval(change, 15000);
$('body').addEventListener('mousemove', function(){
    clearInterval(changeKey);
    $('.content').classList.remove('hide');
    $('.play').classList.add('hide');
    changeKey = setInterval(change, 3000);
});
