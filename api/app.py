import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')
WHATSAPP_API_KEY = os.getenv('WHATSAPP_API_KEY')
WHATSAPP_PHONE = os.getenv('WHATSAPP_PHONE', '4373707642')

def send_telegram_message(message):
    """Send message to Telegram bot"""
    try:
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        data = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "HTML"
        }
        response = requests.post(url, json=data)
        return response.ok
    except Exception as e:
        print(f"Error sending telegram message: {e}")
        return False

def send_whatsapp_message(phone, message):
    """Send WhatsApp message"""
    try:
        # This would integrate with WhatsApp Business API
        # For now, we're just logging the message
        print(f"WhatsApp message to {phone}: {message}")
        return True
    except Exception as e:
        print(f"Error sending WhatsApp message: {e}")
        return False

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "API is running"}), 200

@app.route('/api/send-offer', methods=['POST'])
def send_offer():
    """Handle car valuation offer submission"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['make', 'model', 'year', 'mileage', 'condition', 'phone', 'offer']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Format message for Telegram
        message = f"""
<b>🚗 NEW CAR OFFER REQUEST</b>

<b>Vehicle Details:</b>
• Make: {data.get('make')}
• Model: {data.get('model')}
• Year: {data.get('year')}
• Mileage: {data.get('mileage')} km
• Condition: {data.get('condition')}
• Ownership: {data.get('ownership', 'N/A')}

<b>Estimated Offer:</b>
💰 {data.get('offer')}

<b>Customer Contact:</b>
📱 Phone: {data.get('phone')}
📍 City: {data.get('city', 'N/A')}

<b>Timestamp:</b>
🕐 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        
        # Send to Telegram
        if send_telegram_message(message):
            print(f"Offer sent to Telegram: {data.get('phone')}")
        
        # Send WhatsApp message
        if WHATSAPP_API_KEY:
            whatsapp_msg = f"Hello! Your estimated car offer: {data.get('offer')}. Our team will contact you shortly at {data.get('phone')}."
            send_whatsapp_message(data.get('phone'), whatsapp_msg)
        
        # Log to file
        log_offer(data)
        
        return jsonify({
            "status": "success",
            "message": "Offer request received",
            "offer": data.get('offer')
        }), 200
    
    except Exception as e:
        print(f"Error processing offer: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/send-contact', methods=['POST'])
def send_contact():
    """Handle contact form submission"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Format message for Telegram
        message = f"""
<b>📧 NEW CONTACT MESSAGE</b>

<b>From:</b>
• Name: {data.get('name')}
• Email: {data.get('email')}

<b>Message:</b>
{data.get('message')}

<b>Timestamp:</b>
🕐 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        
        # Send to Telegram
        if send_telegram_message(message):
            print(f"Contact message sent to Telegram from: {data.get('email')}")
        
        return jsonify({
            "status": "success",
            "message": "Message received"
        }), 200
    
    except Exception as e:
        print(f"Error processing contact form: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "telegram_configured": bool(TELEGRAM_BOT_TOKEN),
        "timestamp": datetime.now().isoformat()
    }), 200

def log_offer(data):
    """Log offer to JSON file"""
    try:
        log_file = 'offers.json'
        
        offers = []
        if os.path.exists(log_file):
            with open(log_file, 'r') as f:
                try:
                    offers = json.load(f)
                except:
                    offers = []
        
        offers.append({
            **data,
            'timestamp': datetime.now().isoformat()
        })
        
        with open(log_file, 'w') as f:
            json.dump(offers, f, indent=2)
    except Exception as e:
        print(f"Error logging offer: {e}")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
