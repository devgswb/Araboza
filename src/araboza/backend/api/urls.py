from django.conf.urls import url
from rest_framework_mongoengine import routers as merouters
from . import views

merouter = merouters.DefaultRouter()
merouter.register(r'mongo', views.ToolViewSet)
merouter.register(r'res/impression', views.ImpressionViewSet)
merouter.register(r'index', views.IndexViewSet)
merouter.register(r'search', views.SearchViewSet)

urlpatterns = [

]

urlpatterns += merouter.urls