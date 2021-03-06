<?php

class ProjectMobileApiController extends ApiBaseController {

	public function getIndex(){
        $projects = Project::with(['faculty','researchers','cover'])->get();
        return $this->ok($projects);
	}

    public function getView($id){
        $id = (int) $id;
        $project = Project::with(['faculty.logo','researchers','cover','fulltext'])->find($id);
        if ($project){
            return $this->ok($project);
        }else {
            return $this->error(null,"Project id:$id is invalid");
        }
    }

    public function getCover($id){
        $id = (int) $id;
        $project = Project::find($id);
        $cover = $project->cover()->first();
        return $this->ok($cover);
    }

    public function getPhotos($id){
        $id = (int) $id;
        $project = Project::find($id);
        $photos = $project->photos()->get();
        return $this->ok($photos);
    }

    public function getSearchProject($text){
        $fuculty = Project::whereNull('deleted_at')
            ->whereNested(function($query) use ($text) {
                $query->orWhere('name_th', '=~', ".*(?i)$text.*");
                $query->orWhere('name_en', '=~', ".*(?i)$text.*");

            })
            ->take(10)
            ->get();
        return Response::json($fuculty);
    }

    public function postSaveFulltext($id){

        $id = (int)$id;
        $project = Project::find((int)$id);

        if(Input::hasFile('file')){
            $file = Input::file('file');
            $fulltextfile = $this->createFile($id,$file);
            $fulltextfile->save();
        }

        $project->fulltext()->save($fulltextfile);

        return $this->ok($fulltextfile,"FullText File has been upload successfully.");
    }

    public function getFullText($id){
        $id = (int)$id;
        $project = Project::find((int)$id);

        $fulltext = $project->fulltext()->first();

        return $this->ok($fulltext);
    }

    public function getAllVideo(){
        $projects = Project::with(['videos'])->get();
        $videos = [];

        foreach($projects as $project){
            $p_videos = $project->videos()->with([])->get();
            $project->executive_summary = "";
            foreach($p_videos as $v){
                $v->project = $project;
                array_push($videos,$v);
            }
        }

        return $this->ok($videos);

    }
}
