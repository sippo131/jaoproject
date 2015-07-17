class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.column :title, :string
      t.column :author, :string
      t.column :summary, :text
      t.column :url, :string

      t.timestamps null: false
    end
  end
end
