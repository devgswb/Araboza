import pandas as pd
import json


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

    def analysis(self, word_list):
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
