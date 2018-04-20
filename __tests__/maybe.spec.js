import {compose, prop, path, __} from 'ramda';
import Maybe from '../Maybe';

describe(`Maybe Algaebraic Data Type`, () => {
	const user = {
		email: 'james@example.com',
		accountDetails: {
			address: {
				street: '123 Fake St',
				city: 'Exampleville',
				province: 'NS',
				postcode: '1234'
			}
		},
		preferences: {}
	};
	const banners = {
		'AB': '/assets/banners/alberta.jpg',
		'BC': '/assets/banners/british-columbia.jpg',
		'MB': '/assets/banners/manitoba.jpg',
		'NL': '/assets/banners/newfoundland-labrador.jpg',
		'NS': '/assets/banners/nova-scotia.jpg',
		'NT': '/assets/banners/northwest-territories.jpg',
		'ON': '/assets/banners/ontario.jpg',
		'PE': '/assets/banners/prince-edward.jpg',
		'QC': '/assets/banners/quebec.jpg',
		'SK': '/assets/banners/saskatchewan.jpg',
		'YT': '/assets/banners/yukon.jpg'
	};
	it(`should "look" like a promise (just a box around a value)`, () => {
		var data = {foo: 'bar'};
		return Promise.resolve(data)
			.then(pluckFoo)
			.then(x => expect(x).toEqual('bar'));
	});
	describe(`with a normal (flat) maybe`, () => {
		let getUserBanner;
		it(`should return a Maybe with the expected value within`, () => {
			const userBanner = xs => obj =>
				Maybe.of(obj)
					.map(prop('accountDetails'))
					.map(prop('address'))
					.map(prop('province'))
					.map(prop(__, xs));
			getUserBanner = userBanner(banners);
			expect(getUserBanner(user)).toEqual({"__value": "/assets/banners/nova-scotia.jpg"});
		});
	});
});
const getProvinceBanner = province => xs => {
	return Maybe.of(xs[province]);
};
function getUserBannerNaive (banners, user) {
	return banners[user.accountDetails.address.province];
}
function getUserBannerImperativeDefensive (banners, user) {
	if (user !== null) {
		if (user.accountDetails !== undefined) {
			if (user.accountDetails.address !== undefined) {
				return banners[user.accountDetails.address.province];
			}
		}
	}
}
const pluck = x => o => o[x];
const pluckFoo = pluck('foo');
