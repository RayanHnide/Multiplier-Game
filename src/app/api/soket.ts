import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'ws';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket.server.wss) {
    console.log('Starting WebSocket server...');
    const wss = new Server({ noServer: true });

    res.socket.server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });

    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`);
      });
    });

    res.socket.server.wss = wss;
  }
  res.end();
}