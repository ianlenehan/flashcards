class DecksController < ApplicationController
  before_action :set_deck, only: [:show, :edit, :update, :destroy]

  def home
  end
  # GET /decks
  # GET /decks.json
  def index
    if request.xhr?
      @decks = Deck.includes(:cards)

    else
      if @current_user.admin == true
        @decks = Deck.includes(:cards)
      else
      @decks = @current_user.decks.includes(:cards)
      end
    end

  end



  # GET /decks/1
  # GET /decks/1.json
  def show
    flash[:deck_id] = @deck.id

  end

  # GET /decks/new
  def new
    @deck = Deck.new
    @categories = Category.all
  end

  # GET /decks/1/edit
  def edit
    @categories = Category.all
  end


  # POST /decks
  # POST /decks.json
  def create
    @deck = Deck.new(deck_params)
    @deck.user_id = @current_user.id
    @deck.tag_list.add(params[:tag_list], parse: true)

    respond_to do |format|
      if @deck.save
        format.html { redirect_to @deck, notice: 'Deck was successfully created.' }
        format.json { render :show, status: :created, location: @deck }
      else
        format.html { render :new }
        format.json { render json: @deck.errors, status: :unprocessable_entity }
      end
    end
  end

  def addCard
    @deck = Deck.find(params[:deckid])
    @card = Card.find params[:card_id]
    @deck.cards << @card
    render :json => {
      :success => 'Done'
    }
  end

  # PATCH/PUT /decks/1
  # PATCH/PUT /decks/1.json
  def update
    respond_to do |format|
      if @deck.update(deck_params)
        format.html { redirect_to @deck, notice: 'Deck was successfully updated.' }
        format.json { render :show, status: :ok, location: @deck }
      else
        format.html { render :edit }
        format.json { render json: @deck.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /decks/1
  # DELETE /decks/1.json
  def destroy
    @deck.destroy
    respond_to do |format|
      format.html { redirect_to decks_url, notice: 'Deck was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_deck
      @deck = Deck.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def deck_params
      params.require(:deck).permit(:name, :user_id, :tag_list, :deckid, :cardid, :category_id)
    end
end
