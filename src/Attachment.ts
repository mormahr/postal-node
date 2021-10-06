export interface AttachmentData {
  content_type: string;
  data: string;
  name: string;
}

export function makeAttachment(
  filename: string,
  contentType: string,
  data: Buffer
): AttachmentData {
  return {
    content_type: contentType,
    data: data.toString('base64'),
    name: filename,
  };
}
