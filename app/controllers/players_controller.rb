class PlayersController < ApplicationController
  def index
    @players = serilaized_resouce
    render component: 'Players', props: { players: @players }
  end

  private

  def serilaized_resouce
    Player.includes(:performances).map do |player|
      player.serializable_hash(include: [:performances, :team])
    end
  end
end
