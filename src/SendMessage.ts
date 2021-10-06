import { AttachmentData } from './Attachment';

/**
 * @link https://apiv1.postalserver.io/controllers/send/message.html
 */
export interface SendMessage {
  to: string[];
  cc?: string[];
  bcc?: string[];
  from: string;
  sender?: string;
  subject?: string;
  tag?: string;
  reply_to?: string;
  plain_body: string;
  html_body?: string;
  attachments?: AttachmentData[];
  headers?: { [key: string]: string };
  bounce?: boolean;
}
