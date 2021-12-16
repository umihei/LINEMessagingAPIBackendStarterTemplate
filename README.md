# Simple LINE Bot Backend Template powered by AWS CDK
This repo is AWS CDK Template for simple LINE bot backend.
When you deploy this template, your bot will reply exactly same word that you send.

## Prerequisites

cdk v2.x.x or higher
Nodejs

You should prepare your own LINE channel via LINE Developers.
And you need the channel's access token and secret.

You should have AWS account, and admin permission.
This template will construct an API Gateway and a Lambda Function, and uses the SSM parameter store.

## how to use

after cloning this repo, you should install npm libs.
```
npm install
```

In this repo, use ssm parameter to store LINE channel's access token and secret.
before you do this, you should set up AWS CLI.
```
aws ssm put-parameter --type 'String' --name 'CHANNEL_ACCESSTOKEN' --value 'your channel's access token'
aws ssm put-parameter --type 'String' --name 'CHANNEL_SECRET' --value 'your channel's secret'
```

and deploy resources.
if you use cdk for the first time, run below command.
```
cdk bootstrap
```

after that, deploy.
```
cdk deploy
```

## References
### CDK  
- https://cdkworkshop.com/  
- https://docs.aws.amazon.com/cdk/api/v2/

### LINE Bot  
- https://qiita.com/nkjm/items/38808bbc97d6927837cd  
- https://dev.classmethod.jp/articles/lambda-line-bot-tutorial/
