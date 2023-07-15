from flask import Flask, render_template, request
# import pytesseract
from PIL import Image
from datetime import datetime, timedelta
import os
# import api_key 

import requests

app = Flask(__name__)

# Set the upload folder and allowed extensions
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}
app.config['api_key']="K81234338888957"
# Helper function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def get_extracted_text(image_path):
    
    # OCR.space API endpoint URL
    api_url = 'https://api.ocr.space/parse/image'

    # OCR.space API key (replace 'YOUR_API_KEY' with your actual API key)
    api_key = app.config['api_key']

    # OCR.space API request parameters
    payload = {
        'apikey': api_key,
        'language': 'eng',  # Specify the language of the text (e.g., 'eng' for English)
    }

    # Open the image file
    with open(image_path, 'rb') as image_file:
        # Send the image file as a POST request to OCR.space API
        response = requests.post(api_url, files={'image': image_file}, data=payload)

        # Parse the JSON response
        response_data = response.json()

        # Check if OCR processing was successful
        if response_data['OCRExitCode'] == 1:
            # Extract the parsed text
            parsed_text = response_data['ParsedResults'][0]['ParsedText']

            # Print the extracted text
            print(parsed_text)

            output_file = 'output.txt'
            with open(output_file, 'w') as f:
                f.write(parsed_text)

            return parsed_text
        else:
            # OCR processing failed, print the error message
            error_message = response_data['ErrorMessage']
            print(f'OCR processing failed: {error_message}')



# Route to handle the file upload form
@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # Check if a file was submitted
        if 'file' not in request.files:
            return render_template('upload.html', message='No file selected')

        file = request.files['file']

        # Check if the file has an allowed extension
        if file and allowed_file(file.filename):
            # Save the file to the upload folder
            # filename = datetime.now().strftime('%Y%m%d%H%M%S') + '_' + file.filename
            filename =file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            # Redirect to the extraction scheduling page
            return render_template('schedule.html', filename=filename)
        else:
            return render_template('upload.html', message='Invalid file format')

    return render_template('upload.html')

# Route to handle the extraction scheduling
@app.route('/schedule', methods=['POST'])
def schedule_extraction():
    filename = request.form['filename']
    extraction_time = datetime.strptime(request.form['extraction_time'], '%Y-%m-%dT%H:%M')

    # Calculate the time difference between now and the extraction time
    time_difference = (extraction_time - datetime.now()).total_seconds()
    print("time Difference -",time_difference)
   
    # Use a scheduling mechanism to execute the command at the specified time
    # Here, we assume the scheduling mechanism is handled externally, e.g., using cron or Task Scheduler

    image_path = f'uploads/{filename}'

    # Perform OCR on the image
    try:
        extracted_text = get_extracted_text(image_path)
    except IOError:
        print('Error: Unable to open or process the image')
        extracted_text = None

    if extracted_text is not None:
        return render_template('success.html', extracted_text=extracted_text)
    else:

        return render_template('error.html', message='Extraction failed')

    # Add a return statement after the exception handling block
    return render_template('error.html', message='An unexpected error occurred')

if __name__ == '__main__':
    app.run(debug=True)
