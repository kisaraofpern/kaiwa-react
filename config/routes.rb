Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, :controllers => { :registrations => :registrations }

  devise_scope :user do
    get "sign_out", to: 'devise/sessions#destroy'

  end

  resources :users, only: [:show, :edit, :update]

  namespace :api do
    namespace :v1 do
      resources :anilistapi, only: [:index, :create]
      resources :animetagsapi, only: [:index, :create]
      resources :userapi, only: [:index]
      resources :matchesapi, only: [:create]
    end
  end
end
