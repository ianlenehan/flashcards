class AddPecentScoreColumnToScores < ActiveRecord::Migration
  def change
    add_column :scores, :percent_score, :float
  end
end
