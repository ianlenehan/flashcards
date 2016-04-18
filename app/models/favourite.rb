class Favourite < ActiveRecord::Base
  belongs_to :user
  belongs_to :deck
  validates :deck_id, :user_id, :presence => true, :uniqueness => true
end
