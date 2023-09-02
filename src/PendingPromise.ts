import PromiseState = require("./PromiseState");

export = PendingPromise;

/**
 * Wrapper around promises that provide means to resolve and reject promises on demand.
 * @example
 * ```ts
 * const pd = new PendingPromise(() => console.log("Callback"));
 * > "Callback"
 * pd.promise.then(value => console.log("Resolved")).catch(value => console.log("Rejected"));
 * pd.resolve(true);
 * > "Resolved"
 * ```
 */
class PendingPromise<T, U> {

	/**
	 * Created promise.
	 */
	public readonly promise: Promise<T>;
	private __resolve?: (value: T) => void;
	private __reject?: (value: U) => void;
	private __ran: boolean = false;
	private __state: PromiseState = PromiseState.Pending;

	/**
	 * Promise state.
	 */
	public get state(): PromiseState {
		return this.__state;
	}

	/**
	 * Create a wrapper.
	 * @param f Function to pass to a promise.
	 * @param immediate Run function immediately (like as normal promise callback) or run it on demand via {@link PendingPromise.run}
	 */
	public constructor(private readonly f: () => void, immediate: boolean = true) {
		this.promise = new Promise((resolve, reject) => {
			this.__resolve = resolve;
			this.__reject = reject;
			if (!immediate)
				return;
			f();
			this.__ran = true;
		});
	}

	/**
	 * Resolve the promise.
	 * @param value Value to pass to `resolve()`.
	 */
	public resolve(value: T): void {
		if (!this.__resolve)
			return;
		this.__resolve(value);
		this.__deleteCallbacks();
		this.__state = PromiseState.Fulfilled;
	}

	/**
	 * Reject the promise.
	 * @param value Value to pass to `reject()`.
	 */
	public reject(value: U): void {
		if (!this.__reject)
			return;
		this.__reject(value);
		this.__deleteCallbacks();
		this.__state = PromiseState.Rejected;
	}

	/**
	 * Run the passed callback if the wrapper was created with `immediate` set to `false`. Subsequent calls do nothing.
	 */
	public run(): void {
		if (this.__ran)
			return;
		this.__ran = true;
		this.f();
	}

	private __deleteCallbacks(): void {
		delete this.__resolve;
		delete this.__reject;
	}
}
