FROM mcr.microsoft.com/playwright/python:v1.41.0-jammy

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Install chromium
# IMPORTANT: Remove the EXPOSE 8000. Railway handles this.
# IMPORTANT: Use the Shell form (no brackets) to allow the $PORT variable to work
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}