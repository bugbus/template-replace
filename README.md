# template-replace README
# 声明
# 不知道那写错了，用不了，明天还要上边那～～

# 塑料英语😊
# I don't know something wrong i did, it's not going to work,
# i well going to be done tomorrow...or Day after tomorrow.

## 功能简介：
这个插件是替换模版文件中的变量，多行对多行。对于我来说就是替换老长老长结构文件的。。。   
  
  
## 使用方法
### 首先指定一个工作目录
以后你的模版文件都会放在这个目录下。
指定方法为：点击[文本替换脚本]旁边的[...]

也可以手动在配置文件中直接改,
找到["conf.replace.workSpacePath"]
  
### 一个是模版文件：
  
比如下面这种

```
public {r1c1} get{r1c2}(){
    return this.{r1c2};
} 
```

  
### 另一个文件像这样：
  
这个文件需要临时打开一份。（⇧⌘ N/ctrl N）
并放入值。
```
String	fun1
int	fun2
```
中间用[\t]制表符分割。



点击’=>'后就生成了  （将鼠标放到模版文件上就能看到‘=>’了）

```
public String getfun1(){
    return this.fun1;
} 
public int getfun2(){
    return this.fun2;
} 

```


{r1c1}  
r是行，c是列的意思。r1c1是第一行第一列的那个字符串，用[\t]制表符分割  
r1c2,r2c2...等等。  


  
### 考虑
  
文件脚本替换中，去掉了各种文件操作。  
文件操作包含：新建，删除，移动，重命名，监听文件变动并刷新等等。。。  

因为相对于这个插件，我觉得文件操作组织起来过于复杂，全部实现十分不划算。  
并且这个插件使用频率和主要解决的问题，与文件操作依赖性不强。  

所以最后去掉了，虽然少了一些体验，所以也在考虑，以后加上。  

项目地址：https://github.com/bugbus/template-replace

**Enjoy!**
