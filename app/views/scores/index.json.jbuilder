json.array!(@scores) do |score|
  json.extract! score, :id, :deck_id, :user_id, :score
  json.deck score.deck
  json.user score.user
  json.url score_url(score, format: :json)
end
