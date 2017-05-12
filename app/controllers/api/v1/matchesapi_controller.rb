class Api::V1::MatchesapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token, only: [:index, :create]

  def create
    user_id = matches_params["user_id"]
    this_user = User.find(user_id)
    all_users = User.all
    all_users.each do |other_user|
      if this_user.id != other_user.id
        match_quotient = this_user.get_match_quotient(other_user)
        existing_match = Match.where(
          "user_id = #{this_user.id} and matched_user_id = #{other_user.id}"
        )

        if existing_match.size === 0
          Match.create(
            user: this_user,
            matched_user: other_user,
            match_quotient: match_quotient
          )
        else
          existing_match[0].match_quotient = match_quotient

          inverse_match = Match.where(
            "user_id = #{other_user.id} and matched_user_id = #{this_user.id}"
          )

          inverse_match[0].match_quotient = match_quotient
          existing_match[0].save
          inverse_match[0].save
        end
      end
    end
  end

  def matches_params
    params.require(:matchesapi).permit(:user_id)
  end
end
