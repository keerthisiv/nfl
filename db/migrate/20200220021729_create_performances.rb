class CreatePerformances < ActiveRecord::Migration[6.0]
  def change
    create_table :performances do |t|
      t.references :player, foreign_key: true
      t.string :position
      t.references :team, foreign_key: true
      t.float :attempts_per_game
      t.integer :attempts
      t.integer :total_yards, index: true
      t.float :average_yards_per_attempt
      t.float :yards_per_game
      t.integer :total_touch_down, index: true
      t.string :longest_rush, index: true
      t.integer :first_down
      t.float :first_down_percentage
      t.integer :twenty_plus_rush
      t.integer :fourty_plus_rush
      t.integer :fumbles

      t.timestamps
    end
  end
end
