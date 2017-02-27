$(function() {
    var objBox = $('#slider-box');
    var objImg = objBox.find('.slider-img');
    var objImgAs = objImg.find('a');
    var objImgA0 = objImgAs.eq(0);
    var objSub = objBox.find('.slider-sub');
    var objSubSpans = null;
    var intImgLength = objImgAs.length;
    var intCurrentSub = 0, intIsActive = false;
    var objBtnLeft = objBox.find('.btn-left');
    var objBtnRight = objBox.find('.btn-right');
    var intIntervalTime = 4000; // 间隔时间
    var intRunTime = 800; // 运行时间
    var intRunStep = 1280; // 运行步长基数

    // 添加下标控制按钮
    (function() {
        for (var i = 0; i < intImgLength; i ++) {
            objSub.append('<span></span>');
        }
        objSubSpans = objSub.find('span').eq(0).addClass('current').end();
    })();

    // 定时轮翻方法
    var funInterval = setInterval(function() {
        funActive(++ intCurrentSub);
    }, intIntervalTime);

    // 动画轮翻方法
    function funActive(intSub) {
        if (intSub >= intImgLength) {
            intSub = 0;
            intCurrentSub = 0;
        }

        objSubSpans.eq(intSub).addClass('current').siblings().removeClass('current');
        objImgA0.animate({
            marginLeft : - intSub * intRunStep
        }, intRunTime, function() {
            intIsActive = false;
        });
    }

    // 点击下标事件
    objSubSpans.on('click', function() {
        if (intIsActive) return;
        intIsActive = true;

        var $this = $(this);
        var intIndex = $this.index();
        intCurrentSub = intIndex;
        funActive(intCurrentSub);
    });

    // 点击方向事件
    objBtnLeft.on('click', function() {
        if (intIsActive) return;
        intIsActive = true;

        if (intCurrentSub <= 0) {
            intCurrentSub = intImgLength;
        }
        funActive(-- intCurrentSub);
    });
    objBtnRight.on('click', function() {
        if (intIsActive) return;
        intIsActive = true;
        funActive(++ intCurrentSub);
    });

    // 轮番图得到焦点时停止动画
    objBox.hover(function() {
        clearInterval(funInterval);
    }, function() {
        clearInterval(funInterval);
        funInterval = setInterval(function() {
            funActive(++ intCurrentSub);
        }, intIntervalTime);
    });
});