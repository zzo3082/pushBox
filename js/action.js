//參考來源 https://blog.csdn.net/OBKoro1/article/details/79010319

// 0為不能到的區域 1為目標 2為空道路 3為牆壁 4為箱子 5為角色
var myposition = [27, 54, 56]
var goalnumber = [1, 4, 4]
var level = 0
// 第1關的得獎數為1  第2關的得獎數為4
var goal = goalnumber[level]
var position = myposition[level]
var mapclass = [
    [
    0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,3,3,3,3,3,3,3,3,0,0,
    0,0,3,2,2,2,2,2,2,3,0,0,
    0,0,3,2,4,2,2,2,2,3,0,0,
    0,0,3,2,2,2,1,2,2,3,0,0,
    0,0,3,2,2,2,2,2,2,3,0,0,
    0,0,3,3,3,3,3,3,3,3,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0
],  [
    0,0,0,0,3,3,3,0,0,0,0,0,
    0,0,0,0,3,1,3,0,0,0,0,0,
    0,0,0,0,3,2,3,3,3,3,0,0,
    0,0,3,3,3,4,2,4,1,3,0,0,
    0,0,3,1,2,4,2,3,3,3,0,0,
    0,0,3,3,3,3,4,3,0,0,0,0,
    0,0,0,0,0,3,1,3,0,0,0,0,
    0,0,0,0,0,3,3,3,0,0,0,0
],  [
    0,0,3,3,3,3,3,3,3,0,0,0,
    0,0,3,2,2,2,2,2,3,3,3,0,
    0,3,3,4,3,3,3,2,2,2,3,0,
    0,3,2,2,2,4,2,2,4,2,3,0,
    0,3,2,1,1,3,2,4,2,3,3,0,
    0,3,3,1,1,3,2,2,2,3,0,0,
    0,0,3,3,3,3,3,3,3,3,0,0
]
]

//main內的 class = map 內所有的div建立class 
function creat(){
    $('.map div').each(function(index){
        
        // 初始化
        $('.map div').eq(index).removeClass();
        
        //使用mapclass的陣列 將類別帶入每個div
        if(mapclass[level][index] != 0){
            $('.map div').eq(index).addClass('type'+ mapclass[level][index])
        }

        //每關一開始角色所在地
        $('.map div').eq(myposition[level]).addClass('type5');

        $('div').css('background', '')

    })
}

//按按鈕選關卡 建立地圖
$('#start').click(function(){
    level = $('select').val()
    position = myposition[level]
    goal = goalnumber[level]
    creat();
})
//重置按鈕 重製這一關 計時器不動
$('#restart').click(function(){
    position = myposition[level]
    goal = goalnumber[level]
    creat();
})
//重新開始 失敗視窗隱藏 重第1關開始
$('#re').click(function(){
    $('#timeout').css('visibility', 'hidden')
    level = 0
    position = myposition[level]
    goal = goalnumber[level]
    creat();
})

//建立鍵盤事件 左上右下 分別為 37,38,39,40
//一行12格 往上下 index +-12  鍵盤對應code
//https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/291959/
$(document).keydown(function(event){
    //當失敗跳出時 不能操作腳色
    if ($('#timeout').css('visibility') === 'hidden'){
        if(event.which == 37){
                //向左 index -1
                move(-1)
                //設定上下左右的人物圖片
                $('.type5.type2').css('background', 'url("../img/walk_left.png") ,url(../img/grass.jpg)')
                $('.type5.type2').css('background-size', '40px 40px')


            }
            else if(event.which == 38){
                //向上 index -12
                move(-12)
                $('.type5').css('background', 'url("../img/walk_up.png") ,url(../img/grass.jpg)')
                $('.type5.type2').css('background-size', '40px 40px')

            }
            else if(event.which == 39){
                //向右 index +1
                move(1)
                $('.type5').css('background', 'url("../img/walk_right.png") ,url(../img/grass.jpg)')
                $('.type5.type2').css('background-size', '40px 40px')

            }
            else if(event.which == 40){
                //向下 index +12
                move(12)
                $('.type5').css('background', 'url("../img/walk_down.png") ,url(../img/grass.jpg)')
                $('.type5.type2').css('background-size', '40px 40px')

            }
        
            //按完案鍵 判斷是否贏了
            setTimeout(win,500)
    }
})



function move(dirction){
    //現在位置的 class
    var now = $('.map div').eq(position);
    var next = $('.map div').eq(position+dirction);
    var boxMove = $('.map div').eq(position+dirction*2);
    // 正常移動 下個位置不是箱子4 是空道路2 或是 目標1
    // 則目前位置的class下個位置class改變  myposition的index運算
    if(!next.hasClass('type4') && ( next.hasClass('type2') || next.hasClass('type1') )){
        now.removeClass('type5').addClass('type2');
        next.addClass('type5');
        now.css('background', '')
        position = position + dirction
    }
    //推箱子 如果 next是箱子4 且boxMove 箱子的下個位置 是目標1 或是空道路2 則正常推動
    //將next從 箱子4變成角色5 now現在位置從角色5變成空道路2
    else if((next.hasClass('type4')) && (!boxMove.hasClass('type4'))&& ( boxMove.hasClass('type1') || boxMove.hasClass('type2') )){
        next.removeClass('type4');
        now.removeClass('type5');
        now.css('background', '')
        boxMove.addClass('type4');
        next.addClass('type5').addClass('type2');
        position = position + dirction
    }
}


// 判斷過關 同一格包含 兩種 class 箱子4 和 目標1 
//https://pjchender.blogspot.com/2015/03/cssmultiple-selectorsspace.html 兩個class選擇

function win(){
    if($('.type1.type4').length == goal){
        if(level<2){
            level++;
            position = myposition[level]
            goal = goalnumber[level]
            creat();
        }
        else{
            window.location.replace('./goal.html')
        }
    };
}
    // 計時器
    // https://www.delftstack.com/zh-tw/howto/javascript/count-down-timer-in-javascript/
    function paddedFormat(num) {
        //如果數字小於10 則回傳'0'+num(未滿2位數前面補0)  否則回傳num
        //return num < 10 ? "0" + num : num; 
        if (num < 0){return "00"}
        else if (num < 10){
            return "0" + num
        }
        else{ return num }
    }

    function startCountDown(duration, element) {

        var secondsRemaining = duration;
        var min = 0;
        var sec = 0;

        var countInterval = setInterval(function () {
            min = parseInt(secondsRemaining / 60);
            sec = parseInt(secondsRemaining % 60);

            element.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;

            secondsRemaining = secondsRemaining - 1;
            if (secondsRemaining < 0) { 
                clearInterval(countInterval); 
                // 時間到 失敗視窗跳出
                $('#timeout').css('visibility', 'visible')
            };

        }, 1000);
    }


    //當案開始時 設定計時 以秒為單位 
    //設定失敗視窗為隱藏
    $('#start, #re').click( function () {
        
        var time_minutes = 0; // Value in minutes
        var time_seconds = 30; // Value in seconds

        var duration = time_minutes * 60 + time_seconds;

        element = document.querySelector('#count-down-timer');
        element.textContent = `${paddedFormat(time_minutes)}:${paddedFormat(time_seconds)}`;
       
        startCountDown(--duration, element);

        $('#timeout').css('visibility', 'hidden')
    });