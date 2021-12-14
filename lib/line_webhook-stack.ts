import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class LineWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ChannelAccessToken = ssm.StringParameter.fromStringParameterName(this, 'ChannelID', 'CHANNEL_ACCESSTOKEN');
    const ChannelSecret = ssm.StringParameter.fromStringParameterName(this, 'ChannelSecret', 'CHANNEL_SECRET');

    const lineWebhookFn = new lambdaNodejs.NodejsFunction(this, 'lineWebhookFn', {
      entry: 'src/lambda/handlers/lineWebhook.ts',
      environment: {
        CHANNEL_ACCESSTOKEN: ChannelAccessToken.stringValue,
        CHANNEL_SECRET: ChannelSecret.stringValue
      }
    });

    new apigw.LambdaRestApi(this, 'lineWebhookEndpoint', {
      handler: lineWebhookFn
    });

  }
}