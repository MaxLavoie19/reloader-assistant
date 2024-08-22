<template>
  <div class="page">
    <div style="color: white;">shoot</div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/theme.scss";

  .page {
    height: 100%;
    width: 100%;

    .options {
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      height: 100%;

      .option {
        padding: 30px;
        text-align: center;

        button {
          color: $highlight-light;
          background-color: $background;

          &:hover {
            color: $primary;
          }
        }
      }
    }
  }
</style>
