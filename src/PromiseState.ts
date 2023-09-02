export = PromiseState;

/**
 * Enum that denotes statess that promises can have.
 */
enum PromiseState {

	/**
	 * Promise is pending.
	 */
	Pending,

	/**
	 * Promise is rejected.
	 */
	Rejected,

	/**
	 * Promise is fulfilled.
	 */
	Fulfilled
}
