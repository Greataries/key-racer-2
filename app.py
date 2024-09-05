from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/templates/game_start.html')
def start():
    return render_template('game_start.html')

@app.route('/templates/index.html')
def index():
    return render_template('index.html')

@app.route('/templates/game.html')
def game():
    return render_template('game.html')

if __name__ == "__main__":
    app.run(debug=True)
