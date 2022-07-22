<script setup>
defineProps( {
  item: Object,
  status: Number,
} );

const classList = {
  slotClass: 'slot-item',
};

</script>

<template>
  <div v-if="status === 1" :class="classList.slotClass">
    <img src="assets/circles.svg" alt="slot-machine"/>
  </div>
  <div v-else :class="classList.slotClass">
    <img :src="item.icon" alt="slot-random"/>
  </div>
</template>

<style lang="scss">
.slot-item {
  width: 20vw;
  height: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  img {
    width: 75%;
    height: auto;
  }
}
</style>
