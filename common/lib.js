$(function () {

    // 인물 사진 클릭시 체크박스 동작 및 선택 제한 실행
    $(".wdid_lst ul li").click(function () {
        // 현재 인물 사진 내에서 이름이 "q751"인 체크박스를 선택
        var $checks = $(this).find('input:checkbox[name=q751]');

        // 체크박스의 상태를 반전시킴 (체크되었던 것은 해제, 해제되었던 것은 체크)
        $checks.prop("checked", !$checks.is(":checked"));

        // 체크박스의 상태에 따라 인물 사진과 관련한 스타일 및 속성 변경
        if ($(this).find(".input input").prop("checked")) {
            $(this).find("input[name=q751]").prop("checked", true);
            $(this).find('.wdid_cst').addClass('bd_63ed8f'); // 선택된 항목 스타일 변경
        } else {
            $(this).find(".input input").prop("checked", false);
            $(this).find('.wdid_cst').removeClass('bd_63ed8f'); // 선택 해제된 항목 스타일 변경
        }

        // 선택된 항목의 개수 세기
        var chsv = $('.bd_63ed8f').length;

        // 선택된 항목이 7개를 초과하면 선택 취소 및 관련 스타일 변경, 경고 메시지 표시
        if (chsv > 7) {
            $checks.prop("checked", false);
            $checks.parent().next('.wdid_cst').removeClass('bd_63ed8f'); // 스타일 변경 취소
            alert('선택 항목을 7개 이하 선택해주세요.'); // 경고 메시지 표시
        }
    });
});

//ES6 version
document.addEventListener('DOMContentLoaded', () => {
    const photoItems = document.querySelectorAll('.wdid_lst ul li');
    
    // 화면에서 4개의 인물 사진마다 좌측 여백을 0으로 설정
    photoItems.forEach((item, index) => {
        if (index % 4 === 0) {
            item.style.marginLeft = '0';
        }
    });
    
});
