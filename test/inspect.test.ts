import 'fetch-mock-jest';

import { Client } from '../src';
import { FetchMockStatic } from 'fetch-mock';
import fetch from 'node-fetch';
import fs from 'fs/promises';

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

const fetchMock = (fetch as unknown) as FetchMockStatic;

describe('inspect', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  const client = new Client('https://example.com', 'some-key');

  it('inspects with all expansions', async () => {
    fetchMock.get('https://example.com/api/v1/messages/message', {
      body: (
        await fs.readFile(__dirname + '/mock-data/messages_message_full.json')
      ).toString('utf-8'),
    });

    const result = await client.inspect(0);
    expect(result).toMatchSnapshot();
    // To test that TypeScript correctly infers the result type
    expect(result.details.bounce).toBe(0);
    expect(fetchMock).toHaveLastFetched(
      'https://example.com/api/v1/messages/message',
      {
        body: { id: 0, _expansions: true },
        method: 'GET',
      }
    );
  });
});
