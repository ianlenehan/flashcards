json.array!(@decks) do |deck|
  json.extract! deck, :id, :name, :user_id, :category_id
  json.user deck.user
  json.cards deck.cards
  json.tags deck.tag_list

  json.url deck_url(deck, format: :json)
end
