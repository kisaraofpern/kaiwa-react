class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :animetags

  has_many :matches
  has_many :matched_users, through: :matches, dependent: :destroy

  has_many :chats
  has_many :messages, through: :chats

  def get_match_quotient(other_user)
    final_match_quotient = 0

    friend_all_anime_list = other_user.animetags.pluck(:anilist_id).uniq
    friend_to_watch_list = Animetag.where("user_id = #{other_user.id} and tag_id=0").pluck(:anilist_id)
    friend_loved_it_list = Animetag.where("user_id = #{other_user.id} and tag_id=1").pluck(:anilist_id)
    friend_meh_list = Animetag.where("user_id = #{other_user.id} and tag_id=2").pluck(:anilist_id)
    friend_hated_it_list =
      Animetag.where("user_id = #{other_user.id} and tag_id=3").pluck(:anilist_id)

    all_anime_list = self.animetags.pluck(:anilist_id).uniq
    to_watch_list = Animetag.where("user_id = #{self.id} and tag_id=0").pluck(:anilist_id)
    loved_it_list = Animetag.where("user_id = #{self.id} and tag_id=1").pluck(:anilist_id)
    meh_list = Animetag.where("user_id = #{self.id} and tag_id=2").pluck(:anilist_id)
    hated_it_list =
      Animetag.where("user_id = #{self.id} and tag_id=3").pluck(:anilist_id)

    common_to_watch = to_watch_list.size - (to_watch_list - friend_to_watch_list).size
    common_loved_it = loved_it_list.size - (loved_it_list - friend_loved_it_list).size
    common_meh = meh_list.size - (meh_list - friend_meh_list).size
    common_hated_it = hated_it_list.size - (hated_it_list - friend_hated_it_list).size

    match_quotient = (0.1 * common_to_watch +
                      0.4 * common_loved_it +
                      0.1 * common_meh +
                      0.4 * common_hated_it
                     )/(common_to_watch+common_loved_it+common_meh+common_hated_it)

    if !match_quotient.to_f.nan?
      titles_in_common =  (all_anime_list - friend_all_anime_list) ?
                          (all_anime_list - friend_all_anime_list).size :
                          (friend_all_anime_list - all_anime_list).size

      unique_titles = (all_anime_list.size + friend_all_anime_list.size - titles_in_common)

      viewing_multiplier = 1 - (titles_in_common / unique_titles)

      final_match_quotient = (match_quotient * viewing_multiplier * 100)
    end
    final_match_quotient
  end
  # handle_asynchronously :match_quotient_calculator
end
