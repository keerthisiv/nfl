class PlayersController < ApplicationController
  def index
    @players = JSON.parse(File.read("rushing.json"))
    render component: 'Players', props: { players: @players }
  end
end
