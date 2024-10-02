import { Message } from "./Message";

export interface Conversation {
  id: number,
  messages: Array<Message>,
  user1: number,
  user2: number,
  image: string
}
