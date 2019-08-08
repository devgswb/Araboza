import json
import pymongo
import urllib
import datetime
import os

from collections import OrderedDict
from datetime import timedelta

def get_hotword_ranking(date):
    # 파라미터 date의 양식은 '2019-01-01'이다.
    # nnp,nng 형태만
    date = date.split('-')
    date = datetime.datetime(int(date[0]), int(date[1]), int(date[2]))
    date = [date, date + timedelta(days=-1), date + timedelta(days=-2), date + timedelta(days=-3)]
    username = urllib.parse.quote_plus('devgswb')
    password = urllib.parse.quote_plus('1q@W3e4r')
    conn = pymongo.MongoClient(f'mongodb://{username}:{password}@61.84.24.251:57017/araboza')
    db = conn.get_database('araboza')
    collection = db.wordsByDate

    for index, i_date in enumerate(date):
        rs = collection.find({
            'time': i_date
        })
        noun = ['NNP', 'NNG']
        related_words = {}
        for record in rs:
            for sentence in record['data']:
                for sub_word in sentence:
                    noun_word = sub_word[0]  # 명사 단어
                    part_of_word = sub_word[1]  # 품사
                    if part_of_word in noun:
                        if not (noun_word in related_words):
                            related_words[noun_word] = 0
                        else:
                            related_words[noun_word] += 1
                sorted_words = sorted(related_words.items(), key=lambda x: x[1], reverse=True)
                conn.close()
        result = OrderedDict()
        list = []
        for word_data in sorted_words[0:10]:
            word = word_data[0]
            count = word_data[1]
            #result[i[0]] = i[1]
            list.append({
                "word" : word,
                "count" : count,
                "changes" : 0
            })

        result['result'] = list

        if index == 0:
            name = 'yesterday'
        elif index == 1:
            name = '2_days_ago'
        elif index == 2:
            name = '3_days_ago'
        else:
            name = '4_days_ago'


        print(json.dumps(result, ensure_ascii=False, indent="\t"))
        dirname = os.path.dirname(__file__).split('/modules')[0] + '/hotword'
        # print(dirname) # 저장경로
        # print(i_date) # 저장될 데이터의 날짜
        with open(f'{dirname}/{name}.json', 'w', encoding="utf-8") as make_file:
            json.dump(result, make_file, ensure_ascii=False, indent="\t")

# 변동사항 계산 def (수정)
def ranking_Changes():
    dirname = os.path.dirname(__file__).split('/modules')[0] + '/hotword'

    for i in range(0, 3):
        if i == 0:
            name = 'yesterday'
        elif i == 1:
            name = '2_days_ago'
        elif i == 2:
            name = '3_days_ago'

        with open(f'{dirname}/{name}.json', 'r', encoding='UTF8') as json_file:
            now_data  = json.load(json_file)
            now_data = now_data['result']

        if i == 0:
            name = '2_days_ago'
        elif i == 1:
            name = '3_days_ago'
        elif i == 2:
            name = '4_days_ago'

        with open(f'{dirname}/{name}.json', 'r', encoding='UTF8') as json_file:
            eve_data = json.load(json_file)
            eve_data = eve_data['result']

        for data in now_data:
            for  c_value in eve_data:
                if data['word'] == c_value['word']:
                    r_changes =  data['count'] - c_value['count']
                    data['changes'] = r_changes

        save_data = OrderedDict()
        save_data['result'] = now_data

        if i == 0:
            name = 'yesterday'
        elif i == 1:
            name = '2_days_ago'
        elif i == 2:
            name = '3_days_ago'

        with open(f'{dirname}/{name}.json', 'w', encoding="utf-8") as make_file:
            json.dump(save_data, make_file, ensure_ascii=False, indent="\t")

#   yesterday > 2 days ago > 3 days ago >> 4 days ago
# 반드시 get_hotword_ranking("2019-08-06") >> ranking_Changes() 순으로 실행해주세요
# get_hotword_ranking("2019-08-06")
ranking_Changes()

# print(get_hotword_ranking("2019-08-06"))