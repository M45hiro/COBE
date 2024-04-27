import cv2
import os.path as osp
import logging
import argparse
import torch
import LLIE.options.options as option
import LLIE.utils.util as util
from LLIE.data import create_dataset, create_dataloader
from LLIE.models import create_model
import numpy as np
import torchvision.utils as vutils
from LLIE.models.archs.FourLLIE_my import FourLLIE
#### options
parser = argparse.ArgumentParser()
parser.add_argument('-opt', type=str, default='./LLIE/options/test/LOL_v2_syn.yml', help='Path to options YMAL file.')
opt = option.parse(parser.parse_args().opt, is_train=False)
opt = option.dict_to_nonedict(opt)


def main():
    model = create_model(opt)
    
    
    for phase, dataset_opt in opt['datasets'].items():
        val_set = create_dataset(dataset_opt)
        val_loader = create_dataloader(val_set, dataset_opt, opt, None)
    
    for val_data in val_loader:
        model.feed_data(val_data)
    
        model.test()
        visuals = model.get_current_visuals()
        rlt_img = util.tensor2img(visuals['rlt'])  # uint8
        cv2.imwrite("../temp/enhanced/enhanced.png", rlt_img)