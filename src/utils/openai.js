import OpenAI from 'openai';
import { config } from '../config/config.js';

export const openai = new OpenAI({
  apiKey: config.SUMO_API_KEY,
  baseURL: config.SUMO_BASE_URL,
});
