var app = angular.module("MyApp", []);

app.controller("dialPadController", function($scope, $http) {

    var option = 0;

    $scope.changeOption = function() {
        if(option < $scope.output.words.length-1){
            option++;
        }else{
            option = 0;
        }
        $scope.pad.option = option;
        $scope.update($scope.pad);
    };

    $scope.addInput = function(input) {
        (!$scope.pad.number ? $scope.pad.number = input.toString()  : $scope.pad.number += input.toString());
        $scope.update($scope.pad);
    };

    $scope.addSpace = function(pad ) {
        $scope.output.sentence += " " + angular.copy($scope.output.word);
        pad.number = '';
        $scope.output.word = '';
        option = 0;
    };

    $scope.removeCharacter = function(pad) {
        if(pad.number.length < 1) {
            $scope.output.sentence = $scope.output.sentence.substr(0, $scope.output.sentence.length-1);
        }
        $scope.output.word = $scope.output.word.substr(0, $scope.output.word.length-1);
           
        pad.number = pad.number.substr(0, pad.number.length-1);
        $scope.update(pad);
    };

    /**
     * API update
     * @param pad
     */
    $scope.update = function(pad) {
        $http.get('api/wordCombinations?input=' + pad.number + '&option=' + option).

            success(function(data, status, headers, config) {
                if(data.hasOwnProperty("error")) {
                    $scope.output.error = 'Dictionary word not found for input.'; 
                    console.error($scope.output.error);
                }else{
                    console.log(data);
                    $scope.output.error = ''
                    $scope.output.word = angular.copy(data.word);
                    $scope.output.words = angular.copy(data.words);
                }
            }).

            error(function(data, status, headers, config) {
                console.error(data);
            });
    };

    $scope.reset = function() {
        $scope.pad = angular.copy($scope.master);
    };

    $scope.reset();

    /**
     * Data Models
     * @type {{pad1: {number: number, letters: string, click: click}, pad2: {number: number, letters: string, click: click}, pad3: {number: number, letters: string, click: click}, pad4: {number: number, letters: string, click: click}, pad5: {number: number, letters: string, click: click}, pad6: {number: number, letters: string, click: click}, pad7: {number: number, letters: string, click: click}, pad8: {number: number, letters: string, click: click}, pad9: {number: number, letters: string, click: click}, pad_Star: {number: string, letters: string, click: click}, padZero: {number: number, letters: string, click: click}, padPound: {number: string, letters: string, click: click}}}
     */
    $scope.dialPadMap = {
        pad1: {
            number: 1,
            letters: '_',
            click: function(){
                $scope.addInput(this.number);
            }
        },
        pad2: {
            number: 2,
            letters: 'abc',
            click: function(){
                $scope.addInput(this.number);
            }
        },
        pad3: {
            number: 3,
            letters: 'def',
            click: function(){
                $scope.addInput(this.number);
            }
        },
        pad4: {
            number: 4,
            letters: 'ghi',
            click: function(){
                $scope.addInput(this.number);
            }
        },
        pad5: {
            number: 5,
            letters: 'jkl',
            click: function(){
                $scope.addInput(this.number);
            }
        },
        pad6: {
            number: 6,
            letters: 'mno',
            click: function(){
                $scope.addInput(this.number);
            }
        },
        pad7: {
            number: 7,
            letters: 'pqrs',
            click: function(){
                $scope.addInput(this.number);
            }
        },
        pad8: {
            number: 8,
            letters: 'tuv',
            click: function(){
                $scope.addInput(this.number);
            }
        },
        pad9: {
            number: 9,
            letters: 'wxyz',
            click: function(){
                $scope.addInput(this.number);
            }
        },
        pad_Star: {
            number: '*',
            letters: 'spc',
            click: function(pad){
                $scope.addSpace(pad);
            }
        },
        padZero: {
            number: 0,
            letters: 'sel',
            click: function(pad){
                $scope.changeOption(pad);
            }
        },
        padPound: {
            number: '#',
            letters: 'del',
            click: function(pad){
                $scope.removeCharacter(pad);
            }
        }
    };

    $scope.master = {};

    $scope.pad = {
        number: '',
        option: 0
    };

    $scope.output = {
        sentence:'',
        words: '',
        word: ''
    };



});