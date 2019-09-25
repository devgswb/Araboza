import pymongo
import urllib.parse
from konlpy.tag import Komoran
import pandas as pd
import datetime
import os
import re
import sys

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


def main(site_code):
    print(f'{SITE_CODE[site_code]}에 데이터 추가를 시작합니다.')
    save_crawl_csv_data(site_code)


def old_save_crawl_csv_data(site_code):
    parser = Komoran()
    username = urllib.parse.quote_plus('devgswb')
    password = urllib.parse.quote_plus('1q@W3e4r')
    conn = pymongo.MongoClient(f'mongodb://{username}:{password}@61.84.24.138:57017/araboza')
    db = conn.get_database('araboza')
    collection = db.wordsByDate
    # DB 연결
    dirpath = os.path.dirname(__file__) + f'/data2/{site_code}/'
    print(dirpath)
    for filename in os.listdir(dirpath):
        count = 1
        fpath = dirpath + filename
        rawdata = filename[0:12].replace('[', '')
        rawdata = rawdata.replace(']', '')
        rawdata = rawdata.split('-')
        year = int(rawdata[0])
        month = int(rawdata[1])
        day = int(rawdata[2])
        rs = collection.find({
            'code': site_code,
            'year': year,
            'month': month,
            'day': day
        })
        if rs.count() > 0:
            print(f'{SITE_CODE[site_code]}: {year}-{month}-{day} 데이터 존재')
            continue
        try:
            csv_data = ''
            try:
                csv_data = pd.read_csv(fpath, names=['day', 'title'], encoding='utf-8')
            except:
                csv_data = pd.read_csv(fpath, names=['day', 'title'], encoding='cp949')
            data = []
            title_list = csv_data.title.tolist()
            for title in title_list:
                RE_EMOJI = re.compile('[\U00010000-\U0010ffff]', flags=re.UNICODE)
                emoji_removed_title = RE_EMOJI.sub(r'', str(title))
                try:
                    analyzed_morpheme_list = parser.pos(emoji_removed_title)
                    data.append([[record[0], record[1]] for record in analyzed_morpheme_list])
                    print(f'{SITE_CODE[site_code]}: {count}번째 데이터: ', year, month, day, title)
                    count += 1
                except:
                    print(emoji_removed_title)
                    with open(os.path.dirname(__file__) + 'open_error.log', mode='a') as f:
                        f.write(fpath + '\n')
                    # csv 파일 로드
            try:
                collection.update(
                    {
                        'code': site_code,
                        'year': year,
                        'month': month,
                        'day': day
                    },  # 해당하는 데이터 찾기
                    {
                        'code': site_code,
                        'year': year,
                        'month': month,
                        'day': day,
                        'time': datetime.datetime(year, month, day),
                        'data': data
                    },  # 해당하는 데이터를 update
                    upsert=True
                )
            except:
                print(year, month, day, SITE_CODE[site_code], "데이터 추가 완료")
        except:
            print(year, month, day, SITE_CODE[site_code], "Error")
            with open(os.path.dirname(__file__) + 'open_error.log', mode='a') as f:
                f.write(fpath + '\n')


def save_crawl_csv_data(site_code):
    parser = Komoran()
    username = urllib.parse.quote_plus('devgswb')
    password = urllib.parse.quote_plus('1q@W3e4r')
    conn = pymongo.MongoClient(f'mongodb://{username}:{password}@61.84.24.138:57017/araboza')
    db = conn.get_database('araboza')
    collection = db.wordsByTitle
    # DB 연결
    dirpath = os.path.dirname(__file__) + f'/data/{site_code}/'
    print(dirpath)
    for filename in os.listdir(dirpath):
        count = 1
        fpath = dirpath + filename
        rawdata = filename[0:12].replace('[', '')
        rawdata = rawdata.replace(']', '')
        rawdata = rawdata.split('-')
        year = int(rawdata[0])
        month = int(rawdata[1])
        day = int(rawdata[2])
        try:
            csv_data = pd.read_csv(fpath, names=['day', 'title'], encoding='utf-8')
            data = {}
            title_list = csv_data.title.tolist()
            for title in title_list:
                RE_EMOJI = re.compile('[\U00010000-\U0010ffff]', flags=re.UNICODE)
                emoji_removed_title = RE_EMOJI.sub(r'', str(title))
                try:
                    analyzed_morpheme_list = parser.pos(emoji_removed_title)
                    data = {
                        "title": title,
                        "words": [
                            {
                                "morpheme": record[0],
                                "type": record[1]
                            } for record in analyzed_morpheme_list
                        ]
                    }
                except:
                    print(emoji_removed_title)
                    raise
                # csv 파일 로드
            try:
                collection.update(
                    {
                        'code': site_code,
                        'year': year,
                        'month': month,
                        'day': day,
                        'data.title': title
                    },  # 해당하는 데이터 찾기
                    {
                        'code': site_code,
                        'year': year,
                        'month': month,
                        'day': day,
                        'time': datetime.datetime(year, month, day),
                        'data': data
                    },  # 해당하는 데이터를 update
                    upsert=True
                )
                print(f'{count}번째 데이터: ', year, month, day, title)
                count += 1
            except:
                raise
            print(year, month, day, SITE_CODE[site_code], "데이터 추가 완료")
            # DB에 저장
        except:
            print(year, month, day, SITE_CODE[site_code], "Error")


# if __name__ == "__main__":
#   site_code = int(sys.argv[1])
#  main(site_code)

data = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15]
for i in data:
    try:
        old_save_crawl_csv_data(i)
    except:
        raise
        print("크롤러 에러")
