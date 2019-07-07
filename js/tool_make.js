function group_tool(id) {
    var tool_left = $('#' + id).position().left + $('#' + id).width() + 4;
    var tool_top = $('#' + id).position().top + 6;
    $('#group_tool_bar').show().css({ left: tool_left + 'px', top: tool_top + 'px' });
    $('#tool_bar_id').val(id);
}

function tool_bar(method) {
    var id = $('#tool_bar_id').val();   // 获取点击组的 ID
    if(method == 'run'){
        console.log(555)
        
        // 依次获取组内 data-method 方法
    }
    if(method == 'del'){
        $('#del_tool').modal('show');
        $('#del_id').text(id);
    }
    

    // 计算
    // $('#')
    // var method = $('#' + id + ' .tool').data('method');
    // if(method == 'max_txt'){
    //     var now_val = $('#' + id + ' .tool input').val();
    //     console.log(now_val);
    // }
}
