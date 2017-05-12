Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  root 'home#index'

  devise_for :users, :controllers => { :registrations => :registrations }

  devise_scope :user do
    get "sign_out", to: 'devise/sessions#destroy'

  end

  resources :users, only: [:show, :edit, :update] do
    resources :chats, only: [:index, :show, :create]
    resources :messages, only: [:index, :create, :destroy]
  end

  namespace :api do
    namespace :v1 do
      resources :anilistapi, only: [:index, :create]
      resources :animetagsapi, only: [:index, :create]
      resources :userapi, only: [:index]
      resources :chatapi, only: [:create]
      resources :messagesapi, only: [:create]
      resources :matchesapi, only: [:create]
    end
  end
end
