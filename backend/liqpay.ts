// server/liqpay.ts
//"start script": node --loader ts-node/esm liqpay.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PUBLIC_KEY = 'sandbox_i55079226466';
const PRIVATE_KEY = process.env.LIQPAY_PRIVAT;

function base64(str: any) {
    return Buffer.from(str).toString('base64');
}

function sha1(str: string) {
    return crypto.createHash('sha1').update(str).digest();
}

function signature(str: string) {
    return base64(sha1(str));
}

app.post('/api/liqpay', (req, res) => {
    const { amount, email, orderId } = req.body;

    const payload = {
        public_key: PUBLIC_KEY,
        version: 3,
        action: "pay",
        amount,
        currency: "UAH",
        description: `Оплата заказа #${orderId}`,
        order_id: orderId,
        language: "uk",
        result_url: "http://localhost:3000/thank-you",
        server_url: "https://arko.com/api/liqpay-callback",
        sandbox: 1 // Удали в проде
    };

    const data = base64(JSON.stringify(payload));
    const sign = signature(PRIVATE_KEY + data + PRIVATE_KEY);

    res.json({ data, signature: sign });
});

app.listen(4000, () => {
    console.log("✅ LiqPay API server running on http://localhost:4000");
});
