import requests as req
from datetime import date
import re

from bs4 import BeautifulSoup  # BeautifulSoup import


class RuLiWeb :

    def __init__(self):
        self.crawl_end = False  # 종료
        self.page = 1

    def run(self, years, months, days):
        while self.crawl_end == False :
            self.crawlPage(years, months, days)
            self.page += 1
            print(self.page)

    def crawlPage(self, years, months, days):
        url = f'http://bbs.ruliweb.com/community/board/300143?page={self.page}'
        res = req.get(url)
        html = res.text
        soup = BeautifulSoup(html, 'html.parser')
        write = []
        day = []

        end = days-1
        month = months
        year = years
        if end == 0 :
            if  month == 3 or month == 5 or  month == 7 or months == 10 or months == 12:
                end = 30
                month = month-1
            elif month == 2 or month == 4 or  month == 6 or month == 9 or month == 11:
                end = 31
                month = month-1
            elif months == 8 :
                end = 31
                month = month-1
            elif month == 1 :
                end = 31
                month = 12
                year = year-1
        for w in soup.select('div[class=relative] > a[class=deco]'):
            w = w.get_text()
            w = w.replace('\n', '')
            w = w.replace(',', ' ')
            write.append(w)

        for d in soup.select('tr[class=table_body] > td[class=time]'):
            d = d.get_text()
            d = d.replace('\n', '')
            if ':' in d:
                d = date.today()
                d = str(d)
                d = d.replace('-', '.')
            d = d.replace(' ', '')
            d = d.split(' ')[0]
            if month < 10:
                if d == f"{year}.0{month}.{end}":
                    self.crawl_end = True
                    print('완료')
                    break
            else:
                if d == f"{year}.{month}.{end}":
                    self.crawl_end = True
                    print('완료')
                    break
            day.append(d)

        for t in range(len(day)):
            f = open('[{0}.{1}.{2}]RuLiWeb.csv'.format(years, months, days), mode='a', encoding='utf-8')
            f.write(f'{day[t]},{write[t]}\n')
            f.close()

ruli = RuLiWeb()
ru = ruli.run(2019,7,1)