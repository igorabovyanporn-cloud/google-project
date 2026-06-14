// Car valuation data based on condition and year
const carPricingData = {
    excellent: {
        2024: 0.95,
        2023: 0.90,
        2022: 0.85,
        2021: 0.80,
        2020: 0.75,
        2019: 0.70,
        2018: 0.65,
        2017: 0.60,
        2016: 0.55,
        2015: 0.50,
        2014: 0.45,
        2013: 0.40,
        2012: 0.35,
        2011: 0.30,
        2010: 0.25,
    },
    good: {
        2024: 0.85,
        2023: 0.80,
        2022: 0.75,
        2021: 0.70,
        2020: 0.65,
        2019: 0.60,
        2018: 0.55,
        2017: 0.50,
        2016: 0.45,
        2015: 0.40,
        2014: 0.35,
        2013: 0.30,
        2012: 0.25,
        2011: 0.20,
        2010: 0.15,
    },
    fair: {
        2024: 0.70,
        2023: 0.65,
        2022: 0.60,
        2021: 0.55,
        2020: 0.50,
        2019: 0.45,
        2018: 0.40,
        2017: 0.35,
        2016: 0.30,
        2015: 0.25,
        2014: 0.20,
        2013: 0.15,
        2012: 0.10,
        2011: 0.08,
        2010: 0.06,
    },
    poor: {
        2024: 0.50,
        2023: 0.45,
        2022: 0.40,
        2021: 0.35,
        2020: 0.30,
        2019: 0.25,
        2018: 0.20,
        2017: 0.15,
        2016: 0.12,
        2015: 0.10,
        2014: 0.08,
        2013: 0.06,
        2012: 0.05,
        2011: 0.03,
        2010: 0.02,
    },
    damaged: {
        2024: 0.30,
        2023: 0.25,
        2022: 0.20,
        2021: 0.18,
        2020: 0.15,
        2019: 0.12,
        2018: 0.10,
        2017: 0.08,
        2016: 0.06,
        2015: 0.05,
        2014: 0.04,
        2013: 0.03,
        2012: 0.02,
        2011: 0.01,
        2010: 0.01,
    }
};

// Average car base prices (Canadian market)
const carBasePrices = {
    'Toyota': 25000,
    'Honda': 24000,
    'Ford': 23000,
    'Chevrolet': 22000,
    'BMW': 35000,
    'Mercedes': 40000,
    'Audi': 38000,
    'Volkswagen': 22000,
    'Hyundai': 18000,
    'Kia': 19000,
    'Mazda': 20000,
    'Nissan': 21000,
    'Jeep': 26000,
    'GMC': 25000,
    'Tesla': 45000,
    'Lexus': 32000,
    'Subaru': 23000,
    'Volvo': 30000,
};

// Get base price for car make
function getBasePrice(make) {
    return carBasePrices[make] || 20000; // Default to 20000 if make not found
}

// Calculate car valuation
function calculateValuation() {
    const make = document.getElementById('make').value.trim();
    const model = document.getElementById('model').value.trim();
    const year = parseInt(document.getElementById('year').value);
    const mileage = parseInt(document.getElementById('mileage').value);
    const condition = document.getElementById('condition').value;
    const ownership = document.getElementById('ownership').value;

    if (!make || !model || !year || !mileage || !condition || !ownership) {
        return null;
    }

    // Get base price
    let basePrice = getBasePrice(make);

    // Get condition multiplier
    const conditionData = carPricingData[condition];
    if (!conditionData) return null;

    // Get year multiplier
    let yearMultiplier = conditionData[year];
    if (!yearMultiplier) {
        // If year not in data, use closest year
        yearMultiplier = conditionData[2010] * 0.5; // Very old car
    }

    // Adjust for mileage (every 10000 km = ~0.5% depreciation)
    const mileageDeduction = (mileage / 10000) * 0.005;
    const mileageMultiplier = Math.max(0.2, 1 - mileageDeduction); // Don't go below 20%

    // Calculate estimated value
    let estimatedValue = basePrice * yearMultiplier * mileageMultiplier;

    // Adjust for ownership status (financed vehicles are worth slightly less)
    if (ownership === 'financed') {
        estimatedValue *= 0.95;
    }

    // Round to nearest $500
    estimatedValue = Math.round(estimatedValue / 500) * 500;

    // Apply reasonable bounds
    estimatedValue = Math.max(500, Math.min(estimatedValue, 100000));

    return estimatedValue;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format phone number
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
}

// Handle offer form submission
document.getElementById('offerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Validate and calculate
    const valuation = calculateValuation();

    if (!valuation) {
        alert('Please fill in all required fields');
        return;
    }

    // Show offer result
    const offerResult = document.getElementById('offerResult');
    const offerAmount = document.getElementById('offerAmount');
    offerAmount.textContent = formatCurrency(valuation);
    offerResult.style.display = 'block';

    // Scroll to result
    offerResult.scrollIntoView({ behavior: 'smooth' });

    // Collect form data
    const formData = {
        make: document.getElementById('make').value,
        model: document.getElementById('model').value,
        year: document.getElementById('year').value,
        mileage: document.getElementById('mileage').value,
        condition: document.getElementById('condition').value,
        ownership: document.getElementById('ownership').value,
        city: document.getElementById('city').value,
        phone: document.getElementById('phone').value,
        offer: formatCurrency(valuation),
        timestamp: new Date().toLocaleString('en-CA')
    };

    // Send to backend
    try {
        const response = await fetch('/api/send-offer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Show WhatsApp link
            const phoneNumber = formData.phone.replace(/\D/g, '');
            const message = `Hi! I'd like to sell my car. Details: ${formData.year} ${formData.make} ${formData.model}. Mileage: ${formData.mileage} km. Condition: ${formData.condition}. Your estimated offer: ${formData.offer}`;
            const whatsappUrl = `https://wa.me/16475551234?text=${encodeURIComponent(message)}`;
            
            // Show success message
            setTimeout(() => {
                alert(`Your offer: ${formData.offer}\n\nWe'll contact you at ${formData.phone} shortly!\n\nClick WhatsApp button to chat with us.`);
            }, 500);
        }
    } catch (error) {
        console.error('Error sending offer:', error);
        // Still show the offer even if backend fails
    }
});

// Update offer in real-time as user types
document.getElementById('make').addEventListener('input', showLiveCalculation);
document.getElementById('model').addEventListener('input', showLiveCalculation);
document.getElementById('year').addEventListener('change', showLiveCalculation);
document.getElementById('mileage').addEventListener('input', showLiveCalculation);
document.getElementById('condition').addEventListener('change', showLiveCalculation);
document.getElementById('ownership').addEventListener('change', showLiveCalculation);

function showLiveCalculation() {
    const valuation = calculateValuation();
    if (valuation) {
        const offerResult = document.getElementById('offerResult');
        const offerAmount = document.getElementById('offerAmount');
        offerAmount.textContent = formatCurrency(valuation);
        offerResult.style.display = 'block';
    }
}

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toLocaleString('en-CA')
    };

    try {
        const response = await fetch('/api/send-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Thank you! We will get back to you soon.');
            this.reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again.');
    }
});

// Gallery initialization
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Use the actual files created in /images for reliable rendering.
    const carImages = [
        'car-1.webp', 'car-2.webp', 'car-3.webp', 'car-4.webp',
        'car-5.webp', 'car-6.webp', 'car-7.webp', 'car-8.webp',
        'car-9.webp', 'car-10.webp', 'car-11.webp', 'car-12.webp',
        'car-13.webp', 'car-14.webp'
    ];

    // Shuffle and select random 6 images
    const shuffled = carImages.sort(() => Math.random() - 0.5).slice(0, 6);

    shuffled.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = `/images/${image}`;
        img.alt = 'Recently purchased car';
        img.loading = 'lazy';
        item.appendChild(img);
        galleryGrid.appendChild(item);
    });
});
