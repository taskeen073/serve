var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;

        }
        fs.rmSync('read_models.js', { recursive: true })

        filenames.forEach(function(filename) {
            fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                if (filename == 'index.js') {
                    fs.appendFileSync("read_models.js", '//')
                }

                fs.appendFileSync("read_models.js", " const { ");
                fs.appendFileSync("read_models.js", filename.slice(0, -3));
                fs.appendFileSync("read_models.js", " } = require('./models') ");
                fs.appendFileSync("read_models.js", "\n")
                onFileContent(filename, content)

                console.log(filename)
                onFileContent(filename, content)


            });
        });
    });

}
var data = {};
readFiles('models/', function(filename, content) {
    data[filename] = content;
}, function(err) {
    throw err;
});