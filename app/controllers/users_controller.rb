class UsersController < ApplicationController
  before_action :authorize_user, only: [:edit, :update, :show]

  def show; end

  def edit; end

  def update; end
end
