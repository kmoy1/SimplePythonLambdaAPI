# Simple Lambda REST API

This is a project to deploy a very simple Python 3 API (which supports importing libraries) to AWS via CDK. We will build off this for other projects later.

You must run `cdk bootstrap` before running `cdk deploy`. 
Additionally, to avoid clutter, you must also ensure Docker is running before running `cdk deploy`.

You can test the API via `curl -X GET https://925247zovj.execute-api.us-west-2.amazonaws.com/prod/objects` (or whatever the invoke URL is in APIGW.)
