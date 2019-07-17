from bs4 import BeautifulSoup
import requests
from datetime import datetime, date


class Cook82:
    def __init__(self):
        self.dt = datetime.today()
        self.crawl_end = False
        self.page = 1

    def __run__(self, years, months, days):
        try:
            while self.crawl_end == False:
                self.crawl(years, months, days)
                print(f"{years}-{months}-{days}까지 페이지 긁는중\n")
                self.page += 1
            print('82쿡 Crawling 완료')
        except RuntimeError:
            print('RuntimeError')
        except ValueError:
            print('ValueError')
        except IndexError:
            print('IndexError')

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
                    day = f"{self.dt.year}.0{self.dt.month}.{self.dt.day}"
                else:
                    day = f"{self.dt.year}.{self.dt.month}.{self.dt.day}"

            day = day.replace('/', '.')

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
