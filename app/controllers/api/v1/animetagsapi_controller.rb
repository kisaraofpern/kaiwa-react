require 'net/http'
require 'json'
require 'date'
require 'dotenv'
require 'uri'

Dotenv.load

class Api::V1::AnimetagsapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token

  @access_token = nil
  @access_expiration = nil

  attr_accessor :access_token, :access_expiration

  def index
    user_id = params["userid"]
    anilist_id = params["animeid"]

    if anilist_id
      @allTags = Animetag.where([
        "user_id = ? and anilist_id = ?",
        user_id,
        anilist_id
        ])
    else
      @allTags = Animetag.where("user_id = #{user_id}")
    end
    render :json => @allTags
  end

  def create
    user_id = params["animetagsapi"]["user"]["id"]
    anilist_id = animetag_params["anilist_id"]
    tag_id = animetag_params["tag_id"]
    existingTag = Animetag.where([
      "user_id = ? and anilist_id = ? and tag_id = ?",
      user_id,
      anilist_id,
      tag_id
    ]);
    if existingTag.size === 0
      Animetag.create(
        user_id: user_id,
        anilist_id: anilist_id,
        tag_id: tag_id
      )
      existingAnime = Anime.where(["anilist_id = ?", anilist_id])
      if existingAnime.size === 0
        if !@access_token || DateTime.new(@access_expiration) < DateTime.now
          get_access_token
        end

        query = anilist_id.to_s

        uri = URI("https://anilist.co/api/anime/"+query)
        params = { access_token: @access_token }
        uri.query = URI.encode_www_form(params)
        data = get_response(uri)

        if data["description"]
          newDescription = data["description"].gsub("<br>", "")
        else
          newDescription = "not available"
        end

        binding.pry

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
    else
      Animetag.destroy(existingTag[0].id)
    end
  end

  private

  def animetag_params
    params.require(:animetagsapi).permit(
      :anilist_id, :tag_id
    )
  end

  def get_response(uri)
    res = Net::HTTP.get_response(uri)
    data = JSON.parse(res.body)
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
