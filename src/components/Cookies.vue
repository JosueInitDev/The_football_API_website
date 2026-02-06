<template>
    <div v-if="visible" class="popup">
        <p>
            We do not use cookies except those strictly necessary.
            See our
            <a href="/privacy-notice">Privacy Policy</a> and
            <a href="/terms-of-service">Terms of Service</a>.
        </p>
        <button @click="accept">Got it</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const visible = ref(true);

onMounted(() => {
    if (localStorage.getItem("popupAccepted")) {
        visible.value = false;
    }
});

function accept() {
    localStorage.setItem("popupAccepted", "true");
    visible.value = false;
}
</script>

<style scoped>
.popup {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    max-width: 600px;
    margin: auto;
    background: #3d3d3d;
    color: white;
    padding: 16px 20px;
    border-radius: 12px;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

a {
    color: #38bdf8;
    text-decoration: underline;
}

button {
    background: #dbdbdb;
    border: none;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    flex-shrink: 0;
}
button:hover {
    background: #7a7a7a;
    border: none;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    flex-shrink: 0;
}
</style>
