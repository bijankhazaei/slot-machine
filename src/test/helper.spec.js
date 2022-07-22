import {describe, test, expect} from 'vitest';
import store from '../store';
import Helper from '../helper';

describe( 'import vue components', () => {
	test( 'random number', () => {
		const random = Helper.getRandomInt( 0, 3 );
		expect( random ).toBeGreaterThanOrEqual( 0 );
		expect( random ).toBeLessThanOrEqual( 3 );
	} );

	test( 'random item', () => {
		const items = [
			{
				id: 1,
				name: 'Lemon',
				icon: 'assets/lemon.svg',
				credits: 20,
			},
			{
				id: 2,
				name: 'Orange',
				icon: 'assets/orange.svg',
				credits: 30,
			},
			{
				id: 3,
				name: 'Cherry',
				icon: 'assets/cherry.svg',
				credits: 40,
			},
		];
		const random = Helper.getRandomItem( items );
		expect( random ).toBeTypeOf( 'object' );
	} );

	test( 'get random items', () => {
		const items = [
			{
				id: 1,
				name: 'Lemon',
				icon: 'assets/lemon.svg',
				credits: 20,
			},
			{
				id: 2,
				name: 'Orange',
				icon: 'assets/orange.svg',
				credits: 30,
			},
			{
				id: 3,
				name: 'Cherry',
				icon: 'assets/cherry.svg',
				credits: 40,
			},
			{
				id: 4,
				name: 'Watermelon',
				icon: 'assets/watermelon.svg',
				credits: 50,
			}
		];
		const random = Helper.getRandomItems( items, 3 );
		expect( random ).toBeTypeOf( 'object' );
		expect( random.items.length ).toBe( 3 );

		const notRandom = Helper.getNotRandomItems( items, 3 );
		expect( notRandom ).toBeTypeOf( 'object' );
		expect( notRandom.items.length ).toBe( 3 );
	} );
} );
