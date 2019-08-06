import pymongo
import urllib.parse
from konlpy.tag import Komoran
import pandas as pd
import os
import re

def save_crawl_csv_data(site_code):
    parser = Komoran()
    username = urllib.parse.quote_plus('devgswb')
    password = urllib.parse.quote_plus('1q@W3e4r')
    conn = pymongo.MongoClient(f'mongodb://{username}:{password}@61.84.24.251:57017/araboza')
    db = conn.get_database('araboza')
    collection = db.wordsByDate
    # DB 연결
    dirpath = os.path.dirname(__file__) + f'/data/{site_code}/'
    print(dirpath)
    for filename in os.listdir(dirpath):
        fpath = dirpath + filename
        rawdata = filename[0:12].replace('[', '')
        rawdata = rawdata.replace(']', '')
        rawdata = rawdata.split('-')
        year = int(rawdata[0])
        month = int(rawdata[1])
        day = int(rawdata[2])
        csv_data = pd.read_csv(fpath, names=['day', 'title'], encoding='utf-8')
        words = []
        for title in csv_data.title.tolist():
            RE_EMOJI = re.compile('[\U00010000-\U0010ffff]', flags=re.UNICODE)
            emoji_removed_title = RE_EMOJI.sub(r'', title)
            try:
                words.append(parser.morphs(emoji_removed_title))
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
                    'day': day
                }, # 해당하는 데이터 찾기
                {
                    'code': site_code,
                    'year': year,
                    'month': month,
                    'day': day,
                    'data': words
                }, # 해당하는 데이터를 update
                upsert=True
            )
            print(year, month, day, site_code, "데이터 추가 완료")
        except:
            raise
        # DB에 저장