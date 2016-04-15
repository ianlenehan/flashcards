class Card < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :decks
  has_and_belongs_to_many :tags
end
