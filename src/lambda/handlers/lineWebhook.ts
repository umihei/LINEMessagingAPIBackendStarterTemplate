import { Client } from '@line/bot-sdk';

const client = new Client({
    channelAccessToken: process.env.CHANNEL_ACCESSTOKEN as string,
    channelSecret: process.env.CHANNEL_SECRET
});

exports.handler = async function (req: any) {
    console.log("request:", JSON.stringify(req));
    const event = JSON.parse(req.body).events[0]

    await client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: "hello from lambda"
    };
};