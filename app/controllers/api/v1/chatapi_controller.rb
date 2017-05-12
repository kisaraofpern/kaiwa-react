class Api::V1::ChatapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token, only: [:index, :create]

  def create
    user_id = chat_params["user_id"]
    chat_partner_id = chat_params["chat_partner_id"]
    chat_starter_id = chat_params["chat_starter_id"]

    existingChat = Chat.where([
      "user_id = ? and chat_partner_id = ?",
      user_id,
      chat_partner_id
      ])

    returnedChat = nil

    if existingChat.size == 0
      newChat = Chat.create(
        user_id: user_id,
        chat_partner_id: chat_partner_id,
        chat_starter_id: chat_starter_id
      )

      returnedChat = newChat;
    else
      existingChat = existingChat[0]

      inverseChat = Chat.where([
        "user_id = ? and chat_partner_id = ?",
        chat_partner_id,
        user_id
        ])[0]

      returnedChat = existingChat.user_id == existingChat.chat_starter_id ?
        existingChat : inverseChat
    end

    render :json => {
      chat: returnedChat,
      messages: returnedChat.messages
    }

  end

  private

  def chat_params
    params.require(:chatapi).permit(
      :user_id, :chat_partner_id, :chat_starter_id
    )
  end

end
