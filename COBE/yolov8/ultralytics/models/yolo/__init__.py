# Ultralytics YOLO 🚀, AGPL-3.0 license

from yolov8.ultralytics.models.yolo import classify, detect, obb, pose, segment

from .model import YOLO

__all__ = "classify", "segment", "detect", "pose", "obb", "YOLO"
