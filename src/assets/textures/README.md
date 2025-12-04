# 纹理素材说明

本项目使用宣纸纹理和粗布纹理来增强视觉质感。

由于纹理文件较大，未包含在代码仓库中。请按以下方式获取和使用：

## 宣纸纹理
1. 从千图网、包图网等素材网站下载高清宣纸纹理图片
2. 将文件命名为 xuanzhi-texture.png
3. 放置在当前目录中

## 粗布纹理
1. 从千库网等素材网站下载粗布纹理图片
2. 将文件命名为 fabric-texture.png
3. 放置在当前目录中

使用时通过CSS background-image 引入：
```css
.texture-bg {
  background-image: url('./fabric-texture.png');
  background-repeat: repeat;
}

.xuanzhi-overlay {
  background-image: url('./xuanzhi-texture.png');
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.1;
}
```

注意：所有纹理素材需遵守相应网站的使用授权。