const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const nameInput = document.getElementById('name');
const signUpEmailInput = document.getElementById('email');
const signUpPasswordInput = document.getElementById('password');
const signInEmailInput = document.getElementById('signIn-email');
const signInPasswordInput = document.getElementById('signIn-password');

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validateSignUpInputs()) {
        const name = nameInput.value.trim();
        const email = signUpEmailInput.value.trim();
        const password = signUpPasswordInput.value.trim();

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Sign up successful!');
                localStorage.setItem('token', data.token); // Store token   
                container.classList.remove("active");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validateSignInInputs()) {
        const email = signInEmailInput.value.trim();
        const password = signInPasswordInput.value.trim();

        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Sign in successful!');
                localStorage.setItem('token', data.token); // Store token
                window.location.href = 'index1.html'; // Redirect to index1.html
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

function validateSignUpInputs() {
    const nameValue = nameInput.value.trim();
    const emailValue = signUpEmailInput.value.trim();
    const passwordValue = signUpPasswordInput.value.trim();
    let success = true;

    if (nameValue === '') {
        success = false;
        setError(nameInput, 'Name is required');
    } else {
        setSuccess(nameInput);
    }

    if (emailValue === '') {
        success = false;
        setError(signUpEmailInput, 'Email is required');
    } else if (!validateEmail(emailValue)) {
        success = false;
        setError(signUpEmailInput, 'Please enter a valid email');
    } else {
        setSuccess(signUpEmailInput);
    }

    if (passwordValue === '') {
        success = false;
        setError(signUpPasswordInput, 'Password is required');
    } else if (passwordValue.length < 8) {
        success = false;
        setError(signUpPasswordInput, 'Password must be at least 8 characters long');
    } else {
        setSuccess(signUpPasswordInput);
    }

    return success;
}

function validateSignInInputs() {
    const emailValue = signInEmailInput.value.trim();
    const passwordValue = signInPasswordInput.value.trim();
    let success = true;

    if (emailValue === '') {
        success = false;
        setError(signInEmailInput, 'Email is required');
    } else if (!validateEmail(emailValue)) {
        success = false;
        setError(signInEmailInput, 'Please enter a valid email');
    } else {
        setSuccess(signInEmailInput);
    }

    if (passwordValue === '') {
        success = false;
        setError(signInPasswordInput, 'Password is required');
    } else if (passwordValue.length < 8) {
        success = false;
        setError(signInPasswordInput, 'Password must be at least 8 characters long');
    } else {
        setSuccess(signInPasswordInput);
    }

    return success;
}

function setError(element, message) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

function setSuccess(element) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = '';
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
}
