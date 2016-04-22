class AddDefaultValueToLifetimeScore < ActiveRecord::Migration
  def change
    change_column :users, :lifetime_score, :integer, :default => 0
  end
end
