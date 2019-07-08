function group_tool(id) {
    var tool_left = $('#' + id).position().left + $('#' + id).width() + 4;
    var tool_top = $('#' + id).position().top + 6;
    $('#group_tool_bar').show().css({ left: tool_left + 'px', top: tool_top + 'px' });
    $('#tool_bar_id').val(id);
}

// 获取组件工具里的值的选项个数
function get_option(method) {
    if (method == 'max_txt' || method == 'min_txt') {
        return 1;
    }
}

// 工具条功能
function tool_bar(method) {
    var id = $('#tool_bar_id').val();   // 获取点击组的 ID
    if (method == 'run') {    // 运行
        var step_arr = []; // 逐步数组
        var step_num = 0;

        // 获取组 tool 的 method 方法
        $('#' + id + ' .tool').each(function () {
            // 进行组内工具运算
            var _this = this;
            var now_method = $(_this).data('method');
            var option_num = get_option(now_method);     // 获取该 tool 有几个参数

            if(now_method == 'not_run'){
                alert_error('含有演示中暂不被支持的模块');
                return false;
            }

            // 寻找参数值
            for (var i = 0; i < option_num; i++) {
                var now_val = $(_this).children('input').eq(i).val();
                var now_obj = {"method": now_method, "val": now_val};
                step_arr[step_num] = now_obj;     // 推入到逐步数组中
                step_num = step_num + 1;
            }
        })
        if(step_arr == ''){
            alert_error('演示暂不提供该模块执行');
            return false;
        }else{
            step_show(step_arr);   // 实现逐步展示功能
        }
    }

    if (method == 'del') {  // 删除组
        $('#del_tool').modal('show');
        $('#del_id').text(id);
    }
}

// 逐步展示
function step_show(arr){
    var leng = arr.length;
    var index = 0;
    var final_val = '';
    var set_int = setInterval(function(){
        if(index < leng){
            // 功能显示
            if(arr[index]['method'] == 'max_txt'){
                var now_val = '<h2 class="inline">' + arr[index]['val'] + '</h2>';
            }

            if(arr[index]['method'] == 'min_txt'){
                var now_val = '<h4 class="inline">' + arr[index]['val'] + '</h4>';
            }

            final_val = final_val + ' ' + now_val;

            // 显示步骤
            var step = index - 0 + 1;
            $('#show_box').html('<h3>第'+ step +'步：</h3><div class="final_bg">' + now_val + '</div>')
            index ++;
        }else{
            clearInterval(set_int);
            // 运行结果
            $('#show_box').html('<h3>结论：</h3><div class="final_bg">' + final_val + '</div>')
        }   
    },2000)
}
