/*jshint esversion: 6 */

const nodemailer = require('nodemailer');
const got = require('got');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'nodecryptomailer',
		pass: ''
	}
});

function sendMail(subject, body) {
	var mailOptions = {
	  from: 'nodecryptomailer@gmail.com',
	  to: '@gmail.com', // list of receives
	  subject: subject, // Subject line
	  html: ''// plain text body
	};

	transporter.sendMail(mailOptions, function(err, info) {
		if(err) {
			console.log('Send error:', err);
		} else {
			console.log('Mail sent successfully', info);
		}
	});

}


// sendMail('bitcoin has hit the moon!', 'Monero is at $100');
function getCryptoData(coin) {
	got(`https://api.coinmarketcap.com/v1/ticker/${coin}/?convert=GBP`, { json: true }).then(response => {
  	var name = response.body[0].name;
  	var percentageChange = response.body[0].percent_change_7d;
  	if(percentageChange >= 20) {
  		sendMail(`${name} to the moon!!! (${percentageChange})`);
  	} else if(percentageChange >= 10) {
  		sendMail(`${name} has explodified! (${percentageChange})`);
  	} else if(percentageChange >= 5) {
  		sendMail(`${name} is going up! (${percentageChange})`);
  	}
	}).catch(error => {
  	console.log(error.response.body);
	});
}

// getCryptoData('bitcoin');

setInterval(function() {
	var coins = ['bitcoin', 'bitcoin-cash', 'ripple', 'litecoin', 'dash', 'neo', 'iota', 'monero',
	'ethereum', 'lisk', 'waves', 'golem-network-tokens', 'verge', 'pivx', 'basic-attention-token', 'district0x'];

	coins.forEach((coin) => {
		getCryptoData(coin);
	});
}, 30000);
