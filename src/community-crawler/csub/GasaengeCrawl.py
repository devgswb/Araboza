from bs4 import BeautifulSoup
import requests
from datetime import datetime, date
import sys

class Crawler:
    def __init__(self):
        self.dt = datetime.today()
        self.crawl_end = False
        self.page = 1
        self.year = self.dt.year
        self.month = self.dt.month
        self.day = self.dt.day
        self.count = 0
        self.name = 'GaSengI'

    def run(self, years, months, days):
        try:
            while self.crawl_end == False:
                sys.stdout.write(f"{years}-{months}-{days} {self.page}페이지 긁는중\r")
                sys.stdout.flush()
                self.crawl(years, months, days)
                self.page += 1
        except RuntimeError:
            print('RuntimeError')
        except ValueError:
            print('ValueError')
        except IndexError:
            print('IndexError')

    def crawl(self, years, months, days):
        url = f'https://www.gasengi.com/main/board.php?bo_table=commu&page={self.page}'
        req = requests.get(url)
        req.encoding = None
        html = req.text

        soup = BeautifulSoup(html, 'html.parser')
        titles = []
        dates = []
        count = 0  # 공지사항 긁는것 회피를 위함
        for row in soup.select('table[class=board_list] > tr > td[class=subject] > a:nth-child(1)'):
            count += 1
            if count > 7:
                titles.append(row.getText().strip().replace(',', ''))

        count = 0

        for row in soup.select('table.board_list > tr > td.datetime'):
            count += 1
            if count > 7:
                day = row.getText().strip()

                if (day == "12/31") and (self.count == 0):
                    self.year = str(int(self.year) - 1)
                    self.count = 1
                if day == '12/30':
                    self.count = 0

                if day.find(':') != (-1):
                    if self.month < 10:
                        if self.dt.day < 10:
                            day = f"{self.dt.year}.0{self.dt.month}.0{self.dt.day}"
                        else:
                            day = f"{self.dt.year}.0{self.dt.month}.{self.dt.day}"
                    else:
                        if self.dt.day < 10:
                            day = f"{self.dt.year}.{self.dt.month}.0{self.dt.day}"
                        else:
                            day = f"{self.dt.year}.{self.dt.month}.{self.dt.day}"
                else:
                    day = f"{self.year}.{day[0:2]}.{day[3:5]}"

                time1 = date(years, months, days)
                time2 = date(int(self.year), int(day[5:7]), int(day[8:10]))

                day = str(time2).replace('-', '.')

                if int((time1 - time2).days) > 0:
                    self.crawl_end = True
                    break

                dates.append(day)

        for j in range(len(dates)):
            global dis
            global f
            global fpath

            if j == 0:
                fpath = f'data/6/[{dates[0].replace(".", "-")}]{self.name}.csv'
                f = open(fpath, mode='a', encoding='utf-8')
                dis = dates[0]

            if dis != dates[j]:
                f.close()
                fpath = f'data/6/[{dates[j].replace(".", "-")}]{self.name}.csv'
                f = open(fpath, mode='a', encoding='utf-8')
                f.write(f'{dates[j]}, {titles[j]},\n')
            else:
                f.write(f'{dates[j]}, {titles[j]},\n')
        f.close()