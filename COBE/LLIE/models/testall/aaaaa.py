import torch
import torch.nn as nn

dim_level = 31
conv1 = nn.Conv2d(dim_level, dim_level * 2, 4, 2, 1, bias=False)
input = torch.randn(1, 31, 100, 150)
output = conv1(input)
print(output.shape)
dim_level = dim_level*2
conv2 = nn.Conv2d(dim_level, dim_level * 2, 4, 2, 1, bias=False)
dim_level = dim_level*2
conv3 = nn.ConvTranspose2d(dim_level, dim_level // 2, stride=2,
                                   kernel_size=2, padding=0, output_padding=0)
output2 = conv2(output)
print(output2.shape)
output3 = conv3(output2)
print(output3.shape)
conv4 = nn.ConvTranspose2d(31, 31 // 2, stride=2,
                                   kernel_size=2, padding=0, output_padding=0)
outout = conv4(input)
print(outout.shape)
