class Deck < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :cards
  belongs_to :category
  has_many :scores
  has_many :favourites
  acts_as_taggable
end
