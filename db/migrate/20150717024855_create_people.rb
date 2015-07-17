class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :pname
      t.text :character

      t.timestamps null: false
    end
  end
end
