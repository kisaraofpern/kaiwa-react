class Match < ApplicationRecord
  def index
    @matched_users = current_user.matched_users.page(params[:page])
  end
end
