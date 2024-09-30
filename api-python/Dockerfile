# Use Python como imagem base
FROM python:3.10

# Instale as dependências do sistema operacional necessárias para o Tesseract
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o requirements.txt e instale as dependências do Python
COPY requirements.txt .
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN pip install -U pip
RUN pip install -r requirements.txt

# Copie o código do serviço OCR para dentro do container
COPY . .

# Exponha a porta do serviço OCR
EXPOSE 3001

# Comando para rodar a aplicação Python
CMD ["python", "api_flask.py"]
