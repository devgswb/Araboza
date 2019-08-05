from bs4 import BeautifulSoup
import requests
from datetime import datetime, date
import sys


class Crawler:
    def __init__(self):
        self.page = 1
        self.crawl_end = False
        self.dt = datetime.today()
        self.name = 'YGosu'

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
        url = f'https://www.ygosu.com/community/issue/?page={self.page}'
        req = requests.get(url)
        html = req.text

        soup = BeautifulSoup(html, 'html.parser')
        titles = []
        dates = []

        #  설정한 날짜를 벗어날 시 break 를 위함
        end_day = days - 1

        for row in soup.select('tbody > tr:not(.notice) > td[class=tit] > a'):
            titles.append(row.getText().strip().replace(',', ''))

        for row in soup.select('tbody > tr:not(.notice) > td[class=date]'):
            day = row.getText().strip()

            if day.find(':') != (-1):
                if self.dt.month < 10:
                    if self.dt.day < 10:
                        day = f"{self.dt.year}.0{self.dt.month}.0{self.dt.day}"
                    else:
                        day = f"{self.dt.year}.0{self.dt.month}.{self.dt.day}"
                else:
                    if self.dt.day < 10:
                        day = f"{self.dt.year}.{self.dt.month}.0{self.dt.day}"
                    else:
                        day = f"{self.dt.year}.{self.dt.month}.{self.dt.day}"

            # if months < 10:
            #     if day == f"{years}.0{months}.{end_day}":
            #         self.crawl_end = True
            #         break
            # else:
            #     if day == f"{years}.{months}.{end_day}":
            #         self.crawl_end = True
            #         break
            # dates.append(day)
            time1 = date(years, months, days)
            # # 긁어오는 날짜
            time2 = date(int(day[0:4]), int(day[5:7]), int(day[8:10]))

            if int((time1 - time2).days) > 0:
                self.crawl_end = True
                break

            dates.append(day)

        for j in range(len(dates)):
            global dis
            global f
            global fpath

            if j == 0:
                fpath = f'data/15/[{dates[0].replace(".", "-")}]{self.name}.csv'
                f = open(fpath, mode='a', encoding='utf-8')
                dis = dates[0]

            if dis != dates[j]:
                f.close()
                fpath = f'data/15/[{dates[j].replace(".", "-")}]{self.name}.csv'
                f = open(fpath, mode='a', encoding='utf-8')
                f.write(f'{dates[j]}, {titles[j]},\n')
            else:
                f.write(f'{dates[j]}, {titles[j]},\n')
        f.close()
