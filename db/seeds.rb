# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.destroy_all

emily = User.create(name_first: 'Emily', name_last: 'Quill', email: 'emily@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: false, photo: 'http://www.fillmurray.com/150/150')
ian = User.create(name_first: 'Ian', name_last: 'Lenehan', email: 'ian@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: false, photo: 'http://www.fillmurray.com/150/150')
harrison = User.create(name_first: 'Harrison', name_last: 'Reid', email: 'harrison@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: false, photo: 'http://www.fillmurray.com/150/150')
jackAdmin = User.create(name_first: 'Jack', name_last: 'Jeffress', email: 'admin@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: true, photo: 'http://www.fillmurray.com/150/150')

Category.destroy_all

spanish = Deck.create(name: 'Spanish')
french = Category.create(name: 'French')
javascript = Category.create(name: 'JavaScript')
ruby = Category.create(name: 'Ruby')
biology = Category.create(name: 'Biology')
us_civil_war = Category.create(name: 'US Civil War')


Deck.destroy_all

spanish101 = Deck.create(name: 'Spanish 101')
spanishFood = Deck.create(name: 'Spanish - Food')
spanishGettingAround = Deck.create(name: 'Spanish - Getting Around')

french101 = Deck.create(name: 'French 101')
frenchTravel = Deck.create(name: 'French - Travel')
frenchRomance = Deck.create(name: 'French - Romance')

jsVariables = Deck.create(name: 'JS Variables')
jsConditionals = Deck.create(name: 'JS Conditionals')

rubyLoops = Deck.create(name: 'Ruby Loops')
rubyClasses = Deck.create(name: 'Ruby Classes')

biology = Deck.create(name: 'Basic Evolutionary Theory')
biology = Deck.create(name: 'Advanced Genetics')

civilWar = Deck.create(name: '')




create_table "decks", force: :cascade do |t|
  t.string   "name"
  t.integer  "user_id"
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
end
