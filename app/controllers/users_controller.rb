class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update, :show]

  def show; end

  def create; end

  def edit; end

  def update
  end

end
