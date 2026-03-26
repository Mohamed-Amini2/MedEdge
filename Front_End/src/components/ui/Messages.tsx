type MessagesProps = {
    name: string
    lastMessage: string
  }
  
  const Messages = ({ name, lastMessage }: MessagesProps) => {
    return (
      <section className="flex items-center gap-3 p-3 hover:bg-gray-200 cursor-pointer">
        <div className="flex items-center justify-center size-15 bg-green-500 rounded-full shrink-0">
          <span className="text-white">icon</span>
        </div>
        <div>
          <h1 className="font-semibold">{name}</h1>
          <p className="text-sm text-gray-500">{lastMessage}</p>
        </div>
      </section>
    )
  }
  
  export default Messages