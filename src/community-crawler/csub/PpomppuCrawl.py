import requests as req
from datetime import date
import datetime
import sys
from bs4 import BeautifulSoup  # BeautifulSoup import

# Multiprocessing 추가
from multiprocessing import Pool
from datetime import timedelta
import time
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

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
        sys.stdout.write(f"뽐뿌 크롤링 완료\r")
        sys.stdout.flush()

    def subjectCrawl(self, soup, page):
        write = []
        for i, w in enumerate(soup.select('font.list_title')):
            if page == 1:
                if i > 0:
                    w = w.get_text()
                    w = w.split('\n')[0]
                    # w = w.replace('\n', '')
                    w = w.replace(',', ' ')
                    write.append(w)
            else :
                w = w.get_text()
                w = w.split('\n')[0]
                # w = w.replace('\n', '')
                w = w.replace(',', ' ')
                write.append(w)
        return write

    def dateCrawl(self, soup, type, page):
        # type은 'save' 와 'search'
        day = []
        for i, d in enumerate(soup.select('nobr.eng')):
            if page == 1:
                if i > 1:
                    d = d.get_text()
                    d = d.replace('\n', '')
                    d = d.replace('/', '-') # 날짜 중간 형식
                    d_count = len(d.split('-'))
                    if ':' in d:
                        d = date.today()
                        d = str(d)
                        d = d.replace('-', '-')
                    elif d_count == 2:
                        d = d.replace('\t', '')
                        d = f"2019-{d}"
                        d = d.replace('-', '-') # 년도가 달라졌을때 구분하는 로직이 더 필요함
                    else :
                        d = f"20{d}"
                    d = d.replace(' ', '')
                    d = d.split(' ')[0]

                    if type == "save":
                        day.append(d)
                    elif type == "search":
                        day.append(datetime.datetime(int(d.split('-')[0]), int(d.split('-')[1]), int(d.split('-')[2])))
            elif page != 1:
                d = d.get_text()
                d = d.replace('\n', '')
                d = d.replace('/', '-')  # 날짜 중간 형식
                d_count = len(d.split('-'))
                if ':' in d:
                    d = date.today()
                    d = str(d)
                    d = d.replace('-', '-')
                elif d_count == 2:
                    d = d.replace('\t', '')
                    d = f"2019-{d}"
                    d = d.replace('-', '-')  # 년도가 달라졌을때 구분하는 로직이 더 필요함
                else:
                    d = f"20{d}"
                d = d.replace(' ', '')
                d = d.split(' ')[0]

                if type == "save":
                    day.append(d)
                elif type == "search":
                    day.append(datetime.datetime(int(d.split('-')[0]), int(d.split('-')[1]), int(d.split('-')[2])))
        return day

    def crawlPage(self, page):
        url = f'http://www.ppomppu.co.kr/zboard/zboard.php?id=freeboard&page={page}&divpage=1243'
        time.sleep(0.05)
        res = req.get(url, verify=False)
        # res.encoding = None
        html = res.text
        html = html.encode('utf-8', 'ignore')
        soup = BeautifulSoup(html, 'html.parser')
        write = self.subjectCrawl(soup, page)
        day = self.dateCrawl(soup, 'save', page)

        for t in range(len(write)):
            self.day = day[t]
            if datetime.datetime.strptime(self.day, "%Y-%m-%d") < self.endTime:
                return
            name = 'Ppomppu'
            fpath = f'data/7/[{day[t].replace(".", "-")}]{name}.csv'
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
        regen = 5  # 하루에 글이 평균적으로 작성되는 양(페이지 기준). 사이트마다 적당한 고정값을 줘야 검색이 빨라짐
        stop = True
        page_Target = True
        result = []
        Fixed_date = datetime.datetime(int(date_Specified.split('-')[0]), int(date_Specified.split('-')[1]),
                                       int(date_Specified.split('-')[2])) + timedelta(days=-1)

        while stop == True:
            url = f'http://www.ppomppu.co.kr/zboard/zboard.php?id=freeboard&page={regen}&divpage=1243'
            time.sleep(0.05)
            res = req.get(url, verify=False)
            res.encoding = None
            html = res.text
            html = html.encode('utf-8', 'ignore')
            soup = BeautifulSoup(html, 'html.parser')

            for day in self.dateCrawl(soup, 'search', regen):
                if day == Fixed_date:
                    stop = False
                    page_Target = 'low'
                    break
                elif day < Fixed_date:
                    page_Target = True
                elif day > Fixed_date:
                    page_Target = False

            if stop == True:
                if page_Target == False:
                    regen = regen + int(regen / 3)
                    if regen >= 6575:
                        regen = 6575
                elif page_Target == True:
                    regen = regen - int(regen / 5)
                    if regen < 1:
                        regen = 1
        if stop == False:
            Fixed_date = Fixed_date + timedelta(days=+1)
            while stop == False:
                url = f'http://www.ppomppu.co.kr/zboard/zboard.php?id=freeboard&page={regen}&divpage=1243'
                res = req.get(url, verify=False)
                res.encoding = None
                html = res.text
                html = html.encode('utf-8', 'ignore')
                soup = BeautifulSoup(html, 'html.parser')

                for day in self.dateCrawl(soup, 'search', regen):
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