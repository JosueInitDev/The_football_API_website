<script setup>
import Footer from '@/components/Footer.vue';
import Header from '../components/Header.vue'
import { COLORS, CONSTS } from '@/constants';
import { ref } from 'vue';
import axios from 'axios';

const message = ref("")
const loading = ref(false)
const name = ref("")
const email = ref("")
const body = ref("")

function submitForm(){
    if ((name.value.trim()).length<3){
        message.value = "Please enter your name"
        return false
    } else if ((email.value.trim()).length<5){
        message.value = "Please enter your email"
        return false
    } else if ((body.value.trim()).length<10){
        message.value = "Please enter a message"
        return false
    }

    loading.value = true
    message.value = ""

    axios({
        method: 'post',
        url: `${CONSTS.api_url}/users/send_email`,
        data: {
            to: email.value,
            subject: `Contact message from ${name.value}`,
            message: body.value,
            act: "contact"
        }
    })
    .then((res)=>{
        if (res.data.success) {
            message.value = `✅ ${res.data.message}`
            name.value = ""
            email.value = ""
            body.value = ""
        }
        else message.value = `❌ ${res.data.message || 'Error checking code'}`
    })
    .catch((err)=>{
        if (err.response && err.response.data && err.response.data.message) {
            message.value = `❌ ${err.response.data.message}`
        } else {
            message.value = `❌ Network error`
        }
    })
    .finally(()=>{
        loading.value = false
    })
}
</script>

<template>
    <Header title="Contact Us" description="Do you want a custom plan?" />

    <section class="contact-container">
        <h2>Send us a message</h2>
        <p v-if="message">{{ message }}</p>

        <form @submit.prevent="submitForm">
            <label>
                Your Name
                <input type="text" v-model="name" placeholder="John Doe" required />
            </label>

            <label>
                Email Address
                <input type="email" v-model="email" placeholder="john@mail.com" required />
            </label>

            <label>
                Message
                <textarea rows="5" v-model="body" placeholder="Type your message..." required></textarea>
            </label>

            <button type="submit" v-if="!loading">Send Message</button>
            <button type="button" v-if="loading">Sending message...</button>
        </form>

        <div class="contact-info">
            <h3>Other ways to reach us</h3>
            <a :href="`mailto:${CONSTS.app_mail}`" style="color: #ce004f;">📧 {{ CONSTS.app_mail }}</a>
        </div>
    </section>

    <Footer />
</template>

<style scoped>
.contact-container {
    max-width: 700px;
    margin: 40px auto;
    padding: 20px;
}

.contact-container h2 {
    text-align: center;
    font-size: 28px;
    margin-bottom: 25px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

label {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: bold;
    color: #333;
}

input,
textarea {
    padding: 10px;
    margin-top: 5px;
    border-radius: 6px;
    border: 1px solid #bbb;
    font-size: 15px;
}

button {
    padding: 12px;
    background: v-bind('COLORS.color1');
    border: none;
    border-radius: 6px;
    font-size: 16px;
    color: white;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background: v-bind('COLORS.color2');
}

.contact-info {
    margin-top: 40px;
    padding: 20px;
    background: #f7f7f7;
    border-radius: 8px;
    text-align: center;
}

.contact-info h3 {
    margin-bottom: 10px;
}
</style>
