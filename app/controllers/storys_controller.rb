class StorysController < ApplicationController
	def index
		@storys = Story.all
	end

	def show
	  @story = Story.find(params[:id])
		@persons = @story.person.all
	end

	def edit
		@story = Story.find(params[:id])
	end

	def new
		@story = Story.new
	end

end
