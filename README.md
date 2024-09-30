# Desafio Técnico: Sistema de Reconhecimento de Marca de Cerveja em Microsserviços

## Visão Geral

Este projeto implementa um sistema de reconhecimento de marca de cerveja utilizando uma arquitetura de microsserviços. O sistema é capaz de identificar a marca de uma cerveja a partir de uma imagem de uma lata, utilizando técnicas de Reconhecimento Óptico de Caracteres (OCR).

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
   git clone https://github.com/seu-usuario/beer-brand-recognition.git
   cd beer-brand-recognition
   ```

2. Construa e inicie os containers:
   ```
   docker-compose up --build
   ```

3. O sistema estará disponível nos seguintes endereços:
   - API Backend: http://localhost:3000
   - Serviço de OCR: http://localhost:3001

## Uso

Para testar o sistema, você pode enviar uma requisição POST para a API Backend com uma imagem de uma lata de cerveja:

```bash
curl -X POST -F "file=@/caminho/para/sua/imagem.jpg" http://localhost:3000/upload
```

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
