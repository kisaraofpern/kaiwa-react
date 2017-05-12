class CreateChats < ActiveRecord::Migration[5.0]
  def change
    create_table :chats do |t|
      t.references :user, index: true, foreign_key: true
      t.references :chat_partner, index: true
      t.references :chat_starter, index: true

      t.timestamps null: false
    end

    add_foreign_key :chats, :users, column: :chat_partner_id
    add_foreign_key :chats, :users, column: :chat_starter_id
    add_index :chats, [:user_id, :chat_partner_id], unique: true
  end
end
