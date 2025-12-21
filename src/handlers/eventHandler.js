import fs from 'fs';
import path from 'path';
import { client } from '../client/client.js';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventsPath = path.join(__dirname, '../events');
const eventsFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));

for (const file of eventsFiles){
    const filePath = path.join(eventsPath, file);
    const fileUrl = pathToFileURL(filePath).href;
    const event = (await import(fileUrl)).default;
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}