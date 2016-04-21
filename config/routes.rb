Rails.application.routes.draw do

  get '/users/current_user' => 'users#current_user'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/home' => 'categories#home'
  delete '/favourites/:id' => 'favourites#destroy'
  post '/cards/:id/remove' => 'cards#remove', :as => 'card_remove'
  post '/decks/:deckid/add' => 'decks#addCard'
  get '/main' => 'decks#home'



  resources :scores
  resources :tags
  resources :categories
  resources :decks
  resources :cards
  resources :users
  resources :favourites

  root :to => 'sessions#new'


end
