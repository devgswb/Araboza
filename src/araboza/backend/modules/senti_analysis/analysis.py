import pandas as pd
from datetime import date, timedelta
import collections
import json
import pprint
import pymongo
import urllib
import datetime
import os

class SentiAnalysis:
    def test(self, site_code, search_word):
        return self.result_from_db_By_Title("2019-08-25", "2019-09-25", site_code, search_word)

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
            self.db_live_data = data['db_live_data']

    def result_from_db(self, start_date, end_date, site_code, search_word):
        return self.result_from_db_By_Title(start_date, end_date, site_code, search_word)

    def result_from_db_by_date(self, start_date, end_date, site_code, search_word):
        # start_date의 양식은 2019-01-01
        # end_date의 양식은 2019-01-01
        pos = 0.0  # positive
        neg = 0.0  # negative
        word_freq_by_date = {} # 단어 빈도수
        total_sentence_count = 0
        related_words = {}
        RELATED_WORDS_COUNT = 5
        date_list = get_dates(start_date, end_date)
        for insert_date in date_list:
            word_freq_by_date[insert_date] = 0
        start_date = start_date.split('-')
        start_date = datetime.datetime(int(start_date[0]), int(start_date[1]), int(start_date[2]))
        end_date = end_date.split('-')
        end_date = datetime.datetime(int(end_date[0]), int(end_date[1]), int(end_date[2]))
        username = urllib.parse.quote_plus(self.username)
        password = urllib.parse.quote_plus(self.password)
        conn = pymongo.MongoClient(f'mongodb://{username}:{password}@{self.db_host}:{self.db_port}/{self.db_name}')
        db = conn.get_database(self.db_name)
        collection = db[self.db_live_data]
        for date in date_list:
            DATE = date.split('-')
            YEAR = int(DATE[0])
            MONTH = int(DATE[1])
            DAY = int(DATE[2])
            rs = collection.find({
                'code': site_code,
                'year': YEAR,
                'month': MONTH,
                'day': DAY,
            })
            for record in rs:
                record_year = record['year']
                record_month = record['month']
                record_day = record['day']
                date = f'{record_year}-{record_month:02d}-{record_day:02d}'
                if not date in word_freq_by_date:
                    word_freq_by_date[date] = 0
                for sentence in record['data']:
                    word_list = [word[0] for word in sentence]  # 한 문장의 단어들을 묶은 것
                    if not (search_word in word_list):
                        continue
                    word_freq_by_date[date] += 1
                    analysis_result = self.__analysis__(word_list)
                    pos += analysis_result['positive']
                    neg += analysis_result['negative']
                    # 긍부정 판단
                    total_sentence_count += 1
                    noun = ['NNP', 'NNG']
                    for sub_word in sentence:
                        noun_word = sub_word[0]  # 명사 단어
                        if len(noun_word) == 1:
                            continue
                        part_of_word = sub_word[1]  # 품사
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
                'related_words': [data for data in sorted_words[1:20] if data[1] > RELATED_WORDS_COUNT],
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

# 여기서부턴 타이틀 기반 검색
    def search_by_title_by_date(self, data, collection):
    # 입력 양식은 {
    #   year: $year
    #   month: $month
    #   day : $day,
    #   site_code: $site_code,
    #   search_word: $search_word
    # }
        year = data['year']
        month = data['month']
        day = data['day']
        site_code = data['site_code']
        search_word = data['search_word']
    # 입력 부분 인자값 받아오기
        result = {
            'site_code': site_code,
            'search_word': search_word,
            'related_words': [],
            'positive': 0,
            'negative': 0,
            'Success': 0,
            'word_freq_by_date': 0,
            'date': ''
        }
    # 반환 값 생성
        pipelines = list()
        pipelines.append({"$unwind": "$data"})
        pipelines.append({"$match": {
            "code": site_code,
            "year": year,
            "month": month,
            "day": day,
            "data.title": {"$regex": f"{search_word}"}}
        })
        pipelines.append({"$project": {
            "title": "$data.title", "words": "$data.words"}
        })
        try:
            rs = list(collection.aggregate(pipelines))
            # print(len(rs))
            # rs = collection.find({
            #     'code': site_code,
            #     'time': {'$lte': end_date, '$gte': start_date},
            #     # 'data.words': {'$elemMatch': {'morpheme': search_word}} 형태소 기반 검색
            #     'data.title': {'$regex': search_word} # 제목 기반 검색
            # })
            # return rs
            total_sentence_count = len(rs)
            result['word_freq_by_date'] = total_sentence_count
            date = f'{year}-{month:02d}-{day:02d}'
            result['date'] = date
            total_related_words = collections.Counter()
            if total_sentence_count:
                count = 0
                # pp = pprint.PrettyPrinter(indent=4)
                # pp.pprint(rs)
                for record in rs:
                    related_words = {}
                    title = record['title']
                    sentence = record['words']
                    word_list = []  # 한 문장의 단어들을 묶은 것
                    for word in sentence:
                        word_list.append(word['morpheme'])
                    analysis_result = self.__analysis__(word_list)
                    result['positive'] += analysis_result['positive']
                    result['negative'] += analysis_result['negative']
                    # 긍부정 판단
                    noun = ['NNP', 'NNG', 'NNB']
                    # print(title, count, total_sentence_count) # 테스트용
                    for word in sentence:
                        noun_word = word['morpheme']  # 명사 단어
                        part_of_word = word['type']  # 품사
                        if len(noun_word) == 1:
                            continue
                        if part_of_word in noun:
                            if not (noun_word in related_words):
                                related_words[noun_word] = 1
                            else:
                                related_words[noun_word] += 1
                    total_related_words.update(related_words)
                result['related_words'] = total_related_words
                return result
            else:
                result['Success'] = 1
                return result
        except:
            result['Success'] = 1
            return result


    def result_from_db_By_Title(self, start_date, end_date, site_code, search_word):
        # start_date의 양식은 2019-01-01
        # end_date의 양식은 2019-01-01
        date_list = get_dates(start_date, end_date)
        start_date = start_date.split('-')
        start_date = datetime.datetime(int(start_date[0]), int(start_date[1]), int(start_date[2]))
        end_date = end_date.split('-')
        end_date = datetime.datetime(int(end_date[0]), int(end_date[1]), int(end_date[2]))
        username = urllib.parse.quote_plus(self.username)
        password = urllib.parse.quote_plus(self.password)
        conn = pymongo.MongoClient(f'mongodb://{username}:{password}@{self.db_host}:{self.db_port}/{self.db_name}')
        db = conn.get_database(self.db_name)
        collection = db[self.db_live_data]
        result_list = []
        for date in date_list:
            YEAR = 0
            MONTH = 1
            DAY = 2
            date_raw = date.split('-')
            year = int(date_raw[YEAR])
            month = int(date_raw[MONTH])
            day = int(date_raw[DAY])
            input_data = {
                'year': year,
                'month': month,
                'day': day,
                'site_code': site_code,
                'search_word': search_word
            }
            result_data = self.search_by_title_by_date(input_data, collection)
            result_list.append(result_data)
        conn.close()
        # 반환 데이터 정의 파트
        related_words = collections.Counter()
        pos = 0.0  # positive
        neg = 0.0  # negative
        total_sentence_count = 0
        word_freq_by_date = {}  # 단어 빈도수
        #데이터 가공 파트
        for data_by_date in result_list:
            date = data_by_date['date']
            total_sentence_count += data_by_date['word_freq_by_date']
            word_freq_by_date[date] = data_by_date['word_freq_by_date']
            if data_by_date['Success'] == 1:
                continue
            pos += data_by_date['positive']
            neg += data_by_date['negative']
            related_words.update(data_by_date['related_words'])
        sorted_words = sorted(related_words.items(), key=lambda x: x[1], reverse=True)
        result = {
            'site_code': site_code,
                'search_word': search_word,
                'related_words': [data for data in sorted_words[1:20] if data[1] > 1],
                'total_sentence_count': total_sentence_count,
                'positive': pos,
                'positive_percentage': round((pos) / (pos + neg) * 100, 1),
                'negative': neg,
                'negative_percentage': round((neg) / (pos + neg) * 100, 1),
                'Success': 0,
                'word_freq_by_date': [[data, word_freq_by_date[data]] for data in word_freq_by_date]
        }
        if result['total_sentence_count'] == 0:
            return {
                'site_code': site_code,
                'Success': 1
            }
        # 정렬된 결과 가장 많이 나온 단어는 무조건 검색된 단어니까 첫번째 인덱스는 제외한 [1:6]
        try:
            return result
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

def get_dates(start_date, end_date):
    YEAR = 0
    MONTH = 1
    DAY = 2
    start_date_data = [ int(data) for data in start_date.split('-') ]
    # 배열의 인덱스 0: year, 1: month, 2: day
    end_date_data = [int(data) for data in end_date.split('-')]
    s_date = date(start_date_data[YEAR], start_date_data[MONTH], start_date_data[DAY])
    e_date = date(end_date_data[YEAR], end_date_data[MONTH], end_date_data[DAY])
    dates = [s_date + timedelta(days=x) for x in range((e_date - s_date).days + 1)]
    result_dates_list = [ str(data).split(' ')[0] for data in dates ]
    return result_dates_list
# #
# pp = pprint.PrettyPrinter(indent=4)
# sa = SentiAnalysis()
# result = sa.test(12, '유게이')
#
# pp.pprint(result)
# print(sa.result_from_db('2019-08-01', '2019-09-25', 8, "결혼"))