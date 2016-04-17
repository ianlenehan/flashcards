json.extract! @deck, :id, :name, :user_id, :category_id, :created_at, :updated_at
json.cards @deck.cards
