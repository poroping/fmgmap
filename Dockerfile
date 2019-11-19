FROM python:3-alpine

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FORTIMAPS_FMG_HOST=fortimanager.url
ENV FORTIMAPS_FMG_USERNAME=admin
ENV FORTIMAPS_FMG_PASSWORD=admin

EXPOSE 5000
CMD ["python", "./app.py"]
