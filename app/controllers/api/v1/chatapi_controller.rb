class Api::V1::ChatapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token, only: [:index, :create]

  def create
    user_id = chat_params["user_id"]
    chat_partner_id = chat_params["chat_partner_id"]
    chat_starter_id = chat_params["chat_starter_id"]

    existingChat = Chat.where([
      "user_id = ? and chat_partner_id = ? and chat_starter_id = ?",
      user_id,
      chat_partner_id,
      chat_starter_id
      ])

    if existingChat.size === 0
      newChat = Chat.create(
        user_id: user_id,
        chat_partner_id: chat_partner_id,
        chat_starter_id: chat_starter_id
      )

      existingChat = newChat
    else
      existingChat = existingChat[0]
    end

    render :json => {chat: existingChat}
  end

  private

  def chat_params
    params.require(:chatapi).permit(
      :user_id, :chat_partner_id, :chat_starter_id
    )
  end

end
