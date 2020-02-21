class Player < ApplicationRecord
  include ActiveModel::Serializers::JSON
  belongs_to :team
  has_many :performances

  validates_uniqueness_of :name

  scope :by_name, -> (name) { where('lower(name) LIKE ?', "%#{name}%") }
  scope :order_by_perf, -> (col, dir) { joins(:performances).order("performances.#{col} #{dir}") }
end
