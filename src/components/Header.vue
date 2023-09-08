<template>
  <div class="bar">
    <div class="title-container">
      <h1>Our Japan Trip!</h1>
    </div>

    <div class="menu">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar {
  border-bottom: 2px solid #000;
  width: 100%;
  display: flex;
  align-items: center;
  color: #000;
  background-color: #FFAEAE;
  height: 6.5rem;
}

.bar img {
  height: 2rem;
  padding: 0.3rem 0.3rem;
}

.title {
  position: absolute;
}

.title-container {
  position: relative;
  flex-grow: 1;
}

h1 {
  margin: -0.1rem 0.8rem 0 0.8rem;
  font-size: 1.4rem;
  font-family: 'Caveat', cursive;
  text-align: left;
}

.menu {
  display: flex;
  gap: 0.4rem;
  padding: 0.6rem;
}

.menu>div {
  border: 2px solid black;
  border-radius: 2rem;
  height: 0.8rem;
  width: 0.8rem;
  background-color: #fff;
}
</style>
