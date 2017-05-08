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

  attr_accessor :access_token, :access_expiration

  def index
    if !params["userid"]
      @user = current_user
      render :json => @user
    else
      @user = User.find(params["userid"])

      if !@access_token || @access_expiration < DateTime.now
        get_access_token
      end

      allAnimeList = @user.animetags.pluck(:anilist_id).uniq
      toWatchList = Animetag.where("user_id = 1 and tag_id=0").pluck(:anilist_id)
      lovedItList = Animetag.where("user_id = 1 and tag_id=1").pluck(:anilist_id)
      mehList = Animetag.where("user_id = 1 and tag_id=2").pluck(:anilist_id)
      hatedItList = Animetag.where("user_id = 1 and tag_id=3").pluck(:anilist_id)

      allAnime = getAnime(allAnimeList)
      toWatch  = getAnime(toWatchList)
      lovedIt  = getAnime(lovedItList)
      meh      = getAnime(mehList)
      hatedIt  = getAnime(hatedItList)

      render :json => {
        user: @user,
        tags: @user.animetags,
        allAnime: allAnime,
        toWatch: toWatch,
        lovedIt: lovedIt,
        meh: meh,
        hatedIt: hatedIt
      }
    end
  end

  def create; end

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

  def getAnime(list)
    animeList = []
    list.each do |anilist_id|
      animeHash = {}
      uri = URI("https://anilist.co/api/anime/#{anilist_id}")
      params = { access_token: @access_token }
      uri.query = URI.encode_www_form(params)
      data = get_response(uri)
      animeHash["object"] = data
      animeHash["animeTags"] = Animetag.where("user_id = 1 and anilist_id=#{anilist_id}").pluck(:tag_id)
      animeList.push(animeHash)
    end
    return animeList
  end
end
