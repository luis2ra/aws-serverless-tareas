const AWS = require('aws-sdk');
module.exports.dynamo = new AWS.DynamoDB.DocumentClient();
