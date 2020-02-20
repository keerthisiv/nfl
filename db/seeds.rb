# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
rushing_json = JSON.parse(File.read("rushing.json"))
rushing_json.each do |player_rushing|
  team = Team.find_or_create_by!(name: player_rushing['Team'])
  player = Player.find_or_create_by(name: player_rushing['Player'])
  player.update_attributes({team_id: team.id, position: player_rushing['Pos']})
  performance_attributes = {
    player_id: player.id,
    position: player_rushing['Pos'],
    team_id: team.id,
    attempts_per_game: player_rushing['Att/G'],
    attempts: player_rushing['Att'],
    total_yards: player_rushing['Yds'],
    average_yards_per_attempt: player_rushing['Avg'],
    yards_per_game: player_rushing['Yds/G'],
    total_touch_down: player_rushing['TD'],
    longest_rush: player_rushing['Lng'],
    first_down: player_rushing['1st'],
    first_down_percentage: player_rushing['1st%'],
    twenty_plus_rush: player_rushing['20+'],
    fourty_plus_rush: player_rushing['40+'],
    fumbles: player_rushing['FUM']
  }
  Performance.create(performance_attributes)
end
