"""
Vercel Serverless Function entrypoint for WeatherGPT FastAPI backend.
"""
import sys
import os

# Add root project directory to sys.path so all imports (weather_service, chatbot, database, etc.) work seamlessly
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from main import app
