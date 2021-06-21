//ES6 version
document.addEventListener('DOMContentLoaded', () => {
    const photoItems = document.querySelectorAll('.wdid_lst ul li');
    
    // 화면에서 4개의 인물 사진마다 좌측 여백을 0으로 설정
    photoItems.forEach((item, index) => {
        if (index % 4 === 0) {
            item.style.marginLeft = '0';
        }
    });

    // 인물 사진 클릭시 체크박스 동작 및 선택 제한 실행
    photoItems.forEach(item => {
        const checkbox = item.querySelector('input[name=q751]');
        
        item.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;

            if (checkbox.checked) {
                checkbox.checked = true;
                item.querySelector('.wdid_cst').classList.add('bd_63ed8f');
            } else {
                checkbox.checked = false;
                item.querySelector('.wdid_cst').classList.remove('bd_63ed8f');
            }

            const selectedItems = document.querySelectorAll('.bd_63ed8f');
            
            // 선택된 항목이 7개를 초과하면 선택 취소 및 관련 스타일 변경, 경고 메시지 표시
            if (selectedItems.length > 7) {
                checkbox.checked = false;
                selectedItems.forEach(selectedItem => {
                    selectedItem.classList.remove('bd_63ed8f');
                });
                alert('선택 항목을 7개 이하 선택해주세요.');
            }
        });
    });
    /* 
    ES6의 const, let, 화살표 함수, querySelectorAll, forEach, classList 등을 사용하여 기능을 구현
    - 코드의 효율성을 높이기 위해 addEventListener를 사용하여 이벤트 리스너를 추가
    - querySelector와 classList를 사용하여 요소를 선택하고 클래스를 조작
     */
});
