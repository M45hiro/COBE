from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS
from PIL import Image
from functions import image_save, test

app = Flask(__name__)
CORS(app)  # 在 Flask 应用中启用 CORS
@app.route('/run-python-script', methods=['GET', 'POST'])
def run_python_script():
    if request.method == 'POST':
        try:
            enhanced_img, rec_img, rec_rlt = test()
            return jsonify({'image': enhanced_img,'rec_img':rec_img,'rec_rlt':rec_rlt}), 200
        
        except Exception as e:
            return str(e), 500
    elif request.method == 'GET':
        # 处理GET请求的逻辑
        return "GET request received", 200
    
@app.route('/send_data', methods=['GET', 'POST'])
def send_data():
    if request.method == 'POST':
        try:
            # 获取上传的图片文件
            uploaded_file = request.files['image']
            image = Image.open(uploaded_file)
            image_save(image)
            # 保存图片到服务器
            #uploaded_file.save(uploaded_file.filename)
            return jsonify({'message': 'File uploaded successfully'}), 200
        except Exception as e:
            return str(e), 500
    elif request.method == 'GET':
        # 处理GET请求的逻辑
        return "GET request received", 200

if __name__ == '__main__':
    app.run(debug=True)
