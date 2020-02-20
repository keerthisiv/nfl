class PlayersController < ApplicationController
  def index
    @players = serilaized_resouce(Player.all)
    render component: 'Players', props: { players: @players }
  end

  def search
    players = Player.where("lower(name) LIKE ?", "%#{params[:name]}%")
    @players = serilaized_resouce(players)
    render :json => { players: @players }
  end

  private

  def serilaized_resouce(players)
    players.map do |player|
      player.serializable_hash(include: [:performances, :team])
    end
  end
end
