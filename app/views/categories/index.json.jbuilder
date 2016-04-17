json.array!(@categories) do |category|
  json.extract! category, :id, :name
  json.decks category.decks

  json.url category_url(category, format: :json)
end
