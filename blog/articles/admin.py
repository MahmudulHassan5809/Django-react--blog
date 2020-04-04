
from django.contrib import admin
from .models import Article, Category
# Register your models here.


class ArticleAdmin(admin.ModelAdmin):
    list_display = ["title", "owner"]
    search_fields = ["title", "content"]
    list_per_page = 20


admin.site.register(Article, ArticleAdmin)


class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]
    list_per_page = 20


admin.site.register(Category, CategoryAdmin)
