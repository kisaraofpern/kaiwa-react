Rails.application.routes.draw do
  root 'home#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :anilistapi, only: [:index, :create]
    end
  end
end
