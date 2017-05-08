require 'net/http'
require 'json'
require 'date'
require 'dotenv'
require 'uri'

Dotenv.load

class Api::V1::AnilistapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token

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

    query = params["animeId"].to_s

    uri = URI("https://anilist.co/api/anime/"+query)
    params = { access_token: @access_token }
    uri.query = URI.encode_www_form(params)
      data = get_response(uri)
    respond_with data
  end

  def create
    if !@access_token || @access_expiration < DateTime.now
      get_access_token
    end

    query = URI.encode(query_params["query"])
    uri = URI("https://anilist.co/api/"+query)

    if query.include?("browse")
      params = {
        access_token: @access_token,
        year: 2016,
        season: "spring"
      }
      uri.query = URI.encode_www_form(params)
      res = Net::HTTP.get_response(uri)
      data = JSON.parse(res.body)
      filtered_titles = data[0, 12]

      render :json => filtered_titles
    elsif query.include?("search")
      params = { access_token: @access_token }
      uri.query = URI.encode_www_form(params)
      res = Net::HTTP.get_response(uri)
      data = JSON.parse(res.body)
      filtered_titles = data[0, 12]

      render :json => filtered_titles
    else
      params = { access_token: @access_token }
      uri.query = URI.encode_www_form(params)
      res = Net::HTTP.get_response(uri)
      data = JSON.parse(res.body)
      render :json => [data]
    end
  end

  private

  def query_params
    params.require(:anilistapi).permit(
      :query
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
