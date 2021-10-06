import { Message } from './Message';

export interface SendResultRaw {
  messages: { [key: string]: Message };
}
