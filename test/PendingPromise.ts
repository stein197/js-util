import * as assert from "assert";
import PendingPromise = require("../src/PendingPromise");
import PromiseState = require("../src/PromiseState");
import {track} from "../src/util";

describe("PendingPromise", () => {
	describe("new PendingPromise", () => {
		it("The callback should be called when immediate is true", () => {
			const f = track(() => {});
			const p = new PendingPromise(f, true);
			assert.equal(f.data.length, 1);
		});
		it("The callback should not be called when immediate is false", () => {
			const f = track(() => {});
			const p = new PendingPromise(f, false);
			assert.equal(f.data.length, 0);
		});
	});
	describe("PendingPromise.state", () => {
		it("Should be pending right after instantiating", () => {
			const f = track(() => {});
			const p = new PendingPromise(f);
			assert.equal(p.state, PromiseState.Pending);
		});
		it("Should be fulfilled right after calling resolve()", () => {
			const f = track(() => {});
			const p = new PendingPromise<void, void>(f);
			p.resolve();
			assert.equal(p.state, PromiseState.Fulfilled);
		});
		it("Should be rejected right after calling reject()", () => {
			const f = track(() => {});
			const p = new PendingPromise<void, void>(f);
			p.reject();
			assert.equal(p.state, PromiseState.Rejected);
		});
	});
	describe("PendingPromise.resolve()", () => {
		it("Should resolve the promise", done => {
			const p = new PendingPromise(() => {});
			assert.equal(p.state, PromiseState.Pending);
			timeout(100).then(() => assert.equal(p.state, PromiseState.Pending));
			timeout(200).then(() => p.resolve("fulfilled"));
			p.then(result => {
				assert.equal(result, "fulfilled");
				assert.equal(p.state, PromiseState.Fulfilled);
				done();
			});
		});
	});
	describe("PendingPromise.reject()", () => {
		it("Should reject the promise", done => {
			const p = new PendingPromise(() => {});
			assert.equal(p.state, PromiseState.Pending);
			timeout(100).then(() => assert.equal(p.state, PromiseState.Pending));
			timeout(200).then(() => p.reject("rejected"));
			p.catch(result => {
				assert.equal(result, "rejected");
				assert.equal(p.state, PromiseState.Rejected);
				done();
			});
		});
	});
	describe("PendingPromise.run()", () => {
		it("Should run the passed callback when the immediate flag is false", () => {
			const f = track(() => {});
			const p = new PendingPromise(f, false);
			assert.equal(f.data.length, 0);
			p.run();
			assert.equal(f.data.length, 1);
		});
		it("Shouldn't run the passed callback when the immediate flag is true", () => {
			const f = track(() => {});
			const p = new PendingPromise(f, true);
			assert.equal(f.data.length, 1);
			p.run();
			assert.equal(f.data.length, 1);
		});
		it("Shouldn't run the passed callback twice", () => {
			const f = track(() => {});
			const p = new PendingPromise(f, false);
			assert.equal(f.data.length, 0);
			p.run();
			assert.equal(f.data.length, 1);
			p.run();
			assert.equal(f.data.length, 1);
		});
	});
});

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
