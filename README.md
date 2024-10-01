# Desafio Técnico: Sistema de Reconhecimento de Marca de Cerveja em Microsserviços

## Visão Geral

Este projeto implementa um sistema de reconhecimento de marcas de cerveja utilizando uma arquitetura de microsserviços. O sistema é capaz de identificar as marcas Heineken, Skol, Brahma e Antarctica a partir de imagens de latas, utilizando técnicas de Reconhecimento Óptico de Caracteres (OCR).

Para desenvolver este sistema, eu treinei minha própria Inteligência Artificial (IA) usando uma combinação de tecnologias e bibliotecas de machine learning. O processamento de imagens é realizado com OpenCV, que é utilizado para melhorar a qualidade das imagens antes da extração do texto. A extração de texto é feita com a biblioteca Tesseract OCR, que converte imagens em texto legível.

Além disso, para classificar as marcas de cerveja, utilizei um classificador Random Forest, que foi treinado em um conjunto de dados contendo amostras de texto extraído de latas. O pré-processamento das imagens inclui a conversão para escala de cinza, filtragem, equalização e binarização, a fim de otimizar a detecção de texto.

Devido ao fato de eu ter treinado a IA com um conjunto de dados específico e ter implementado várias etapas de processamento, o sistema se tornou mais pesado para rodar, exigindo recursos significativos de computação.

## Arquitetura

O sistema é composto por dois microsserviços principais:

1. **API Backend (Nest.js)**: Recebe as imagens dos usuários, comunica-se com o serviço de OCR e armazena os resultados no banco de dados.

2. **Serviço de OCR (Python)**: Processa as imagens recebidas utilizando algoritmos de OCR para extrair o nome da marca de cerveja.

## Tecnologias Utilizadas

- **Backend**: Nest.js
- **Serviço de OCR**: Python com Tesseract OCR
- **Banco de Dados**: MongoDB
- **Containerização**: Docker e Docker Compose

## Pré-requisitos

- Docker
- Docker Compose

## Configuração e Execução

1. Clone o repositório:
   ```
   git clone https://github.com/rafaelalmeidaV/Sistema-de-Reconhecimento-de-Marca-de-Cerveja-em-Microsservi-os.git
   ```

2. Construa e inicie os containers:
   ```
   docker-compose up --build
   ```

3. O sistema estará disponível nos seguintes endereços:
   - API Backend: http://localhost:3000

## Uso

Para testar o sistema, você pode enviar uma requisição POST para a API Backend com uma imagem de uma lata de cerveja no multipart:

![image](https://github.com/user-attachments/assets/80ad4b1d-96af-4d06-8d26-62bfac21ba3b)


A resposta incluirá o nome da marca identificada e um status de sucesso.

## Estrutura do Projeto

```
api-nest/
│
├── api-inbev/                 # API Backend (Nest.js)
│   ├── src/
│   ├── Dockerfile
│   └── ...
│
├── ocr-service/             # Serviço de OCR (Python)
│   ├── api-flask.py
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml
└── README.md
```

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.



Link do Projeto: [https://github.com/rafaelalmeidaV/Sistema-de-Reconhecimento-de-Marca-de-Cerveja-em-Microsservi-os](https://github.com/rafaelalmeidaV/Sistema-de-Reconhecimento-de-Marca-de-Cerveja-em-Microsservi-os)
