# 필수적으로 아래를 따라할 것
# 윈도우 사용자는 아래 -f의 속성값으로 windows_env.yml, 리눅스는 linux_env.yml
# 서버가 구동된 후엔 React 서버를 실행시키고 React 단으로 넘어가는 데이터를 관찰해보기
conda env create -f windows_env.yml -n Araboza
conda activate Araboza
python manage.py migrate
python manage.py runserver 8000