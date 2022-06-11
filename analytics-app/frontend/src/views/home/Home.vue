<template>
  <div class="container">
    <div class="return-wrapper">
      <el-button class="sodis return"
        ><i class="fa-solid fa-arrow-left"></i
      ></el-button>
    </div>
    <div class="header">Home</div>
    <div class="continue-wrapper"></div>

    <div class="main">
      <h1>
        Hier können in Zukunft Basedata zu Projekten/Technologien etc. angezeigt
        werden
      </h1>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  box-sizing: border-box;
  margin-left: var(--container-margin);
  margin-right: var(--container-margin);
  height: calc(100vh - var(--navbar-height));

  display: grid;
  grid-template-rows: 60px calc(100vh - var(--navbar-height) - 60px);
  grid-template-columns:
    60px calc(
      100vw - var(--left-menu-width) - var(--container-margin) * 2 - 60px -
        200px
    )
    200px;

  grid-template-areas:
    "return header buttons"
    "main main main";
}

.return-wrapper {
  grid-area: return;
  justify-self: start;
  border: none;
  margin: auto 0;
}
.sodis {
  background-color: #2d91be;
  color: white;
}
.return {
  width: 50px;
}

.header {
  grid-area: header;
  margin: auto 0;
  text-align: left;
  font-size: 20px;
}

.main {
  grid-area: main;
  overflow-x: hidden;
  overflow-y: scroll;

  background-color: white;
}

.continue-wrapper {
  grid-area: buttons;
  justify-self: end;
  margin: auto 0;
}
</style>
