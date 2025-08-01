<template>
  <div class="app">
    <main width="100%">
      <router-view />
    </main>
  </div>
</template>


<style>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  display: grid;
  grid-template-columns: 2fr 11fr;
  padding: 20px;
  background-color: #f8fafc;
  min-height: 100vh;
}
</style>
