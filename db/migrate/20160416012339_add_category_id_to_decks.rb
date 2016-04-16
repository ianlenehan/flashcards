class AddCategoryIdToDecks < ActiveRecord::Migration
  def change
    add_column :decks, :category_id, :integer
  end
end
