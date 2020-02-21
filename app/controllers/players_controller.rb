class PlayersController < ApplicationController
  def index
    all_players = Player.where(nil).includes(:performances, :team)
    @players = serilaized_resouce(all_players)
    render component: 'Players', props: { players: @players }
  end

  def search
    players = Player.where(nil)
    players = players.by_name(params[:name]) if params[:name]
    if params[:order]
      order = params[:order].split(',').each_slice(2) do |order_name, dir|
        players = players.order_by_perf(order_name, dir)
      end
    end

    @players = serilaized_resouce(players.includes(:performances, :team))
    render :json => { players: @players }
  end

  private

  def serilaized_resouce(players)
    list = []
    players.each do |player|
      list << player.serializable_hash(include: [:performances, :team])
    end
    list
  end
end
