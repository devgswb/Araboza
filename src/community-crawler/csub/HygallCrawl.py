import requests as req
from datetime import date
import re

from bs4 import BeautifulSoup  # BeautifulSoup import


class HyGall :

    def __init__(self):
        self.crawl_end = False  # 종료
        self.page = 1
        self.count = 0
        self.change = 0

    def run(self,title, years, months, days):
        while self.crawl_end == False :
            self.crawlPage(title, years, months, days)
            self.page += 1
            print(self.page)

    def crawlPage(self,title, years, months, days):
        url = f'https://hygall.com/index.php?mid={title}&page={self.page}'
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
        for w in soup.select('tr.docList.exBg0 > td.title > a.exJsHotTrackA'):
            w = w.get_text().strip()
            w = w.replace('\n', '')
            w = w.replace(',', ' ')
            write.append(w)

        for d in soup.select('tr.docList.exBg0 > td.regdate'):
            y = date.today()
            y = str(y)[0:4]
            d = d.get_text()
            d = d.replace('\n', '')
            d = d[0:5]
            if y != years and d == "12-31" and self.change == 0:
                self.count = self.count + 1
                self.change = self.change + 1
            if y != years and d == "12-30":
                self.change = 0
            y = int(y) - self.count
            if ':' in d:
                d = date.today()
                d = str(d)
                d = d.replace('-', '.')
            else :
                d = str(y) + '.' + d
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
            print(self.count)
            print(self.change)
            print(d)
            day.append(d)

        for t in range(len(day)):
            f = open('[{0}.{1}.{2}]HyGall.csv'.format(years, months, days), mode='a', encoding='utf-8')
            f.write(f'{day[t]},{write[t]}\n')
            f.close()

hyg = HyGall()
gall = hyg.run('game',2019,7,18)
# title파라미터 추가 1~3 까지
# hy = 잡담
# game = 게임
# sports = 스포츠