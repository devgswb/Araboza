import requests as req
from datetime import date
import sys
from bs4 import BeautifulSoup  # BeautifulSoup import

class Crawler:

    def __init__(self):
        self.crawl_end = False
        self.page = 1

    def run(self, years, months, days):
        while self.crawl_end == False :
            sys.stdout.write(f"{years}-{months}-{days} {self.page}페이지 긁는중\r")
            sys.stdout.flush()
            self.crawlPage(years, months, days)
            self.page += 1

    def crawlPage(self, years, months, days):
        url = f'http://www.todayhumor.co.kr/board/list.php?table=total&page={self.page}&kind=total'
        res = req.get(url)
        html = res.text
        soup = BeautifulSoup(html, 'html.parser')
        write = []
        day = []

        end = days - 1
        month = months
        year = years
        if end == 0:
            if month == 3 or month == 5 or month == 7 or months == 10 or months == 12:
                end = 30
                month = month - 1
            elif month == 2 or month == 4 or month == 6 or month == 9 or month == 11:
                end = 31
                month = month - 1
            elif months == 8:
                end = 31
                month = month - 1
            elif month == 1:
                end = 31
                month = 12
                year = year - 1
        for w in soup.select('td.subject a'):
            w = w.get_text()
            #w = w.split('\n')[0]
            w = w.replace('&quot;', '""')
            w = w.replace(',', ' ')
            w = w.replace('\n', '')
            write.append(w)

        for d in soup.select('td.date'):
            d = d.get_text()
            d = d.split(' ')[0]
            d = "20" + d
            d = d.replace('\n', '')
#            if ':' in d:
#                d = date.today()
#                d = str(d)
#                d = d.replace('-', '-')
            d = d.replace('/', '-')
            d = d.split(' ')[0]
            if month < 10:
                if d == f"{year}-0{month}-{end}":
                    self.crawl_end = True
                    break
            else:
                if d == f"{year}-{month}-{end}":
                    self.crawl_end = True
                    break
            day.append(d)

        for t in range(len(day)):
            name = 'TodayHumor'
            fpath = f'data/14/[{years}-{months}-{days}]{name}.csv'
            f = open(fpath, mode='a', encoding='utf-8')
            f.write(f'{day[t]},{write[t]}\n')
            # print(f'{day[t]},{write[t]}\n')
            f.close()