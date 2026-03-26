import Messages from "@/components/ui/Messages";
import { SearchIcon } from "lucide-react";

const conversations = [
  { id: 1, name: "Mohamed Amini", lastMessage: "Hello doctor!" },
  { id: 2, name: "Sara Johnson", lastMessage: "When is my appointment?" },
  { id: 3, name: "John Doe", lastMessage: "Thank you!" },
  { id: 4, name: "Emily Davis", lastMessage: "Can I reschedule?" },
  { id: 5, name: "Michael Brown", lastMessage: "I have a question about my prescription." },
  { id: 6, name: "Jessica Wilson", lastMessage: "Is there a follow-up needed?" },
  { id: 7, name: "David Lee", lastMessage: "Thank you for the consultation!" },
  { id: 8, name: "Sophia Martinez", lastMessage: "Can I get a copy of my medical records?" },
]

const Chat_Client = () => {
  return (
    <main className="w-full h-full flex gap-2 flex-row-reverse">

  {/* First Section for Doctor Information and Chat History */}
      <aside className="flex flex-col gap-1 w-1/3 ">

        {/* First column For Doctor Personal Information */}
        <section className="w-full h-[38%] bg-gray-300 rounded-4xl">
          <div className="h-1/2 w-full bg-green-400 rounded-t-4xl"> 
          </div>
          <div className="h-1/2 w-full bg-yellow-500 rounded-b-4xl">

          </div>
        </section>

        {/* Second column for Basically scrolling chat history and messages */}
        <section className="w-full h-[62%] my-2 bg-gray-300 rounded-4xl">
          <div className="w-full h-1/8 bg-green-400 rounded-t-4xl flex items-center  justify-between px-4">
            <h1 className="text-2xl">
              Messages
            </h1>
            <SearchIcon className="w-5 h-5" />
          </div>

          <div className="w-full h-7/8 bg-yellow-500 roounded-4xl  overflow-y-auto">
          {conversations.map((conv) => (
              <Messages key={conv.id} name={conv.name} lastMessage={conv.lastMessage} />
            ))}
          </div>

        </section>
      </aside>

      
    {/* Second Section For Chat Box and Send Button and message input field */}

      <section className="w-full h-full">
        <section className="w-full h-full bg-red-300 rounded-4xl">

        </section>
      </section>

    </main>
  );
};

export default Chat_Client;
