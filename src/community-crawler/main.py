#!/usr/bin/python3
# main 크롤러 구현 형태입니다.
#
# csub 아래 해당 사이트 크롤러를 import 합니다.
# import csub.example-crawler as example-c
# PARAM으로 대입된 sys.argv는 CLI 상에서 프로그램이 실행시 받아올 인자값을 의미합니다.
# 리눅스에서 프로그램이 실행시 이용될 변수입니다.
import sys
PARAM = sys.argv
# SITE_CODE는 각 사이트별 코드를 정의해놓은 상수입니다.
# Python에서 상수는 대문자와 언더바(_)로 표시합니다.
SITE_CODE = {
    "디씨": 0,
    "펨코": 1,
    "루리": 2,
    "뽐뿌": 3,
    "클리앙": 4,
    "네판": 5,
    "엠팍": 6,
    "더쿠": 7,
    "SLR": 8,
    "이토": 9,
    "오유": 10,
    "웃대": 11,
    "보배": 12,
    "와고": 13,
    "개드립": 14,
    "가생이": 15,
    "딴지": 16,
    "82쿡": 17,
}


# crawler는 크롤러 클래스입니다.
class Crawler:
    def __init__(self):
        pass

    def run(self, site_code):
        # import 해온 서브 크롤러를 실행하는 부분입니다.
        pass


# 리눅스 상에서 실행시 동작이 어떻게 될지 나타냅니다.
if __name__ == "__main__":
    site_crawler = Crawler()
    # 리눅스 상에서 입력된 파라미터만큼 루프를 돌면서 크롤러를 실행하는 부분입니다.
    for code in PARAM:
        site_crawler.run(site_code=code)
