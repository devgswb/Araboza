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
import os
from csub import BoBaeCrawl, ClienCrawl, Cook82Crawl
from csub import DogDripCrawl, EtolandCrawl, GasaengeCrawl
from csub import HumorunivCrawl, HygallCrawl, InstizCrawl
from csub import MlbParkCrawl, NatePannCrawl, RuLiWebCrawl
from csub import TheqooCrawl, TodayHumorCrawl, YGosuCrawl
PARAM = sys.argv[1:]
# SITE_CODE는 각 사이트별 코드를 정의해놓은 상수입니다.
# Python에서 상수는 대문자와 언더바(_)로 표시합니다.
SITE_CODE = {
    1: "보배드림",
    2: "클리앙",
    3: "82쿡",
    4: "개드립",
    5: "이토랜드",
    6: "가생이",
    7: "웃긴대학",
    8: "해연갤",
    9: "인스티즈",
    10: "MLB파크",
    11: "네이트판",
    12: "루리웹",
    13: "더쿠넷",
    14: "오늘의 유머",
    15: "와이고수",
}


def data_directory_create(path):
    if not os.path.exists(path):
        os.mkdir(path)

# crawler는 크롤러 클래스입니다.
class Crawler:
    def __init__(self):
        pass

    @staticmethod
    def run(site_code: int, year: int, month: int, day: int):
        # import 해온 서브 크롤러를 실행하는 부분입니다.
        print(f"{SITE_CODE[site_code]}를(을) 크롤링합니다.")
        Crawler.__run_crawler__(site_code, year, month, day)

    @staticmethod
    def __run_crawler__(site_code, year, month, day):
        if not os.path.exists('data'):
            os.mkdir('data')
        if site_code == 1:
            data_directory_create('data/1')
            crawler = BoBaeCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 2:
            data_directory_create('data/2')
            crawler = ClienCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 3:
            data_directory_create('data/3')
            crawler = Cook82Crawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 4:
            data_directory_create('data/4')
            crawler = DogDripCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 5:
            data_directory_create('data/5')
            crawler = EtolandCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 6:
            data_directory_create('data/6')
            crawler = GasaengeCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 7:
            data_directory_create('data/7')
            crawler = HumorunivCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 8:
            data_directory_create('data/8')
            crawler = HygallCrawl.Crawler()
            crawler.run('hy', year, month, day)
        elif site_code == 9:
            data_directory_create('data/9')
            crawler = InstizCrawl.Crawler()
            crawler.run('name', year, month, day)
        elif site_code == 10:
            data_directory_create('data/10')
            crawler = MlbParkCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 11:
            data_directory_create('data/11')
            crawler = NatePannCrawl.Crawler()
            crawler.run('c20001', year, month, day)  # 세상 사는 이야기
            crawler = NatePannCrawl.Crawler()
            crawler.run('c20028', year, month, day)  # 엔터톡
        elif site_code == 12:
            data_directory_create('data/12')
            crawler = RuLiWebCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 13:
            data_directory_create('data/13')
            crawler = TheqooCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 14:
            data_directory_create('data/14')
            crawler = TodayHumorCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 15:
            data_directory_create('data/15')
            crawler = YGosuCrawl.Crawler()
            crawler.run(year, month, day)


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
