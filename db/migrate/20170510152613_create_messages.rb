class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :message, null: false

      t.belongs_to :chat, null: false
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
