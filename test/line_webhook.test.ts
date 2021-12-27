import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { LineWebhookStack } from '../lib/line_webhook-stack';
// import * as LineWebhook from '../lib/line_webhook-stack';

test("sanpshot test", () => {
    const app = new cdk.App();
    const stack = new LineWebhookStack(app, "TestStack");

    // stackからtemplateを作成
    const template = Template.fromStack(stack).toJSON();

    // 生成したテンプレートとスナップショットが同じか検証
    expect(template).toMatchSnapshot();

})

// // example test. To run these tests, uncomment this file along with the
// // example resource in lib/line_webhook-stack.ts
// test('Lambda created', () => {
// //   const app = new cdk.App();
// //     // WHEN
// //   const stack = new LineWebhook.LineWebhookStack(app, 'MyTestStack');
// //     // THEN
// //   const template = Template.fromStack(stack);

// //   template.hasResourceProperties('AWS::SQS::Queue', {
// //     VisibilityTimeout: 300
// //   });

//     const stack = new cdk.Stack();

//     new LineWebhookStack(stack, 'TestConstruct')
//     expect(SynthUtil)
// });
