# Generated by Django 2.2.2 on 2019-06-14 15:12

from django.db import migrations, models
import django.db.models.deletion
import froala_editor.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30, verbose_name='文章标题')),
                ('content', froala_editor.fields.FroalaField(verbose_name='文章内容')),
                ('introduction', models.TextField(default='\n文章\n', verbose_name='简介')),
                ('time_update', models.DateTimeField(auto_now=True, verbose_name='修改时间')),
                ('time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('viewcount', models.IntegerField(default=0, verbose_name='浏览量')),
            ],
            options={
                'verbose_name': '文章',
                'verbose_name_plural': '文章',
                'ordering': ('-time',),
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=20, verbose_name='分类')),
            ],
            options={
                'verbose_name': '分类',
                'verbose_name_plural': '分类',
            },
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, verbose_name='邮箱')),
                ('name', models.CharField(max_length=30, verbose_name='名称')),
                ('time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('content', models.TextField(verbose_name='内容')),
            ],
            options={
                'verbose_name': '留言',
                'verbose_name_plural': '留言',
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(default='无名', max_length=20, verbose_name='文章标题')),
                ('content', froala_editor.fields.FroalaField(verbose_name='文章内容')),
                ('time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('time_update', models.DateTimeField(auto_now=True, verbose_name='修改时间')),
                ('toarticle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='article_instance', to='myblog.Article', verbose_name='评论对象')),
            ],
            options={
                'verbose_name': '评论',
                'verbose_name_plural': '评论',
            },
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myblog.Category', verbose_name='分类'),
        ),
    ]
