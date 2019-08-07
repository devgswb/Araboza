import pandas as pd
import json
import pymongo
import urllib
import datetime


class SentiAnalysis:

    def __make_polarity_dict__(self):
        res_data = {}
        with open('dict/KNU_SentiWord_info.json', encoding='utf-8') as data_file:
            data = json.load(data_file)
        for row in data:
            res_data[row['word_root']] = row['polarity']
        return res_data
        # KNU를 이용한 감성어 사전 생성

    def __init__(self):
        # self.polarity = pd.read_csv('dict/polarity.csv')
        # self.intensity = pd.read_csv('dict/intensity.csv')
        # KOSAC 감성어 사전용 코드
        self.polarity = self.__make_polarity_dict__()
        # KNU를 이용한 감성어 사전 만들기

    def result_from_db(self, start_date, end_date, site_code, search_word):
        # start_date의 양식은 2019-01-01
        # end_date의 양식은 2019-01-01
        pos = 0.0  # positive
        neg = 0.0  # negative
        start_date = start_date.split('-')
        start_date = datetime.datetime(int(start_date[0]), int(start_date[1]), int(start_date[2]))
        end_date = end_date.split('-')
        end_date = datetime.datetime(int(end_date[0]), int(end_date[1]), int(end_date[2]))
        username = urllib.parse.quote_plus('devgswb')
        password = urllib.parse.quote_plus('1q@W3e4r')
        conn = pymongo.MongoClient(f'mongodb://{username}:{password}@61.84.24.251:57017/araboza')
        db = conn.get_database('araboza')
        collection = db.wordsByDate
        rs = collection.find({
            'code': site_code,
            'time': {'$lte': end_date, '$gte': start_date}
        })
        for record in rs:
            for sentence in record['data']:
                word_list = [ word[0] for word in sentence ] # 한 문장의 단어들을 묶은 것
                if not (search_word in word_list):
                    continue
                # 연관단어는 품사 파트가 명사인 부분을 따서 키 : 밸류로 더해주고 상위 랭킹을 뽑으면 될 것임
                analysis_result = self.__analysis__(word_list)
                pos += analysis_result['positive']
                neg += analysis_result['negative']
        conn.close()
        return {'positive': pos, 'negative': neg}

    def __analysis__(self, word_list):
        pos = 0.0  # positive
        neg = 0.0  # negative
        for word in word_list:
            if word in self.polarity:
                score = float(self.polarity[word])
                if score > 0:
                    pos += score
                else:
                    neg += abs(score)
        return {'positive': pos, 'negative': neg}

# sa = SentiAnalysis()
# print(sa.result_from_db('2019-07-06', '2019-08-06', 13, "트와이스"))