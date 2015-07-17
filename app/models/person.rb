class Person < ActiveRecord::Base
	belongs_to :story
	validates :p_name, presence: true
	validates :character, length: {maximum: 300}
end
