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
        self.title = ''
        self.endTime = datetime.datetime(2000, 1, 1)
        self.name = 'TheQoo'
        self.url = ''
        self.noticeNum = 0

    def run(self, title, years, months, days):
        time.sleep(2)
        self.title = title
        self.noticeNum = 0
        self.url = f'https://theqoo.net/index.php?mid={title}&page='
        self.endTime = datetime.datetime(years, months, days)
        #while True:
         #   if self.day != '' and (datetime.datetime.strptime(self.day, "%Y.%m.%d") < self.endTime):
         #       break
            # self.crawlPage()
        self.noticeCheck()
        pool = Pool(processes=4)
        try:
            pool.map(self.crawlPage, self.pageCalculation(f'{years}-{months}-{days}'))
        except:
            print(f"{title} 오류발생 재시작 합니다.")
            return self.run(title, years, months, days)
        pool.close()
        # sys.stdout.write(f"{self.name}-{title} 크롤링 완료\r")
        # print(f"예외처리는 {self.noticeNum}개!")
        print(f"{self.name}-{title} 크롤링 완료")

    def noticeCheck(self):
        url = self.url + str(1)
        time.sleep(0.5)
        res = req.get(url, verify=False)
        res.encoding = None
        html = res.text
        html = html.encode('utf-8', 'ignore')
        soup = BeautifulSoup(html, 'html.parser')

        for i, w in enumerate(soup.select('td.title span[style="font-weight:bold;;color:#95a5a6"]')):
            self.noticeNum = self.noticeNum + 1
        for i, w in enumerate(soup.select('td.title span[style="font-weight:bold;;color:#7f8c8d"]')):
            self.noticeNum = self.noticeNum + 1
        for i, w in enumerate(soup.select('td.title span[style="font-weight:bold;;color:#4c4c4c"]')):
            self.noticeNum = self.noticeNum + 1
        for i, w in enumerate(soup.select('td.title span[style="font-weight:bold;;color:#3e005d"]')):
            self.noticeNum = self.noticeNum + 1
        for i, w in enumerate(soup.select('td.title span[style="font-weight:bold;"]')):
            self.noticeNum = self.noticeNum + 1
        for i, w in enumerate(soup.select('td.title span[style="color:#666666"]')):
            self.noticeNum = self.noticeNum + 1
        for i, w in enumerate(soup.select('td.title span[style="color:#ffaad4"]')):
            self.noticeNum = self.noticeNum + 1

    def subjectCrawl(self, page, soup):
        write = []
        for i, w in enumerate(soup.select('td.title span[style=""]')):
            w = w.get_text()
            w = w.split('\n')[0]
            w = w.replace('\n', '')
            w = w.replace(',', ' ')
            write.append(w)
        return write

    def dateCrawl(self, page, soup, type):
        # type은 'save' 와 'search'
        day = []
        for i, d in enumerate(soup.select('td.time')):
            if i > (self.noticeNum-1):
                d = d.get_text()
                d = d.replace('\n', '')
                d = d.replace('.', '-') # 날짜 중간 형식
                d_count = len(d.split('-'))
                if ':' in d:
                    d = date.today()
                    d = str(d)
                    d = d.replace('-', '-')
                elif d_count == 2:
                    d = d.replace('\t', '')
                    d = f"2019-{d}"
                    d = d.replace('-', '-') # 년도가 달라졌을때 구분하는 로직이 더 필요함
                d = d.replace(' ', '')
                d = d.split(' ')[0]
                if type == "save":
                    day.append(d)
                elif type == "search":
                    day.append(datetime.datetime(int(d.split('-')[0]), int(d.split('-')[1]), int(d.split('-')[2])))
        return day

    def crawlPage(self, page):
        try:
            url = self.url + str(page)
            time.sleep(0.5)
            res = req.get(url, verify=False)
            res.encoding = None
            html = res.text
            html = html.encode('utf-8', 'ignore')
            soup = BeautifulSoup(html, 'html.parser')
            write = self.subjectCrawl(page, soup)
            day = self.dateCrawl(page, soup, 'save')

            for t in range(len(write)):
                self.day = day[t]
                if datetime.datetime.strptime(self.day, "%Y-%m-%d") < self.endTime:
                    return
                fpath = f'data/13/[{day[t].replace(".", "-")}]{self.name}.csv'
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
        except:
            print(f'{self.title} {page}page 재 크롤링')
            return self.crawlPage(page)

    def pageCalculation(self, date_Specified):  # 입력한 날짜의 글이 있는 페이지 까지 검색
        # 들어와야하는 date_Specified의 형태는 '2019-08-22'
        regen = 5  # 하루에 글이 평균적으로 작성되는 양(페이지 기준). 사이트마다 적당한 고정값을 줘야 검색이 빨라짐
        stop = True
        page_Max = 0
        page_Target = True
        result = []
        Fixed_date = datetime.datetime(int(date_Specified.split('-')[0]), int(date_Specified.split('-')[1]),
                                       int(date_Specified.split('-')[2])) + timedelta(days=-1)
        while stop == True:
            url = self.url + str(regen)
            time.sleep(0.5)
            res = req.get(url, verify=False)
            res.encoding = None
            html = res.text
            html = html.encode('utf-8', 'ignore')
            soup = BeautifulSoup(html, 'html.parser')

            for day in self.dateCrawl(regen, soup, 'search'):
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
                    if regen >= 10000:
                        regen = 10000
                        page_Max = page_Max + 1
                        if page_Max > 15:
                            stop = False
                            page_Target = 'low'
                            break
                elif page_Target == True:
                    if regen < 5 and regen > 1:
                        regen = regen - 1
                    else:
                        regen = regen - int(regen / 5)
                    if regen < 1:
                        regen = 1
        if stop == False:
            Fixed_date = Fixed_date + timedelta(days=+1)
            while stop == False:
                if page_Max > 15 :
                    for i in range(1, regen + 1):
                        result.append(i)
                    return result
                    break
                url = self.url + str(regen)
                time.sleep(0.5)
                res = req.get(url, verify=False)
                res.encoding = None
                html = res.text
                html = html.encode('utf-8', 'ignore')
                soup = BeautifulSoup(html, 'html.parser')

                for day in self.dateCrawl(regen, soup, 'search'):
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