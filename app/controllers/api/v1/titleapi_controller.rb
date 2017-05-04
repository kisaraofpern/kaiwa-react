require 'net/http'
require 'json'
require 'date'

class Api::V1::TitleapiController < Api::V1::BaseController
  skip_before_filter :verify_authenticity_token

  def create
    filtered_titles = Title.search(query_params["query"])
    filtered_titles.each do |title|
    end
    binding.pry
    render :json => filtered_titles
  end

  private

  def query_params
    params.require(:titleapi).permit(
      :query
    )
  end

end
