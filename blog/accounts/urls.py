from django.urls import path, include, re_path
from django.conf.urls import url
from knox import views as knox_views

from .api import RegisterAPI, LoginAPI, UserAPI, DashboardAPI

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/dashboard', DashboardAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name="knox_logout")
]
