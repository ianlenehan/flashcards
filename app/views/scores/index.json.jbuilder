json.array!(@scores) do |score|
  json.extract! score, :id, :deck_id, :user_id, :score
  json.url score_url(score, format: :json)
end
