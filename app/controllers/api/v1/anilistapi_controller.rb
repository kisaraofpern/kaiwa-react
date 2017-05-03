require 'net/http'
require 'json'
require 'date'
require 'dotenv'

Dotenv.load

class Api::V1::AnilistapiController < Api::V1::BaseController

  @access_token = nil
  @access_expiration = nil

  attr_accessor :access_token, :access_expiration

  def index
    # if @access_token does NOT exist or
    # current time is after @access_expiration,
    # get a new access token.
    if !@access_token || @access_expiration < DateTime.now
      get_access_token
    end

    uri = URI("https://anilist.co/api/anime/1")
    params = { access_token: @access_token }
    uri.query = URI.encode_www_form(params)
    res = Net::HTTP.get_response(uri)
    data = JSON.parse(res.body)
    respond_with data
  end

  private

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
