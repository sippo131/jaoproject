class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.integer :story_id
      t.string :p_name
      t.text :character

      t.timestamps null: false
    end
  end
end
