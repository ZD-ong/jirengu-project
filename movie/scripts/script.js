//点击某一个div时给这个div添加active，其他兄弟元素移除active
$('footer>div').click(function(){
    var index = $(this).index();
    $('section').hide().eq(index).fadeIn();
    $(this).addClass('active').siblings().removeClass('active');
})

//使index初始化为0
var index = 0;

//先执行一次start函数获取第一部分的20个数据（总共250个数据）
start();

function start(){
//使用jquery的ajax方法获取豆瓣电影api的数据
    $.ajax({
        url: 'http://api.douban.com/v2/movie/top250',
        type: 'GET',
        data: {
            //从初始化的0开始先获取20个数据
            start: index,
            count: 20
        },
        dataType: 'jsonp'
    }).done(function(ret){
        console.log(ret);
        //调用setData
        setData(ret);
        index+=20;
    }).fail(function(){
        console.log('error...');
    });
}


$('main').scroll(function(){
    if($('section').eq(0).height() - 10 <= $('main').scrollTop() + $('main').height()){
        start();
    }
})

function setData(data){
    //便利获取的数据中的每一个subject
    data.subjects.forEach(function(movie){
        //把想要生成的dom放在这里，这其实是一个字符串
        var template = 
        `<div class="item">
            <a href="#">
                <div class="cover">
                <img src="" alt="">
                </div>
                <div class="detail">
                    <h2></h2>
                    <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
                    <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                    <div class="extra">导演: <span class="director"></span></div>
                    <div class="extra">主演: <span class="actor"></span></div>
                </div>
            </a>
      </div>`
      //将template变成jquery对象，后面方便使用jquery的方法操作
      var $node = $(template);
      //设置每一条电影数据
      $node.find('.cover img').attr('src', movie.images.medium);
      $node.find('.detail h2').text(movie.title);
      $node.find('.score').text(movie.rating.average);
      $node.find('.collect').text(movie.collect_count);
      $node.find('.year').text(movie.year);
      $node.find('.type').text(movie.genres.join('/'));
      $node.find('.director').text(function(){
          var directorsArr = [];
          movie.directors.forEach(function(item){
              directorsArr.push(item.name);
          });
          return directorsArr.join('、');
      });
      $node.find('.actor').text(function(){
          var actorArr = [];
          movie.casts.forEach(function(item){
              actorArr.push(item.name);
          });
          return actorArr.join('、');
      });
      $('section').eq(0).append($node);
    });
}