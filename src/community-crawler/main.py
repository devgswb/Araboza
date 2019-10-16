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
from csub import PpomppuCrawl, HygallCrawl, InstizCrawl
from csub import MlbParkCrawl, NatePannCrawl, RuLiWebCrawl
from csub import TheqooCrawl, TodayHumorCrawl, YGosuCrawl
PARAM = sys.argv[1:]
# SITE_CODE는 각 사이트별 코드를 정의해놓은 상수입니다.
# Python에서 상수는 대문자와 언더바(_)로 표시합니다.

# 크롤러 실행 시 특정 크롤러에서 반복되는 오류가 일어난다면, 해당 홈페이지의 공지사항 갯수를 변경하거나,
# 다수의 게시판을 크롤링하는 사이트크롤러의 경우 데이터정보가 적은 게시판을 일시적으로 제외하시기 바랍니다.
SITE_CODE = {
    1: "보배드림",
    2: "클리앙",
    3: "82쿡",
    4: "개드립",
    5: "이토랜드",
    6: "가생이",
    7: "뽐뿌",
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
            crawler.run('politic', year, month, day)    # 정치/시사
            crawler.run('freeb', year, month, day)      # 자유게시판
            crawler.run('import', year, month, day)     # 수입차게시판
            crawler.run('national', year, month, day)   # 국산차게시판
            crawler.run('strange', year, month, day)    # 유머게시판
            crawler.run('accident', year, month, day)   # 교통사고/사건/블박
            crawler.run('best', year, month, day)       # 베스트글
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
            crawler.run('politics', year, month, day)       # 정치/사회
            crawler.run('computer', year, month, day)       # 컴퓨터 IT
            crawler.run('movie', year, month, day)          # 영상
            crawler.run('vehicle', year, month, day)        # 탈것
            #crawler.run('cook', year, month, day)           # 요리
            crawler.run('duck', year, month, day)           # 덕후
            crawler.run('creation', year, month, day)       # 창작
            # crawler.run('sports', year, month, day)         # 스포츠 - 너무적은 글 리젠량으로 인해 제회
            # crawler.run('genderissue', year, month, day)    # 젠더이슈 - 너무적은 글 리젠량으로 인해 제회
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
            crawler = PpomppuCrawl.Crawler()
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
            crawler.run('300148', year, month, day)         # 정치 유게(북유게)
            crawler.run('300143', year, month, day)         # 유게
        elif site_code == 13:
            data_directory_create('data/13')
            crawler = TheqooCrawl.Crawler()
            #crawler.run('ktalk', year, month, day)          # 케이돌토그
            #crawler.run('movie', year, month, day)          # 영화
            crawler.run('politics', year, month, day)       # 정치토크
            crawler.run('kbaseball', year, month, day)      # 국내야구
            crawler.run('ksoccer', year, month, day)        # 국내축구
            crawler.run('wsoccer', year, month, day)        # 해외축구
            crawler.run('kstar', year, month, day)          # 국내유명인
            crawler.run('it', year, month, day)             # IT/전자기기/음향
        elif site_code == 14:
            data_directory_create('data/14')
            crawler = TodayHumorCrawl.Crawler()
            crawler.run(year, month, day)
        elif site_code == 15:
            data_directory_create('data/15')
            crawler = YGosuCrawl.Crawler()
            crawler.run('추천-전체게시글', year, month, day)


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
