import sys
from PIL import Image, ImageFilter
src,dst=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB').filter(ImageFilter.UnsharpMask(radius=1.6,percent=70,threshold=2))
im.save(dst,quality=92)
