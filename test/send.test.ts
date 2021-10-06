import 'fetch-mock-jest';

import { Client, SendMessage, makeAttachment } from '../src';

import { FetchMockStatic } from 'fetch-mock';
import fetch from 'node-fetch';

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

const fetchMock = (fetch as unknown) as FetchMockStatic;

describe('send', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  const client = new Client('https://example.com', 'some-key');

  it('sends a message', async () => {
    fetchMock.post('https://example.com/api/v1/send/message', {
      body: {
        status: 'success',
        data: {
          messages: {
            'abc@example.com': {
              id: 5,
              token: 'token',
            },
          },
        },
      },
    });
    const message: SendMessage = {
      to: ['abc@example.com'],
      from: 'def@example.com',
      plain_body: 'Test',
    };

    const result = await client.send(message);
    expect(result.recipients).toEqual({
      'abc@example.com': {
        id: 5,
        token: 'token',
      },
    });
    expect(fetchMock).toHaveLastFetched(
      'https://example.com/api/v1/send/message',
      {
        body: {
          to: ['abc@example.com'],
          from: 'def@example.com',
          plain_body: 'Test',
        },
        method: 'POST',
      }
    );
  });

  it('sends a message with attachment', async () => {
    fetchMock.post('https://example.com/api/v1/send/message', {
      body: {
        status: 'success',
        data: {
          messages: {
            'abc@example.com': {
              id: 5,
              token: 'token',
            },
          },
        },
      },
    });
    const message: SendMessage = {
      to: ['abc@example.com'],
      from: 'def@example.com',
      plain_body: 'Test',
      attachments: [
        makeAttachment("test.txt", "plain/text", Buffer.from("Test", "utf-8"))
      ]
    };

    const result = await client.send(message);
    expect(result.recipients).toEqual({
      'abc@example.com': {
        id: 5,
        token: 'token',
      },
    });
    expect(fetchMock).toHaveLastFetched(
      'https://example.com/api/v1/send/message',
      {
        body: {
          to: ['abc@example.com'],
          from: 'def@example.com',
          plain_body: 'Test',
          attachments: [
            {
              name: 'test.txt',
              content_type: 'plain/text',
              data: Buffer.from('Test', 'utf-8').toString("base64"),
            },
          ],
        },
        method: 'POST',
      }
    );
  });
});
