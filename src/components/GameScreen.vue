<script setup>
import {computed, ref} from 'vue';
import {useStore} from 'vuex';
import GameSlot from './GameSlot.vue';

const store = useStore();
const classIDList = ref( {
  gameTableClass: 'game-table',
  gameTableRowClass: 'game-table-row',
  gameTableCellClass: 'game-table-cell',
  gameStartClass: 'game-start',
  checkoutButtonID: 'checkoutButton',
} );

let userCredit = computed( () => store.state.userCredit );
let gameStatus = computed( () => store.state.gameStatus );
let userBalance = computed( () => store.state.userBalance );
let gameCheckOutClass = computed( () => store.state.gameCheckOutClass );
let itemOne = computed( () => store.state.items[ 0 ] );
let itemTwo = computed( () => store.state.items[ 1 ] );
let itemThree = computed( () => store.state.items[ 2 ] );

/**
 * dispatch the game start action
 */
function startGame() {
  store.dispatch( 'startGame' );
}

/**
 * dispatch the game check out action
 */
function checkout() {
  store.dispatch( 'checkout' );
}

/**
 * dispatch the game check out chance action
 */
function checkoutChance() {
  store.dispatch( 'checkoutChance' );
}

</script>

<template>
  <div>
    <p>
      User Balance :<strong>{{ userBalance }}</strong>
    </p>
    <p>
      User Credit :<strong>{{ userCredit }}</strong>
    </p>

    <div :class="classIDList.gameTableClass">
      <div :class="classIDList.gameTableRowClass">
        <div :class="classIDList.gameTableCellClass">
          <GameSlot :item="itemOne" :status="gameStatus.itemOneState"/>
        </div>
        <div :class="classIDList.gameTableCellClass">
          <GameSlot :item="itemTwo" :status="gameStatus.itemTwoState"/>
        </div>
        <div :class="classIDList.gameTableCellClass">
          <GameSlot :item="itemThree" :status="gameStatus.itemThreeState"/>
        </div>
      </div>
    </div>

    <div>
      <button :class="classIDList.gameStartClass"
              :disabled="userCredit <= 0 || gameStatus.itemThreeState === 1"
              @click="startGame">
        Start Game
      </button>
    </div>
    <div>
      <button :id="classIDList.checkoutButtonID"
              :class="gameCheckOutClass"
              @click="checkout"
              @mouseover="checkoutChance">
        CASH OUT
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-table {
  width: 75vw;
  margin: 5vh 0;

  .game-table-row {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .game-table-cell {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}

#checkoutButton {
  transition: all 0.5s ease-in-out;
  transform: translateX(0);
  margin-top: 1.5rem;

  &.move-right {
    transition: all 0.5s ease-in-out;
    transform: translateX(300px);
  }

  &.move-left {
    transition: all 0.5s ease-in-out;
    transform: translateX(-300px);
  }
}
</style>
