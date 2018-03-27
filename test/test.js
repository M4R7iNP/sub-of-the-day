const assert = require('assert');
const sinon = require('sinon');
const fetch = require('node-fetch');
const fs = require('fs');
const subOfTheDay = require('..');
const menuHtml = fs.readFileSync(__dirname + '/fixtures/subway-menu.html', 'utf8');

describe('sub of the day', function() {
    let fetchStub,
        clock;

    beforeEach(function() {
        fetchStub = sinon.stub(fetch, 'Promise').returns(Promise.resolve({
            text: () => Promise.resolve(menuHtml),
        }));

        clock = sinon.useFakeTimers();
    });

    afterEach(function() {
        fetchStub.restore();
        clock.restore();
    });

    const tests = [
        {
            label: 'Monday',
            date: '2018-03-26T12:00:00.000Z',
            expected: 'Taco Sub',
        },
        {
            label: 'Tuesday',
            date: '2018-03-27T12:00:00.000Z',
            expected: 'Italian B.M.T.®',
        },
    ];

    tests.forEach(function(test) {
        it(`outputs ${test.sub} on ${test.label}`, async function() {
            clock.tick((new Date(test.date)).getTime());
            const sub = await subOfTheDay();
            assert.equal(sub, test.expected, 'wrong sub');
            assert(fetchStub.called, 'stub was not called');
        });
    });
});
