class Score < ActiveRecord::Base
  belongs_to :deck
  belongs_to :user
end
