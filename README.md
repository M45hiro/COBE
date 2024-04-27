# COBE：复杂环境车牌识别系统(Complex-circumstance Object-recognition Based on image-Enhancement, COBE)

### 引言
本项目提出了一个**全流程模块化复杂环境车牌识别系统**，解决了极端条件下车牌识别精度低的问题。针对低光照和模糊等复杂环境导致的识别失败问题，本项目对车牌识别增加了预处理步骤，分别提出**低光增强**和**超分辨率重建**算法对车牌进行增强，有效提高了车牌精度。针对拍摄不当导致的倾斜和畸变等，本项目将识别过程分解为车牌定位和字符识别任务。首先通过目标识别得到车牌框，后通过字符识别进行车牌识别，解决了识别失败的问题。本项目预处理步骤、车牌框识别步骤和字符识别步骤互相独立，实现了**全流程模块化复杂环境车牌识别系统**。


### 测试

#### 服务端启动：
在COBE/COBE文件夹下执行以下命令以启动服务端。
```
python app.py
```
#### web前端启动：
在Live Server中打开COBE.html以打开web前端。

**注意：**
如果使用VSCode的Live Server插件，一定不要将COBE作为项目文件夹，将COBE/COBE在VSCode中打开即可，因为本项目在COBE/temp文件夹下做了动态预览图存储，Live Server会检测项目文件夹的变化，发现目录改变会重启web页面。

![web前端页面](/icons/page1.png "Page1")
web前端界面如下：点击上方的单选框（灰色圆点）即可切换页面，
- 页面1：原始图片预览；
- 页面2：增强后图片预览；
- 页面1：识别信息预览。
点击**上传图片**按钮即可选择车牌图片上传，并在窗口中展示，将鼠标移到图片上即可打开细节窗观察图像细节，然后点击**增强&识别**按钮即可进行图像增强，切换到页面2即可查看增强图像，同样设有细节窗以观察图像细节。
![web前端页面](/icons/enhanced.png "Enhanced")
识别过程中如图所示，识别完成后图像不透明度会恢复，中间的加载器动画也会结束以作为提示。
![web前端页面](/icons/page2.png "Page2")
增强后图像如图所示，可以看到图像的亮度得到提升，且细节部分得到重建，使得文本能更好地被模型识别辨认，切换到页面2即可查看识别结果。
![web前端页面](/icons/page3.png "Page3")
识别结果如图所示。
### 权利声明

除部分开源引用外，本项目所使用的后端算法与web前端均由本项目自主开发实现，所采用的开源引用如下：<br>
- Chinese_license_plate_detection_recognition: [github](https://github.com/we0091234/Chinese_license_plate_detection_recognition)/[paper](https://arxiv.org/abs/1506.02640)<br>
- 字符识别：[paper](https://arxiv.org/abs/1507.05717)
- 加载条css素材：[CSS-Loaders](https://css-loaders.com)
