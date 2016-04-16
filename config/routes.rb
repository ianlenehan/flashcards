Rails.application.routes.draw do

  get '/users/current_user' => 'users#current_user'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'

  resources :scores
  resources :tags
  resources :categories
  resources :decks
  resources :cards
  resources :users

  root :to => 'decks#home'


end
