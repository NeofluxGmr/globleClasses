import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    // Replace with your Firebase project configuration
   apiKey: "AIzaSyDbVHaF6t0rqX9xH_O9-KRzYHDZ1p0XK-M",
  authDomain: "globle-classes-web.firebaseapp.com",
  projectId: "globle-classes-web",
  storageBucket: "globle-classes-web.firebasestorage.app",
  messagingSenderId: "613127391071",
  appId: "1:613127391071:web:cc6c34b84960479c9398ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Admin credentials (hardcoded for simplicity)
const ADMIN_CREDENTIALS = {
    email: "admin@example.com",
    password: "admin123"
};

// Registration Form Handling
const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
    const descriptionInput = document.getElementById('description');
    const wordCountDisplay = document.getElementById('word-count');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const phoneError = document.getElementById('phone-error');
    const emailError = document.getElementById('email-error');
    const successMessage = document.getElementById('success-message');

    descriptionInput.addEventListener('input', () => {
        const words = descriptionInput.value.trim().split(/\s+/).filter(word => word.length > 0).length;
        wordCountDisplay.textContent = `${words} / 100 words`;
        if (words > 100) {
            wordCountDisplay.style.color = '#e74c3c';
        } else {
            wordCountDisplay.style.color = '#777';
        }
    });

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = phoneInput.value;
        const email = emailInput.value;
        const description = descriptionInput.value;
        const words = description.trim().split(/\s+/).filter(word => word.length > 0).length;

        let isValid = true;

        // Validate phone number
        if (!/^[0-9]{10}$/.test(phone)) {
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }

        // Validate email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Validate word count
        if (words > 100) {
            isValid = false;
        }

        if (isValid) {
            const id = Date.now(); // Simple unique ID
            set(ref(database, 'join_requests/' + id), {
                name,
                phone,
                email,
                description,
                timestamp: new Date().toISOString()
            }).then(() => {
                successMessage.style.display = 'block';
                registrationForm.reset();
                wordCountDisplay.textContent = '0 / 100 words';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }).catch((error) => {
                alert('Error saving data: ' + error.message);
            });
        }
    });
}

// Login Form Handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const emptyError = document.getElementById('empty-error');
        const invalidError = document.getElementById('invalid-error');

        // Check if either field is empty
        if (!email || !password) {
            emptyError.style.display = 'block';
            invalidError.style.display = 'none';
            setTimeout(() => {
                emptyError.style.display = 'none';
            }, 3000);
        } else if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            // Successful login
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            // Invalid credentials
            invalidError.style.display = 'block';
            emptyError.style.display = 'none';
            setTimeout(() => {
                invalidError.style.display = 'none';
            }, 3000);
        }
    });
}

// Dashboard Data Fetching
const requestList = document.getElementById('request-list');
if (requestList) {
    // Check if admin is logged in
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    } else {
        const joinRequestsRef = ref(database, 'join_requests');
        onValue(joinRequestsRef, (snapshot) => {
            requestList.innerHTML = '';
            const data = snapshot.val();
            if (data) {
                Object.values(data).forEach((request) => {
                    const card = document.createElement('div');
                    card.className = 'request-card';
                    card.innerHTML = `
                        <p><strong>Name:</strong> ${request.name}</p>
                        <p><strong>Phone:</strong> ${request.phone}</p>
                        <p><strong>Email:</strong> ${request.email}</p>
                        <p><strong>Description:</strong> ${request.description}</p>
                        <p><strong>Submitted:</strong> ${new Date(request.timestamp).toLocaleString()}</p>
                    `;
                    requestList.appendChild(card);
                });
            } else {
                requestList.innerHTML = '<p>No join requests found.</p>';
            }
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'login.html';
    });
}
