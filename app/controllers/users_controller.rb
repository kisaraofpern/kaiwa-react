class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update, :show]

  def show; end

  def edit; end

  def update
    binding.pry
  end

end
