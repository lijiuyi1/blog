from django.contrib import admin
from myblog import models
# Register your models here.

admin.site.register(models.Article)
admin.site.register(models.Comment)
admin.site.register(models.Message)
admin.site.register(models.Category)