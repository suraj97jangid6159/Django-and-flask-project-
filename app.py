from flask import Flask, request, jsonify
from flask_cors import CORS

import mysql.connector

app = Flask(__name__)

CORS(app)


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'simpleuserdb'

conn = mysql.connector.connect(
    host=app.config['MYSQL_HOST'],
    port=app.config['MYSQL_PORT'],
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    database=app.config['MYSQL_DB']
)
cursor = conn.cursor()
# Define API endpoints here
# GET /users
@app.route('/users', methods=['GET'])
def get_users():
    
    cursor.execute('SELECT id, name FROM users')
    users = cursor.fetchall()
    
    return jsonify(users)

# GET /users/<user_id>
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):

    cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))
    user = cursor.fetchone()

    if user:
        return jsonify(user)
    return jsonify({'error': 'User not found'}), 404

# POST /users
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    name = data['name']
    email = data['email']
    phone = data['phone']

    cursor.execute('INSERT INTO users (name, email, phone) VALUES (%s, %s, %s)', (name, email, phone))
    conn.commit()
    user_id = cursor.lastrowid
    # cursor.close()
    
    return jsonify({'id': user_id, 'name': name, 'email': email, 'phone': phone})


# PUT /users/<user_id>
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    name = data['name']
    email = data['email']
    phone = data['phone']

    cursor.execute('UPDATE users SET name = %s, email = %s, phone = %s WHERE id = %s', (name, email, phone, user_id))
    conn.commit()

    return jsonify({'id': user_id, 'name': name, 'email': email, 'phone': phone})

# DELETE /users/<user_id>
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):

    cursor.execute('DELETE FROM users WHERE id = %s', (user_id,))
    conn.commit()
    return '', 204



if __name__ == '__main__':
    app.run(debug=True)
