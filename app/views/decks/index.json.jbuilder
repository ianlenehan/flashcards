json.array!(@decks) do |deck|
  json.extract! deck, :id, :name, :user_id
  json.url deck_url(deck, format: :json)
end
