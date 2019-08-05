from bs4 import BeautifulSoup
import requests
from datetime import datetime, date, timedelta
import sys

class Crawler:
    def __init__(self):
        self.dt = datetime.today()
        self.page = 1
        self.month = int(self.dt.month)
        self.year = self.dt.year
        self.count = 0
        self.crawl_end = False
        self.day_count = timedelta(days=0)
        self.name = 'DogDrip'

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
        url = f'https://www.dogdrip.net/index.php?mid=politics&page={self.page}'
        req = requests.get(url)
        html = req.text

        soup = BeautifulSoup(html, 'html.parser')
        titles = []
        dates = []
        # 제목 크롤링
        for row in soup.select('tbody > tr:not(.notice) > td[class=title] > a > span.ed.title-link'):
            titles.append(row.getText().strip().replace(',', ''))

        for row in soup.select('tbody > tr:not(.notice) > td[class=time]'):
            day = row.getText().strip()

            # 작성일이 ~초 분 시간 전 일 때
            if (day.find('분') != (-1)) or (day.find('시간') != (-1)) or (day.find('초') != (-1)):
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
            # 작성일이 ~일 전 일때
            elif day.find('일') != (-1):
                # ~ 일 전 문자열에서 '일 전' 을 잘라 숫자만 남김
                self.day_count = timedelta(days=int(day.rstrip('일 전')))

                # time1 = 긁기 원하는 날짜
                # time2 = 오늘 날짜
                # time3 = 오늘 날짜 - 작성일( ~ 일 전)
                time1 = date(years, months, days)
                time2 = date(int(self.year), int(self.month), int(self.dt.day))
                time3 = time2 - self.day_count
              #  time3 = time2 - timedelta(days=int(day.rstrip('일 전')))
                day = str(time3).replace('-', '.')

                if int((time1 - time3).days) > 0:
                    self.crawl_end = True
                    break

            if day == f'{years}.{months}.{days}':
                self.crawl_end = True
                break
            dates.append(day)


        for j in range(len(dates)):
            global dis
            global f
            global fpath

            if j == 0:
                fpath = f'data/4/[{dates[0].replace(".", "-")}]{self.name}.csv'
                f = open(fpath, mode='a', encoding='utf-8')
                dis = dates[0]

            if dis != dates[j]:
                f.close()
                fpath = f'data/4/[{dates[j].replace(".", "-")}]{self.name}.csv'
                f = open(fpath, mode='a', encoding='utf-8')
                f.write(f'{dates[j]}, {titles[j]},\n')
            else:
                f.write(f'{dates[j]}, {titles[j]},\n')
        f.close()
