import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import getPornhubNewPosts from '@functions/get-pornhub-new-posts';

const serverlessConfiguration: AWS = {
  service: 'backend-prj',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: [
        {
          name: 'free-key',
          value: process.env.API_KEY
        }
      ],
      usagePlan: {
        quota: {
          limit: 1000,
          period: 'MONTH'
        },
        throttle: {
          burstLimit: 200,
          rateLimit: 100
        }
      }
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { hello, getPornhubNewPosts },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline': {
      host: '0.0.0.0',
      httpPort: process.env.OFFLINE_PORT,
      apiKey: process.env.API_KEY
    }
  },
};

module.exports = serverlessConfiguration;
