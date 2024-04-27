from SwinDir.main_test import main as sr
from LLIE.test import main as le
from yolov8.detect_rec_plate import main as rc
def image_save(image):
    image.save("../temp/original/original.png")
def test():
    le()
    enhanced_img = sr()
    recimg, recrlt = rc()
    return 0, recimg, recrlt

if __name__ == '__main__':
    print("Hello, World!")
    test()