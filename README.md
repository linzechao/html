#### HTML5/CSS3/ECMAScript6

> **顾名思义，Duang~**

> 1、HTML5验证器，[地址](https://html5.validator.nu/)
>
> 2、html的lang属性值，[参考](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) 
>
> - img一定要有alt属性
> - section一定要有标题
> - article指一个独立的模块
> - 标签不能嵌套错

#### 排列布局
```html
<ul>
    <li>1-1</li>
    <li>1-2</li>
    <li>1-3</li>
    <li>1-1</li>
    <li>1-2</li>
    <li>1-3</li>
</ul>
```
> ul的左边距 = -(间隔 * 2)
>
> li的左边距 = 间隔 * 2
>
> li的右边距 = -间隔
>
> li的宽度 = -(总宽度 - (间隔 * (列数 - 1)))


```html
<!-- 忽略Android对邮箱地址的识别 -->
<meta name="format-detection" content="email=no">
```

#### box-sizing
input[type="button"] = content-box