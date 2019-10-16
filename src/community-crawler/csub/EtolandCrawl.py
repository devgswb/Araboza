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
        sys.stdout.write(f"Etoland 크롤링 완료\r")
        sys.stdout.flush()

    def crawlPage(self, page):
        url = f'http://www.etoland.co.kr/bbs/new1.php?gr_id=bbs&view=&mb_id=&subject=&ext_search=&page={page}'
        time.sleep(0.02)
        res = req.get(url)
        # res.encoding = None
        html = res.text
        soup = BeautifulSoup(html, 'html.parser')
        write = []
        day = []

        for i, w in enumerate(soup.select('td.list_subject a')):
            w = w.get_text()
            w = w.split('\n')[0]
            # w = w.replace('\n', '')
            w = w.replace(',', ' ')
            write.append(w)

        for i, d in enumerate(soup.select('td.list_datetime')):
            d = d.get_text()
            d = d.replace('\n', '')
            d = d.replace('-', '-') # 날짜 중간 형식
            d_count = len(d.split('-'))
            if ':' in d:
                d = date.today()
                d = str(d)
                d = d.replace('-', '-')
            elif d_count == 2:
                d = d.replace('\t', '')
                d = f"2019-{d}"
                d = d.replace('/', '-')
            elif d_count == 3: # 년도가 달라졌을때 구분하는 로직이 더 필요함
                d = d.replace('\t', '')
                d = f"20{d}"
                d = d.replace('/', '-')
            d = d.replace(' ', '')
            d = d.split(' ')[0]
            day.append(d)

        for t in range(len(write)):
            self.day = day[t]
            if datetime.datetime.strptime(self.day, "%Y-%m-%d") < self.endTime:
                return
            name = 'Etoland'
            fpath = f'data/5/[{day[t].replace(".", "-")}]{name}.csv'
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
        regen = 30  # 하루에 글이 평균적으로 작성되는 양(페이지 기준). 사이트마다 적당한 고정값을 줘야 검색이 빨라짐
        stop = True
        page_Target = True
        result = []
        Fixed_date = datetime.datetime(int(date_Specified.split('-')[0]), int(date_Specified.split('-')[1]),
                                       int(date_Specified.split('-')[2])) + timedelta(days=-1)
        # print(date_Specified, Fixed_date)

        while stop == True:
            url = f'http://www.etoland.co.kr/bbs/new1.php?gr_id=bbs&view=&mb_id=&subject=&ext_search=&page={regen}'
            res = req.get(url)
            res.encoding = None
            html = res.text
            soup = BeautifulSoup(html, 'html.parser')

            for i, d in enumerate(soup.select('td.list_datetime')):
                d = d.get_text()
                d = d.replace('\n', '')
                d = d.replace('-', '-') # 중간 날짜 형식
                d_count = len(d.split('-'))
                if ':' in d:
                    d = date.today()
                    d = str(d)
                    d = d.replace('-', '-')
                elif d_count == 2:
                    d = d.replace('\t', '')
                    d = f"2019-{d}"
                    d = d.replace('-', '-')
                elif d_count == 3:
                    d = d.replace('\t', '')
                    d = f"20{d}"
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
                    if regen >= 4854:
                        regen = 4854
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
                url = f'http://www.etoland.co.kr/bbs/new1.php?gr_id=bbs&view=&mb_id=&subject=&ext_search=&page={regen}'
                res = req.get(url)
                res.encoding = None
                html = res.text
                soup = BeautifulSoup(html, 'html.parser')

                for i, d in enumerate(soup.select('td.list_datetime')):
                    d = d.get_text()
                    d = d.replace('\n', '')
                    d = d.replace('-', '-')
                    d_count = len(d.split('-'))
                    if ':' in d:
                        d = date.today()
                        d = str(d)
                        d = d.replace('-', '-')
                    elif d_count == 2:
                        d = d.replace('\t', '')
                        d = f"2019-{d}"
                        d = d.replace('-', '-')
                    elif d_count == 3:
                        d = d.replace('\t', '')
                        d = f"20{d}"
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