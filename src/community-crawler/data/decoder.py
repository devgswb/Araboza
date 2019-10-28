import io
import os
import sys
import chardet
FPATH = ''
def dir_search(site_code):
    global FPATH 
    FPATH = (os.path.dirname(os.path.realpath(__file__)) + f'\\{site_code}').replace('\\', '/')
    filenames = os.listdir(FPATH)
    result = []
    for file in filenames:
        result.append(FPATH + f'/{file}')
    return result

def utf8_to_utf8_sig(file):
    save_dir = FPATH + '/converted'
    if len(file.split('.')) == 1:
        return
    try:
        with io.open(file, 'r', encoding='utf-8', errors='ignore') as f:
            if not os.path.exists(save_dir):
                os.makedirs(save_dir)
            text = f.read()
            converted_file = save_dir + f'/{os.path.basename(f.name)}'
            with io.open(converted_file, 'w', encoding='utf-8-sig') as of:
                of.write(text)
            print(file, ' 변환 완료')
    except:
        print(file, '에서 에러')

for site_code in range(1,16):
    for file in dir_search(site_code):
        utf8_to_utf8_sig(file)

# FPATH = ''
# FPATH = (os.path.dirname(os.path.realpath(__file__)) + f'\\{9}').replace('\\', '/')
# file = 'c:/Programming/Projects/InWorking/Araboza/src/community-crawler/data/9/[2019-10-19]Instiz.csv'
# save_dir = FPATH + '/converted'
# converted_file = save_dir + f'/{os.path.basename(file)}'
# bytes = min(32, os.path.getsize(file))
# raw = open(file, 'rb').read(bytes)
# result = chardet.detect(raw)
# encoding = result['encoding']
# print(encoding)

# with io.open(file, encoding=encoding, errors='ignore') as f:
#     if not os.path.exists(save_dir):
#         os.makedirs(save_dir)
#     text = f.read()
#     with io.open(converted_file, 'w', encoding='utf-8') as of:
#         of.write(text)
#     print(file, ' 변환 완료')