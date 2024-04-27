var uploaded = false;
var showdb = false;
    document.getElementById('uploadButton').addEventListener('click', function() {
        document.getElementById('fileInput').click();
    });
        document.getElementById('fileInput').addEventListener('change', function() {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            document.getElementById('uploadedImage').src = imageUrl;
            document.getElementById('uploadedImage').style.display = 'block';
        };
        reader.readAsDataURL(file);
        });

    // 给图片绑定 load 事件处理程序
    document.getElementById('uploadedImage').addEventListener('load', function() {
        // 图片加载完成后执行的操作
        uploaded = true;
        showdb = true;
        const image = this;
        const imageContainer1 = document.getElementById('imageContainer1');
        const detailBox1 = document.getElementById('detailBox1');
        const imageContainer2 = document.getElementById('imageContainer2');
        const detailBox2 = document.getElementById('detailBox2');
        const imageContainer3 = document.getElementById('imageContainer3');
        const detailBox3 = document.getElementById('detailBox3');
        
        // 计算图片的宽高比
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        // 设置虚线框的比例缩放
        let iCW, iCH;
        if (aspectRatio > 1) {
            iCH = 500 / aspectRatio;
            iCW = 500;
        } else {
            iCW = 500 * aspectRatio;
            iCH = 500;
        }
        
        // 设置虚线框大小
        imageContainer1.style.width = iCW + 'px';
        imageContainer1.style.height = iCH + 'px';
        imageContainer2.style.width = iCW + 'px';
        imageContainer2.style.height = iCH + 'px';
        imageContainer3.style.width = iCW + 'px';
        imageContainer3.style.height = iCH + 'px';
    });

    document.getElementById('processButton').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('uploadedImage').style.opacity= 0.5;
    document.getElementById('loader').style.display='block';
    // 获取上传的图片文件
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    // 创建 FormData 对象
    const formData = new FormData();
    formData.append('image', file);

    // 发送图片数据到 Flask 后端
    axios.post('http://127.0.0.1:5000/send_data', formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // 使用 multipart/form-data 格式发送数据
        }
    }).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.error(error);
    });
    axios.post('http://127.0.0.1:5000/run-python-script', {}, {
        headers: {
            'Content-Type': 'application/json' // 更改 Content-Type 为 application/json
        }
    }).then(response => {
        enhanced_image = response.data.image; // 访问返回的图像数据
        rec_img = response.data.rec_img;
        rec_result = response.data.rec_rlt;
        document.getElementById('enhancedImage').src = enhanced_image;
        document.getElementById('enhancedImage').style.display = 'block';
        document.getElementById('recImage').src = rec_img;
        document.getElementById('recognizedText').innerHTML = rec_result;
        document.getElementById('recImage').style.display = 'block';
        document.getElementById('uploadedImage').style.opacity= 1;
        document.getElementById('loader').style.display='none';
        return false;
    }).catch(error => {
        console.error(error);
    });

    });
    
    const canvas = document.getElementById('canvasPreview');
    const ctx = canvas.getContext('2d');
    document.getElementById('imageContainer1').addEventListener('mousemove', function(event) {
    if(uploaded == true && showdb==true){
        const detailBox1 = document.getElementById('detailBox1');
        detailBox1.style.display = 'block';
        detailBox1.style.position = 'absolute';
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;
        const containerWidth = this.offsetWidth;
        const containerHeight = this.offsetHeight;

        const boundary = 50; // 边界距离
        // 检查鼠标是否在边界范围内
        if (offsetX > boundary && offsetX < containerWidth - boundary) {
            // 设置虚线框的位置，相对于容器元素
            detailBox1.style.left = offsetX - detailBox1.offsetWidth / 2 + 'px';
        }else if(offsetX < boundary){
            detailBox1.style.left = boundary - detailBox1.offsetWidth / 2 + 'px';
        }else if(offsetX > containerWidth - boundary){
            detailBox1.style.left = containerWidth - boundary - detailBox1.offsetWidth / 2 + 'px';
        }
        if(offsetY > boundary && offsetY < containerHeight - boundary){
            detailBox1.style.top = offsetY - detailBox1.offsetHeight / 2 + 'px';
        }else if(offsetY < boundary){
            detailBox1.style.top = boundary - detailBox1.offsetHeight / 2 + 'px';
        }else if(offsetY > containerHeight - boundary){
            detailBox1.style.top = containerHeight - boundary - detailBox1.offsetHeight / 2 + 'px';
        }
        detailBox1.style.border = 'none'; // 移除边框
        const image = document.getElementById('uploadedImage');
            canvas.style.marginLeft = 1300 - (600 - container.offsetWidth)/2 + 'px';
            canvas.style.marginTop = 300 - (700 - container.offsetHeight)/2 + 'px';
            // 清空 Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 绘制被 detailBox1 框选的部分图像到 Canvas
            const width = parseInt(detailBox1.offsetWidth) * parseFloat(image.naturalWidth)/parseFloat(imageContainer1.offsetWidth);
            const height = parseInt(detailBox1.offsetHeight) * parseFloat(image.naturalHeight)/parseFloat(imageContainer1.offsetHeight);
            x = parseInt(detailBox1.style.left) * parseFloat(image.naturalWidth)/parseFloat(imageContainer1.offsetWidth)
            y = parseInt(detailBox1.style.top) * parseFloat(image.naturalHeight)/parseFloat(imageContainer1.offsetHeight)
            //ctx.drawImage(image, parseInt(detailBox1.style.left), parseInt(detailBox1.style.top), width, height, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);
            // 在大 container 右边显示 Canvas
            const containerRect = this.getBoundingClientRect();
            canvas.style.display = 'block';
        // detailBox1.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'; // 添加阴影效果
    }else{
        detailBox1.style.display = 'None';
        canvas.style.display = 'None';
    }
    });
    document.getElementById('imageContainer2').addEventListener('mousemove', function(event) {
        if(uploaded == true && showdb==true){
            const detailBox2 = document.getElementById('detailBox2');
            detailBox2.style.display = 'block';
            detailBox2.style.position = 'absolute';
            
            const offsetX = event.offsetX;
            const offsetY = event.offsetY;
            const containerWidth = this.offsetWidth;
            const containerHeight = this.offsetHeight;
            const boundary = 50; // 边界距离
    
            // 检查鼠标是否在边界范围内
            if (offsetX > boundary && offsetX < containerWidth - boundary) {
                // 设置虚线框的位置，相对于容器元素
                detailBox2.style.left = offsetX - detailBox2.offsetWidth / 2 + 'px';
            }else if(offsetX < boundary){
                detailBox2.style.left = boundary - detailBox2.offsetWidth / 2 + 'px';
            }else if(offsetX > containerWidth - boundary){
                detailBox2.style.left = containerWidth - boundary - detailBox2.offsetWidth / 2 + 'px';
            }
            if(offsetY > boundary && offsetY < containerHeight - boundary){
                detailBox2.style.top = offsetY - detailBox2.offsetHeight / 2 + 'px';
            }else if(offsetY < boundary){
                detailBox2.style.top = boundary - detailBox2.offsetHeight / 2 + 'px';
            }else if(offsetY > containerHeight - boundary){
                detailBox2.style.top = containerHeight - boundary - detailBox2.offsetHeight / 2 + 'px';
            }
            detailBox2.style.border = 'none'; // 移除边框
            const image = document.getElementById('enhancedImage');

                canvas.style.marginLeft = 1300 - (600 - container.offsetWidth)/2 + 'px';
                canvas.style.marginTop = 300 - (700 - container.offsetHeight)/2 + 'px';
                // 清空 Canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                // 绘制被 detailBox2 框选的部分图像到 Canvas
                const width = parseInt(detailBox2.offsetWidth) * parseFloat(image.naturalWidth)/parseFloat(imageContainer2.offsetWidth);
                const height = parseInt(detailBox2.offsetHeight) * parseFloat(image.naturalHeight)/parseFloat(imageContainer2.offsetHeight);
                x = parseInt(detailBox2.style.left) * parseFloat(image.naturalWidth)/parseFloat(imageContainer2.offsetWidth)
                y = parseInt(detailBox2.style.top) * parseFloat(image.naturalHeight)/parseFloat(imageContainer2.offsetHeight)
                //ctx.drawImage(image, parseInt(detailBox2.style.left), parseInt(detailBox2.style.top), width, height, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);
                // 在大 container 右边显示 Canvas
                const containerRect = this.getBoundingClientRect();
                canvas.style.display = 'block';
            // detailBox2.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'; // 添加阴影效果
        }else{
            detailBox2.style.display = 'none';
            canvas.style.display = 'none';
        }
        });

        document.getElementById('imageContainer3').addEventListener('mousemove', function(event) {
            if(uploaded == true && showdb==true){
                const detailBox3 = document.getElementById('detailBox3');
                detailBox3.style.display = 'block';
                detailBox3.style.position = 'absolute';
                
                const offsetX = event.offsetX;
                const offsetY = event.offsetY;
                const containerWidth = this.offsetWidth;
                const containerHeight = this.offsetHeight;
                const boundary = 50; // 边界距离
        
                // 检查鼠标是否在边界范围内
                if (offsetX > boundary && offsetX < containerWidth - boundary) {
                    // 设置虚线框的位置，相对于容器元素
                    detailBox3.style.left = offsetX - detailBox3.offsetWidth / 2 + 'px';
                }else if(offsetX < boundary){
                    detailBox3.style.left = boundary - detailBox3.offsetWidth / 2 + 'px';
                }else if(offsetX > containerWidth - boundary){
                    detailBox3.style.left = containerWidth - boundary - detailBox3.offsetWidth / 2 + 'px';
                }
                if(offsetY > boundary && offsetY < containerHeight - boundary){
                    detailBox3.style.top = offsetY - detailBox3.offsetHeight / 2 + 'px';
                }else if(offsetY < boundary){
                    detailBox3.style.top = boundary - detailBox3.offsetHeight / 2 + 'px';
                }else if(offsetY > containerHeight - boundary){
                    detailBox3.style.top = containerHeight - boundary - detailBox3.offsetHeight / 2 + 'px';
                }
                detailBox3.style.border = 'none'; // 移除边框
                const image = document.getElementById('recImage');
    
                    canvas.style.marginLeft = 1300 - (600 - container.offsetWidth)/2 + 'px';
                    canvas.style.marginTop = 300 - (700 - container.offsetHeight)/2 + 'px';
                    // 清空 Canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
        
                    // 绘制被 detailBox2 框选的部分图像到 Canvas
                    const width = parseInt(detailBox3.offsetWidth) * parseFloat(image.naturalWidth)/parseFloat(imageContainer3.offsetWidth);
                    const height = parseInt(detailBox3.offsetHeight) * parseFloat(image.naturalHeight)/parseFloat(imageContainer3.offsetHeight);
                    x = parseInt(detailBox3.style.left) * parseFloat(image.naturalWidth)/parseFloat(imageContainer3.offsetWidth)
                    y = parseInt(detailBox3.style.top) * parseFloat(image.naturalHeight)/parseFloat(imageContainer3.offsetHeight)
                    //ctx.drawImage(image, parseInt(detailBox2.style.left), parseInt(detailBox2.style.top), width, height, 0, 0, canvas.width, canvas.height);
                    ctx.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);
                    // 在大 container 右边显示 Canvas
                    const containerRect = this.getBoundingClientRect();
                    canvas.style.display = 'block';
                // detailBox2.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'; // 添加阴影效果
            }else{
                detailBox3.style.display = 'none';
                canvas.style.display = 'none';
            }
            });
    

// JavaScript for toggling pages with animation
function showPage(pageNumber) {
    // Hide all pages with a fade-out animation
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.style.transition = "opacity 0.3s ease";
        page.style.opacity = "0"; // 设置透明度为0，产生淡出效果
        setTimeout(function() {
            page.classList.remove('active');
        }, 300); // 设置延时等待淡出动画完成
    });

    // Show the selected page with a fade-in animation
    var selectedPage = document.getElementById('page' + pageNumber);
    selectedPage.style.transition = "opacity 0.3s ease";
    setTimeout(function() {
        selectedPage.classList.add('active');
        selectedPage.style.opacity = "1"; // 设置透明度为1，产生淡入效果
    }, 300); // 设置延时等待淡出动画完成

    // Update active state of toggle buttons
    var toggleButtons = document.querySelectorAll('.toggleButton');
    toggleButtons.forEach(function(button, index) {
        if (index + 1 === pageNumber) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Initial page display


