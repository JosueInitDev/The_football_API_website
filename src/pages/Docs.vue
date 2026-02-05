<template>
    <div id="redoc-container"></div>
</template>

<script setup>
import { onMounted } from "vue"

onMounted(() => {
  // Load Redoc from CDN dynamically
  const script = document.createElement("script")
  script.src = "https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"
  script.onload = () => {
    Redoc.init(
      "/docs/openapi.json", {
        hideDownloadButton: true,
        theme: {
          colors: {
            text: { primary: "#fff", secondary: "#ccc" },
            success: { main: "#3BDB65" },
            error: { main: "#FF3B3B" }
          },
          typography: {
            code: { color: "#EBB400" },
            links: { color: "#EBB400" }
          },
          layout: {
            showDarkRightPanel: true
          },
          schema: {
            requireLabelColor: "orange",
            caretColor: "orange"
          },
          sidebar: {
            backgroundColor: "#0B0B1A",
            textColor: "#fff",
            activeTextColor: "#EBB400"
          },
          rightPanel: {
            backgroundColor: "#0B0B1A",
            servers: {
              overlay: { backgroundColor: "#A1A1AD", textColor: "#000" },
              url: { backgroundColor: "#A1A1AD" }
            }
          },
          logo: { gutter: "20px" }
        }
      },
      document.getElementById("redoc-container")
    )
  }
  document.head.appendChild(script)
})

window.onload = ()=>{
  setTimeout(() => {
    document.querySelectorAll("h5").forEach(elt => {
      elt.style.color = "#e3e3e3"
    })
    document.querySelectorAll(".sc-krNlru").forEach(elt => {
      elt.style.backgroundColor = "#575757"
    })
  }, 2500);
}
</script>

<style scoped>
#redoc-container {
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  background-color: rgb(58, 58, 58);
  color: white;
}
</style>