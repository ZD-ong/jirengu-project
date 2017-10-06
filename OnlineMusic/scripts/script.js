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
}

audio.onplay= function(){
    clock = setInterval(function(){
    var min = Math.floor(audio.currentTime/60);
    var sec = Math.floor(audio.currentTime)%60 + '';
    sec = sec.length === 2? sec : '0' + sec;
    $('.content .info .time').innerText = min + ':' + sec;
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
  
