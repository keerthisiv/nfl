# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_20_021729) do

  create_table "performances", force: :cascade do |t|
    t.integer "player_id"
    t.string "position"
    t.integer "team_id"
    t.float "attempts_per_game"
    t.integer "attempts"
    t.integer "total_yards"
    t.float "average_yards_per_attempt"
    t.float "yards_per_game"
    t.integer "total_touch_down"
    t.string "longest_rush"
    t.integer "first_down"
    t.float "first_down_percentage"
    t.integer "twenty_plus_rush"
    t.integer "fourty_plus_rush"
    t.integer "fumbles"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["longest_rush"], name: "index_performances_on_longest_rush"
    t.index ["player_id"], name: "index_performances_on_player_id"
    t.index ["team_id"], name: "index_performances_on_team_id"
    t.index ["total_touch_down"], name: "index_performances_on_total_touch_down"
    t.index ["total_yards"], name: "index_performances_on_total_yards"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.integer "team_id"
    t.string "position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["team_id"], name: "index_players_on_team_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "performances", "players"
  add_foreign_key "performances", "teams"
  add_foreign_key "players", "teams"
end
