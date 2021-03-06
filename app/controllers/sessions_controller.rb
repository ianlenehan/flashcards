class SessionsController < ApplicationController
  def new
    if @current_user.present?
      redirect_to home_path
    end
  end

  def create
    user = User.find_by :email => params[:email]
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path
    else
      flash[:error] = "Invalid credentials"
      redirect_to login_path
    end
  end

    def destroy
      session[:user_id] = nil
      redirect_to root_path
    end
  end
