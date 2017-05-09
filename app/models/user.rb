class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :animetags

  has_many :matches
  has_many :matched_users, through: :matches

  dependent: :destroy

  def after_database_authentication
    users_to_match = User.where.not(id: current_user.id)

    users_to_match.each do |friend|
      friend_all_anime_list = @friend.animetags.pluck(:anilist_id).uniq
      friend_to_watch_list = Animetag.where("user_id = #{@friend.id} and tag_id=0").pluck(:anilist_id)
      friend_loved_it_list = Animetag.where("user_id = #{@friend.id} and tag_id=1").pluck(:anilist_id)
      friend_meh_list = Animetag.where("user_id = #{@friend.id} and tag_id=2").pluck(:anilist_id)
      friend_hated_it_list =
        Animetag.where("user_id = #{friend.id} and tag_id=3").pluck(:anilist_id)

      all_anime_list = @user.animetags.pluck(:anilist_id).uniq
      to_watch_list = Animetag.where("user_id = #{current_user.id} and tag_id=0").pluck(:anilist_id)
      loved_it_list = Animetag.where("user_id = #{current_user.id} and tag_id=1").pluck(:anilist_id)
      meh_list = Animetag.where("user_id = #{current_user.id} and tag_id=2").pluck(:anilist_id)
      hated_it_list =
        Animetag.where("user_id = #{current_user.id} and tag_id=3").pluck(:anilist_id)

      match_magic = 

  end
end
