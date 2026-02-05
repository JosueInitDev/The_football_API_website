<script setup>
import { COLORS, CONSTS } from '@/constants';
import Header from '../components/Header.vue'
import Footer from '@/components/Footer.vue';
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const message = ref('')

async function submitLogin() {
    message.value = ''

    if (email.value.length < 5) {
        message.value = "Please enter your email"
        return false
    }
    else if (password.value.length < 8) {
        message.value = "Please enter your password"
        return false
    }

    loading.value = true

    axios({
        method: 'post',
        url: `${CONSTS.api_url}/users/login`,
        data: {
            email: email.value,
            password: password.value
        }
    })
        .then((res) => {
            if (res.data.success) {
                message.value = `Logged in!`

                auth.login(res.data.token, res.data.user) // Save in Pinia + localStorage
                router.push('/account') // Redirect to account
            } else {
                message.value = `${res.data.message || 'Invalid credentials'}`
            }
        })
        .catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
                message.value = `${err.response.data.message}`
            } else {
                message.value = `Network error`
            }
            alert(err)
        })
        .finally(() => {
            loading.value = false
        })
}
</script>

<template>
    <Header title="Login" description="Access your Football API account" />

    <section class="auth-container">
        <form @submit.prevent="submitLogin">
            <label>
                Email
                <input type="email" v-model="email" placeholder="john@mail.com" required />
            </label>

            <label>
                Password
                <input type="password" v-model="password" placeholder="Your password" required />
            </label>

            <button :disabled="loading" @click="submitLogin">
                {{ loading ? 'Loading...' : 'Login' }}
            </button>

            <p>{{ message }}</p>
        </form>
        <p class="link" style="margin-top:10px;">
            <a href="/forgot-password">Forgot password?</a>
        </p>

        <p class="link">
            Don't have an account? <a href="/register">Register here</a>
        </p>
    </section>

    <Footer />
</template>

<style scoped>
.auth-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: 14px;
}

input {
    padding: 10px;
    margin-top: 5px;
    border-radius: 6px;
    border: 1px solid #bbb;
    font-size: 14px;
}

button {
    padding: 12px;
    background: v-bind('COLORS.color1');
    border: none;
    border-radius: 6px;
    font-size: 16px;
    color: white;
    cursor: pointer;
}

button:hover {
    background: v-bind('COLORS.color2');
}

.link {
    text-align: center;
    margin-top: 15px;
}

.link a {
    color: v-bind('COLORS.color1');
    text-decoration: none;
}

.link a:hover {
    text-decoration: underline;
}
</style>
