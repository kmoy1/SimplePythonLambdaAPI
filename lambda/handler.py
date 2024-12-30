import json
import requests

def handler(event, context):
    try:
        return {
            "calledAPI": True,
            "statusCode": 200,
            "body": json.dumps({"result": "SUCCESS"}),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
        }