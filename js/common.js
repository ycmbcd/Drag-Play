// 工具删除弹框确认
function del_tool_yes() {
    $('#del_tool').modal('hide');
    var del_id = $('#del_id').text();
    $('#' + del_id).remove();
}

// 工具删除弹框取消
function del_tool_no() {
    $('#del_tool').modal('hide');
    var del_id = $('#del_id').text();
    $('#' + del_id).css({ 'left': '300px', 'top': '200px' });
}

// 二次拖放计算是否超出工作区
function drag_next(id, event) {
    var box_x = $('#work_box').offset().left;   // 工作区左侧距离
    var box_y = $('#work_box').offset().top;    // 工作区上端距离
    var new_x = event.pageX - box_x - 80;
    var new_y = event.pageY - box_y - 30;

    var can_remove = 0; // 默认在工作区内，不删除

    // 区域距离运算
    $('.tool_border').css({ 'z-index': 1 });
    $('#' + id).css({ 'left': new_x + 'px', 'top': new_y + 'px', 'z-index': 100 });
    var remove_left = $('#' + id).position().left;
    var remove_right = remove_left + $('#' + id).width() - $('#work_box').width() - 40;
    var remove_top = $('#' + id).position().top;
    var remove_bottom = remove_top + $('#' + id).height() - $('#work_box').height() - 40;
    if (remove_left < 0 || remove_right > 0 || remove_top < 0 || remove_bottom > 0) can_remove = 1;
    if (can_remove === 1) {
        $('#del_tool').modal('show');
        $('#del_id').text(id);
    }
}

// 鼠标动作
function mouse_move(id, event) {
    hide_line(1, 1);
    if (event.which === 1) {
        var new_x = event.pageX - $('#work_box').offset().left - 50;
        var new_y = event.pageY - $('#work_box').offset().top - 40;
        $('#' + id).css({ "left": new_x, "top": new_y });
        drag_next(id, event);   // 计算是否超出工作区
        if ($('#' + id).parent().hasClass('group_box')) {   // 判断是否在组中
            check_break(id, event);    // 在组中，拆分组件操作，及整组拖拽
        } else {
            check_common(id);   // 不再组中，合并操作
        }
    }
}

// 吸附判断 + 合并组功能
function check_common(id) {
    var now_left = $('#' + id).position().left;
    var now_top = $('#' + id).position().top;
    var now_height = $('#' + id).height();  // 获取正在拖动块的高度

    setTimeout(function () {
        $('.tool_border').addClass('can_common');   // 零散组件可以合并

    }, 100)
    $('.group_box .tool_border').removeClass('can_common');   // 组中组件不可合并
    $('#' + id).removeClass('can_common');  // 正在拖拽的组件不参与遍历

    $('.can_common').each(function () {   // 遍历零散组件
        var can_common = 0;     // 默认不可吸附
        var other_left = $(this).position().left;
        var other_width = $(this).width();
        if (Math.abs(now_left - other_left) < 20) {
            line_y(other_left, other_width); // 显示纵向参考线
            $('#' + id).css({ left: other_left + 'px' });
            can_common = 1;     // 条件小于一定范围可以横向吸附
        } else {
            hide_line(0, 1);    // x, y
            can_common = 0;
        }
        if (can_common === 1) {   // 横向吸附成立,判断纵向是否可以吸附
            var other_top = $(this).position().top;
            var min_height = $(this).height();
            var max_height = min_height + 10;
            if ((now_top - other_top) < max_height && (now_top - other_top) > min_height) { // 小于一定范围，可以吸附
                new_top = other_top - 0 + other_top + 10;
                var line_height = other_top - 0 + min_height + now_height;
                line_x(other_top, line_height); // 显示横向参考线
                $('#' + id).css({ top: new_top + 'px' });
                if ($(this).hasClass('group_box')) {
                    var item_arr = new Array;
                    $('#' + id).find('.group_item').each(function (eq) {
                        item_arr.push($(this).attr('id'));
                    })
                    var group_id = $(this).attr('id');
                    add_group(id, group_id, item_arr);
                    // 这块没写，弹窗后，位置重置
                    $('#' + id).css({ 'left': '400px', 'top': '200px' });
                } else if ($('#' + id).hasClass('group_box')) {
                    // 如果拖拽的是组，则什么都不做
                } else if (!$(this).hasClass('group_box') && !$('#' + id).hasClass('group_box')) {
                    // 合并成组
                    $(this).addClass('group_item group_ing');
                    $('#' + id).addClass('group_item group_ing').attr('onmousemove', '');
                    var item_arr = new Array;
                    item_arr.push(id, $(this).attr('id'));
                    common_group(id, item_arr);
                }
            }
        }
    })
}

// 往组里追加，演示忽略，这里弹窗警告演示
function add_group(id, group_id, item_arr) {
    $('#alert_error').fadeIn(500);
    setTimeout(function () {
        $('#alert_error').fadeOut(500);
    }, 4000)
}

// 合并成一个组
function common_group(id, item_arr) {
    var now_group = 'g' + Date.parse(new Date());

    $('#work_box').append('<div onmouseover="add_active(\'' + now_group + '\')" \
                            onmouseout="remove_active(\''+ now_group + '\')" \
                            class="group_box can_common" id="' + now_group + '"></div>');
    // 排序
    var group_html = '';
    $.each(item_arr, function (index, val) {
        group_html = $('#' + val).prop("outerHTML") + group_html;
    })
    $('.group_ing').remove();
    $('#' + now_group).append(group_html);
    $('.group_ing').removeClass('group_ing');

    // 获取组里第一个 item 的位置
    var first_item = $('#' + now_group).children('.group_item').get(0).id;
    var group_left = $('#' + first_item).position().left;
    var group_top = $('#' + first_item).position().top;
    $('#' + now_group).css({ left: group_left, top: group_top });    // 定位组的位置
    $('.group_item').addClass('static');    // 切换 item 的 position，取消正在合并状态

    setTimeout(function () {  // 吸附后增加可拆分的时间，防止抖动。
        $('#' + id).attr('onmousemove', 'can_break(\'' + id + '\', event)');
    }, 300)
}

// 可以拆
function can_break(id, event) {
    if (event.which === 1) {
        var new_x = event.pageX - $('#work_box').offset().left - 50;
        var new_y = event.pageY - $('#work_box').offset().top - 40;
        $('#' + id).css({ "left": new_x, "top": new_y }).attr('onmousemove', 'mouse_move(\'' + id + '\',event)');
    }
}

// 拆分判断
function check_break(id, event) {
    // 如果是第一个元素，则拖动，不拆
    var item_index = $('#' + id).index();
    var group_id = $('#' + id).parent().attr('id');
    if (item_index === 0) {
        // 拖拽本组
        if (event.which === 1) {
            var new_x = event.pageX - $('#work_box').offset().left - 100;
            var new_y = event.pageY - $('#work_box').offset().top - 40;
            $('#' + id).parent().css({ "left": new_x, "top": new_y });
            drag_next(group_id, event);     // 计算是否超出工作区
        }
    } else {
        // 否则拆分
        $('#' + group_id).find('.group_item').removeClass('group_item static');
        $('#work_box').append($('#' + group_id).html());
        $('#' + group_id).remove();
    }
}
