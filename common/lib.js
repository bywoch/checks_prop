$(function () {
    //인물 사진 각 행 첫번째 순번 margin-left : 0;
    $('.wdid_lst ul li:nth-child(4n+1)').css('margin-left', '0');

    //인물 사진 클릭시 체크박스 실행
    $(".wdid_lst ul li").click(function () {
        var $checks = $(this).find('input:checkbox[name=q751]');
        $checks.prop("checked", !$checks.is(":checked"));
        if ($(this).find(".input input").prop("checked")) {
            $(this).find("input[name=q751]").prop("checked", true);
            $(this).find('.wdid_cst').addClass('bd_63ed8f');
        } else {
            $(this).find(".input input").prop("checked", false);
            $(this).find('.wdid_cst').removeClass('bd_63ed8f');
        }
    });
});