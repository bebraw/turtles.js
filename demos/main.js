require(
    {
        paths: {
            turtle: '../src/turtle',
            context: '../src/context',
            demoUtils: './demoUtils',
            utils: '../lib/utils',
            color: '../lib/color'
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
