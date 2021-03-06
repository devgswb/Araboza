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
        sys.stdout.write(f"TodayHumor 크롤링 완료\r")
        sys.stdout.flush()

    def crawlPage(self, page):
        url = f'http://www.todayhumor.co.kr/board/list.php?table=total&page={page}&kind=total'
        time.sleep(0.02)
        res = req.get(url)
        res.encoding = None
        html = res.text
        soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')
        write = []
        day = []

        for i, w in enumerate(soup.select('td.subject a')):
            w = w.get_text()
            w = w.split('\n')[0]
            # w = w.replace('\n', '')
            w = w.replace(',', ' ')
            write.append(w)

        for i, d in enumerate(soup.select('td.date')):
            d = d.get_text()
            d = d.split(' ')[0]
            d = d.replace('\n', '')
            d = d.replace('/', '-') # 날짜 중간 형식
            d = f"20{d}"
            d = d.replace(' ', '')
            day.append(d)

        for t in range(len(write)):
            self.day = day[t]
            if datetime.datetime.strptime(self.day, "%Y-%m-%d") < self.endTime:
                return
            name = 'TodayHumor'
            fpath = f'data/14/[{day[t].replace(".", "-")}]{name}.csv'
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
        regen = 20  # 하루에 글이 평균적으로 작성되는 양(페이지 기준). 사이트마다 적당한 고정값을 줘야 검색이 빨라짐
        stop = True
        page_Max = 0
        page_Target = True
        result = []
        Fixed_date = datetime.datetime(int(date_Specified.split('-')[0]), int(date_Specified.split('-')[1]),
                                       int(date_Specified.split('-')[2])) + timedelta(days=-1)
        # print(date_Specified, Fixed_date)

        while stop == True:
            url = f'http://www.todayhumor.co.kr/board/list.php?table=total&page={regen}&kind=total'
            res = req.get(url)
            res.encoding = None
            html = res.text
            soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')

            for i, d in enumerate(soup.select('td.date')):
                d = d.get_text()
                d = d.split(' ')[0]
                d = d.replace('\n', '')
                d = d.replace('/', '-') # 중간 날짜 형식
                d = f"20{d}"
                d = d.replace(' ', '')
                # print(d, regen)
                day = datetime.datetime(int(d.split('-')[0]), int(d.split('-')[1]), int(d.split('-')[2]))
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
                    if regen >= 1000:
                        regen = 1000
                        page_Max = page_Max + 1
                        if page_Max > 15:
                            stop = False
                            page_Target = 'low'
                            break
                elif page_Target == True:
                    regen = regen - int(regen / 5)
                    if regen < 1:
                        regen = 1
                # print(f'**********{regen}***********')
        if stop == False:
            Fixed_date = Fixed_date + timedelta(days=+1)
            # print(Fixed_date)
            while stop == False:
                if page_Max > 15 :
                    for i in range(1, regen + 1):
                        result.append(i)
                    return result
                    break
                # print(f'----------{regen}----------')
                url = f'http://www.todayhumor.co.kr/board/list.php?table=total&page={regen}&kind=total'
                res = req.get(url)
                res.encoding = None
                html = res.text
                soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')

                for i, d in enumerate(soup.select('td.date')):
                    d = d.get_text()
                    d = d.split(' ')[0]
                    d = d.replace('\n', '')
                    d = d.replace('/', '-')
                    d = f"20{d}"
                    d = d.replace(' ', '')
                    # print(d, regen)
                    day = datetime.datetime(int(d.split('-')[0]), int(d.split('-')[1]), int(d.split('-')[2]))
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