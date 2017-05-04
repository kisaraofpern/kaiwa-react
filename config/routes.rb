Rails.application.routes.draw do
  root 'home#index'

  devise_for :users
  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :anilistapi, only: [:index, :create]
      resources :userapi, only: [:index]
    end
  end
end
