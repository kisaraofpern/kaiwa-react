class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update, :show]

  def show
    all_users = User.all
    all_users.each do |user|
      if user.id != current_user.id
        match_quotient = current_user.get_match_quotient(user)

        existingMatch = Match.where("user_id=#{current_user.id} and matched_user_id=#{user.id}")

        if existingMatch.size === 0
          Match.create(
            user: current_user,
            matched_user: user,
            match_quotient: match_quotient
          )
        else
          existingMatch[0].update(match_quotient: match_quotient)

          inverseMatch = Match.where("user_id=#{user.id} and matched_user_id=#{current_user.id}")[0]

          inverseMatch.update(match_quotient: match_quotient)
        end
      end
    end
  end

  def create; end

  def edit; end

  def update
  end

end
