class Api::V1::MessagesapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token, only: [:index, :create]

  def create
    newMessage = Message.new(message_params)

    if newMessage.save
      # append newMessage also inverse chat.
      existingChat = Chat.find(message_params["chat_id"])
      inverseChat = Chat.where([
        "user_id = ? and chat_partner_id = ?",
        existingChat.chat_partner_id,
        existingChat.user_id
        ])[0]

      broadcastChat = existingChat.user_id === existingChat.chat_starter_id ?
        existingChat : inverseChat

      Message.create(
        user_id: message_params["user_id"],
        chat_id: inverseChat.id,
        message: message_params["message"]
      )

      MessagesChannel.broadcast_to(broadcastChat, newMessage)

      render :json => {messages: existingChat.messages}
    end
  end

  private

  def message_params
    params.require(:messagesapi).permit(
      :user_id, :chat_id, :message
    )
  end

end
