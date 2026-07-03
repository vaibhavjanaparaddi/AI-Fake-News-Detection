from flask import Flask, render_template, request
import joblib
import re
from nltk.corpus import stopwords

app = Flask(__name__)

# Load model and vectorizer
model = joblib.load("model/model.pkl")
vectorizer = joblib.load("model/vectorizer.pkl")

stop_words = set(stopwords.words("english"))

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z ]', '', text)
    words = text.split()
    words = [w for w in words if w not in stop_words]
    return " ".join(words)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    news = request.form["news"]

    cleaned = clean_text(news)

    # Data not found if the cleaned text is too short
    if len(cleaned.split()) < 8:
        return render_template(
            "index.html",
            prediction="⚠ DATA NOT FOUND",
            confidence=0,
            color="#FFD54F"
        )

    vector = vectorizer.transform([cleaned])

    prediction = model.predict(vector)[0]

    # Get probability if the model supports it
    if hasattr(model, "predict_proba"):
        probability = model.predict_proba(vector)[0]
        confidence = round(max(probability) * 100, 2)
    else:
        confidence = 95

    if prediction == 1:
        result = "✅ REAL NEWS"
        color = "#22C55E"
    else:
        result = "❌ FAKE NEWS"
        color = "#EF4444"

    return render_template(
        "index.html",
        prediction=result,
        confidence=confidence,
        color=color
    )


if __name__ == "__main__":
    app.run(debug=True)