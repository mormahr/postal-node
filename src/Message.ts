/**
 * Basic info of message that is returned by the API if no other information is requested.
 * See {@link https://apiv1.postalserver.io/controllers/messages/message.html}
 */
export interface Message {
  id: number;
  token: string;
}

/**
 * "Expansions" offered by the API.
 */
export interface ExtendedMessage {
  status: {
    status: string; // Sent, ?
    last_delivery_attempt: number;
    held: boolean;
    hold_expiry: unknown;
  };
  details: {
    rcpt_to: string;
    mail_from: string;
    subject: string;
    message_id: string;
    timestamp: number;
    // TODO: test
    direction: 'outgoing' | 'incoming';
    size: string;
    bounce: number;
    bounce_for_id: number;
    tag: unknown;
    // TODO: test
    received_with_ssl: 1 | 0;
  };
  inspection: {
    inspected: boolean;
    spam: boolean;
    spam_score: number;
    threat: boolean;
    threat_details: unknown;
  };
  plain_body: string | undefined;
  html_body: string | undefined;
  attachments: { [key: string]: string };
  headers: { [key: string]: { [key: string]: string[] } };
  raw_message: string;
  activity_entries: {
    loads: unknown[];
    clicks: unknown[];
  };
}
