# Change Log

## [0.4.7] - 2020-12-20
#### 1，添加自动刷新文件夹，删除刷新按钮
#### 2，增添打开文件所在文件夹按钮，方便增添模版文件，鼠标右键。。。
#### 3，增加{...}文件内循环语句。
使用方法：
模版文件如下：
```
import '...'
class test{
    {...}
    public {r1c2} {r1c1} = '';
    {...}
    public {r1c2} set{r1c1}(){
        return this.{r1c1};
    }
    {...}
}
```
想要循环替换的和不循环替换的用{...}分隔开,就会只替换语句中包含{r1c1}这种替换变量的地方。
执行完像这样：
```
import '...'
class test{
    public 111 aaaa = '';

    public 222 bbbb = '';

    public 111 setaaaa(){
        return this.aaaa;
    }

    public 222 setbbbb(){
        return this.bbbb;
    }

}
```

## [0.4.6] - 2020-11-30

## [Unreleased]

- Initial release