class Match < ApplicationRecord
  before_action: :resync_matches, only: :index

  def index
    @matched_users = current_user.matched_users.page(params[:page])
  end
end
