"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Order
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
    if email is None or name is None:
        return jsonify({"mensaje": "necesitas completar todas las casillas"}), 401
    elif User.query.filter_by(email=email).one_or_none() is not None:
        return jsonify({"mensaje": "este mail ya esta registrado"}), 401
    user = User()
    user.email = email
    user.name = name
    db.session.add(user)
    try:
        db.session.commit()
        return jsonify("User created"), 200
    except Exception as error:
        db.session.rollback()
        return jsonify(f"Error: {error.args}"),500

@api.route("/users", methods=["GET"])
def getAllUsers():
    users=User().query.all()
    return jsonify([user.serialize() for user in users]), 200

@api.route("/users/<int:id>", methods=["GET"])
def getUser(id):
    user=User().query.filter_by(id=id).first()
    if not user:
        return jsonify({"msg":"no se encontro el usuario"}), 500
    return jsonify({"user":
        
       { "id":user.id,
        "name":user.name,
        "email": user.email}
    }), 200


@api.route("/users/<int:id>", methods=["DELETE"])
def deleteUser(id):
    user=User().query.filter_by(id=id).first()
    if not user:
        return jsonify({"msg":"no se encontro el usuario"}), 500
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "user eliminated"})

@api.route("/order",methods=["POST"])
def postOrder():
    data = request.json
    product = data.get("product_name")
    amount = data.get("amount")
    user_id = data.get("user_id")
    if product is None and amount is None and user_id is None:
        return jsonify({"msg":"faltan datos"}), 500
    order = Order(product=product,amount=amount,user_id = user_id)
    db.session.add(order)
    try:
        db.session.commit()
        return jsonify("order creado"), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg":f"error:{ str(e)}" })

@api.route("/order",methods=["GET"])
def getAllOrder():
    order=Order.query.join(User).all()
    return jsonify([{
        "id":order.id,
        "product":order.product,
        "amount":order.amount,
        "user_name":order.user.name
    }])

@api.route("/user/<int:Id>/order",methods=["GET"])
def getUserOrder(Id):
    orders=Order.query.filter_by(user_id=Id).all()
    if not orders:
        return jsonify("no se encontro ningun order"), 500
    return jsonify([{
        "id":order.id,
        "product_name":order.product,
        "amount":order.amount
    }for order in orders]), 200


