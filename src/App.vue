<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
/*Обнуление*/
* {
  padding: 0;
  margin: 0;
  /* border: 0; */
  box-sizing: border-box;
}

a:focus,
a:active {
  outline: none;
}

button {
  cursor: pointer;
}
a,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

ul li {
  list-style: none;
}

ul {
  list-style: none;
}

/* .wrapper {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

[class*="container"] {
  max-width: 1130px;
  margin: 0px auto;
  padding: 0px 15px;
} */
</style>
