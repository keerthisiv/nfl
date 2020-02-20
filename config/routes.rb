Rails.application.routes.draw do
  root to: 'players#index'
  get '/search', to: 'players#search'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
