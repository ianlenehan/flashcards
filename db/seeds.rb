
#### ------------- DESTROY EVERYTHING ------------- ####

# Keep in this order
Score.destroy_all
Card.destroy_all
Deck.destroy_all
Category.destroy_all
User.destroy_all

#### ------------- CREATING USERS ------------ ####


emily = User.create(name_first: 'Emily', name_last: 'Quill', email: 'emily@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: false, photo: 'http://www.fillmurray.com/150/150')
ian = User.create(name_first: 'Ian', name_last: 'Lenehan', email: 'ian@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: false, photo: 'http://www.fillmurray.com/150/150')
harrison = User.create(name_first: 'Harrison', name_last: 'Reid', email: 'harrison@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: false, photo: 'http://www.fillmurray.com/150/150')
jackAdmin = User.create(name_first: 'Jack', name_last: 'Jeffress', email: 'admin@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: true, photo: 'http://www.fillmurray.com/150/150')



#### ------------- CREATING CATEGORIES ------------ ####

spanish = Category.create(name: 'Spanish')
french = Category.create(name: 'French')
javascript = Category.create(name: 'JavaScript')
ruby = Category.create(name: 'Ruby')
biology = Category.create(name: 'Biology')
us_civil_war = Category.create(name: 'US Civil War')

#### ------------- CREATING DECKS ------------ ####


# SPANISH

spanish_101 = Deck.create(name: 'Spanish 101' )
spanish_101.tag_list.add("spanish, beginners", parse: true)
spanish_food = Deck.create(name: 'Spanish - Food')
spanish_food.tag_list.add("spanish, beginners, food", parse: true)
spanish_getting_around = Deck.create(name: 'Spanish - Getting Around')
spanish_getting_around.tag_list.add("spanish, beginners, transport", parse: true)

# FRENCH

french_101 = Deck.create(name: 'French 101')
french_travel = Deck.create(name: 'French - Travel')
french_dating = Deck.create(name: 'French - Dating')

# BIOLOGY

evolution = Deck.create(name: 'Basic Evolutionary Theory')
genetics = Deck.create(name: 'Advanced Genetics')

# JAVASCRIPT

js_variables = Deck.create(name: 'JS Variables')
js_conditionals = Deck.create(name: 'JS Conditionals')

# RUBY

ruby_loops = Deck.create(name: 'Ruby Loops')
ruby_classes = Deck.create(name: 'Ruby Classes')

# US CIVIL WAR

custers_last_stand = Deck.create(name: 'Custers Last Stand')
general_grant = Deck.create(name: 'General Grant')
general_lee = Deck.create(name: 'General Lee')


#### ------------- CREATING CARDS ------------ ####


# CARDS FOR SPANISH FOOD
melon = Card.create(question: 'What is the spanish word for "melon"?', answer: 'melon')
strawberry = Card.create(question: 'What is the spanish word for "strawberry"?', answer: 'fresa')
pear = Card.create(question: 'What is the spanish word for "pear"?', answer: 'pera')
banana = Card.create(question: 'What is the spanish word for "banana"?', answer: 'banano')
apple = Card.create(question: 'What is the spanish word for "apple"?', answer: 'manzana')
mango = Card.create(question: 'What is the spanish word for "mango"?', answer: 'mango')
lemon = Card.create(question: 'What is the spanish word for "lemon"?', answer: 'limon')
grapes = Card.create(question: 'What is the spanish word for "grapes"?', answer: 'uvas')

# CARDS FOR JS Variables
sillycard = Card.create(question: 'What is a variable?', answer: 'yes')

#### ------------- ASSIGNING SPANISH FOOD CARDS TO SPANISH_FOOD DECK ------------ ####

spanish_food.cards << melon << strawberry << pear << banana << apple << mango << lemon << grapes

js_variables.cards << sillycard

#### ------------- ASSIGNING CARDS TO USERS ------------ ####
emily.cards << melon << strawberry << pear << banana << apple << mango << lemon << grapes

harrison.cards << sillycard
#### ------------- ASSIGNING DECKS TO CATEGORIES ------------ ####

spanish.decks << spanish_101 << spanish_food << spanish_getting_around
french.decks << french_101 << french_travel << french_dating
biology.decks << evolution << genetics
javascript.decks << js_variables << js_conditionals
ruby.decks << ruby_loops << ruby_classes
us_civil_war.decks << custers_last_stand << general_grant << general_lee


#### ------------- ASSIGNING DECKS TO USERS ------------ ####

emily.decks << spanish_101 << spanish_food << spanish_getting_around
emily.decks << french_101 << french_travel << french_dating
emily.decks << evolution << genetics

ian.decks << custers_last_stand << general_grant << general_lee
ian.decks << ruby_loops << ruby_classes

harrison.decks << js_variables << js_conditionals

#### ------------- ASSIGNING FAVOURITE DECKS TO USERS ------------ ####

Favourite.create(deck_id: custers_last_stand.id, user_id: ian.id)
Favourite.create(deck_id: ruby_loops.id, user_id: ian.id)
