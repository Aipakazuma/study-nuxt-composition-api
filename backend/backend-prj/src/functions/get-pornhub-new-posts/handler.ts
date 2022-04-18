import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const hello: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  return formatJSONResponse({
    message: `Hello. welcome to the porn Serverless world!`
  });
};

export const main = middyfy(hello);
