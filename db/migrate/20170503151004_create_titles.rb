class CreateTitles < ActiveRecord::Migration[5.0]
  def change
    create_table :titles do |t|
      t.string :full_title, null: false
      t.string :language, null: false

      t.timestamps null: false
    end
  end
end
