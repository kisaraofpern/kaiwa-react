class Api::V1::AnimetagsapiController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token

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
    ])
    if existingTag.size === 0
      animeTag = Animetag.create(
        user_id: user_id,
        anilist_id: anilist_id,
        tag_id: tag_id
      )
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
end
