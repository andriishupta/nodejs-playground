import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse
} from '@nestjs/websockets';
import { Message } from '@nodejs-pet-project/api-interfaces';
import {
  interval,
  Observable
} from 'rxjs';
import {
  map,
} from 'rxjs/operators';

@WebSocketGateway()
export class MessagesGateway {
  @SubscribeMessage('messages')
  handleMessage(@MessageBody() body: Message): Observable<WsResponse<Message>> {
    return interval(1000).pipe(
      map(() => ({ event: 'messages', data: { message: getMessage() } }))
    );
  }
}

function getMessage() {
  return 'Hello world! ' + Date.now();
}