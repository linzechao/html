$(function () {
    $('section').swipeLeft(function (e) {
        console.log(e);
    }).swipeRight(function () {
        console.log('右移动');
    });
});
