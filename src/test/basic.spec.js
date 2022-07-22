import {mount, shallowMount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import store from '../store';
import GameSlot from '../components/GameSlot.vue';
import App from '../App.vue';

describe( 'mount vue components', () => {
	it( 'render GameSlot', () => {
		const wrapper = shallowMount( GameSlot, {
			props: {
				item: {
					id: 2,
					name: 'Lemon',
					icon: 'assets/lemon.svg',
					credits: 20,
				},
				status: 0,
			},
		} );
		expect( wrapper.find( '.slot-item' ).exists() ).toBe( true );
	} );

	it( 'render GameSlot with status 1', () => {
		const wrapper = shallowMount( GameSlot, {
			props: {
				item: {
					id: 2,
					name: 'Lemon',
					icon: 'assets/lemon.svg',
					credits: 20,
				},
				status: 1,
			},
		} );
		expect( wrapper.find( '.slot-item' ).exists() ).toBe( true );
	} );

	it( 'render App', async () => {
		const wrapper = mount( App, {
			global: {
				plugins: [ store ],
			},
		} );

		await wrapper.find( '.game-start' ).trigger( 'click' );

		expect( wrapper.html() ).toContain( 'CASH OUT');

	} );

} );
