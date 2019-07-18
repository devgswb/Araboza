from bs4 import BeautifulSoup
import requests
from datetime import datetime, date


class Cook82:
    def __init__(self):
        self.dt = datetime.today()
        self.crawl_end = False
        self.page = 1
        self.year = self.dt.year
        self.month = self.dt.month
        self.count = 0

    def __run__(self, years, months, days):

        while self.crawl_end == False:
            self.crawl(years, months, days)
            print(f"{years}-{months}-{days}까지 페이지 긁는중\n")
            self.page += 1
        print('82쿡 Crawling 완료')


    def crawl(self, years, months, days):
        url = f'https://www.82cook.com/entiz/enti.php?bn=15&page={self.page}'
        req = requests.get(url)
        html = req.text

        soup = BeautifulSoup(html, 'html.parser')
        titles = []
        dates = []

        for row in soup.select('tbody > tr:not(.noticeList) > td.title > a'):
            titles.append(row.getText().strip().replace(',', ''))

        for row in soup.select('tbody > tr:not(.noticeList) > td.regdate.numbers'):
            day = row.getText().strip()

            if day.find(':') != (-1):
                if self.dt.month < 10:
                    day = f"0{self.month}.{self.dt.day}"
                else:
                    day = f"{self.month}.{self.dt.day}"

                if (day == "12/31") and (self.count == 0):
                    self.year = str(int(self.year) - 1)
                    self.count = 1
                if day == '12/30':
                    self.count = 0

                day = str(self.year) + '.' + day.replace("/", ".")

            day = day.replace("/", ".")

            time1 = date(years, months, days)
            time2 = date(int(day[0:4]), int(day[5:7]), int(day[8:10]))

            if int((time1 - time2).days) > 0:
                self.crawl_end = True
                print('완료')
                break

            dates.append(day)

        f = open(f'[{years}-{months}-{days}]82Cook.csv', mode='a', encoding='utf-8')
        for j in range(len(dates)):
            f.write(f'{dates[j]}, {titles[j]},\n')
        f.close()
