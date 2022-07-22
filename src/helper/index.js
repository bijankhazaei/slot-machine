class Helper {
	/**
	 * Get random integer number between min and max
	 * @param min
	 * @param max
	 * @returns {*}
	 */
	static getRandomInt( min, max ) {
		return Math.floor( Math.random() * (
			max - min + 1
		) ) + min;
	}

	/**
	 * Get random item from array
	 * @param arr
	 * @returns {*}
	 */
	static getRandomItem( arr ) {
		return arr[ Helper.getRandomInt( 0, 3 ) ] ?? arr[ 0 ];
	}

	/**
	 * Get random items from array with count
	 * @param arr
	 * @param count
	 * @returns {{items: *[], win: this is *[]}}
	 */
	static getRandomItems( arr, count ) {
		let result = [];
		for ( let i = 0; i < count; i ++ ) {
			result.push(
				Helper.getRandomItem( arr ),
			);
		}

		return {
			items: result,
			win: result.every( item => item.id === result[ 0 ].id ),
		};
	}

	/**
	 * Get not random items from array with a bit cheating
	 * @param arr
	 * @param count
	 * @param credit
	 * @returns {{items: *[], win: this is *[]}}
	 */
	static getNotRandomItems( arr, count, credit ) {
		let result = this.getRandomItems( arr, count );
		const ourChance = Math.random();

		console.log( credit );
		console.log( ourChance );

		if ( ! result.win ) {
			return result;
		}

		if ( credit >= 40 && credit <= 60 && ourChance < 0.3 ) {
			console.log( 'we cheat because user between 40 and 60 ' );
			result = this.getRandomItems( arr, count );
		}

		if ( credit > 60 && ourChance < 0.6 ) {
			console.log( 'we cheat because user over 60 ' );
			result = this.getRandomItems( arr, count );
		}

		return {
			items: result.items,
			win: result.win,
		};
	}
}

export default Helper;
