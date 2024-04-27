# Ultralytics YOLO 🚀, AGPL-3.0 license

__version__ = "8.1.2"

from yolov8.ultralytics.data.explorer.explorer import Explorer
from yolov8.ultralytics.models import RTDETR, SAM, YOLO
from yolov8.ultralytics.models.fastsam import FastSAM
from yolov8.ultralytics.models.nas import NAS
from yolov8.ultralytics.utils import SETTINGS as settings
from yolov8.ultralytics.utils.checks import check_yolo as checks
from yolov8.ultralytics.utils.downloads import download

__all__ = "__version__", "YOLO", "NAS", "SAM", "FastSAM", "RTDETR", "checks", "download", "settings", "Explorer"
