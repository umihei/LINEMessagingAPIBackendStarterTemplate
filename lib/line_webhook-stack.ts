import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class LineWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lineWebhookFn = new lambdaNodejs.NodejsFunction(this, 'lineWebhookFn', {
      entry: 'src/lambda/handlers/lineWebhook.ts',
    });

    new apigw.LambdaRestApi(this, 'lineWebhookEndpoint', {
      handler: lineWebhookFn
    });

  }
}
