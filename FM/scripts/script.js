
function $(selector) {
    return document.querySelector(selector);
  }
  
  function $$(selector) {
    return document.querySelectorAll(selector);
  }

function getList(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jirenguapi.applinzi.com/fm/getChannels.php',true);
    xhr.onload = function(){
        var data = JSON.parse(xhr.response).channels;
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
            data.forEach(function(e, i){
                var div = document.createElement('div');
                var id = JSON.stringify(e.channel_id);
                div.innerText = e.name;
                div.setAttribute('channel-id', id);
                $('.channel').appendChild(div);

            });

        }else{
            console.log('获取数据失败');
        }
    }
    xhr.onerror = function(){
        console.log('网络异常');
    }
    xhr.send();
}
getList();
