import os
import re
import nltk
import json
import pinecone
import numpy as np
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import gensim.downloader as api
from gensim.models import Word2Vec
from gensim.downloader import load
from pinecone import Pinecone, ServerlessSpec
from transformers import pipeline
from langchain_google_genai import ChatGoogleGenerativeAI
nltk.download("stopwords")
nltk.download("punkt")
nltk.download("wordnet")
nltk.download('punkt_tab')

load_dotenv()

model = Word2Vec.load("../model/word2vec_model.bin")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class QuerySummerize(BaseModel):
    data: str

class QuerySearch(BaseModel):
    data: str

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)

    stop_words = set(stopwords.words("english"))
    words = [word for word in word_tokenize(text) if word not in stop_words]

    lemmatizer = WordNetLemmatizer()
    words = [lemmatizer.lemmatize(word) for word in words]

    return words


pinecone_api_key = os.getenv("PINECONE_API_KEY")
pinecone = Pinecone(api_key=pinecone_api_key)

from fastapi.encoders import jsonable_encoder

@app.post("/api/arxiv/user/search")
async def semanticSearch(data: QuerySearch):
    index_name = "arxiv-search"
    index = pinecone.Index(index_name)
    query_tokens = clean_text(data.data)
    valid_vectors = [model.wv[word] for word in query_tokens if word in model.wv]

    if not valid_vectors:
        print("⚠ No words in query exist in the Word2Vec model.")
        return "No relevant papers found."

    query_vector = np.mean(valid_vectors, axis=0).tolist()

    results = index.query(
        vector=query_vector,
        top_k=10,
        include_vectors=True,
        include_metadata=False,  # Set to False since metadata is not present
        namespace="arxiv"
    )

    # Simplify the results structure
    simplified_results = []
    for result in results['matches']:
        simplified_result = result['id']
        
        simplified_results.append(simplified_result)

    # Encode the simplified results
    encoded_results = (simplified_results)

    return {"data": encoded_results}




@app.post("/api/arxiv/user/summerize")
async def summerize(data: QuerySummerize):

    model = ChatGoogleGenerativeAI(model="gemini-1.5-pro")
    summery = model.invoke(data.data);
    
    return summery.content


if __name__ == '__main__':
    uvicorn.run('api:app', host='localhost', port=8000,reload=True,workers=1) #add workers=int_value which is equal to or less than your cpu cores, which is used run and serve mutiple users at same time on server.
    # and remove reload=True if want to use workers because it ignores the "workers" parameter then.



