document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const signUpBtn = document.getElementById('signUp');
    const signInBtn = document.getElementById('signIn');

    signUpBtn.addEventListener('click', function () {
        document.getElementById('container').classList.add('right-panel-active');
    });

    signInBtn.addEventListener('click', function () {
        document.getElementById('container').classList.remove('right-panel-active');
    });

    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        if (!name || !email || !password) {
            // Handle form validation here, e.g., show an error message.
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/signup', {
                name,
                email,
                password
            });

            // Handle a successful signup response here.
            console.log('Signup successful', response.data);
        } catch (error) {
            // Handle errors here, e.g., display an error message.
            console.error('Error axios:', error.response);
        }
    });

    signinForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        if (!loginEmail || !loginPassword) {
            // Handle form validation here, e.g., show an error message.
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/signin', {
                email: loginEmail,
                password: loginPassword
            });

            // Handle a successful signin response here.
            console.log('Signin successful', response.data);
        } catch (error) {
            // Handle errors here, e.g., display an error message.
            console.error('Error axios:', error.response);
        }
    });
});
