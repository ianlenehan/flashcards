class User < ActiveRecord::Base
  has_secure_password
  has_many :cards
  has_many :scores
  has_many :decks
  has_many :favourites
end
