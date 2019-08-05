import requests as req
from datetime import date
import datetime
import sys
from bs4 import BeautifulSoup  # BeautifulSoup import
from time import sleep

class Crawler:

    def __init__(self):
        self.crawl_end = False
        self.page = 1
        self.day = ''
        self.endTime = datetime.datetime(2000, 1, 1)

    def run(self, years, months, days):
        self.endTime = datetime.datetime(years, months, days)
        while True:
            if self.day != '' and (datetime.datetime.strptime(self.day, "%Y.%m.%d") < self.endTime):
                break
            self.crawlPage()
            sys.stdout.write(f"{self.day} {self.page}페이지 긁는중\r")
            sys.stdout.flush()
            self.page += 1
            sleep(500)

    def crawlPage(self):
        url = f'http://web.humoruniv.com/board/humor/list.html?table=pick&pg={self.page}'
        res = req.get(url)
        res.encoding = None
        html = res.text
        soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')
        write = []
        day = []

        for w in soup.select('td.li_sbj > a'):
            w = w.get_text()
            w = w.split('\n')[0]
            # w = w.replace('\n', '')
            w = w.replace(',', ' ')
            write.append(w)

        for d in soup.select('span.w_date'):
            d = d.get_text()
            d = d.replace('\n', '')
            if ':' in d:
                d = date.today()
                d = str(d)
                d = d.replace('-', '.')
            else:
                d = d.replace('\t', '')
                d = f"2019-{d}"
                d = d.replace('-', '.')
            d = d.replace(' ', '')
            d = d.split(' ')[0]
            day.append(d)

        for t in range(len(day)):
            self.day = day[t]
            if datetime.datetime.strptime(self.day, "%Y.%m.%d") < self.endTime:
                return
            name = 'HumorUniv'
            fpath = f'data/7/[{day[t].replace(".", "-")}]{name}.csv'
            with open(fpath, mode='a', encoding='utf-8') as f:
                f.write(f'{day[t]},{write[t]}\n')
                f.close()
