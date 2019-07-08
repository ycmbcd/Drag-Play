function group_tool(id) {
    var tool_left = $('#' + id).position().left + $('#' + id).width() + 4;
    var tool_top = $('#' + id).position().top + 6;
    $('#group_tool_bar').show().css({ left: tool_left + 'px', top: tool_top + 'px' });
    $('#tool_bar_id').val(id);
}

function tool_bar(method) {
    var id = $('#tool_bar_id').val();   // 获取点击组的 ID
    if(method == 'run'){
        // 获取组 tool 的 method 方法
        $('#' + id + ' .tool').each(function(){
            // 进行组内工具运算
            var now_method = $(this).data('method');
            var option_num = get_option(now_method);     // 获取该 tool 有几个参数
        })
        
        // 依次获取组内 data-method 方法
    }
    if(method == 'del'){
        $('#del_tool').modal('show');
        $('#del_id').text(id);
    }
}

function get_option(method){
    if(method == ''){
        // #############
    }
}
