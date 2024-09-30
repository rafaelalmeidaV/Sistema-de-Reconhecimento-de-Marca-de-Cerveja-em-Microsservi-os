import shutil
from flask import Flask, request, jsonify
from PIL import Image
import io
import os
from test import extract_brand

app = Flask(__name__)

@app.route('/process-image', methods=['POST'])
def process_image():    
    print("Received request")
    if 'file' not in request.files:
        print("No file in request")
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    print(f"Filename: {file.filename}")
    
    if file:
        print("File found, cleaning upload folder")
        folder = 'upload/'
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print('Failed to delete %s. Reason: %s' % (file_path, e))
        try:
            file_content = file.read()
            print(f"File content length: {len(file_content)} bytes", flush=True)
            # Tente abrir a imagem
            image = Image.open(io.BytesIO(file_content))
            #printa a imagem
            print(image)
            image.save(f"upload/{file.filename}")
            print("Current files in upload directory:", os.listdir(folder), flush=True)
            brand = extract_brand(f"upload/{file.filename}")
            print("Image processed successfully.")
            return jsonify({'brand': brand})
        except Exception as e:
            print('Error processing image:', e)
            return jsonify({'error': 'Failed to process image'}), 500

    return jsonify({'error': 'No valid file provided'}), 400



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True)
