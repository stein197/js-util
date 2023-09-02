import PromiseState = require("./PromiseState");

export = PendingPromise;

/**
 * Wrapper around promises that provide means to resolve and reject promises on demand.
 * @example
 * ```ts
 * const pd = new PendingPromise(() => console.log("Callback"));
 * > "Callback"
 * pd.then(value => console.log("Resolved")).catch(value => console.log("Rejected"));
 * pd.resolve(true);
 * > "Resolved"
 * ```
 */
class PendingPromise<T, U> implements Promise<T> {

	public readonly [Symbol.toStringTag]: string = "PendingPromise";

	private readonly promise: Promise<T>;
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

	public then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
		return this.promise.then(onfulfilled, onrejected);
	}

	public catch<TResult = never>(onrejected?: ((reason: any) => (PromiseLike<TResult> | TResult)) | undefined | null): Promise<T | TResult> {
		return this.promise.catch(onrejected);
	}

	public finally(onfinally?: (() => void) | undefined | null): Promise<T> {
		return this.promise.finally(onfinally);
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
