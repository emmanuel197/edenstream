const flutterwaveConfig = (_currency, _email, _number, _name) => {
    const config = {
        public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount: 1,
        currency: _currency,
        payment_options: 'card',
        customer: {
            email: _email,
            phone_number: _number,
            name: _name,
        },
        customizations: {
            title: 'Afriplay Purchase',
            description: 'Purchase of a movie on Afriplay',
            logo: 'https://user-images.githubusercontent.com/67514352/188176636-ddf7f4c2-b02b-4a6c-a9a3-30aa2adca3b5.png',
        },
    }

    return config
}

export default flutterwaveConfig