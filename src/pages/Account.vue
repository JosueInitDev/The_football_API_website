<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { COLORS, CONSTS, PLANS } from '@/constants'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth"

const router = useRouter()
const auth = useAuthStore()

// Local state
const user = ref(null)
const token = ref("")
const loading = ref(false)
const message = ref("")
const showToken = ref(false)
const showPlans = ref(false)

// Edit fields
const newName = ref("")
const oldPassword = ref("")
const newPassword = ref("")
const newTier = ref(user?.value?.tier || "")

// Load profile on mount
async function loadProfile() {
    loading.value = true
    try {
        const res = await axios.get(`${CONSTS.api_url}/users/me`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        user.value = res.data.user
        newName.value = user.value.name
        newTier.value = user.value.tier
        token.value = res.data.token
    } catch (err) {
        message.value = "❌ Failed to load account"
    } finally {
        loading.value = false
    }
}

// Update name only
async function updateName() {
    if (user.value.name == newName.value) return false
    loading.value = true
    message.value = ""

    axios({
        method: "put",
        url: `${CONSTS.api_url}/users/me`,
        headers: { Authorization: `Bearer ${token.value}` },
        data: {
            name: newName.value,
            act: "name"
        }
    })
    .then((res)=>{
        if (res.data.success){
            message.value = "✅ " + res.data.message
            user.value.name = newName.value
        }
        else message.value = "❌ " + res.data.message
    })
    .catch((err)=>{
        console.log(err)
        message.value = "Failed updating name"
    })
    .finally(()=>{
        loading.value = false
        setTimeout(() => { message.value = "" }, 3500);
    })
}

// Change password
async function updatePassword() {
    if (!oldPassword.value || !newPassword.value || newPassword.value.length < 8) {
        message.value = "Enter old password & new password (min 8 characters)"
        return
    }
    loading.value = true
    message.value = ""

    axios({
        method: "put",
        url: `${CONSTS.api_url}/users/me`,
        headers: { Authorization: `Bearer ${token.value}` },
        data: {
            old_password: oldPassword.value,
            new_password: newPassword.value,
            act: "password"
        }
    })
    .then((res) => {
        if (res.data.success){
            message.value = "✅ " + res.data.message
            oldPassword.value = ""
            newPassword.value = ""
        } else message.value = "❌ " + res.data.message
    })
    .catch((err) => {
        message.value = "❌ Wrong password or error"
    })
    .finally(() => {
        loading.value = false
        setTimeout(() => { message.value = "" }, 3500);
    })
}

function copyToken() {
    navigator.clipboard.writeText(token.value)
        .then(() => {
            message.value = "✅ Token copied to clipboard"
            setTimeout(() => message.value = "", 2000)
        })
        .catch(() => {
            message.value = "❌ Failed to copy token"
        })
}

// Upgrade/downgrade tier
async function updateTier() {
    if (user.value.tier.toLowerCase() == newTier.value.toLowerCase()) return false;

    if (newTier.value.toLowerCase() == "premium"){
        localStorage.setItem("selectedPlan", newTier.value);
        router.push('/subscribe');
    } else{ //free
        loading.value = true
        message.value = ""

        axios({
            method: "post",
            url: `${CONSTS.api_url}/subscribe`,
            headers: { Authorization: `Bearer ${token.value}` },
            data: {
                tier: "Free"
            }
        })
        .then((res) => {
            if (res.data.success){
                message.value = "✅ " + res.data.message
                user.value.tier = "Free"
            } else message.value = "❌ " + res.data.message
        })
        .catch((err) => {
            message.value = "❌ Unknown error, please try again"
        })
        .finally(() => {
            loading.value = false
            setTimeout(() => { message.value = "" }, 3500);
        })
    }
}

const logout = () => {
  auth.logout();
  router.push("/login");
}

onMounted(loadProfile)
</script>

<template>
    <Header title="My Account" :description="`Welcome ${user?.name}`" />

    <div class="account-page">
        <p v-if="message" class="msg" style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 999;background: #ccc; text-align: center;">{{ message }}</p>
        <p v-if="loading" style="position: fixed; z-index: 999; top: 50%; left: 50%; transform: translate(-50%, -50%);">⏳ Loading...</p>

        <div v-if="user">

            <!-- BASIC INFO -->
            <div class="card" style="position: relative;">
                <h2>Profile <span class="tier" :style="`background: ${user.tier!='free' ? '#49c05d' : '#868686'}`">{{ user.tier }}</span></h2>
                <p><b>Email:</b> {{ user.email }}</p>
                
                <label>Name</label>
                <input v-model="newName" type="text" />
                <button @click="updateName">Update Name</button>
                <button @click="logout" style="position: absolute; top: 10px; right: 20px;">Log out</button>
            </div>

            <!-- TOKEN -->
            <div class="card">
                <h2>API Token</h2>
                <p>You can learn the API by visiting the <a href="docs" target="__blank">docs</a>.</p>
                <p>
                    <b>Token (keep it secret): </b>
                    <div style="display: flex; align-items: center; flex-direction: row; gap: 10px;">
                        <span v-if="showToken" @click="copyToken" class="copy-token">{{ token }}</span>
                        <span v-else class="copy-token">************</span>
                        <button @click="copyToken" v-if="showToken" style="margin: 0;">⎘ Copy</button>
                    </div>
                </p>
                <button @click="showToken = !showToken">
                    {{ showToken ? 'Hide Token' : 'Show Token' }}
                </button>
            </div>

            <!-- PASSWORD -->
            <div class="card">
                <h2>Change Password</h2>
                <label>Old Password</label>
                <input type="password" v-model="oldPassword" />

                <label>New Password</label>
                <input type="password" v-model="newPassword" />

                <button @click="updatePassword">Update Password</button>
            </div>

            <!-- SUBSCRIPTION -->
            <div class="card">
                <h2>Subscription</h2>
                <p>Want to change your subscription? Choose a new plan to continue.</p>
                <select v-model="newTier">
                    <option v-for="plan in PLANS.slice(0, -1)" :value="`${plan.name}`">{{ plan.name }}</option>
                </select>
                <button @click="updateTier" v-if="newTier.toLowerCase()!=user.tier.toLowerCase()">Update plan</button>
                
                <p>Can't decide what to choose? <button @click="showPlans=!showPlans" style="padding: 2px 10px; background-color: #000; color: #fff;">{{ showPlans ? "Hide plans" : "Show plans" }}</button></p>
                <div v-if="showPlans" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 20px;">
                    <div v-for="plan in PLANS.slice(0, -1)" :key="plan.name" style="border: 1px solid #ccc; padding: 20px; flex: 1; min-width: 200px; border-radius: 8px;">
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
        </div>
    </div>

    <Footer />
</template>

<style scoped>
a{
    color: v-bind('COLORS.color1');
}
.account-page {
    max-width: 800px;
    margin: auto;
    padding: 40px 20px;
}

.card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 25px;
    border: 1px solid #ddd;
}

.card h2 {
    margin-top: 0;
}

button {
    margin-top: 10px;
    padding: 8px 12px;
    cursor: pointer;
}

.msg {
    background: #f5f5f5;
    padding: 10px;
    margin-bottom: 10px;
}

input,
select {
    width: 100%;
    margin: 5px 0 10px;
    padding: 8px;
}
.copy-token {
    cursor: pointer;
    background: #f0f0f0;
    padding: 10px;
    border-radius: 4px;
    user-select: all;
    /* allow text selection */
    display: flex;
    align-items: center;
}
.copy-token:hover {
    background: #ddd;
}

.tier{
    background: #49c05d;
    padding: 0 3px 2px 3px;
    color: #fff;
}
</style>
