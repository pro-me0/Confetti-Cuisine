"use strict";

process.env.NODE_ENV = 'test';

const chai = require('chai'),
expect = require('chai').expect,
chaiHTTP = require('chai-http'),
app = require('../main'),
userC = require('../controllers/usersController');

chai.use(chaiHTTP)

describe('usersController', () => {
	describe('getUserParams', () => {
		it('should convert request body to contain the name attributes of the user object', () => {
			var body = {
				first: "Mazi",
				last: "Somto",
				email: "mazi@gmail.com",
				password: 54321,
				zipCode: 40001
			};
			expect(userC.getUserParams(body))
			.to.deep.include({
				name:{
					first: "Mazi",
					last: "Somto"
				}
			});
		});
		it('should return an empty object with empty request body input', () => {
			var emptyBody = {};
			expect(userC.getUserParams(emptyBody))
			.to.deep.include({})
		});
	});
	describe("/users GET", () => {
		it('it should GET all the users', (done) => {
			chai.request(app)
			.get('/users')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(err).to.be.equal(null);
				done();
			})
		})
	})
})

