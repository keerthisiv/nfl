class PlayersController < ApplicationController
  def index
    @players = serilaized_resouce(Player.all)
    render component: 'Players', props: { players: @players }
  end

  def search
    players = Player.all
    players = Player.where('lower(name) LIKE ?', "%#{params[:name]}%") if params[:name]
    if params[:order]
      order_sql = []
      order = params[:order].split(',').each_slice(2) { |order_name, dir| order_sql << "performances.#{order_name} #{dir}" }
      players = players.joins(:performances).order(order_sql.join(', '))
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
