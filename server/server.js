const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')

const app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({origin: true, credentials : true}))

const stripe = require('stripe')('sk_test_51MqUB6DMglDOnsWOtd7QzQtUrvng4fBBk0XQbCG7XjpwpSHd5W8rKMCtlIPLmfOQBANyoi1WSKHjIV4AhwOO5fnL00r3gFfWZT');

app.post('/checkout', async(req, res, next) => {
    try{
        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {allowed_countries: ['US', 'CA']},
            shipping_options: [
                {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {amount: 0, currency: 'usd'},
                    display_name: 'Free shipping',
                    delivery_estimate: {
                    minimum: {unit: 'business_day', value: 5},
                    maximum: {unit: 'business_day', value: 7},
                    },
                },
                },
            ],
            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.product]
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            })),
            mode: 'payment',
            success_url: 'http://localhost:4242/success.html',
            cancel_url: 'http://localhost:4242/cancel.html'
        })

        res.status(200).json(session)
    }catch(error){
        next(error);
    }
})

app.listen(4242, () => console.log('app on 4242'))