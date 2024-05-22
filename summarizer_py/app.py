from fastapi import FastAPI, Request
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()




app = FastAPI()
api_key = os.getenv('API_KEY')
if not api_key:
    raise ValueError("API_KEY not found in environment variables")

genai.configure(api_key=api_key)

print(os.getenv('API_KEY'))

model = genai.GenerativeModel('gemini-pro')



@app.post("/api/summarize")
async def summarize(request: Request):
    body = await request.json()
    url = body.get("url", "")

    if not url:
        return {"error": "Please provide a URL to summarize"}

    try:
        prompt = f""" What do you know about {url} website:"""
        response = model.generate_content(prompt)
        print(response.text)
        # summary = response["result"].choices[0].message.content

        return response.text
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)