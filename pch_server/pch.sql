SET NAMES UTF8;
DROP DATABASE IF EXISTS pch;
CREATE DATABASE pch CHARSET=UTF8;
USE pch;

-- 用户注册表pch_reg
CREATE TABLE pch_reg(
  uid INT PRIMARY KEY AUTO_INCREMENT,    #用户的ID，为用户的唯一标识，由系统自动生成
  uname VARCHAR(32),
  upwd VARCHAR(32),
  phone VARCHAR(32),                     #手机号码
  gender INT                            #性别  0-女  1-男
);

-- 用户登录表pch_login
CREATE TABLE pch_login(
  uid INT,
  uname VARCHAR(32),
  upwd VARCHAR(32)
);

-- 食谱收藏表（pch_collect）
CREATE TABLE pch_collect(
  cid  INT PRIMARY KEY AUTO_INCREMENT,   #收藏夹编号,加入收藏夹自动生成
  uid INT,                               #用户编号
  lid INT,                               #食谱编号
  img_url VARCHAR(255),                  #食谱图片路径
  cname VARCHAR(255)                     #菜谱名
);

-- 食谱表 （pch_cookbooks）
CREATE TABLE pch_cookbooks(
  lid  INT PRIMARY KEY AUTO_INCREMENT,   #食谱编号，系统自动生成
  img_url VARCHAR(255),                  #食谱图片路径
  cname VARCHAR(255)                     #菜谱名
);

-- 首页轮播图表 （pch_index_carousel）
CREATE TABLE pch_index_carousel(
  pid  INT PRIMARY KEY AUTO_INCREMENT,   #轮播图编号
  pic VARCHAR(255),                      #轮播图片路径
  href VARCHAR(255)                      #跳转链接
);

-- 插入用户注册数据
INSERT INTO pch_reg VALUES(null,'silvia','123456','13755849681',0);
INSERT INTO pch_reg VALUES(null,'zhoukui','123456','13655849681',1);
INSERT INTO pch_reg VALUES(null,'zhenhua','123456','13955840681',1);

-- 插入用户登录
INSERT INTO pch_login VALUES(1,'silvia',md5('123456'));
INSERT INTO pch_login VALUES(2,'zhoukui',md5('123456'));
INSERT INTO pch_login VALUES(3,'zhenhua',md5('123456'));

-- 插入食谱表数据
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb01.jpg','美味小饭团');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb02.jpg','韭菜盒子');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb03.jpg','巧克力土司');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb04.jpg','西葫芦小饼');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb05.jpg','耗油菜心');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb06.jpg','凉拌鸡丝');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb07.jpg','清炖牛肉');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb08.jpg','烤箱纸包鸡');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb09.jpg','低脂藤椒鸡');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb10.jpg','蔬菜沙拉');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb11.jpg','鸡丝西兰花');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb12.jpg','上汤蔬菜');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb13.jpg','青椒土豆饼');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb14.jpg','香酥茄子饼');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb15.jpg','鸡蛋麦芬');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb16.jpg','油酥鸡胸肉');
-- 8/18添加数据
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb17.jpg','低碳芝士球');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb18.jpg','黄金南瓜饼');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb19.jpg','海苔鸡肉卷');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb20.jpg','鸡肉丸子');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb21.jpg','全麦紫薯饼');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb22.jpg','泰味烤鸡胸');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb23.jpg','蒜蓉蒸丝瓜');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb24.jpg','蔬菜沙拉');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb25.jpg','蚝油生菜');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb26.jpg','青素三鲜');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb27.jpg','虾油意大利面');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb28.jpg','蛋黄鸡翅');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb29.jpg','苏格拉蛋');
INSERT INTO pch_cookbooks VALUES(null,'img/cookbooks/cb30.jpg','生酮咖喱鸡');


-- 插入首页轮播图
INSERT INTO pch_index_carousel VALUES(null,'carousel/banner01.png',null);
INSERT INTO pch_index_carousel VALUES(null,'carousel/banner02.jpg',null);
INSERT INTO pch_index_carousel VALUES(null,'carousel/banner03.jpg',null);
INSERT INTO pch_index_carousel VALUES(null,'carousel/banner04.jpg',null);

USE pch;
ALTER TABLE pch_cookbooks ADD title VARCHAR(255);
UPDATE pch_cookbooks SET title='燕麦是最佳的减肥增肌选择';

USE pch;
ALTER TABLE pch_collect ADD title VARCHAR(255);
UPDATE pch_collect SET img_url='01.jpg';