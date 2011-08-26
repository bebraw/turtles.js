require(
    {
        paths: {
            turtle: '../src/turtle',
            utils: '../lib/utils'
        }
    },
    ['utils', 'demos'],
    function(utils, demos) {
        require.ready(function() {
            utils.each(function(demo, module) {
                module.run();
            }, demos);
        });
    }
);
