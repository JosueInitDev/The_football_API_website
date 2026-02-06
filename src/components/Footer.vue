<script setup>
import { COLORS, CONSTS } from '@/constants';
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
    <div class="footer-cta" :style="{backgroundColor: COLORS.color1}">
        <h2>Start building your football app today</h2>
        <a href="/register" class="cta-btn" v-if="!auth.token">Create Free Account</a>
        
        <div class="links">
            <a href="terms-of-service">Terms of service</a>
            <a href="privacy-notice">Privacy Notice</a>
            <a href="refund-policy">Refund Policy</a>
        </div>
        
        <footer class="text-center text-gray-500 py-4">
            &copy; {{ new Date().getFullYear() }} {{CONSTS.app_name}}. All rights reserved. Dev by <a href="mailto:contact@vetcho.org">Vetcho Teams</a>
        </footer>
    </div>
</template>

<style scoped>
.footer-cta {
    color: #fff;
    padding: 20px 20px 7px 20px;
    text-align: center;
}

.footer-cta h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 20px;
}

.footer-cta .cta-btn {
    background: #fbbf24;
    color: #1f2937;
}

.footer-cta footer {
    color: #ccc;
    font-size: 13px;
    font-style: italic;
    margin-top: 50px;
}
.footer-cta footer a{
    color: #ccc;
    text-decoration: none;
}
.cta-btn {
    display: inline-block;
    background: v-bind('COLORS.color1');
    color: #fff;
    padding: 12px 28px;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.3s;
}

.cta-btn:hover {
    background: v-bind('COLORS.color2');
}

.links{
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
}
.links a{
    color: #ccc;
}
.links a:hover{
    color: #adadad;
}
</style>