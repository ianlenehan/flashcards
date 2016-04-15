class Category < ActiveRecord::Base
  has_many :decks
end
