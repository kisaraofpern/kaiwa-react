class Animetag < ApplicationRecord
  validates :anilist_id, numericality: {
    only_integer: true,
    greater_than: 0
  }

  validates :user_id, numericality: {
    only_integer: true,
    greater_than: 0
  }

  validates :tag_id, inclusion: { in: [0, 1, 2, 3] }

  belongs_to :user
end
