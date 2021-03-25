from django.db import models

# Create your models here.
class Products(models.Model):

    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100)
    amount = models.IntegerField()
    imgurl = models.CharField(max_length=40, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'app_product'


class Cart(models.Model):
    userid = models.OneToOneField('UserTable', models.DO_NOTHING, db_column='userid', primary_key=True)
    productid = models.ForeignKey(Products, models.DO_NOTHING, db_column='productid')
    amount = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'cart'
        unique_together = (('userid', 'productid'),)


class UserTable(models.Model):
    name = models.CharField(max_length=20)
    login = models.CharField(max_length=20)
    password = models.CharField(max_length=12)
    email = models.CharField(max_length=40)
    registrationdate = models.DateField()
    role = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'user_table'
