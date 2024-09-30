import os
import cv2
import numpy as np
import sys
import pytesseract
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split




# Função para pré-processar a imagem
def preprocess_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    denoised = cv2.bilateralFilter(gray, d=9, sigmaColor=75, sigmaSpace=75)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    enhanced = clahe.apply(denoised)
    equalized = cv2.equalizeHist(enhanced)
    blurred = cv2.GaussianBlur(equalized, (5, 5), 0)
    thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                   cv2.THRESH_BINARY, 11, 2)
    kernel = np.ones((3,3), np.uint8)
    morphed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    dilated = cv2.dilate(morphed, kernel, iterations=1)
    return dilated


def extract_text(image):
    custom_config = r'--oem 3 --psm 6'
    return pytesseract.image_to_string(image, config=custom_config)


def train_classifier(X, y):
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=0.01, max_df=1.0)
    X_vectorized = vectorizer.fit_transform(X)
    classifier = RandomForestClassifier(
    n_estimators=200,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    max_features='sqrt',
    bootstrap=True,
    class_weight='balanced',
    random_state=42,
    n_jobs=-1
    )   
    
    classifier.fit(X_vectorized, y)
    return vectorizer, classifier
    

def classify_beer_brand(image, vectorizer, classifier):
    print("Classificando imagem...",image, flush=True)
    image = cv2.imread(image)
    preprocessed = preprocess_image(image)
    
    # Extrair texto da imagem
    text = extract_text(preprocessed)
    
    if text.strip():  # Verifica se o texto não está vazio
        text_vectorized = vectorizer.transform([text])
        prediction = classifier.predict(text_vectorized)
        probabilities = classifier.predict_proba(text_vectorized)
        confidence = np.max(probabilities)
        return prediction[0], confidence, text
    else:
        return "Texto não detectado", 0.0, ""
        
def load_data(data_dir):
    X = []
    y = []
    # Verifique se o diretório existe
    if not os.path.exists(data_dir):
        print(f"Diretório não encontrado: {data_dir}")
        return X, y

    print(f"Listando arquivos em {data_dir}:", os.listdir(data_dir), flush=True)

    for brand in os.listdir(data_dir):
        brand_dir = os.path.join(data_dir, brand)
        if os.path.isdir(brand_dir):
            for img_file in os.listdir(brand_dir):
                img_path = os.path.join(brand_dir, img_file)
                print(f"Carregando {img_path}...", flush=True)
                image = cv2.imread(img_path)
                if image is None:
                    print(f"Falha ao carregar a imagem: {img_path}", flush=True)
                else:
                    preprocessed = preprocess_image(image)
                    text = extract_text(preprocessed)
                    X.append(text)
                    y.append(brand)
    return X, y

# Exemplo de uso
def extract_brand(image):
    # Dados de exemplo (você precisará substituir isso com seus próprios dados rotulados)
    print("Extraindo marca da imagem...",image ,flush=True)
    data_dir = "img/"
    X,y = load_data(data_dir) 
    # Dividir dados em treino e teste
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    vectorizer, classifier = train_classifier(X_train, y_train)
    X_test_vectorized = vectorizer.transform(X_test)
    y_pred = classifier.predict(X_test_vectorized)
    print(classification_report(y_test, y_pred), flush=True)
    # Treinar o classificador

    predicted_brand, confidence, extracted_text = classify_beer_brand(image, vectorizer, classifier)
    print(f"Imagem: {image}", flush=True)
    print(f"Marca prevista: {predicted_brand}", flush=True)
    print(f"Confiança: {confidence}")
    print(f"Texto extraído: {extracted_text}", flush=True)
    
    return predicted_brand


    

