class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name_first
      t.string :name_last
      t.string :email
      t.string :password_digest
      t.integer :lifetime_score
      t.text :photo
      t.boolean :admin, default: false

      t.timestamps null: false
    end
  end
end
