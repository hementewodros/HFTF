from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Secret key for session management
app.config['SECRET_KEY'] = 'H068897#h'

# Database configuration (use your PostgreSQL credentials here)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ShadyZ:H068897#h@localhost/customer_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Create the Customer and Transaction models
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    loyalty_points = db.Column(db.Integer, default=0)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    amount = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(50), nullable=False)
    branch = db.Column(db.String(50), nullable=False)

# Route for the Sign-Up page
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        full_name = request.form['new-username']
        email = request.form['new-email']
        password = request.form['new-password']
        hashed_password = generate_password_hash(password, method='sha256')

        # Create a new customer record
        new_customer = Customer(
            full_name=full_name,
            email=email,
            password=hashed_password,
            loyalty_points=0
        )
        db.session.add(new_customer)
        db.session.commit()

        return redirect(url_for('login'))

    return render_template('signup.html')

# Route for the Login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['username']
        password = request.form['password']
        
        user = Customer.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password, password):
            return redirect(url_for('dashboard', customer_id=user.id))
        else:
            return "Invalid credentials, try again."
    
    return render_template('login.html')

# Route for User Dashboard
@app.route('/dashboard/<int:customer_id>')
def dashboard(customer_id):
    # Retrieve customer data and transaction history
    customer = Customer.query.get_or_404(customer_id)
    transactions = Transaction.query.filter_by(customer_id=customer_id).all()
    return render_template('dashboard.html', customer=customer, transactions=transactions)

# Route to handle transactions
@app.route('/transaction/<int:customer_id>', methods=['POST'])
def transaction(customer_id):
    if request.method == 'POST':
        amount = request.form['amount']
        transaction_type = request.form['transaction_type']
        branch = request.form['branch']

        # Create a new transaction record
        new_transaction = Transaction(
            customer_id=customer_id,
            amount=amount,
            transaction_type=transaction_type,
            branch=branch
        )
        db.session.add(new_transaction)
        db.session.commit()

        # Update loyalty points
        customer = Customer.query.get_or_404(customer_id)
        customer.loyalty_points += int(amount)  # Add points based on transaction amount
        db.session.commit()

        return redirect(url_for('dashboard', customer_id=customer_id))

# Run the Flask app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist already
    app.run(debug=True)
