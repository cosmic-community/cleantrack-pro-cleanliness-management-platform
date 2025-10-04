import { Message, User, TaskAssignment } from '@/types'

interface MessagesListProps {
  messages: Message[]
}

export default function MessagesList({ messages }: MessagesListProps) {
  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-gray-400 text-4xl mb-2">💬</div>
        <p className="text-gray-600">No messages yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const fromUser = message.metadata.from_user as User
        const toUser = message.metadata.to_user as User
        const relatedTask = message.metadata.related_task as TaskAssignment | undefined

        return (
          <div key={message.id} className={`bg-white rounded-lg shadow-lg p-6 ${
            !message.metadata.read_status ? 'border-l-4 border-blue-500' : ''
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {fromUser.metadata.profile_photo && (
                  <img 
                    src={`${fromUser.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={fromUser.metadata.full_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900">{fromUser.metadata.full_name}</div>
                  <div className="text-sm text-gray-600">
                    to {toUser.metadata.full_name} • {message.metadata.timestamp}
                  </div>
                </div>
              </div>
              {!message.metadata.read_status && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Unread
                </span>
              )}
            </div>

            <h3 className="font-medium text-gray-900 mb-2">{message.title}</h3>
            <p className="text-gray-700 mb-3">{message.metadata.message_content}</p>

            {relatedTask && (
              <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Related Task:</span> {relatedTask.title}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}