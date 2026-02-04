import { config } from './config';

class Requests {
  baseUrl: string;
  internalSecret: string;

  constructor(_url: string) {
    this.baseUrl = _url;
    this.internalSecret = config.INTERNAL_SECRET;
  }

  async request(url: string, methodObj: RequestInit, isData = true) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, methodObj);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        if (isData) {
          const data: unknown = await response.json();
          return data;
        } else return response;
      }
    } catch {
      throw new Error('Network response was not ok');
    }
  }

  async get(url: string, isData = true) {
    try {
      const responseData = await this.request(
        url,
        {
          method: 'GET',
          headers: {
            'x-internal-secret': this.internalSecret,
          },
        },
        isData
      );

      return responseData;
    } catch (err) {
      throw new Error('Network response was not ok');
    }
  }

  async post(url: string, body: BodyInit) {
    try {
      const responseData = await this.request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': this.internalSecret,
        },
        body: body,
      });

      return responseData;
    } catch {
      throw new Error('Network response was not ok');
    }
  }

  async put(url: string, body: BodyInit) {
    try {
      const responseData = await this.request(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': this.internalSecret,
        },
        body: body,
      });

      return responseData;
    } catch {
      throw new Error('Network response was not ok');
    }
  }

  async patch(url: string, body: BodyInit) {
    try {
      const responseData = await this.request(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': this.internalSecret,
        },
        body: body,
      });

      return responseData;
    } catch {
      throw new Error('Network response was not ok');
    }
  }

  async delete(url: string) {
    try {
      const responseData = await this.request(
        url,
        {
          method: 'DELETE',
          headers: {
            'x-internal-secret': this.internalSecret,
          },
        },
        false
      );

      return responseData;
    } catch {
      throw new Error('Network response was not ok');
    }
  }
}

export { Requests };
