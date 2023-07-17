from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request .method == 'POST':
        # Do something with request.form['id'] and request.form['password']
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Do something with request.form['id'] and request.form['password']
        return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/')
def home():
    return render_template('home.html')


if __name__ == '__main__':
    app.run(debug=True)