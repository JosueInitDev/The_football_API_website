<script setup>
import { COLORS, CONSTS, PLANS } from '@/constants'
import Header from '../components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ref, nextTick, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const message = ref('')
const loading = ref(false)
const creationDone = ref(false) //acccount created but not activated
const creationFinal = ref(false) //account activated
const showPlans = ref(false)
const verification_email_url = ref("")
const can_send_email_again_next_tps = ref(30) //use to keep next seconds so we can increment the wait time
const can_send_email_again_tps = ref(0) //seconds to send email again
const send_confirmation_email = ref(false) //user email exists but he didn't confirm the email the last time he tried
const token = ref("")
const otp = ref(["", "", "", "", "", ""]);
const otpInputs = ref([]);

function submitRegister() {
    loading.value = true
    message.value = ''

    axios({
        method: 'post',
        url: `${CONSTS.api_url}/users/create`,
        data: {
            name: name.value,
            email: email.value,
            password: password.value
        }
    })
    .then((res)=>{
        if (res.data.success) {
            message.value = `✅ ${res.data.message}`
            creationDone.value = true
            verification_email_url.value = res.data.email_validation_url
            token.value = res.data.token
            
            // Wait before allowing to send a new code
            can_send_email_again_tps.value = can_send_email_again_next_tps.value
            const tps = setInterval(() => {
                can_send_email_again_tps.value--
                if (can_send_email_again_tps.value <= 0) {
                    clearInterval(tps)
                    can_send_email_again_next_tps.value += 10
                }
            }, 1000);
        } else {
            message.value = `❌ ${res.data.message || 'Error creating user'}`
            if (res.data?.must_connfirmed_email){
                send_confirmation_email.value = true
                can_send_email_again_tps.value = 0
            }
        }
    })
    .catch((err)=>{
        if (err.response && err.response.data && err.response.data.message) {
            message.value = `❌ ${err.response.data.message}`
        } else {
            message.value = `❌ Network error`
        }
        console.error(err)
    })
    .finally(()=>{
        loading.value = false
    })
}

function sendEmail(){
    loading.value = true
    message.value = ''

    axios({
        method: 'post',
        url: `${CONSTS.api_url}/users/send_email`,
        headers: { Authorization: `Bearer ${token.value}` },
        data: {
            to: email.value,
            act: "register"
        }
    })
    .then((res)=>{
        if (res.data.success) message.value = `✅ ${res.data.message}`
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
        can_send_email_again_tps.value = can_send_email_again_next_tps.value
        const tps = setInterval(() => {
            can_send_email_again_tps.value--
            if (can_send_email_again_tps.value <= 0) {
                clearInterval(tps)
                can_send_email_again_next_tps.value += 10
            }
        }, 1000);
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

watch(otp, (val) => { //auto submit otp
  if (val.every(d => d !== "")) {
    const otp_input_val = otp.value.join("");
    check_otp(otp_input_val)
  }
}, { deep: true });

function check_otp(otp_val){
    loading.value = true
    message.value = 'Checking...'

    axios({
        method: 'post',
        url: `${CONSTS.api_url}/users/create_check`,
        data: {
            email: email.value,
            code: otp_val
        }
    })
    .then((res)=>{
        if (res.data.success) {
            message.value = `✅ ${res.data.message}`
            auth.login(res.data.token, res.data.user) // Save in Pinia + localStorage
            creationFinal.value = true
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
    <Header title="Register" description="Create your free Football API account" />

    <section v-if="!creationDone && !send_confirmation_email && !creationFinal" class="auth-container">
        <form @submit.prevent="submitRegister">
            <label>
                Name
                <input type="text" v-model="name" placeholder="John Doe" required />
            </label>

            <label>
                Email
                <input type="email" v-model="email" placeholder="john@mail.com" required />
            </label>

            <label>
                Password
                <input type="password" v-model="password" placeholder="Your password" required />
            </label>

            <button type="submit" :disabled="loading">
                {{ loading ? 'Creating...' : 'Register' }}
            </button>
        </form>

        <p class="message" v-if="message">{{ message }}</p>

        <p class="link">
            Already have an account? <a href="/login">Login here</a>
        </p>
    </section>

    <!-- If done created account// -->
    <div v-if="creationDone && !send_confirmation_email && !creationFinal" style="display: flex; flex-direction: column; align-items: center; padding: 50px 20px;">
        <p class="message" v-if="message">{{ message }}</p>
        <p>We sent you an email with a code to verify your email address. Open your emails and copy the code in the input bellow.</p>
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
            <a href="#" v-if="can_send_email_again_tps==0 && !loading" @click.prevent="sendEmail" style="color: #ce004f;">Send again</a>
            <a href="#" v-if="loading" style="color: #ce004f;">Sending...</a>
            <a v-if="can_send_email_again_tps>0" style="color: #ED7D31;">Send again in {{ can_send_email_again_tps }}s</a>
        </p>
    </div>

    <!-- If email exists but email not confirmed yet// -->
    <div v-if="send_confirmation_email && !creationFinal" style="display: flex; flex-direction: column; align-items: center; padding: 50px 20px;">
        <p class="message" v-if="message">{{ message }}</p>
        <p style="text-align: center;">
            We sent you an email, check your emails and click on the link to confirm your account creation.
            <br>If you didn't receive an email, <a href="forgot-password" style="color: #ce004f;">click here</a> to update your password.
        </p>
   </div>
    <div v-if="creationFinal" style="display: flex; flex-direction: column; align-items: center; padding: 50px 20px;">
        <p class="message" v-if="message">{{ message }}</p>
        
        <h3>Welcome {{ name }}! Glad to see you.</h3>
        <p>Your current plan is <b>Free</b></p>
        <div style="display: flex; flex-direction: row; gap: 10px; flex-wrap: wrap;">
            <a href="subscribe"><button>Go Premium</button></a>
            <a href="contact"><button>Entreprise ? Contact us</button></a>
            <a href="account"><button style="background-color: gray;">Stay Free</button></a>
        </div>
        <p>Can't decide what to choose? <button @click="showPlans=!showPlans" style="padding: 2px 10px; background-color: #000;">{{ showPlans ? "Hide plans" : "Show plans" }}</button></p>
        <div v-if="showPlans" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 20px;">
            <div v-for="plan in PLANS" :key="plan.name" style="border: 1px solid #ccc; padding: 20px; width: 250px; border-radius: 8px;">
                <h3>{{ plan.name }}</h3>

                <h4 v-if="!plan.custom">${{ plan.price }}/mo</h4>
                <h4 v-else>Custom Pricing</h4>

                <ul>
                    <li v-for="item in plan.content" :key="item">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>

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
