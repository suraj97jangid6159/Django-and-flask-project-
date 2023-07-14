import sys
import pytesseract
from PIL import Image
print("started")
# Get the filename from command-line argument
filename = sys.argv[1]
print("filename: ",filename)
# Path to the uploaded image
image_path = f'uploads/{filename}'
print("image_path ",image_path)
# Perform OCR on the image
try:
    # Open the image using Pillow
    image = Image.open(image_path)
    
    # Perform OCR using Tesseract
    extracted_text = pytesseract.image_to_string(image)

    # Print the extracted text
    print(extracted_text)

    output_file = 'output.txt'

    with open(output_file, 'w') as f:
        f.write(extracted_text)
except IOError:
    print('Error: Unable to open or process the image')
