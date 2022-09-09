"use strict";

process.env.NODE_ENV = 'test';

const User = require('../models/user'),
mongoose = require('mongoose'),
{expect} = require('chai');

require('../main');

beforeEach(done => {
	User.deleteMany({})
	.then(() => {
		done();
	});
});

describe('SAVE user', () => {
	it('it should save one user', done => {
		let testUser ={
			name: {
			first: "Jon",
			last: "Wexler"
			},
			email: "Jon@jonwexler.com",
			password: 12345,
			zipCode: 10016
		};
		User.create(testUser)
		.then(() => {
			User.find({})
			.then(result => {
				expect(result.length)
				.to.equal(1);
				expect(result[0])
				.to.have.property("_id");
				done();
			});
		});
	});
});