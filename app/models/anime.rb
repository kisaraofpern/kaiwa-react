class Anime < ApplicationRecord

  validates :id, numericality: true, presence: true

  validates :title_romaji, presence: true
  validates :title_english, presence: true
  validates :title_japanese, presence: true
end
