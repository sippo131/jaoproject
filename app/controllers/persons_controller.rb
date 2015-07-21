class PersonsController < ApplicationController
	def edit
		@person = Person.find(params[:id])
	end

	def create
		@person = Person.new(person_params)
		@story = Story.find_by(id: @person.story_id)
		if @person.save
			redirect_to @story
		else
			redirect_to @story
		end
	end

	def update
		@person = Person.find(params[:id])
		@story = Story.find_by(id: @person.story_id)
    if @person.update_attributes(person_params)
      redirect_to @story
    else
      render edit_person_path
    end
  end



	def destroy
		@person = Person.find(params[:id])
		@story = Story.find_by(id: @person.story_id)
		@person.destroy
		redirect_to @story
	end

	private

	def person_params
		params.require(:person).permit(:p_name, :character,:story_id)
	end

end
