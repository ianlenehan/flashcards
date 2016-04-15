class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.text :question
      t.text :answer
      t.references :user, index: true, foreign_key: true
      t.integer :flags

      t.timestamps null: false
    end
  end
end
