import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class FetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    try {
      const result = await fetch(url);
      const data: T = await result.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
