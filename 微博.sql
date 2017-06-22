use happycourier
select * from Customers;
create table Relaion(
 xuehao char(11) not null,
 xuehaoed char(11) not null,
 primary key(xuehao,xuehaoed)
)
create table Dongtai(
flag integer primary key auto_increment,
xuehao char(11) not null references customers(StuId),
dongtai varchar(255),
imageinfo varchar(255),
liuyan varchar(255),
shijian Date
);


drop table dongtai



insert into Dongtai values("14030130040","希望大家六级都过！","images/not found.jpg","#14030130033:加油。",now());
insert into Dongtai values("14030130033","祝我四级必过！","images/not found.jpg","#14030130040:你也可以做自己啊。",sysdate());

SET SQL_SAFE_UPDATES = 0;
update Dongtai set imageinfo= "" where  xuehao ="14030130033";
select * from Dongtai;



select * from relaion where xuehao = "13030130044"
insert into Relaion values("14030130040","14030130033");
insert into Relaion values("14030130033","14030130033");


select * from Dongtai;
select * from Dongtai where shijian = "2017-6-16" and xuehao in (select xuehaoed from Relaion where xuehao = "14030130040")
