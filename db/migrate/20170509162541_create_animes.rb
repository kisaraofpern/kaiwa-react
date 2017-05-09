class CreateAnimes < ActiveRecord::Migration[5.0]
  def change
    create_table :animes do |t|
      t.integer :anilist_id, null: false
      t.string  :title_romaji, null: false
      t.string  :title_english, null: false
      t.string  :title_japanese, null: false
      t.string  :genres
      t.string  :image_url_sml
      t.string  :image_url_med
      t.string  :image_url_lge
      t.string  :image_url_banner
      t.string  :description

      t.timestamps null: false
    end
  end
end
