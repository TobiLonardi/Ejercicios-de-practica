"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/users", methods=["POST"])
def postUser():
    data=request.json
    email = data.get("email",None)
    name = data.get("name",None)
    if not email or name:
        return jsonify({"mensaje": "necesitas completar todas las casillas"})
    elif User().query.filter_by(email=email).one_or_none() is not None:
        return jsonify({"mensaje": "este mail ya esta registrado"})
    user = User()
    user.email = email
    user.name = name
    db.session.add(user)
    try:
        db.session.commit()
        return jsonify("User created"), 200
    except Exception as error:
        db.session.rollaback()
        return jsonify(f"Error: {error.args}"),500
