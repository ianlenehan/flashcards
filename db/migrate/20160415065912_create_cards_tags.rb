class CreateCardsTags < ActiveRecord::Migration
  def change
    create_table :cards_tags, :id => false do |t|
      t.integer :card_id
      t.integer :tag_id
    end
  end
end
