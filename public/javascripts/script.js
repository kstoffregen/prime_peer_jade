$(document).ready(function(){

    function Comment(id, msg){
        this.id = id;
        this.msg = msg;
    }

    var newData = [];
    var handlebarsTemplate;

    function getTemplate() {
        return $.ajax({
            method: 'GET',
            url: '/memes/handlebars'
        }).done(function (data) {
            handlebarsTemplate = data;
        });
    }

    function getMessages(){
        return $.ajax({
            method: 'GET',
            url: '/memes/messages'
        }).done(function(data){
            newData = data;
        })
    }
    function addMessages(array) {
        array.forEach(function(obj){
            var source = $('#comments-ul').html();
            var template = Handlebars.compile(source);
            $('#' + obj.id + '.addComment').after().after(template(obj));
        })
    }
    $.when(getTemplate(), getMessages()).done(function() {
        $('.memes').prepend(handlebarsTemplate);
        addMessages(newData);
    });

    $('.submit').on('click', function(e){
        e.preventDefault();
        var $comment = $('#comment' + $(this).attr('id'));
        if($comment.val() != "") {
            var thisComment = new Comment($(this).attr('id'), $comment.val());
            $comment.val("");
            $.ajax({
                method: 'POST',
                url: '/memes',
                data: thisComment
            }).done(function (data) {
                newData = data;
                $('ul').remove();
                addMessages(newData);
            });
        } else {
            alert("You didn't add a comment!");
        }
    });

});