import { cosmic, hasStatus } from '@/lib/cosmic'
import { Message } from '@/types'
import ManagerLayout from '@/components/ManagerLayout'
import MessagesList from '@/components/MessagesList'

async function getMessages() {
  try {
    const response = await cosmic.objects
      .find({ type: 'messages' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const messages = response.objects as Message[]
    
    // Sort by timestamp (newest first)
    const sortedMessages = messages.sort((a, b) => {
      const dateA = new Date(a.metadata.timestamp).getTime()
      const dateB = new Date(b.metadata.timestamp).getTime()
      return dateB - dateA
    })

    return sortedMessages
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function MessagesPage() {
  const messages = await getMessages()

  return (
    <ManagerLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Communication with staff members</p>
      </div>

      <MessagesList messages={messages} />
    </ManagerLayout>
  )
}