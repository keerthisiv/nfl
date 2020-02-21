class PlayersController < ApplicationController
  def index
    @players = serilaized_resouce(Player.all)
    render component: 'Players', props: { players: @players }
  end

  def search
    players = Player.where(nil)
    players = players.by_name(params[:name])
    if params[:order]
      order = params[:order].split(',').each_slice(2) do |order_name, dir|
        players = players.order_by_perf(order_name, dir)
      end
    end

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
