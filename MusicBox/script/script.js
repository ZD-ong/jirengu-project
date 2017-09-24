/*getMusicList(function (list){
    console.log(list);
    var song = list[0];
    var audioObject = new Audio(song.src);
    audioObject.play();
})
*/
var currentIndex = 0;
var audio = new Audio();
//设置自动播放
audio.autoplay = true;
//等价于list[0]
getMusicList(function(list){
    loadMusic(list[currentIndex]);
})

//当currentTime更新时会触发timeupdate事件
audio.ontimeupdate = function(){
    console.log(this.currentTime);
    //更新进度条
    $('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%';
    //设置当前时间为通用格式
    var min = Math.floor(this.currentTime/60);//取分
    var sec = Math.floor(this.currentTime)%60 + ''//取秒并转化为字符串
    //判断秒数长度，长度为二输出本身，长度为一在个数前面拼接个零
    sec = sec.length === 2? sec : '0' + sec;
    //设置时间跑起来
    $('.musicbox .time').innerText = min + ':' + sec;
}

//写一个方便选择元素的函数
function $(selector){
    return document.querySelector(selector);
}


//封装成函数
function getMusicList(callback){
    //通过Ajax获取数据
    var xhr = new XMLHttpRequest();
    //music.json 发送请求时和当前域名保持一致
    xhr.open('GET', '/music.json', true);
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            callback(JSON.parse(this.responseText));
        } else {
            console.log('获取数据失败');
        }
    }
    xhr.onerror = function () {
        console.log('网络异常');
    }
    //启动
    xhr.send();
}

function loadMusic(musicObj){
    console.log('begin play', musicObj);
    $('.musicbox .title').innerText = musicObj.title;
    $('.musicbox .auther').innerText = musicObj.auther;
    audio.src = musicObj.src;
}