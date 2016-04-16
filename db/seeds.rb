
#### ------------- CREATING USERS ------------ ####

User.destroy_all

emily = User.create(name_first: 'Emily', name_last: 'Quill', email: 'emily@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: false, photo: 'http://www.fillmurray.com/150/150')
ian = User.create(name_first: 'Ian', name_last: 'Lenehan', email: 'ian@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: false, photo: 'http://www.fillmurray.com/150/150')
harrison = User.create(name_first: 'Harrison', name_last: 'Reid', email: 'harrison@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: false, photo: 'http://www.fillmurray.com/150/150')
jackAdmin = User.create(name_first: 'Jack', name_last: 'Jeffress', email: 'admin@example.com', password: 'chicken', password_confirmation: 'chicken', lifetime_score: 0, admin: true, photo: 'http://www.fillmurray.com/150/150')



#### ------------- CREATING CATEGORIES ------------ ####

Category.destroy_all

spanish = Deck.create(name: 'Spanish')
french = Category.create(name: 'French')
javascript = Category.create(name: 'JavaScript')
ruby = Category.create(name: 'Ruby')
biology = Category.create(name: 'Biology')
us_civil_war = Category.create(name: 'US Civil War')


#### ------------- CREATING DECKS ------------ ####

Deck.destroy_all

# SPANISH

spanish_101 = Deck.create(name: 'Spanish 101')
spanish_food = Deck.create(name: 'Spanish - Food')
spanish_getting_around = Deck.create(name: 'Spanish - Getting Around')

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
