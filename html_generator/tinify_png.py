#!/usr/bin/python3

import tinify
import sys
from os import path
import os
import os.path  
ImageFilePath = "build/web-mobile/assets"
apiKey = "2ZTvXCPynpb4rXL271vhDBwMS2BzWLXb"
if len(apiKey) <= 0:  
    apiKey="3nCqhHBt7Ks0kM1F4b6G0kKQ8CZrlnhF"
elif len(apiKey) <= 0:
    apiKey="8Z3S38Z6WCtGflfWZPpHZBBZ14PpmX5w"  
elif len(apiKey) <= 0:
    apiKey="DWsQBQtnHWTDhFLJ0XtPjkznWmz7KVq3"  
assert len(apiKey) > 0, "API KEY is necessary, goto https://tinypng.com, sign up and get your own."
tinify.key = apiKey
fileType = [".png", ".jpg"]
  
def isSupportedFile(filename):
    name, ext = os.path.splitext(filename)
    if ext in fileType:
        return True
    return False

def tinifyPic(targetPath):
    for filename in os.listdir(targetPath):
        filepath = os.path.join(targetPath, filename)
        if os.path.isdir(filepath):  
            tinifyPic(filepath) 
        else:  
            if isSupportedFile(filepath):
                print("Compressing: ", filepath)
                compressed_file = tinify.from_file(filepath)
                compressed_file.to_file(filepath)


if __name__ == '__main__':
    tinifyPic(ImageFilePath)