<script setup>
import { CONSTS } from '@/constants';
</script>

<template>
    <div class="not-found">
        <div class="error-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you're looking for doesn't exist.</p>

            <div class="actions">
                <router-link to="/" class="btn btn-primary">
                    Go Home
                </router-link>
                <button @click="goBack" class="btn btn-secondary">
                    Go Back
                </button>
            </div>

            <!-- Optional: Search or helpful links -->
            <div class="helpful-links" v-if="showSuggestions">
                <p>{{ CONSTS.app_name }}</p>
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="terms-of-service">Terms of service</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    data() {
        return {
            showSuggestions: true
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
    mounted() {
        // You can log the error or send to analytics
        console.error(`404: Page not found - ${this.$route.path}`)
    }
}
</script>

<style scoped>
.not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    text-align: center;
    padding: 2rem;
}

.error-container {
    max-width: 600px;
}

.error-container h1 {
    font-size: 8rem;
    margin: 0;
    color: #ce004f;
    line-height: 1;
}

.error-container h2 {
    font-size: 2rem;
    margin: 1rem 0;
    color: #333;
}

.error-container p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
}

.actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
}

.btn {
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.btn-primary {
    background-color: #ED7D31;
    color: white;
}

.btn-primary:hover {
    background-color: #ce004f;
}

.btn-secondary {
    background-color: #f1f1f1;
    color: #333;
}

.btn-secondary:hover {
    background-color: #ddd;
}

.helpful-links {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
}

.helpful-links ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.helpful-links a {
    color: #ce004f;
    text-decoration: none;
}

.helpful-links a:hover {
    text-decoration: underline;
}
</style>