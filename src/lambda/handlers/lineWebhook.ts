import { Client, TextEventMessage, MessageEvent, WebhookRequestBody } from '@line/bot-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const client = new Client({
    channelAccessToken: process.env.CHANNEL_ACCESSTOKEN!,
    channelSecret: process.env.CHANNEL_SECRET
});

exports.handler = async function (req: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log("request:", JSON.stringify(req));
    const events: WebhookRequestBody = JSON.parse(req.body!)

    for (let event of events.events) {
        await client.replyMessage((event as MessageEvent).replyToken, {
            type: 'text',
            text: ((event as MessageEvent).message as TextEventMessage).text
        });
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: "hello from lambda"
    };
};