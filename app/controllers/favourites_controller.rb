class FavouritesController < ApplicationController
  def index
    @favourites = Favourite.all
  end

  def create
    @favourite = Favourite.new favourite_params

    respond_to do |format|
      if @favourite.save
        format.html { redirect_to @favourite, notice: 'Favourite was added.' }
        format.json { render :json => { :status => 'ok' } }
      else
        format.html { render :new }
        format.json { render json: @favourite.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def favourite_params
    params.permit(:deck_id, :user_id)
  end
end
