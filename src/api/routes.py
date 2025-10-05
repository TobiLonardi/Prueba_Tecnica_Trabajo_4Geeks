"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Order
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import re


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all() 
    return jsonify([user.serialize() for user in users]), 200

@api.route("/users", methods=["POST"])
def create_user():
    data = request.json
    email = data.get("email")
    name = data.get("username")

    if not email or not name:
        return jsonify({"message": "Email y username son requeridos"}), 400
    
    if not is_valid_email(email):
        return jsonify({"message": "Formato de email inválido"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "El email ya está registrado"}), 400

    new_user = User(email=email, name=name)
    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify(new_user.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500

@api.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    product_name = data.get("product_name")
    amount = data.get("amount")
    user_id = data.get("user_id")

    if not product_name or not amount or not user_id:
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400
    
    if int(amount)<=0:
        return jsonify({"msg": "la cantidad debe ser al menos 1"}),401

    order = Order(product_name=product_name, amount=amount, user_id=user_id)
    db.session.add(order)

    try:
        db.session.commit()
        return jsonify(order.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error: {str(e)}"}), 500
    

@api.route("/orders", methods=["GET"])
def get_all_orders():
    orders = Order.query.join(User).all()
    return jsonify([
        {
            "id": order.id,
            "product_name": order.product_name,
            "amount": order.amount,
            "user_name": order.user.name
        } for order in orders
    ]), 200

@api.route("/users/<int:user_id>/orders", methods=["GET"])
def get_orders_by_user(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()

    if not orders:
        return jsonify({"msg": "No hay pedidos para este usuario"}), 404

    return jsonify([
        {
            "id": order.id,
            "product_name": order.product_name,
            "amount": order.amount,
            "created_at": order.created_at.isoformat()
        } for order in orders
    ]), 200