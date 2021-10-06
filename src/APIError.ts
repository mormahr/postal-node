export default class APIError extends Error {
  data: { [key: string]: any };

  constructor(data: { [key: string]: any }) {
    super('Error executing postal API request');
    this.data = data;
  }
}
