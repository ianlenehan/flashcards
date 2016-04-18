Rails.application.routes.draw do

  get '/users/current_user' => 'users#current_user'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  delete '/favourites/:id' => 'favourites#destroy'

  resources :scores
  resources :tags
  resources :categories
  resources :decks
  resources :cards
  resources :users
  resources :favourites

  root :to => 'decks#home'


end
