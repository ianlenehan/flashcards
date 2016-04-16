class DropTableCardsTags < ActiveRecord::Migration
  def change
    drop_table :cards_tags
  end
end
