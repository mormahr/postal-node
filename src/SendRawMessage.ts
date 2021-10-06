export interface SendRawMessage {
  mail_from: string;
  rcpt_to: string;
  data: Buffer;
}
