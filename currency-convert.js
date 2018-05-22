// USD, CAD, 20
// 20 USD is worth 26 CAD. You can spend these in the following countries: Canada

//http://data.fixer.io/api/latest?access_key=6a12a48168f8121914a16ed33224f339
const axios = require('axios');

/*const getExchangeRate = (from, to) => {
	return axios.get('http://data.fixer.io/api/latest?access_key=6a12a48168f8121914a16ed33224f339')
		.then((respose) => {
		const euro = 1 / respose.data.rates[from];
		const rate = euro * respose.data.rates[to];
		return rate;
	});
};*/

const getExchangeRate = async (from, to) => {
	try {
		const respose = await axios.get('http://data.fixer.io/api/latest?access_key=6a12a48168f8121914a16ed33224f339');
		const euro = 1 / respose.data.rates[from];
		const rate = euro * respose.data.rates[to];
		if(isNaN(rate)) {
			throw new Error();
		}
		return rate;
	} catch (e) {
		throw new Error(`Unable to get exchage rate for ${from} and ${to}`);
	}
};

/*const getCountries = (currencyCode) => {
	return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
				.then((respose) => {
					return respose.data.map((country) => country.name);
				});
};*/


const getCountries = async (currencyCode) => {
	try {
		const respose = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
		return respose.data.map((country) => country.name);
	} catch (e)  {
		throw new Error(`Unable to get countries that use ${currencyCode}.`);
	}
};

/*const convertCurrency = (from, to, amount) => {
	let convertedAmount;
	return getExchangeRate(from, to).then((rate) => {
		convertedAmount = (amount * rate).toFixed(2);
		return getCountries(to);
	}).then((countries) => {
		return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries}`;
	})
}*/

const convertCurrency = async (from, to, amount) => {
	const rate = await getExchangeRate(from, to);
	const convertedAmount = (amount*rate).toFixed(2);
	const countries = await getCountries(to);
	return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries}`;
}

convertCurrency('CAD', 'USD', 20).then(message => {
	console.log(message);
}).catch(e => {
	console.log(e.message);
});

const add = (a, b) => a + b + c;

const doWork = async () => {
	try {
		const result = await add(12, 13);
		return result;
	} catch (e) {
		return 10;
	}
};

doWork().then((data) => {
	console.log(data);
}).catch(e => {
	console.log('Something went wrong!');
})