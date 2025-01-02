import { Stack, StackProps } from 'aws-cdk-lib';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class SimpleLambdaApiStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		const lambdaFunc = new Function(this, 'HandlerLambda', {
			runtime: Runtime.PYTHON_3_13, 
			handler: 'handler.handler',
			code: Code.fromAsset('lambda', {
				bundling: {
					image: Runtime.PYTHON_3_13.bundlingImage,
					command: ['bash', '-c', [
						'pip install -r requirements.txt -t /asset-output && cp -r . /asset-output'
					  ].join(' && ')]
				}

			})
		});

		// Create APIGW to handle requests + route to Lambda handler.
		const api = new LambdaRestApi(this, 'ApiGateway', {
			handler: lambdaFunc,
			proxy: false,
			deployOptions: {
				stageName: 'prod'
			},
            defaultCorsPreflightOptions: {
                allowOrigins: ['http://localhost:4200', 'https://kevimoy.org'],
                allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowHeaders: ['Content-Type', 'Authorization'],
            }
		});

		const objectsResource = api.root.addResource('objects');
		objectsResource.addMethod('GET');
	}
}
