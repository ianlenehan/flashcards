Rails.application.routes.draw do

  get '/users/current_user' => 'users#current_user'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/home' => 'decks#home'


  resources :scores
  resources :tags
  resources :categories
  resources :decks
  resources :cards
  resources :users
  resources :favourites

  root :to => 'sessions#new'


end
