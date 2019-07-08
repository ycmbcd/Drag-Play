$('document').ready(function(){
    cal_height();   // 计算工作区高度
})

// 计算工作区高度
function cal_height(){
    var win_height = $(window).height();
    new_height = win_height - 154
    $('#work_box').height(new_height);
    setTimeout(function(){
        cal_height();
    }, 1000)
}

// bootstrap 下拉选中
function b_dropdown(_this){
    var val = $(_this).find('.drop_item').text();
    $(_this).parents('.dropdown').find('.dropdown_val').text(val);
}

// tool hover标记
function add_active(id){
    $('#' + id).addClass('active_tool');
}

function remove_active(id){
    $('#' + id).removeClass('active_tool');
}

// tool 点击层级
function add_index(id){
    $('.tool_border').css({'z-index': 1});
    $('#' + id).css({'z-index': 100});
}

// 获取工具组件
function get_tools(id){
    var now_tools = $('#tools_'+id).html() + '<div id="close_tools_box" onclick="remove_tools()"><i class="fa fa-close"></i></div>';
    $('#tools_box').html(now_tools);
    $('#tools_box').show(300);
}

// 隐藏工具组件
function remove_tools(){
    $('#tools_box').hide(300);
    $("#group_tool_bar").hide();    // 隐藏组工具bar
}

// 抓起
function drag_start(id,event){
    var box_x = $('#work_box').offset().left;   // 工作区左侧距离
    var box_y = $('#work_box').offset().top;    // 工作区上端距离
    var new_x = event.pageX - box_x  - 80;
    var new_y = event.pageY - box_y  - 30;
    $('#del_id_x').text(new_x);
    $('#del_id_y').text(new_y);
}

// 抓取中
function drag_on(id,event){
    $('#'+id).css({
        'left' : event.clientX + 'px',
        'right' : event.clientY + 'px'
    });
}

// 从工具栏选出放下
function drop_end(tools, id,event){
    $('#'+id).show();

    var new_x = event.pageX - $('#work_box').offset().left - 40;
    var new_y = event.pageY - $('#work_box').offset().top - 40;
    var add_me = $('#' + tools + ' li').eq(id);
    var new_tool = $(add_me).html();
    var new_id = 't' + Date.parse(new Date());
    new_tool = '<div id="'+ new_id +'" \
            onclick = "add_index(\''+ new_id +'\')"\
            class="tool_border can_common" \
            onmouseout="remove_active(\''+ new_id +'\')" \
            onmouseover="add_active(\''+ new_id +'\')" \
            onmousemove="mouse_move(\''+ new_id +'\',event)"\
            style="\
                left:'+ new_x +'px;\
                top:'+ new_y +'px\
            ">' + new_tool + '</div>';
    $('#work_box').append(new_tool);
    remove_tools();
}
