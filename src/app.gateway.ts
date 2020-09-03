import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    Logger.log('Server ws: ', 'Init');
  }

  handleConnection(client: any, ...args: any[]) {
    Logger.log('Client connected: ', `${client.id}`);
  }

  handleDisconnect(client: any) {
    Logger.log('Client disconnected: ', `${client.id}`);
  }
  
  @SubscribeMessage('msgToServer')
  handleMessage(client: any, payload: any): void {
    this.server.emit('msgToClient', payload);
  }
}
