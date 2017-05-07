class Api::V1::UserapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token, only: [:index, :create]

  def index
    if params["userid"]
      @this_user = User.find(params["userid"])
      render :json => @this_user
    else
      @current_user = current_user
      render :json => @current_user
    end
  end

  def create; end
end
