class StorysController < ApplicationController
	def home
		@storys = Story.all
	end

	def new
		@story = Story.new
	end

	def index
		@storys = Story.all
	end

	def show
	  @story = Story.find(params[:id])
		@person = Person.new(story_id: @story.id)
		@persons = @story.person.all
	end

	def edit
		@story = Story.find(params[:id])
	end

	def update
    @story = Story.find(params[:id])
    if @story.update_attributes(story_params)
      redirect_to @story
    else
      render 'edit'
    end
  end

	def destroy
		Story.find(params[:id]).destroy
		redirect_to storys_path
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
