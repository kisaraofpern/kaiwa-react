class Chat < ApplicationRecord
  belongs_to :user
  belongs_to :chat_partner, class_name: "User"
  belongs_to :chat_starter, class_name: "User"

  has_many :messages, dependent: :destroy

  after_create :create_inverse, unless: :has_inverse?
  after_destroy :destroy_inverses, if: :has_inverse?

  def create_inverse
    self.class.create(inverse_match_options)
  end

  def destroy_inverses
    inverses.destroy_all
  end

  def has_inverse?
    self.class.exists?(inverse_match_options)
  end

  def inverse_match_options
    self.class.where(inverse_match_options)
  end

  def inverse_match_options
    { chat_partner_id: user_id,
      user_id: chat_partner_id,
      chat_starter_id: chat_starter_id }
  end
end
