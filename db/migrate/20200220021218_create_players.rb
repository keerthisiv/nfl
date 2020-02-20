class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.references :team, foreign_key: true
      t.string :position

      t.timestamps
    end
  end
end
