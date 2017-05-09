require 'net/http'
require 'json'
require 'date'
require 'dotenv'
require 'uri'

Dotenv.load

class Api::V1::UserapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token, only: [:index, :create]

  @access_token = nil
  @access_expiration = nil

  def index
    if !params["userid"]
      @user = current_user
      render :json => @user
    else
      @user = User.find(params["userid"])

      all_anime_list = @user.animetags.pluck(:anilist_id).uniq
      to_watch_list = Animetag.where("user_id = 1 and tag_id=0").pluck(:anilist_id)
      loved_it_list = Animetag.where("user_id = 1 and tag_id=1").pluck(:anilist_id)
      meh_list = Animetag.where("user_id = 1 and tag_id=2").pluck(:anilist_id)
      hated_it_list =
        Animetag.where("user_id = 1 and tag_id=3").pluck(:anilist_id)

      all_anime = get_anime(all_anime_list)
      to_watch  = get_anime(to_watch_list)
      loved_it  = get_anime(loved_it_list)
      meh      = get_anime(meh_list)
      hated_it  = get_anime(hated_it_list)

      top_matches_list = @user.matches.order('match_quotient DESC').limit(10)
      top_matches = get_matches(top_matches_list)

      render :json => {
        user: @user,
        tags: @user.animetags,
        allAnime: all_anime,
        toWatch: to_watch,
        lovedIt: loved_it,
        meh: meh,
        hatedIt: hated_it,
        matches: top_matches
      }
    end
  end

  def create; end

  private

  def get_anime(list)
    anime_list = []
    list.each do |anilist_id|
      anime_hash = {}

      anime = Anime.find_by anilist_id: anilist_id
      if !anime
        if !@access_token || DateTime.new(@access_expiration) < DateTime.now
          get_access_token
        end

        query = anilist_id.to_s

        uri = URI("https://anilist.co/api/anime/" + query)
        params = { access_token: @access_token }
        uri.query = URI.encode_www_form(params)
        res = Net::HTTP.get_response(uri)
        data = JSON.parse(res.body)

        new_description = (data["description"]) ?
          new_description = data["description"].gsub("<br>", "") :
          new_description = "not available"

        Anime.create(
          anilist_id: data["id"],
          title_romaji: data["title_romaji"],
          title_english: data["title_english"],
          title_japanese: data["title_japanese"],
          genres: data["genres"],
          image_url_sml: data["image_url_sml"],
          image_url_med: data["image_url_med"],
          image_url_lge: data["image_url_lge"],
          image_url_banner: data["image_url_banner"],
          description: newDescription
        )
      end

      anime_hash["object"] = anime
      anime_hash["animeTags"] =
        Animetag.where("user_id=1 and anilist_id=#{anilist_id}").pluck(:tag_id)
      anime_list.push(anime_hash)
    end
    anime_list
  end

  def get_matches(list)
    matches_list = []
    list.each do |match|
      match_hash = {}
      match_hash["user"] = match.matched_user
      match_hash["quotient"] = match.match_quotient
      matches_list.push(match_hash)
    end
    matches_list
  end

  def get_access_token
    # POST method to AniList for access token
    uri = URI("https://anilist.co/api/auth/access_token")
    res = Net::HTTP.post_form(
      uri,
      grant_type:    "client_credentials",
      client_id:     ENV["ANILIST_CLIENT_ID"],
      client_secret: ENV["ANILIST_CLIENT_SECRET"]
    )
    data = JSON.parse(res.body)
    @access_token = data["access_token"]
    @access_expiration = data["expires"]
  end
end
