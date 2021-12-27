import * as cdk from 'aws-cdk-lib';
import { Capture, Template } from 'aws-cdk-lib/assertions';
import { LineWebhookStack } from '../lib/line_webhook-stack';

test("sanpshot test", () => {
    const app = new cdk.App();
    const stack = new LineWebhookStack(app, "TestStack");

    // stackからtemplateを作成
    const template = Template.fromStack(stack).toJSON();

    // 生成したテンプレートとスナップショットが同じか検証
    expect(template).toMatchSnapshot();

})

test("lambda fine-grained: exist lambda function and function has environment variables", () => {
    const app = new cdk.App();
    const stack = new LineWebhookStack(app, "TestStack");
    const template = Template.fromStack(stack);
    const envCapture = new Capture();
    template.hasResourceProperties("AWS::Lambda::Function",
        {
            Environment: envCapture
        });

    expect(envCapture.asObject()).toEqual(
        {
            Variables: {
                CHANNEL_ACCESSTOKEN: {
                    Ref: "ChannelIDParameter"
                },
                CHANNEL_SECRET: {
                    Ref: "ChannelSecretParameter"
                },
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1"
            }
        }
    )

})

test("apigw exist?", () => {
    const app = new cdk.App();
    const stack = new LineWebhookStack(app, "TestStack");
    const template = Template.fromStack(stack);

    template.hasResourceProperties("AWS::ApiGateway::RestApi", {
        Name: "lineWebhookEndpoint"
    })

})