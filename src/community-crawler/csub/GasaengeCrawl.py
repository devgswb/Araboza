from bs4 import BeautifulSoup
import requests
from datetime import datetime, date


class Gasaenge:
    def __init__(self):
        self.dt = datetime.today()
        self.crawl_end = False
        self.page = 1
        self.year = self.dt.year
        self.month = self.dt.month
        self.day = self.dt.day

    def __run__(self, years, months, days):
        try:
            while self.crawl_end == False:
                self.crawl(years, months, days)
                print(f"{years}-{months}-{days}까지 페이지 긁는중\n")
                print(self.page)
                self.page += 1

            print('Gasange Crawling 완료')
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

        print(titles)
        count = 0

        for row in soup.select('table.board_list > tr > td.datetime'):
            count += 1
            if count > 7:
                day = row.getText().strip()

                if day.find(':') != (-1):
                    if self.month < 10:
                        day = f"{self.year}.0{self.month}.{self.day}"
                    else:
                        day = f"{self.year}.{self.month}.{self.day}"
                else:
                    day = f"{self.year}.{day[0:2]}.{day[3:5]}"

                time1 = date(years, months, days)
                time2 = date(int(self.year), int(day[5:7]), int(day[8:10]))

                day = str(time2).replace('-', '.')

                if int((time1 - time2).days) > 0:
                    self.crawl_end = True
                    print('완료')
                    break

                dates.append(day)
        print(dates)

        f = open(f'[{years}-{months}-{days}]Gasaengi.csv', mode='a', encoding='utf-8')
        for j in range(len(dates)):
            f.write(f'{dates[j]}, {titles[j]},\n')
        f.close()


g = Gasaenge()
g.__run__(2019, 6, 29)