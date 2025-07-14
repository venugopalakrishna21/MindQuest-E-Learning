from flask import Flask, render_template, jsonify
from firebase_config import get_courses

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/courses')
def courses_page():
    return render_template('courses.html')

@app.route('/api/courses')
def courses_data():
    data = get_courses()
    return jsonify(data)

if __name__ == '__main__':
    print("✅ Flask app starting...")  # <--- Add this to verify it's running
    app.run(debug=True)
