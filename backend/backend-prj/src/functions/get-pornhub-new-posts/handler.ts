import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as superagent from 'superagent';
import * as cheerio from 'cheerio';

const hello: ValidatedEventAPIGatewayProxyEvent<void> = async () => {

  // const url: string = 'https://jp.pornhub.com/';
  // const url: string = 'https://www.yahoo.co.jp/';
  const url: string = 'https://www.xvideos.com/lang/japanese';
  const result = await superagent.get(url);
  const $ = cheerio.load(result.text);
  const items = $('.mozaique > div');
  const resArray = items.map((_, ele) => {
    return $(ele).attr()['data-id'];
  }).toArray();

  return formatJSONResponse({
    message: `Hello.`,
    dataIdList: JSON.stringify(resArray)
  });
};

export const main = middyfy(hello);
