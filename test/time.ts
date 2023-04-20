import "mocha";
import * as assert from "assert";
import * as time from "../src/time";

describe("time.ms()", () => {
	it("Should return correct result", () => {
		assert.equal(time.ms("1 year 2mon 4 wks 5d6h 7min8sec 9 milliseconds"), 39593228009);
		assert.equal(time.ms("5min 30sec"), 330000);
		assert.equal(time.ms("2d 30ms"), 172800030);
	});
	it("Should return correct result when the number and unit are separated by space", () => {
		assert.equal(time.ms("1 s"), 1000);
	});
	it("Should return correct result when the number and unit aren't separated by space", () => {
		assert.equal(time.ms("1s"), 1000);
	});
	it("Should return -1 when the string contains time and garbage", () => {
		assert.equal(time.ms("Here is the time: 10hrs"), -1);
	});
	it("Should return -1 when the string does not contain time", () => {
		assert.equal(time.ms("String"), -1);
	});
	it("Should return -1 when the string is empty", () => {
		assert.equal(time.ms(""), -1);
	});
	it("Should return -1 when the string contains repeating time units", () => {
		assert.equal(time.ms("1s1s"), -1);
	});
	it("Should return -1 when the order of units isn't top-to-bottom", () => {
		assert.equal(time.ms("1s2m"), -1);
	});
	describe("Names", () => {
		it("ms", () => {
			assert.equal(time.ms("1ms"), 1);
		});
		it("millisecond", () => {
			assert.equal(time.ms("1millisecond"), 1);
		});
		it("milliseconds", () => {
			assert.equal(time.ms("1milliseconds"), 1);
		});
		it("s", () => {
			assert.equal(time.ms("1s"), 1000);
		});
		it("sec", () => {
			assert.equal(time.ms("1sec"), 1000);
		});
		it("secs", () => {
			assert.equal(time.ms("1secs"), 1000);
		});
		it("second", () => {
			assert.equal(time.ms("1second"), 1000);
		});
		it("seconds", () => {
			assert.equal(time.ms("1seconds"), 1000);
		});
		it("m", () => {
			assert.equal(time.ms("1m"), 60000);
		});
		it("min", () => {
			assert.equal(time.ms("1min"), 60000);
		});
		it("mins", () => {
			assert.equal(time.ms("1mins"), 60000);
		});
		it("minute", () => {
			assert.equal(time.ms("1minute"), 60000);
		});
		it("minutes", () => {
			assert.equal(time.ms("1minutes"), 60000);
		});
		it("h", () => {
			assert.equal(time.ms("1h"), 3600000);
		});
		it("hr", () => {
			assert.equal(time.ms("1hr"), 3600000);
		});
		it("hrs", () => {
			assert.equal(time.ms("1hrs"), 3600000);
		});
		it("hour", () => {
			assert.equal(time.ms("1hour"), 3600000);
		});
		it("hours", () => {
			assert.equal(time.ms("1hours"), 3600000);
		});
		it("d", () => {
			assert.equal(time.ms("1d"), 86400000);
		});
		it("day", () => {
			assert.equal(time.ms("1day"), 86400000);
		});
		it("days", () => {
			assert.equal(time.ms("1days"), 86400000);
		});
		it("w", () => {
			assert.equal(time.ms("1w"), 604800000);
		});
		it("wk", () => {
			assert.equal(time.ms("1wk"), 604800000);
		});
		it("wks", () => {
			assert.equal(time.ms("1wks"), 604800000);
		});
		it("week", () => {
			assert.equal(time.ms("1week"), 604800000);
		});
		it("weeks", () => {
			assert.equal(time.ms("1weeks"), 604800000);
		});
		it("mon", () => {
			assert.equal(time.ms("1mon"), 2592000000);
		});
		it("month", () => {
			assert.equal(time.ms("1month"), 2592000000);
		});
		it("months", () => {
			assert.equal(time.ms("1months"), 2592000000);
		});
		it("y", () => {
			assert.equal(time.ms("1y"), 31536000000);
		});
		it("yr", () => {
			assert.equal(time.ms("1yr"), 31536000000);
		});
		it("yrs", () => {
			assert.equal(time.ms("1yrs"), 31536000000);
		});
		it("year", () => {
			assert.equal(time.ms("1year"), 31536000000);
		});
		it("years", () => {
			assert.equal(time.ms("1years"), 31536000000);
		});
	});
});

describe("time.s()", () => {
	it("Should return correct result", () => {
		assert.equal(time.s("1 year 2mon 4 wks 5d6h 7min8sec 9 milliseconds"), 39593228.009);
		assert.equal(time.s("5min 30sec"), 330);
		assert.equal(time.s("2d 30ms"), 172800.03);
	});
	it("Should return -1 when the string is invalid", () => {
		assert.equal(time.s("String"), -1);
		assert.equal(time.s(""), -1);
		assert.equal(time.s("1s1s"), -1);
		assert.equal(time.s("1s2m"), -1);
	});
});

describe("time.m()", () => {
	it("Should return correct result", () => {
		assert.equal(time.m("1 year 2mon 4 wks 5d6h 7min8sec 9 milliseconds").toFixed(2), 659887.13);
		assert.equal(time.m("5min 30sec"), 5.5);
		assert.equal(time.m("2d 30ms"), 2880.0005);
	});
	it("Should return -1 when the string is invalid", () => {
		assert.equal(time.m("String"), -1);
		assert.equal(time.m(""), -1);
		assert.equal(time.m("1s1s"), -1);
		assert.equal(time.m("1s2m"), -1);
	});
});

describe("time.h()", () => {
	it("Should return correct result", () => {
		assert.equal(time.h("1 year 2mon 4 wks 5d6h 7min8sec 9 milliseconds"), 10998.11889138889);
		assert.equal(time.h("5min 30sec").toFixed(4), 0.0917);
		assert.equal(time.h("2d 30ms"), 48.000008333333334);
	});
	it("Should return -1 when the string is invalid", () => {
		assert.equal(time.h("String"), -1);
		assert.equal(time.h(""), -1);
		assert.equal(time.h("1s1s"), -1);
		assert.equal(time.h("1s2m"), -1);
	});
});

describe("time.d()", () => {
	it("Should return correct result", () => {
		assert.equal(time.d("1 year 2mon 4 wks 5d6h 7min8sec 9 milliseconds"), 458.2549538078704);
		assert.equal(time.d("5min 30sec").toFixed(6), 0.003819);
		assert.equal(time.d("2d 30ms"), 2.000000347222222);
	});
	it("Should return -1 when the string is invalid", () => {
		assert.equal(time.d("String"), -1);
		assert.equal(time.d(""), -1);
		assert.equal(time.d("1s1s"), -1);
		assert.equal(time.d("1s2m"), -1);
	});
});
