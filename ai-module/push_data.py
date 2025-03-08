import pandas as pd
from sqlalchemy import create_engine

# Load CSV
df = pd.read_csv("C:\\Users\\Prasa\\Downloads\\saved_data_v2.csv")

# PostgreSQL Connection
engine = create_engine("postgresql://postgres:postgres@localhost:5432/arxiv")

# Insert Data While Maintaining Order
df.to_sql("Arxiv_Paper", engine, if_exists="append", index=False)
