app.get('/render', function(req, res) {
    res.render('index', {title: 'res vs app render'}, function(err, html) {
        console.log(html);
        res.send('done');
    })
})


