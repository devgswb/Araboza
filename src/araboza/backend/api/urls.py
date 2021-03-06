from django.conf.urls import url
from rest_framework_mongoengine import routers as merouters
from . import views

merouter = merouters.DefaultRouter()
merouter.register(r'mongo', views.ToolViewSet)
merouter.register(r'res/impression', views.ImpressionViewSet)
merouter.register(r'index', views.IndexViewSet)
urlpatterns = [
    url(r'search/', views.SearchAPIView.as_view()),
    url(r'hotword/', views.HotWordAPIView.as_view())
]

urlpatterns += merouter.urls