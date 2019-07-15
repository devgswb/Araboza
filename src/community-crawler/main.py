#!/usr/bin/python3
# main 크롤러 구현 형태입니다.
#
# csub 아래 해당 사이트 크롤러를 import 합니다.
# import csub.example-crawler as example-c
# PARAM으로 대입된 sys.argv는 CLI 상에서 프로그램이 실행시 받아올 인자값을 의미합니다.
# 리눅스에서 프로그램이 실행시 이용될 변수입니다.
# 양식은 년도, 월, 일, 사이트 코드들
# 가령
# $ crawl 2019 01 01 0 하는 식으로 실행됩니다.
import sys

PARAM = sys.argv[1:]


# SITE_CODE는 각 사이트별 코드를 정의해놓은 상수입니다.
# Python에서 상수는 대문자와 언더바(_)로 표시합니다.
SITE_CODE = {
    0: "디씨인사이드",
    1: "FM코리아",
    2: "루리웹",
    3: "뽐뿌",
    4: "클리앙",
    5: "네이트판",
    6: "MLB파크",
    7: "더쿠넷",
    8: "SLR클럽",
    9: "이토렌트",
    10: "오늘의 유머",
    11: "웃긴대학",
    12: "보배드림",
    13: "와이고수",
    14: "개드립",
    15: "가생이",
    16: "딴지일보",
    17: "82쿡"
}


# crawler는 크롤러 클래스입니다.
class Crawler:
    def __init__(self):
        pass

    @staticmethod
    def run(site_code: int, year: int, month: int, day: int):
        # import 해온 서브 크롤러를 실행하는 부분입니다.
        print(f"{SITE_CODE[site_code]}를(을) 크롤링합니다.")
        Crawler.__run_crawler__(site_code)

    @staticmethod
    def __run_crawler__(site_code):
        if site_code == 1:
            pass
        elif site_code == 2:
            pass
        elif site_code == 3:
            pass
        elif site_code == 4:
            pass
        elif site_code == 5:
            pass
        elif site_code == 6:
            pass
        elif site_code == 7:
            pass
        elif site_code == 8:
            pass
        elif site_code == 9:
            pass
        elif site_code == 10:
            pass
        elif site_code == 11:
            pass
        elif site_code == 12:
            pass
        elif site_code == 13:
            pass
        elif site_code == 14:
            pass
        elif site_code == 15:
            pass
        elif site_code == 16:
            pass
        elif site_code == 17:
            pass


# 리눅스 상에서 실행시 동작이 어떻게 될지 나타냅니다.
if __name__ == "__main__":
    if len(PARAM) < 4:
        error_str = ''
        error_str += "<실행 에러 발생>\n"
        error_str += "[사이트 코드]\n"
        loop_three_times = 0
        for name in SITE_CODE:
            error_str += f"{name}:{SITE_CODE[name]} "
            loop_three_times += 1
            if loop_three_times >= 3:
                error_str += "\n"
                loop_three_times = 0
        error_str += "인자값이 부족합니다. 년도, 월, 일, 사이트 코드들을 입력해주세요.\n"
        print(error_str)
        sys.exit(1)
    # 리눅스 상에서 입력된 파라미터만큼 루프를 돌면서 크롤러를 실행하는 부분입니다.
    YEAR = int(PARAM[0])
    MONTH = int(PARAM[1])
    DAY = int(PARAM[2])
    SITES = PARAM[3:]
    for code in SITES:
        Crawler.run(int(code), YEAR, MONTH, DAY)
