class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.column :title, :text
      t.column :author, :text
      t.column :summary, :text

      t.timestamps null: false
    end
  end
end
