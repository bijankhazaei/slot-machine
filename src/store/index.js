import {createStore} from 'vuex';
import Helper from '../helper';

export default createStore( {
	state: {
		userCredit: 10,
		userBalance: 0,
		gameStatus: {
			itemOneState: 0,
			itemTwoState: 0,
			itemThreeState: 0,
		},
		gameCheckOutClass: '',
		gameCheckOutDisabled: false,

		carts: [
			{
				id: 1,
				name: 'Cherry',
				icon: 'assets/cherry.svg',
				credits: 10,
			},
			{
				id: 2,
				name: 'Lemon',
				icon: 'assets/lemon.svg',
				credits: 20,
			},
			{
				id: 3,
				name: 'Orange',
				icon: 'assets/orange.svg',
				credits: 30,
			},
			{
				id: 4,
				name: 'Watermelon',
				icon: 'assets/watermelon.svg',
				credits: 40,
			},
		],

		items: [
			{
				id: 1,
				name: 'Cherry',
				icon: 'assets/cherry.svg',
				credits: 10,
			},
			{
				id: 1,
				name: 'Cherry',
				icon: 'assets/cherry.svg',
				credits: 10,
			},
			{
				id: 1,
				name: 'Cherry',
				icon: 'assets/cherry.svg',
				credits: 10,
			},
		],
	},
	mutations: {
		/**
		 * Mutate Game status
		 * @param state
		 * @param payload
		 */
		gameStatusMutate: function( state, payload ) {
			state.gameStatus = {
				itemOneState: payload.status,
				itemTwoState: payload.status,
				itemThreeState: payload.status,
			};
		},

		/**
		 * Mutate random or cheated items
		 * @param state
		 * @param payload
		 */
		randomizeGame: function( state, payload ) {
			let result = payload.cheating ?
				Helper.getNotRandomItems( state.carts, 3, state.userCredit ) :
				Helper.getRandomItems( state.carts, 3 );

			state.items = result.items;

			setTimeout( () => {
				state.gameStatus.itemOneState = 0;
			}, 1000 );

			setTimeout( () => {
				state.gameStatus.itemTwoState = 0;
			}, 2000 );

			setTimeout( () => {
				state.gameStatus.itemThreeState = 0;

				if ( result.win ) {
					state.userCredit += state.items[ 0 ].credits;
				} else {
					state.userCredit --;
				}
			}, 3000 );

		},

		/**
		 * Mutate game check out chance
		 * @param state
		 * @param payload
		 */
		changeCheckoutChance: function( state, payload ) {
			console.log( payload );
			if ( payload.move ) {
				state.gameCheckOutDisabled = true;
				if ( state.gameCheckOutClass === 'move-right' ) {
					state.gameCheckOutClass = 'move-left';
				} else if ( state.gameCheckOutClass === 'move-left' ) {
					state.gameCheckOutClass = 'move-right';
				} else {
					state.gameCheckOutClass = Helper.getRandomInt( 1, 2 ) === 1 ? 'move-right' : 'move-left';
				}
			}

			if ( payload.disabled ) {
				state.gameCheckOutDisabled = true;
				state.gameCheckOutClass = 'disabled';

			}

			if ( ! payload.disabled && ! payload.move ) {
				state.gameCheckOutClass = '';
				state.gameCheckOutDisabled = false;
			}
		},

		/**
		 * Mutate game balance
		 * @param state
		 */
		checkout: function( state ) {
			if ( ! state.gameCheckOutDisabled && state.userCredit > 10 ) {
				state.userBalance += state.userCredit;
				state.userCredit = 10;
				state.gameCheckOutDisabled = true;
			}
		},
	},
	actions: {
		/**
		 * Action Game start
		 * @param commit
		 */
		startGame( {commit} ) {
			commit( 'gameStatusMutate', {status: 1} );
			setTimeout( () => {
				commit( 'randomizeGame', {cheating: this.state.userCredit >= 40} );
			}, 500 );
		},

		/**
		 * Action Game check out
		 * @param commit
		 */
		checkout( {commit} ) {
			commit( 'checkout' );
			commit( 'gameStatusMutate', {status: 0} );
		},

		/**
		 * Action Game check out chance
		 * @param commit
		 */
		checkoutChance( {commit} ) {
			const chanceForCheckout = Math.random();
			console.log( chanceForCheckout );
			if ( chanceForCheckout > 0.5 ) {
				commit( 'changeCheckoutChance', {move: true, disabled: false} );
			} else if ( chanceForCheckout < 0.5 && chanceForCheckout < 0.1 ) {
				commit( 'changeCheckoutChance', {move: false, disabled: true} );
			} else {
				commit( 'changeCheckoutChance', {move: false, disabled: false} );
			}
		},
	},
} );
