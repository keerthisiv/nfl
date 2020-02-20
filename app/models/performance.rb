class Performance < ApplicationRecord
  include ActiveModel::Serializers::JSON
  belongs_to :player
  belongs_to :team
end
