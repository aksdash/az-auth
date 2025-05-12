const assert = require("assert")
const sinon = require("sinon")

const greeter = require("../greeter")

describe("testing the greet", function () {
    it("Checks the greet function", function() {
        var clock = sinon.useFakeTimers(new Date(2021,0, 15))
        assert.equal(greeter.greet('Alice'), 'Hello, Alice! Today is Friday, January 15, 2021');
        clock.restore()
    })
})