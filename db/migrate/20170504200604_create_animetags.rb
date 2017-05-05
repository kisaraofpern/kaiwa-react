class CreateAnimetags < ActiveRecord::Migration[5.0]
  def change
    create_table :animetags do |t|
      t.integer :anilist_id, null: false
      t.integer :user_id, null: false

      t.integer :tag_id, null: false
      # Decoder for tag_id:
      #   0: To Watch
      #   1: Loved It!
      #   2: Meh.
      #   3. Hated It!

      t.belongs_to :user
      t.timestamps null:false
    end
  end
end
