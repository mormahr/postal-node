import { ExtendedMessage, Message } from './Message';

import APIError from './APIError';
import { SendMessage } from './SendMessage';
import { SendRawMessage } from './SendRawMessage';
import { SendResult } from './SendResult';
import { SendResultRaw } from './SendResultRaw';
import fetch from 'node-fetch';

export default class Client {
  host: string;
  serverKey: string;

  constructor(host: string, serverKey: string) {
    this.host = host;
    this.serverKey = serverKey;
  }

  private async makeRequest(
    method: 'GET' | 'POST',
    controller: string,
    action: string,
    parameters: { [key: string]: any }
  ): Promise<any> {
    const path = `/api/v1/${controller}/${action}`;
    const url = new URL(path, this.host);
    const body = JSON.stringify(parameters);

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Server-API-Key': this.serverKey,
      },
      body,
    });

    const result = await response.json();
    if (result.status === 'success') {
      return result.data;
    } else {
      throw new APIError(result);
    }
  }

  private readMessageResult(result: SendResultRaw): SendResult {
    const recipients: { [key: string]: Message } = {};
    for (let key of Object.keys(result.messages)) {
      recipients[key.toLowerCase()] = result.messages[key];
    }

    return { recipients };
  }

  async send(message: SendMessage): Promise<SendResult> {
    const result = await this.makeRequest('POST', 'send', 'message', message);
    return this.readMessageResult(result);
  }

  async sendRaw(message: SendRawMessage): Promise<SendResult> {
    const result = await this.makeRequest('POST', 'send', 'message', message);
    return this.readMessageResult(result);
  }

  async inspect(id: number): Promise<Message & ExtendedMessage> {
    const result = await this.makeRequest('GET', 'messages', 'message', {
      id,
      _expansions: true,
    });
    return result;
  }
}
