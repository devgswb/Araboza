import requests as req
from datetime import date
import datetime
import sys
from bs4 import BeautifulSoup  # BeautifulSoup import

# Multiprocessing 추가
from multiprocessing import Pool
from datetime import timedelta
import time

class Crawler:

    def __init__(self):
        self.day = ''
        self.endTime = datetime.datetime(2000, 1, 1)

    def run(self, years, months, days):
        self.endTime = datetime.datetime(years, months, days)
        #while True:
         #   if self.day != '' and (datetime.datetime.strptime(self.day, "%Y.%m.%d") < self.endTime):
         #       break
            # self.crawlPage()
        pool = Pool(processes=4)
        pool.map(self.crawlPage, self.pageCalculation(f'{years}-{months}-{days}'))
        pool.close()
        sys.stdout.write(f"82Cook 크롤링 완료\r")
        sys.stdout.flush()

    def crawlPage(self, page):
        url = f'https://www.82cook.com/entiz/enti.php?bn=15&page={page}'
        time.sleep(0.02)
        res = req.get(url)
        res.encoding = None
        html = res.text
        soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')
        write = []
        day = []

        for i, w in enumerate(soup.select('tbody > tr:not(.noticeList) > td.title > a')):
            w = w.get_text()
            w = w.split('\n')[0]
            # w = w.replace('\n', '')
            w = w.replace(',', ' ')
            write.append(w)

        for i, d in enumerate(soup.select('tbody > tr:not(.noticeList) > td.regdate.numbers')):
            d = d.get_text()
            d = d.replace('\n', '')
            d = d.replace('/', '-') # 날짜 중간 형식
            d_count = len(d.split('-'))
            if ':' in d:
                d = date.today()
                d = str(d)
                d = d.replace('-', '-')
            elif d_count == 3:
                d = d.replace('\t', '')
                d = d.replace('-', '-')
            d = d.replace(' ', '')
            d = d.split(' ')[0]
            day.append(d)

        for t in range(len(write)):
            self.day = day[t]
            if datetime.datetime.strptime(self.day, "%Y-%m-%d") < self.endTime:
                return
            name = '82Cook'
            fpath = f'data/3/[{day[t].replace(".", "-")}]{name}.csv'
            with open(fpath, mode='a', encoding='utf-8') as f:
                try:
                    f.write(f'{day[t]},{write[t]}\n')
                except:
                    print("\nindex: " + str(t) + "\n")
                    print(day)
                    print(write)
                    print(day[t])
                    print(write[t])
                    raise
                f.close()

    def pageCalculation(self, date_Specified):  # 입력한 날짜의 글이 있는 페이지 까지 검색
        # 들어와야하는 date_Specified의 형태는 '2019-08-22'
        regen = 40  # 하루에 글이 평균적으로 작성되는 양(페이지 기준). 사이트마다 적당한 고정값을 줘야 검색이 빨라짐
        stop = True
        page_Target = True
        result = []
        Fixed_date = datetime.datetime(int(date_Specified.split('-')[0]), int(date_Specified.split('-')[1]),
                                       int(date_Specified.split('-')[2])) + timedelta(days=-1)
        # print(date_Specified, Fixed_date)

        while stop == True:
            url = f'https://www.82cook.com/entiz/enti.php?bn=15&page={regen}'
            res = req.get(url)
            res.encoding = None
            html = res.text
            soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')

            for i, d in enumerate(soup.select('tbody > tr:not(.noticeList) > td.regdate.numbers')):
                d = d.get_text()
                d = d.replace('\n', '')
                d = d.replace('/', '-') # 중간 날짜 형식
                d_count = len(d.split('-'))
                if ':' in d:
                    d = date.today()
                    d = str(d)
                    d = d.replace('-', '-')
                elif d_count == 3:
                    d = d.replace('\t', '')
                    d = d.replace('-', '-')
                d = d.replace(' ', '')
                d = d.split(' ')[0]
                day = datetime.datetime(int(d.split('-')[0]), int(d.split('-')[1]), int(d.split('-')[2]))
                # print(d)
                if day == Fixed_date:
                    stop = False
                    page_Target = 'low'
                    # print(stop)
                    # print(page_Target)
                    break
                elif day < Fixed_date:
                    page_Target = True
                elif day > Fixed_date:
                    page_Target = False

            if stop == True:
                if page_Target == False:
                    regen = regen + int(regen / 3)
                    if regen >= 41218:
                        regen = 41218
                elif page_Target == True:
                    regen = regen - int(regen / 5)
                    if regen < 1:
                        regen = 1
                # print(f'**********{regen}***********')
        if stop == False:
            Fixed_date = Fixed_date + timedelta(days=+1)
            # print(Fixed_date)
            while stop == False:

                # print(f'----------{regen}----------')
                url = f'https://www.82cook.com/entiz/enti.php?bn=15&page={regen}'
                res = req.get(url)
                res.encoding = None
                html = res.text
                soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')

                for i, d in enumerate(soup.select('tbody > tr:not(.noticeList) > td.regdate.numbers')):
                    d = d.get_text()
                    d = d.replace('\n', '')
                    d = d.replace('/', '-')
                    d_count = len(d.split('-'))
                    if ':' in d:
                        d = date.today()
                        d = str(d)
                        d = d.replace('-', '-')
                    elif d_count == 3:
                        d = d.replace('\t', '')
                        d = d.replace('-', '-')
                    d = d.replace(' ', '')
                    d = d.split(' ')[0]
                    day = datetime.datetime(int(d.split('-')[0]), int(d.split('-')[1]), int(d.split('-')[2]))
                    # print(d)
                    if day == Fixed_date:
                        stop = True
                        break
                if stop == True:
                    break
                else:
                    regen = regen - 1
        for i in range(1, regen + 1):
            result.append(i)
        return result