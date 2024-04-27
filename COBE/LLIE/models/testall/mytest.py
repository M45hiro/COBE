import torch
from torchvision import transforms

a = torch.randn(1, 62, 50, 74)
b = torch.randn(1, 62, 50, 75)
b.resize_(1, 62, 50, 74)
print(b.shape)
