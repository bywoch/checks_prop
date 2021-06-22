document.domain = "imbc.com";
var EventID = '';

function Vote(e) {
    // "IMBCMAIN" 쿠키의 값이 없는 경우 (사용자가 로그인되어 있지 않은 경우)
    if (escape(getCookie("IMBCMAIN")) == "") {
        // 모바일 기기에서 접속한 경우
        if (IsMobileAgent()) {
            // 현재 페이지의 URL을 "IMBCURL" 쿠키에 저장하고 모바일 로그인 페이지로 이동
            setCookie("IMBCURL", document.location, null, "/", "imbc.com");
            window.location.href = "//m.imbc.com/User/mLogin.aspx";
        }
        // 모바일 기기가 아닌 경우
        else {
            // 현재 페이지의 URL을 "IMBCURL" 쿠키에 저장하고 일반 로그인 페이지로 이동
            setCookie("IMBCURL", document.location, null, "/", "imbc.com");
            window.location.href = "//member.imbc.com/Login/Login.aspx";
        }
    }
    // "IMBCMAIN" 쿠키의 값이 있는 경우 (사용자가 로그인되어 있는 경우)
    else {
        // CORS 지원을 활성화
        $.support.cors = true;

        // AJAX를 사용하여 투표 정보 가져오기
        $.ajax({
            type: "get",
            url: "//poll.imbc.com/v1/api/getPollInfo.aspx?pollnumber=" + $("#hdnPollNum").val(),
            dataType: "jsonp",
            success: function (data) {
                // 투표 상태가 "진행 중"인 경우
                if (data.State == "P") {
                    // 사용자 동의 사용 여부 확인
                    if (data.UserAgree_UseState == "Y") {
                        EventID = data.EventID;

                        // "CheckEventAgree.js" 스크립트 가져오기 및 실행
                        $.getScript("//member.imbc.com/EventAgree/CheckEventAgree.js", function () {
                            // URL 매개변수에서 동의 여부 파라미터 읽어오기
                            var szAgeeYN = getURLParam('AgreeYN');
                            var sRtn = '';

                            try {
                                // 동의 여부 파라미터가 존재하는 경우 "hdnAgree" 필드 값 설정
                                if (szAgeeYN.length > 0) {
                                    document.getElementById('hdnAgree').value = szAgeeYN;
                                }
                            }
                            catch (e) {
                            }

                            // "hdnAgree" 값이 "r"인 경우 개인정보 동의 준비 중임을 알림
                            if (document.getElementById('hdnAgree').value == "r") {
                                alert('개인정보 동의 정보가 준비중입니다');
                            }
                            
                            // "sRtn" 값이 비어있고 "hdnAgree" 값도 비어있는 경우
                            if (sRtn.length == 0 && document.getElementById('hdnAgree').value.length == 0) {
                                // 사용자 동의 여부 확인을 위한 AJAX 요청
                                $.ajax({
                                    url: "//member.imbc.com/EventAgree/CheckEventAgree.aspx?EventID=" + data.EventID + "&callback=jsonpEventAgree",
                                    cache: false,
                                    type: "GET",
                                    async: false,
                                    dataType: "jsonp",
                                    success: function (result) {
                                        // 사용자 동의가 필요한 경우 알림 및 이벤트 동의 페이지로 이동
                                        if (result.agreeYN == 'N') {
                                            alert('개인정보 제공에 동의 하셔야 이벤트에 참여하실수 있습니다');
                                            fnLoadEventAgree(data.EventID);
                                        }
                                        // 사용자 동의가 이미 있는 경우 투표 템플릿 가져오기
                                        else if (result.agreeYN.toLowerCase() == 'y') {
                                            $.getScript("//poll.imbc.com/v1/api/getPollJsTpl.aspx?pollnumber=" + $("#hdnPollNum").val(), function (e) {
                                                // 투표 템플릿 실행
                                            });
                                        }
                                    },
                                    error: null
                                });
                            }
                            
                            // "hdnAgree" 값이 'N'인 경우
                            if (document.getElementById('hdnAgree').value == 'N') {
                                // 사용자 동의 여부 확인을 위한 AJAX 요청
                                $.ajax({
                                    url: "//member.imbc.com/EventAgree/CheckEventAgree.aspx?EventID=" + data.EventID + "&callback=jsonpEventAgree",
                                    cache: false,
                                    type: "GET",
                                    async: false,
                                    dataType: "jsonp",
                                    success: function (result) {
                                        // 사용자 동의가 필요한 경우 알림 및 "hdnAgree" 초기화
                                        if (result.agreeYN == 'N') {
                                            alert('개인정보 제공에 동의 하셔야 이벤트에 참여하실수 있습니다');
                                            sRtn = '';
                                            document.getElementById('hdnAgree').value = '';
                                        }
                                    },
                                    error: null
                                });
                            }
                            // "hdnAgree" 값이 'Y'인 경우
                            else {
                                // "hdnAgree" 값이 "y"인 경우 투표 템플릿 가져오기
                                if ($("#hdnAgree").val().toLowerCase() == "y") {
                                    $.getScript("//poll.imbc.com/v1/api/getPollJsTpl.aspx?pollnumber=" + $("#hdnPollNum").val(), function (e) {
                                        // 투표 템플릿 실행
                                    });
                                }
                            }
                        });
                    }
                    else {
                        // "hdnAgree" 값이 비어있지 않고 'N'이 아닌 경우 투표 템플릿 가져오기
                        if (document.getElementById('hdnAgree').value.length != 0 && document.getElementById('hdnAgree').value != 'N') {
                            $.getScript("//poll.imbc.com/v1/api/getPollJsTpl.aspx?pollnumber=" + $("#hdnPollNum").val(), function (e) {
                                // 투표 템플릿 실행
                            });
                        }
                    }
                }
                else {
                        // 투표 상태가 "종료"인 경우 사용자에게 메시지 알림
                        alert(data.EndMsg);
                    }
                },
                // AJAX 요청 실패 시 에러 처리
                error: null
            });
        // });
    }
}