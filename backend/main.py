from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import torch
import io

app = FastAPI()

# Load your model here (edit path/model loading as per your Plant-Disease-Detection code)
MODEL_PATH = "model/model.pth"

def load_model():
    # TODO: Replace with your actual model class and loading logic
    model = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
    model.eval()
    return model

model = load_model()

def predict_image(img_bytes):
    # TODO: Replace with your actual preprocessing and prediction logic
    image = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    # Dummy output, replace with your model's real output
    disease = "healthy"
    confidence = 0.99
    return disease, confidence

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img_bytes = await file.read()
    disease, confidence = predict_image(img_bytes)
    result = {"disease": disease, "confidence": confidence}
    return JSONResponse(content=result)