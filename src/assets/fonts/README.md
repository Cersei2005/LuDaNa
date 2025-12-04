# 字体文件说明

本项目使用庞门正道粗书体（PangMenZhengDaoCuShuTi-2.ttf），这是一款免费商用的毛笔书法字体。

由于字体文件较大，未包含在代码仓库中。请从官方渠道下载并放置在此目录中：
1. 访问字体官方下载页面
2. 下载TTF格式文件
3. 将文件命名为 PangMenZhengDaoCuShuTi-2.ttf
4. 放置在当前目录中

使用时通过CSS @font-face 引入：
```css
@font-face {
  font-family: 'PangMenZhengDao';
  src: url('./PangMenZhengDaoCuShuTi-2.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.calligraphy {
  font-family: 'PangMenZhengDao', sans-serif;
}
```

授权说明：该字体可免费商用，无需担心版权问题。