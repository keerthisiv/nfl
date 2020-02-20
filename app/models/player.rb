class Player < ApplicationRecord
  include ActiveModel::Serializers::JSON
  belongs_to :team
  has_many :performances

  validates_uniqueness_of :name
end
