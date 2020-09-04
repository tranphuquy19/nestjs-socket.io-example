import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger('AppGateway');

  afterInit(server: any) {
    this.logger.log('Server ws: ', 'Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected: ', `${client.id}`);
    client.emit('msgToClient', { name: 'Server', text: 'You have successfully connected to the server' });
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected: ', `${client.id}`);
    this.server.emit('msgToClient', { name: 'Server', text: `user with id ${client.id} has left` });
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('msgToClient', payload);
  }
}
