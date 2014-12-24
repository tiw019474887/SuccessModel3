/**
 * Created by chaow on 12/18/2014 AD.
 */

app.controller('ProjectListController', function ($scope,$state,$modal,projectList,ProjectService) {

    //console.log("ProjectListController");

    $scope.projects = projectList.data.data;

    $scope.open = function (size,project) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/project/project_delete.html',
            controller: 'ProjectDeleteController',
            size: size,
            resolve: {
                project: function () {
                    return project
                }
            }
        });

        modalInstance.result.then(function(result){

            ProjectService.delete(result).success(function(){
                ProjectService.getAll().success(function(response){
                    $scope.projects = response.data;
                })
            });

        })
    }


});

app.controller('ProjectDeleteController',function($scope,$modalInstance,project) {

    $scope.project = project;

    $scope.ok = function(){
        $modalInstance.close($scope.project);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }

});

app.controller('ProjectFormController', function ($scope,$state, project,FacultyService,ProjectService) {
    $scope.project= project.data.data;
    $scope.state = $state;

    $scope.save = function(){
        ProjectService.save($scope.project).success(function(response){

        })
    }

    $scope.searchFaculty = function($value){
        return FacultyService.getSearch($value).then(function (response){
            return response.data;
        });
    }
});

app.controller('ProjectCoverController',function($scope,ProjectService,project,cover){
    $scope.project= project.data.data;
    $scope.cover_image = cover.data.data;
    $scope.upload_image = null;

    $scope.selectImage = function(){
        $("#file").click();
    }

    $scope.$watch("upload_image", function(newValue, oldValue) {

        if(newValue !== null){

            if(newValue.filetype.split('/')[0] !== 'image'){
                alert('Please select only image file');
                $scope.upload_image = null;

            }else {
                $scope.cover_image = null;
            }
        }else {
            $scope.cover_image = cover.data.data;
        }
    });

    $scope.removeImage = function(){
        $scope.upload_image = null;
    }

    $scope.save = function() {
        ProjectService.saveCover($scope.project,$scope.upload_image).success(function(response){
            cover.data.data = response.data;
            $scope.cover_image = cover.data.data;
            $scope.upload_image = null;

        })
    }

});

app.controller('ProjectPhotoDeleteController',function($scope,$modalInstance,photo){
    $scope.photo = photo;

    $scope.ok = function(){
        $modalInstance.close($scope.photo);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});

app.controller('ProjectPhotoController',function($scope,$modal,FileUploader,ProjectService,project,photos){
    $scope.project= project.data.data;
    $scope.photos = photos.data.data;

    $scope.open = function (size,photo) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/project/project_photo_delete.html',
            controller: 'ProjectPhotoDeleteController',
            size: size,
            resolve: {
                photo: function () {
                    return photo
                }
            }
        });

        modalInstance.result.then(function(result){
            ProjectService.deletePhoto($scope.project.id,result).success(function(response){
                index = $scope.photos.indexOf(result);
                $scope.photos.splice(index,index+1);
            });
        })
    }


    var uploader = $scope.uploader = ProjectService.getUploader($scope.project.id);

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);

        uploader.uploadItem(fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.photos.push(response.data);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };
});