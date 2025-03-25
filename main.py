from flask import Flask, redirect, send_from_directory, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return index_static("index.html")

@app.route("/<path:filename>")
def index_static(filename):
   return send_from_directory("frontend/dist", filename)

@app.route("/sum", methods=["POST"])
def sum():
    req_json = request.json
    
    a = req_json["a"]
    b = req_json["b"]

    c = int(a) + int(b)

    return { "result": c }

