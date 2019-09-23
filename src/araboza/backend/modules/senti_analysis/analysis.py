import pandas as pd
import json
import pymongo
import urllib
import datetime
import os

class SentiAnalysis:

    def __make_polarity_dict__(self):
        res_data = {}
        dirname = os.path.dirname(__file__)
        with open(f'{dirname}/dict/KNU_SentiWord_info.json', encoding='utf-8') as data_file:
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
        dirname = os.path.dirname(os.path.dirname(os.path.dirname(__file__))).replace('\\', '/')
        with open(f'{dirname}/server_settings.json', encoding='utf-8') as data_file:
            data = json.load(data_file)
            self.username = data['username']
            self.password = data['password']
            self.db_host = data['host']
            self.db_port = data['port']
            self.db_name = data['db_name']

    def result_from_db(self, start_date, end_date, site_code, search_word):
        # start_date의 양식은 2019-01-01
        # end_date의 양식은 2019-01-01
        pos = 0.0  # positive
        neg = 0.0  # negative
        word_freq_by_date = {} # 단어 빈도수
        start_date = start_date.split('-')
        start_date = datetime.datetime(int(start_date[0]), int(start_date[1]), int(start_date[2]))
        end_date = end_date.split('-')
        end_date = datetime.datetime(int(end_date[0]), int(end_date[1]), int(end_date[2]))
        username = urllib.parse.quote_plus(self.username)
        password = urllib.parse.quote_plus(self.password)
        conn = pymongo.MongoClient(f'mongodb://{username}:{password}@{self.db_host}:{self.db_port}/{self.db_name}')
        db = conn.get_database(self.db_name)
        collection = db.wordsByDate
        rs = collection.find({
            'code': site_code,
            'time': {'$lte': end_date, '$gte': start_date}
        })
        total_sentence_count = 0
        related_words = {}
        for record in rs:
            record_year = record['year']
            record_month = record['month']
            record_day = record['day']
            date = f'{record_year}-{record_month:02d}-{record_day:02d}'
            if not date in word_freq_by_date:
                word_freq_by_date[date] = 0
            for sentence in record['data']:
                word_freq_by_date[date] += 1
                word_list = [ word[0] for word in sentence ] # 한 문장의 단어들을 묶은 것
                if not (search_word in word_list):
                    continue
                analysis_result = self.__analysis__(word_list)
                pos += analysis_result['positive']
                neg += analysis_result['negative']
                # 긍부정 판단
                total_sentence_count += 1
                noun = ['NNP', 'NNG']
                for sub_word in sentence:
                    noun_word = sub_word[0] # 명사 단어
                    part_of_word = sub_word[1] # 품사
                    if part_of_word in noun:
                        if not (noun_word in related_words):
                            related_words[noun_word] = 0
                        else:
                            related_words[noun_word] += 1
        sorted_words = sorted(related_words.items(), key=lambda x: x[1], reverse=True)
        # 정렬된 결과 가장 많이 나온 단어는 무조건 검색된 단어니까 첫번째 인덱스는 제외한 [1:6]
        conn.close()
        try:
            return {
                'site_code': site_code,
                'search_word': search_word,
                'related_words': [data for data in sorted_words[1:20] if data[1] > 10],
                'total_sentence_count': total_sentence_count,
                'positive': pos,
                'positive_percentage': round((pos) / (pos + neg) * 100, 1),
                'negative': neg,
                'negative_percentage': round((neg) / (pos + neg) * 100, 1),
                'Success': 0,
                'word_freq_by_date': [[data, word_freq_by_date[data]] for data in word_freq_by_date]
            }
        except:
            return {
                'site_code': site_code,
                'Success': 1
            }

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