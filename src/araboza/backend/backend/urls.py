"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view
import sys
sys.path.append("..")
import api.api

app_name = 'Araboza'

router = routers.DefaultRouter()
router.register('impression', api.api.ImpressionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/doc', get_swagger_view(title="REST API DOCUMENT")), # API 문서를 나타내는 파트. 실효는 없음
    path('api/res/', include((router.urls, 'impression'), namespace='api'))  # 초기 플젝 임시 API URL을 라우팅하는 파트
    # /api/res/impression 주소에서 ImpressionViewSet 데이터를 뿌려주는 역할을 한다.
    # 상세한 내용은 django REST API 관련 Google 문서들을 참고할 것!
]
