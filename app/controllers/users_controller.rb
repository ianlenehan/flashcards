class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user
    decks = Deck.all
    scores = Score.all
    @myDecks = decks.where :user_id => @user.id
    myScores = scores.where :user_id => @user.id
    @myScores = myScores.order(params[:sort]).reverse;

  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    req = Cloudinary::Uploader.upload( params[:user][:photo] )

    @user = User.new(user_params)
    @user.photo = req["url"]
    if @user.save
      session[:user_id] = @user.id
      redirect_to home_path
    else
      render :new
    end

    #
    # respond_to do |format|
    #   if @user.save
    #     format.html { redirect_to @user, notice: 'User was successfully created.' }
    #     format.json { render :show, status: :created, location: @user }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @user.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    req = Cloudinary::Uploader.upload( params[:user][:photo] ) if params[:user][:photo]
    user = @current_user
    user.photo = req["url"] if req
    user.update user_params
    redirect_to user_path

    # respond_to do |format|
    #   if @user.update(user_params)
    #     format.html { redirect_to @user, notice: 'User was successfully updated.' }
    #     format.json { render :show, status: :ok, location: @user }
    #   else
    #     format.html { render :edit }
    #     format.json { render json: @user.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  def current_user
    render json: @current_user.to_json(include: [:decks, ])
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:id, :name_first, :name_last, :email, :password, :password_confirmation, :lifetime_score, :admin)
    end
end
