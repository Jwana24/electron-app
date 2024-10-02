import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import Logo from "../images/one-piece.png";
import { Button } from "./ui/button";
import { Conversation } from "../types/Conversation";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { User } from "../types/User";

const MessagesList = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>();

  const connectedUserId = 2;
  const fakeUsers = [
    { id: 1, username: "Jwana", lastname: "detrieux", firstname: "johanna" },
    { id: 2, username: "Arkanii", lastname: "frison", firstname: "théo" },
    { id: 3, username: "Naruto-kun", lastname: "uzumaki", firstname: "naruto" },
    { id: 4, username: "Sakura-chan", lastname: "haruno", firstname: "sakura" },
  ]
  const fakeConversations: Array<Conversation> = [
    {
      id: 1,
      messages: [
        { id: 1, text: "test 1 pour amour", date: new Date("11/09/2024"), sender_id: 1 },
        { id: 3, text: "test 1 en retour", date: new Date("11/09/2024"), sender_id: 2 }
      ],
      user1: 1,
      user2: 2,
      image: Logo
    },
    {
      id: 2,
      messages: [
        { id: 2, text: "test 2 !", date: new Date("11/09/2024"), sender_id: 3 },
        { id: 4, text: "test 2 en retour", date: new Date("11/09/2024"), sender_id: 2 }
      ],
      user1: 3,
      user2: 2,
      image: Logo
    },
  ]
  const userInitials = (user: User) => {
    return `${user.firstname.substring(0, 1).toUpperCase()}${user.lastname.substring(0, 1).toUpperCase()}`;
  }
  const getUserById = (userId: number) => {
    return fakeUsers.find((user) => userId === user.id);
  }

  // todo: refaire correctement la BDD
  // faire dossier api à la racine et faire du sql


  return (
    <div className="h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-1 p-4 h-screen border-r">
          <div className="flex flex-col items-center">
            {fakeConversations.map((conversation) =>
              (conversation.user1 === connectedUserId || conversation.user2 === connectedUserId) && (
                <div className="mb-4" key={conversation.id}>
                  <Button
                    onClick={() => setSelectedConversation(conversation)}
                    variant="ghost"
                    className="hover:bg-white"
                  >
                    <Avatar key={conversation.id} className="h-14 w-14">
                      <AvatarImage src={Logo} alt="Logo One Piece" />
                    </Avatar>
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
        <div className="col-span-11">
          <div className="grid grid-cols-12 grid-rows-2 h-full">
            <div className="row-span-2 col-span-12 border-b p-4">
              <ScrollArea className="h-full">
                {selectedConversation
                  ? selectedConversation.messages.map((message) => (
                    <div key={message.id} className="flex items-center pb-4 space-x-2">
                      <Avatar className="h-14 w-14">
                        <AvatarFallback>{userInitials(getUserById(message.sender_id))}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center font-bold space-x-2">
                          <div>{getUserById(message.sender_id)?.username}</div>
                          <div className="italic text-xs font-medium text-accent-foreground">{message.date.toLocaleString()}</div>
                        </div>
                        <div key={message.id}>{message.text}</div>
                      </div>
                    </div>
                  )) : (
                    <div>Bienvenue ! Welcome !</div>
                  )
                }
              </ScrollArea>
            </div>
            <div className="col-span-12 p-4">
              <Input type="text" placeholder="Écrire un message..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagesList;
