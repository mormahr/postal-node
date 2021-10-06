import { Message } from './Message';

export interface SendResult {
  recipients: { [key: string]: Message };
}
