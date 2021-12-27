import { Client, TextEventMessage, MessageEvent, WebhookRequestBody } from '@line/bot-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// LINEのAPIを実行するClientを定義
const client = new Client({
    channelAccessToken: process.env.CHANNEL_ACCESSTOKEN!,
    channelSecret: process.env.CHANNEL_SECRET
});

function isMessageEvent(arg: any): arg is MessageEvent {
    return arg.message !== undefined;
}

function isTextEventMessage(arg: any): arg is TextEventMessage {
    return arg.text !== undefined;
}

exports.handler = async function (req: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log("request:", JSON.stringify(req));
    const events: WebhookRequestBody = JSON.parse(req.body!)

    // eventがテキストメッセージのとき，応答する（やまびこ）
    for (let event of events.events) {
        if (isMessageEvent(event)) {
            if (isTextEventMessage(event.message)) {
                await client.replyMessage(event.replyToken, {
                    type: 'text',
                    text: event.message.text
                });
            }
            else {
                await client.replyMessage(event.replyToken, {
                    type: 'text',
                    text: '対応してないよ'
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