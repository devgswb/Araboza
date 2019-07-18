from bs4 import BeautifulSoup
import requests
from datetime import datetime, date, timedelta


class DogDrip:
    def __init__(self):
        self.dt = datetime.today()
        self.page = 1
        self.month = int(self.dt.month)
        self.year = self.dt.year
        self.count = 0
        self.crawl_end = False
        self.day_count = timedelta(days=0)

    def __run__(self, years, months, days):
        try:
            while self.crawl_end == False:
                self.crawl(years, months, days)
                print(f"{years}-{months}-{days} 페이지 긁는중\n")
                self.page += 1
                print(self.page)
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
                if self.month < 10:
                    day = f"{self.year}.0{self.month}.{self.dt.day}"
                else:
                    day = f"{self.year}.{self.month}.{self.dt.day}"
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
                    print('완료')
                    break

            if day == f'{years}.{months}.{days}':
                self.crawl_end = True
                print('완료')
                break
            dates.append(day)

        f = open(f'[{years}-{months}-{days}]DogDrip.csv', mode='a', encoding='utf-8')
        for j in range(len(dates)):
            f.write(f'{dates[j]}, {titles[j]},\n')
        f.close()
