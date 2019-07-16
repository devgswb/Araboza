from bs4 import BeautifulSoup
import requests
import datetime
# request 를 통해 html 소스를 가져옴


class Ygosu:
    def __init__(self):
        self.page = 1
        self.crawl_end = False
        self.dt = datetime.datetime.today()

    def __run__(self, years, months, days):
        try:
            while self.crawl_end == False:
                self.crawl(years, months, days)
                print(f"{years}-{months}-{days} 페이지 긁는중\n")
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
        title = []
        date = []

        #  설정한 날짜를 벗어날 시 break 를 위함
        end_day = days - 1

        for row in soup.select('tbody > tr:not(.notice) > td[class=tit] > a'):
            title.append(row.getText().strip().replace(',', ''))

        for row in soup.select('tbody > tr:not(.notice) > td[class=date]'):
            day = row.getText().strip()

            if day.find(':') != (-1):
                if self.dt.month < 10:
                    day = f"{self.dt.year}.0{self.dt.month}.{self.dt.day}"
                else:
                    day = f"{self.dt.year}.{self.dt.month}.{self.dt.day}"

            if months < 10:
                if day == f"{years}.0{months}.{end_day}":
                    self.crawl_end = True
                    break
            else:
                if day == f"{years}.{months}.{end_day}":
                    self.crawl_end = True
                    break
            date.append(day)

        f = open(f'[{years}-{months}-{days}]YGosu.csv', mode='a', encoding='utf-8')
        for j in range(len(date)):
            f.write(f' {date[j]}, {title[j]},\n')
        f.close()

s = Ygosu()
s.__run__(2019,7,14)
