import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import './styles.css';
const PaymentGateway = () => {
	const options = {
		key: 'rzp_test_L2VUKbb3RjJxhT',
		amount: '1000', //  = INR 1
		name: 'ClearIt',
		description: 'Thanks for your payment',
		image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
		// handler is function to handle response
		handler: function (response) {
			console.log(response);
		},
		// prefill: {
		// 	name: 'Parth',
		// 	contact: '9999999999',
		// 	email: 'demo@demo.com',
		// },
		notes: {
			address: 'some address',
		},
		theme: {
			// color: ,
			hide_topbar: false,
		},
	};
	// https://razorpay.com/docs/payment-gateway/test-card-upi-details/ for testing
	// 	CARD : 4111 1111 1111 1111 CVV-ANY EXP-ANY FUTURE DATE
	const openPayModal = (options) => {
		var rzp1 = new window.Razorpay(options);
		rzp1.open();
	};
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		script.async = true;
		document.body.appendChild(script);
	}, []);

	return (
		<>
			<Button 
			variant='outlined'
			sx={{
				width: '100%',
				marginTop: '1rem',
				height: '50px',
			}}
			onClick={() => openPayModal(options)}>Pay</Button>
		</>
	);
};
export default PaymentGateway;
