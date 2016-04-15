json.array!(@cards) do |card|
  json.extract! card, :id, :question, :answer, :user_id, :flags
  json.url card_url(card, format: :json)
end
