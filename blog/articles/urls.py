from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from articles import api

urlpatterns = [
    path('api/articles/', api.ArticleList.as_view()),
    path('api/articles/create/', api.CreateArticle.as_view()),
    path('api/articles/<int:user_id>', api.GetUserArticle.as_view()),
    path('api/article/byid/<int:article_id>', api.GetArticleById.as_view()),

    path('api/categories/', api.CategoryList.as_view()),
    path('api/category/articles/<int:category_id>',
         api.CategoryArticlesList.as_view()),

    path('api/article/delete/<int:id>',
         api.ArticleDelete.as_view()),
    #path('snippets/<int:pk>/', views.SnippetDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
