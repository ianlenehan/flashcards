Rails.application.routes.draw do
  resources :scores
  resources :tags
  resources :categories
  resources :decks
  resources :cards
  resources :users

  root :to => 'decks#home'
  
end
