class Story < ActiveRecord::Base
	has_many :person ,dependent: :destroy
	validates :title, length: {minimum: 2}
	validates :author, length: {minimum: 4}
end
