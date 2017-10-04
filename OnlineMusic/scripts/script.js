var currentIndex = 0;
var clock;
var audio = new Audio();
audio.autoplay = true;

getMusicList(function(List){
    console.log(List);
    loadMusic(List[currentIndex]);
});

audio.ontimeupdate = function(){
    console.log(this.currentTime);
    $('.content .info .progress .bar .progress-now').style.width = (this.currentTime/this.duration)*100 + '%';
}

audio.onplay= function(){
    clock = setInterval(function(){
    var min = Math.floor(audio.currentTime/60);
    var sec = Math.floor(audio.currentTime)%60 + '';
    sec = sec.length === 2? sec : '0' + sec;
    $('.content .info .time').innerText = min + ':' + sec;
    }, 1000)
}
audio.onpause = function(){
    clearInterval(clock);
}

function $(selector){
    return document.querySelector(selector);
}

// $('.content .main .control .control-panel:nth-child(2)').onclick = function(){
//     audio.pause();
//     this.querySelector('.conetent .main .control .control-panel:nth-child(2)').classList.remove('icon-stop');
//     this.querySelector('.comtent .main .control .control-panel:nth-child(2)').classList.add('icon-play');
// }

$('.content .main .control .control-panel: nth-child(2)').onclick = function(){
    if(audio.paused){
      audio.play()
      this.querySelector('.content .main .control .control-panel: nth-child(2)').classList.remove('icon-play');
      this.querySelector('.content .main .control .control-panel: nth-child(2)').classList.add('icon-stop');
    }else {
      audio.pause()
      this.querySelector('.content .main .control .control-panel: nth-child(2)').classList.remove('icon-stop');
      this.querySelector('.content .main .control .control-panel: nth-child(2)').classList.add('icon-play');
    }
  }


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
    console.log('begin play', musicObj);
    $('.content .info .song-name').innerText = musicObj.title;
    $('.content .info .author').innerText = musicObj.author;
    $('.content .info .album-name').innerText = musicObj.album;
    $('.content .info .description').innerText = musicObj.description;
    audio.src = musicObj.src;
}