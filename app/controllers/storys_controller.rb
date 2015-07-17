class StorysController < ApplicationController
	def new
		@story = Story.new
	end

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

	def create
   @story = Story.new(story_params)
   if @story.save
     redirect_to @story
   else
     render 'new'
   end
  end



	private

		def story_params
			params.require(:story).permit(:title, :author, :summary,:url)
		end

end
