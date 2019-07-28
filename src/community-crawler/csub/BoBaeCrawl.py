from bs4 import BeautifulSoup as bs
import requests
from datetime import datetime, date
import os
import sys
# request 를 통해 html 소스를 가져옴


class Crawler:
    def __init__(self):
        self.year = '2019'  # 년도
        self.count = 0  # 년도 카운팅을 위한 변수
        self.crawl_end = False  # 종료
        self.page = 1
        self.dt = datetime.today()

    def run(self, years, months, days):
        try:
            while self.crawl_end == False:
                sys.stdout.write(f"{years}-{months}-{days} {self.page}페이지 긁는중\r")
                sys.stdout.flush()
                self.crawl(years, months, days)
                self.page += 1
        except RuntimeError:
            print('RuntimeError')
        except ValueError:
            print('ValueError')
        except IndexError:
            print('IndexError')

    def crawl(self, years, months, days):
        url = f'http://www.bobaedream.co.kr/list?code=politic&s_cate=&maker_no=&model_no=&or_gu=10&or_se=desc&s_selday=&pagescale=30&info3=&noticeShow=&s_select=&s_key=&level_no=&vdate=&type=list&page={self.page}'
        req = requests.get(url)  # encoding ISO-8859-1
        req.encoding = None

        html = req.text
        # Requests 를 통해 받아온 html 을 python 이 이해하는 객체 구조로 만들어줘야함
        # 이때 BeautifulSoup 사용하여 Parsing
        soup = bs(html, 'html.parser')
        titles = []
        dates = []

        for row in soup.select('tr:not(.best) > td[class=pl14] > a[class=bsubject]'):
            titles.append(row.getText().strip().replace(',', ''))

        for row in soup.select('tr:not(.best) > td[class=date]'):
            day = row.getText().strip()

            if (day == "12/31") and (self.count == 0):
                self.year = str(int(self.year)-1)
                self.count = 1
            if day == '12/30':
                self.count = 0

            if day.find(':') != (-1):
                if self.dt.month < 10:
                    day = f"0{self.dt.month}.{self.dt.day}"
                else:
                    day = f"{self.dt.month}.{self.dt.day}"

            # 지정 날짜
            time1 = date(years, months, days)
            # # 긁어오는 날짜
            time2 = date(int(self.year), int(day[0:2]), int(day[3:5]))

            temp = self.year + "." + day.replace('/', '.')

            if int((time1-time2).days) > 0:
                self.crawl_end = True
                break

            dates.append(temp)
        name = 'BoBaeDream'
        fpath = f'data/1/[{years}-{months}-{days}]{name}.csv'
        f = open(fpath, mode='a', encoding='utf-8')
        for j in range(len(dates)):
            f.write(f'{dates[j]}, {titles[j]},\n')
        f.close()
