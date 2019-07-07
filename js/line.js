// 纵向参考线
function line_y(a, b){
    $('#line_y1').show().css({left: a - 1 + 'px'});
    $('#line_y2').show().css({left: b - 0 + a + 4 + 'px'});
    setTimeout(function(){
        hide_line(1, 1);
    }, 1000)
}

// 横向参考线
function line_x(a, b){
    $('#line_x1').show().css({top: a - 1 + 'px'});
    $('#line_x2').show().css({top: b - 0 + 10 + 'px'});
    setTimeout(function(){
        hide_line(1, 1);
    }, 1000)
}

// 隐藏参考线
function hide_line(x, y){
    if(x === 1){
        $('.line_x').hide();
    }
    if(y === 1){
        $('.line_y').hide();
    }
}
