class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email])
    devise_parameter_sanitizer.permit(
      :account_update,
      keys: [
        :email,
        :password,
        :password_confirmation,
        :current_password,
        :avatar,
        :avatar_cache,
        :remove_avatar
      ]
    )
  end

  private

  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end
