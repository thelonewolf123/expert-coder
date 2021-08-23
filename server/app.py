from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

app = Flask(__name__, static_folder='../client/dist/',    static_url_path='/')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expert-coder.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)


class Code(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    uid = db.Column(db.String(80), unique=True)
    code = db.Column(db.String(10000),nullable=False)
    title = db.Column(db.String(100),nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow())

    def __repr__(self):
        return f'{self.title}'

@app.route('/')
@app.route('/about')
@app.route('/code/<id>')
def index(id=1):
    return app.send_static_file('index.html')

@app.route('/api/code', methods=['POST'])
def code_post():
    code = request.json['code']
    title = request.json['title']
    uid = uuid.uuid4()
    code_obj = Code(uid=uid, code=code, title=title)
    db.session.add(code_obj)
    db.session.commit()
    return dict(code=code, title=title, id=code_obj.uid)

@app.route('/api/code/<id>', methods=['GET'])
def code_get(id):
    code_obj = Code.filter_by(uid=id).first()
    return dict(code=code_obj.code, title=code_obj.title, id=code_obj.uid)
    