import { Client, TextEventMessage, MessageEvent, WebhookRequestBody } from '@line/bot-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { is } from 'typescript-is';

const client = new Client({
    channelAccessToken: process.env.CHANNEL_ACCESSTOKEN!,
    channelSecret: process.env.CHANNEL_SECRET
});

exports.handler = async function (req: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log("request:", JSON.stringify(req));
    const events: WebhookRequestBody = JSON.parse(req.body!)

    for (let event of events.events) {

        // text messageだけ返信（やまびこ）
        if (is<MessageEvent>(event)) {
            if (is<TextEventMessage>(event.message)) {
                await client.replyMessage(event.replyToken, {
                    type: 'text',
                    text: event.message.text
                });
            }
        }

    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: "hello from lambda"
    };
};