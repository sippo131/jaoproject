class StorysController < ApplicationController
	def index
		@storys = Story.all
	end

	def show
	  @story = Story.find(params[:id])
		@persons = @story.person.all
	end

end
