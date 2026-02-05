<script setup>
import { COLORS, CONSTS } from '@/constants';
import Header from '../components/Header.vue'
import { ref, nextTick, watch } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref("")
const message = ref("")
const loading = ref(false)
const email_sent = ref(false)
const otp = ref(["", "", "", "", "", ""]);
const otpInputs = ref([]);
const can_send_email_again_next_tps = ref(30) //use to keep next seconds so we can increment the wait time
const can_send_email_again_tps = ref(0) //seconds to send email again
const askNewPassword = ref(false)
const otp_val = ref(0)
const mdp1 = ref("")
const mdp2 = ref("")
const passwordChanged = ref(false)
const passwordChanged_redirectTps = ref(6)

function submitForgot() {
    loading.value = true
    message.value = ''

    axios({
        method: 'post',
        url: `${CONSTS.api_url}/users/send_email`,
        data: {
            to: email.value,
            act: "forgot_passward"
        }
    })
    .then((res)=>{
        if (res.data.success){
            message.value = `✅ ${res.data.message}`
            email_sent.value = true

            // Wait before allowing to send a new code
            can_send_email_again_tps.value = can_send_email_again_next_tps.value
            const tps = setInterval(() => {
                can_send_email_again_tps.value--
                if (can_send_email_again_tps.value <= 0) {
                    clearInterval(tps)
                    can_send_email_again_next_tps.value += 10
                }
            }, 1000);
        }
        else message.value = `❌ ${res.data.message || 'Error sending email'}`
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


function onInput(index) {
  otp.value[index] = otp.value[index].replace(/[^0-9]/g, "");

  if (otp.value[index] && index < otpInputs.value.length - 1) {
    nextTick(() => {
      otpInputs.value[index + 1].focus();
    });
  }
}

function onBackspace(index) {
  if (!otp.value[index] && index > 0) {
    nextTick(() => {
      otpInputs.value[index - 1].focus();
    });
  }
}

function sendEmail(){
    loading.value = true
    message.value = ''

    axios({
        method: 'post',
        url: `${CONSTS.api_url}/users/send_email`,
        data: {
            to: email.value,
            act: "forgot_passward"
        }
    })
    .then((res)=>{
        if (res.data.success){
            message.value = `✅ ${res.data.message}`
            can_send_email_again_tps.value = can_send_email_again_next_tps.value
            const tps = setInterval(() => {
                can_send_email_again_tps.value -= 1
                if (can_send_email_again_tps.value <= 0) {
                    clearInterval(tps)
                    can_send_email_again_next_tps.value += 10
                }
            }, 1000);
        }
        else message.value = `❌ ${res.data.message || 'Error sending email'}`
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

watch(otp, (val) => { //auto submit otp
  if (val.every(d => d !== "")) {
    const otp_input_val = otp.value.join("");
    otp_val.value = otp_input_val
    check_otp(otp_input_val)
  }
}, { deep: true });

function check_otp(otp_val){
    loading.value = true
    message.value = 'Checking...'

    axios({
        method: 'post',
        url: `${CONSTS.api_url}/users/forgot_password`,
        data: {
            email: email.value,
            code: otp_val,
            act: "otp"
        }
    })
    .then((res)=>{
        if (res.data.success) {
            message.value = `✅ ${res.data.message}`
            askNewPassword.value = true
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

function saveNewPassword(){
    loading.value = true
    message.value = 'Saving new password...'

    axios({
        method: 'post',
        url: `${CONSTS.api_url}/users/forgot_password`,
        data: {
            email: email.value,
            code: otp_val.value,
            act: "save",
            mdp1: mdp1.value,
            mdp2: mdp2.value
        }
    })
    .then((res)=>{
        if (res.data.success) {
            message.value = `✅ ${res.data.message}`
            passwordChanged.value = true

            const intv = setInterval(() => {
                passwordChanged_redirectTps.value--
                if (passwordChanged_redirectTps.value <= 0){
                    clearInterval(intv)
                    router.push('/login') // Redirect to login
                }
            }, 1000);
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
    <Header title="Forgot Password" description="Enter your email to reset your password" />

    <section class="auth-container" v-if="!email_sent && !askNewPassword && !passwordChanged">
        <form @submit.prevent="submitForgot">
            <label>
                Email
                <input type="email" v-model="email" placeholder="john@mail.com" required />
            </label>

            <p class="message" v-if="message">{{ message }}</p>
            <button type="submit" v-if="!loading">Send Reset Link</button>
            <button type="button" v-if="loading" disabled>Sending email...</button>
        </form>

        <p class="link">
            Remembered your password? <a href="/login">Login here</a>
        </p>
    </section>

    <section class="auth-container" v-if="email_sent && !askNewPassword && !passwordChanged" style="display: flex; flex-direction: column; align-items: center;">
        <p class="message" v-if="message">{{ message }}</p>
        <p style="text-align: center;">We sent you an email with a code to verify your email address. Open your emails and copy the code in the input bellow.</p>
        <h4>Enter the code</h4>
        <div style="position: relative;">
            <div class="otp-container">
                <input v-for="(digit, index) in otp" :key="index" ref="otpInputs" type="text" maxlength="1"
                    class="otp-input" v-model="otp[index]" @input="onInput(index)"
                    @keydown.backspace="onBackspace(index)" />
            </div>
            <div v-if="loading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255, .7);"></div>
        </div>
        <p>
            No email received? 
            <a href="#" v-if="can_send_email_again_tps<=0 && !loading" @click.prevent="sendEmail" style="color: #ce004f;">Send again</a>
            <a href="#" v-if="loading" style="color: #ce004f;">Sending...</a>
            <a v-if="can_send_email_again_tps>0" style="color: #ED7D31;">Send again in {{ can_send_email_again_tps }}s</a>
        </p>
    </section>

    <section class="auth-container" v-if="askNewPassword && !passwordChanged" style="display: flex; flex-direction: column; align-items: center;">
        <p class="message" v-if="message" style="text-align: center;">{{ message }}</p>
        <h4>Create a new password.</h4>
        <form @submit.prevent="saveNewPassword">
            <label>
                New password
                <input type="password" v-model="mdp1" placeholder="" required />
            </label>
            <label>
                Enter again the new password
                <input type="password" v-model="mdp2" placeholder="" required />
            </label>

            <button type="submit" v-if="!loading">Confirm</button>
            <button type="button" v-if="loading" disabled>Saving...</button>
        </form>
    </section>

    <section class="auth-container" v-if="passwordChanged" style="display: flex; flex-direction: column; align-items: center;">
        <p class="message" v-if="message" style="text-align: center;">{{ message }}</p>
        <h4>You will be redirected to login page in {{ passwordChanged_redirectTps }}s</h4>
    </section>
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


.otp-container {
  display: flex;
  gap: 10px;
}

.otp-input {
  width: 45px;
  height: 55px;
  font-size: 24px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.otp-input:focus {
  border-color: #007bff;
  outline: none;
}
</style>
