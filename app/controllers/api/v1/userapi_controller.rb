class Api::V1::UserapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token, only: [:index]

  def index
    @current_user = current_user
    render :json => @current_user
  end
end
