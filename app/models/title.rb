class Title < ApplicationRecord
  validates :full_title, presence: true
  validates :language, presence: true

  def self.search(search)
    where('full_title ILIKE ?', "%#{search}%")
  end
end
