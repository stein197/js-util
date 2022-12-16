import * as assert from "assert";
import * as mocha from "mocha";
import * as time from "../src/time";

mocha.describe("ms()", () => {
	mocha.it("Should return correct result", () => {
		assert.equal(time.ms("1 year 2mon 4 wks 5d6h 7min8sec 9 milliseconds"), 39593228009);
	});
	mocha.it("Should return correct result when the number and unit are separated by space", () => {
		assert.equal(time.ms("1 s"), 1000);
	});
	mocha.it("Should return correct result when the number and unit aren't separated by space", () => {
		assert.equal(time.ms("1s"), 1000);
	});
	mocha.it("Should return -1 when the string contains time and garbage", () => {
		assert.equal(time.ms("Here is the time: 10hrs"), -1);
	});
	mocha.it("Should return -1 when the string does not contain time", () => {
		assert.equal(time.ms("String"), -1);
	});
	mocha.it("Should return -1 when the string is empty", () => {
		assert.equal(time.ms(""), -1);
	});
	mocha.describe("Names", () => {
		mocha.it("ms", () => {
			assert.equal(time.ms("1ms"), 1);
		});
		mocha.it("millisecond", () => {
			assert.equal(time.ms("1millisecond"), 1);
		});
		mocha.it("milliseconds", () => {
			assert.equal(time.ms("1milliseconds"), 1);
		});
		mocha.it("s", () => {
			assert.equal(time.ms("1s"), 1000);
		});
		mocha.it("sec", () => {
			assert.equal(time.ms("1sec"), 1000);
		});
		mocha.it("secs", () => {
			assert.equal(time.ms("1secs"), 1000);
		});
		mocha.it("second", () => {
			assert.equal(time.ms("1second"), 1000);
		});
		mocha.it("seconds", () => {
			assert.equal(time.ms("1seconds"), 1000);
		});
		mocha.it("m", () => {
			assert.equal(time.ms("1m"), 60000);
		});
		mocha.it("min", () => {
			assert.equal(time.ms("1min"), 60000);
		});
		mocha.it("mins", () => {
			assert.equal(time.ms("1mins"), 60000);
		});
		mocha.it("minute", () => {
			assert.equal(time.ms("1minute"), 60000);
		});
		mocha.it("minutes", () => {
			assert.equal(time.ms("1minutes"), 60000);
		});
		mocha.it("h", () => {
			assert.equal(time.ms("1h"), 3600000);
		});
		mocha.it("hr", () => {
			assert.equal(time.ms("1hr"), 3600000);
		});
		mocha.it("hrs", () => {
			assert.equal(time.ms("1hrs"), 3600000);
		});
		mocha.it("hour", () => {
			assert.equal(time.ms("1hour"), 3600000);
		});
		mocha.it("hours", () => {
			assert.equal(time.ms("1hours"), 3600000);
		});
		mocha.it("d", () => {
			assert.equal(time.ms("1d"), 86400000);
		});
		mocha.it("day", () => {
			assert.equal(time.ms("1day"), 86400000);
		});
		mocha.it("days", () => {
			assert.equal(time.ms("1days"), 86400000);
		});
		mocha.it("w", () => {
			assert.equal(time.ms("1w"), 604800000);
		});
		mocha.it("wk", () => {
			assert.equal(time.ms("1wk"), 604800000);
		});
		mocha.it("wks", () => {
			assert.equal(time.ms("1wks"), 604800000);
		});
		mocha.it("week", () => {
			assert.equal(time.ms("1week"), 604800000);
		});
		mocha.it("weeks", () => {
			assert.equal(time.ms("1weeks"), 604800000);
		});
		mocha.it("mon", () => {
			assert.equal(time.ms("1mon"), 2592000000);
		});
		mocha.it("month", () => {
			assert.equal(time.ms("1month"), 2592000000);
		});
		mocha.it("months", () => {
			assert.equal(time.ms("1months"), 2592000000);
		});
		mocha.it("y", () => {
			assert.equal(time.ms("1y"), 31536000000);
		});
		mocha.it("yr", () => {
			assert.equal(time.ms("1yr"), 31536000000);
		});
		mocha.it("yrs", () => {
			assert.equal(time.ms("1yrs"), 31536000000);
		});
		mocha.it("year", () => {
			assert.equal(time.ms("1year"), 31536000000);
		});
		mocha.it("years", () => {
			assert.equal(time.ms("1years"), 31536000000);
		});
	});
});
