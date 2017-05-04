class Api::V1::UserapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token, only: [:index]
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render :json {current_user}
  end
end
