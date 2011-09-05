require(
    {
        paths: {
            bunit: 'lib/bunit',
            utils: 'lib/utils',
            color: 'lib/color'
        }
    },
    ['bunit', 'tests/tests'],
    function(bunit, tests) {
        require.ready(function() {
            var r = bunit.runner();

            r.defaultUI();
            r.run();
        });
    }
);
