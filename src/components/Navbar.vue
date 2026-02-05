<script setup>
import { useAuthStore } from '@/stores/auth'
import { COLORS, CONSTS } from '@/constants';
import { ref } from 'vue'

const auth = useAuthStore()
const mobileOpen = ref(false)
const closeMobile = () => (mobileOpen.value = false)
</script>

<template>
    <nav class="navbar">
        <div class="nav-container">
            <a href="/" class="logo">{{CONSTS.app_name}}</a>
            <ul :class="['nav-links', { open: mobileOpen }]">
                <li><a href="/" @click="closeMobile">Home</a></li>
                <li><a href="/#features" @click="closeMobile">Features</a></li>
                <li><a href="/#leagues" @click="closeMobile">Leagues</a></li>
                <li><a href="docs" @click="closeMobile" target="_blank">Docs</a></li>
                <li><a href="pricing" @click="closeMobile">Pricing</a></li>
                <li><a href="contact" @click="closeMobile">Contact</a></li>
            </ul>
            <div class="nav-buttons">
                <a href="login" class="login-btn" v-if="!auth.token">Login</a>
                <a href="register" class="signup-btn" v-if="!auth.token">Sign Up</a>
                <a href="account" class="signup-btn" v-if="auth.token">My Account</a>
                <button class="mobile-toggle" @click="mobileOpen = !mobileOpen">
                    ☰
                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 100;
    box-shadow: 0 2px 6px #ce004f3a;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
}

.logo {
    font-weight: 700;
    font-size: 1.4rem;
    color: v-bind('COLORS.color1');
    text-decoration: none;
}

.nav-links {
    display: flex;
    gap: 20px;
    list-style: none;
}

.nav-links li a {
  position: relative;
  text-decoration: none;
  color: #d3d3d3;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links li a::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  bottom: -4px;
  left: 0;
  background: linear-gradient(90deg, v-bind('COLORS.color1'), v-bind('COLORS.color2'));
  transition: width 0.3s;
}

.nav-links li a:hover {
    color: v-bind('COLORS.color1');
}
.nav-links li a:hover::after {
  width: 100%;
}

.nav-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
}

.login-btn {
    text-decoration: none;
    color: v-bind('COLORS.color1');
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 6px;
    transition: background 0.2s;
}

.login-btn:hover {
    background: #e0f2fe;
}

.signup-btn {
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    background: v-bind('COLORS.color2');
    padding: 6px 14px;
    border-radius: 6px;
    transition: background 0.2s;
}

.signup-btn:hover {
    background: #f59e0b;
}

/* Mobile */
.mobile-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

@media (max-width: 768px) {
    .nav-links {
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background: #ffffff;
        flex-direction: column;
        gap: 0;
        overflow: hidden;
        max-height: 0;
        transition: max-height 0.3s ease;
    }

    .nav-links.open {
        max-height: 500px;
        padding: 10px 0;
    }

    .nav-links li {
        margin: 8px 0;
        text-align: center;
    }

    .nav-buttons {
        gap: 6px;
    }

    .mobile-toggle {
        display: block;
        color: #2563eb;
    }
}
</style>
