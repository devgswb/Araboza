from bs4 import BeautifulSoup as bs
import requests
import datetime
# request 를 통해 html 소스를 가져옴


class BoBaeDream:

    def __init__(self):
        self.year = '2019'  # 년도
        self.count = 0  # 년도 카운팅을 위한 변수
        self.crawl_end = False  # 종료
        self.page = 1
        self.dt = datetime.datetime.today()

    def __run__(self, years, months, days):
        while self.crawl_end == False:
            self.crawl(years, months, days)
            self.page += 1
            print('진행중')

    def crawl(self, years, months, days):
        url = f'http://www.bobaedream.co.kr/list?code=politic&s_cate=&maker_no=&model_no=&or_gu=10&or_se=desc&s_selday=&pagescale=30&info3=&noticeShow=&s_select=&s_key=&level_no=&vdate=&type=list&page={self.page}'
        req = requests.get(url)  # encoding ISO-8859-1
        req.encoding = None

        end = days - 1
        html = req.text
        # Requests 를 통해 받아온 html 을 python 이 이해하는 객체 구조로 만들어줘야함
        # 이때 BeautifulSoup 사용하여 Parsing

        soup = bs(html, 'html.parser')
        title = []
        date = []

        # 'table[id=boardlist] > tbody > tr[itemtype="http://schema.org/Article"]'
        for row in soup.select('tr:not(.best) > td[class=pl14] > a[class=bsubject]'):
            title.append(row.getText().strip().replace(',', ''))

        for row in soup.select('tr:not(.best) > td[class=date]'):
            day = row.getText().strip()

            if (day == "12/31") and (self.count == 0):
                self.year = str(int(self.year)-1)
                self.count = 1
            if day == '12/30':
                self.count = 0

            if day.find(':') != (-1):
                if self.dt.month < 10:
                    day = f"0{self.dt.month}.{self.dt.day}"
                else:
                    day = f"{self.dt.month}.{self.dt.day}"

            temp = self.year + "." + day.replace('/', '.')
            print("date " + temp)

            if months < 10:
                if temp == f"{years}.0{months}.{end}":
                    self.crawl_end = True
                    print('완료')
                    break
            else:
                if temp == f"{years}.{months}.{end}":
                    self.crawl_end = True
                    print('완료')
                    break

            date.append(temp)
        print(date)
        f = open(f'[{years}-{months}-{days}]BoBaeDream.csv', mode='a', encoding='utf-8')
        for j in range(len(date)):
            f.write(f'{date[j]}, {title[j]}\n')
        f.close()

        title.clear()
        date.clear()
