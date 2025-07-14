import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("firebase-credentials.json")  # Use your actual filename
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://mindquest-e-learning-default-rtdb.firebaseio.com/'  # Your Firebase Realtime DB URL
})
def get_courses():
    ref = db.reference('Courses')
    data = ref.get()
    if data is None:
        return []  # Return empty list instead of None
    return list(data.values())
