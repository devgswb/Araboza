import json
import os
from pathlib import Path

class Dao:
    data = ''
    @classmethod
    def make(cls):
        dirname = str(Path(Path(os.path.dirname(os.path.abspath(__file__))).parent).parent)
        dirname = dirname.replace('\\', '/')
        with open(f'{dirname}/server_settings.json', encoding='utf-8') as data_file:
            data = json.load(data_file)
            Dao.data = data
            Dao.username = data['username']
            Dao.password = data['password']
            Dao.db_host = data['host']
            Dao.db_port = data['port']
            Dao.db_name = data['db_name']

if not Dao.data:
    Dao.make()