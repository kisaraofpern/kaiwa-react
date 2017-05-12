class MessagesChannel < ApplicationCable::Channel
  def subscribed
    chat = Chat.find(params[:id])
    stream_for chat
  end

  def unsubscribed
    stop_all_streams
  end
end
