class Team < ApplicationRecord
  include ActiveModel::Serializers::JSON
  has_many :players
  validates_uniqueness_of :name
end
