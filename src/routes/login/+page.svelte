<script>
    import { AuthStore, AuthActions } from '$lib/store/auth.js';

    const login = async () => {
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;

        const response = await fetch('http://127.0.0.1:3220/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const { access_token } = await response.json();
            AuthActions.setToken(access_token);
            window.location.href = '/';
        } else {
            alert('Invalid username or password');
        }
    };

</script>

<main>
    <div class="login-form">
        <img src="/ronaldo.png">
        <h1>Login</h1>
        <h3>Access the entire website by logging in.</h3>
        <div class="input">
            <i class="fa-solid fa-user"></i><input type="text" placeholder="Username">
        </div>
        <div class="input margin-1">
            <i class="fa-solid fa-lock"></i><input type="password" placeholder="Password">
        </div>
        <a href="#" class="login-button" on:click={login}>
            <i class="fa-solid fa-unlock"></i>Login
        </a>
    </div>
</main>

