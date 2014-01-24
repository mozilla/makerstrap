module.exports = function(grunt) {

  grunt.initConfig({

    less: {
      development: {
        files: {
          'makerstrap.min.css': 'src/makerstrap.less',
          'demo/css/demo.css': 'demo/css/demo.less'
        },
        options: {
          sourceMap: true
        }
      },
      build: {
        files: {
          'makerstrap.min.css': 'src/makerstrap.less',
          'demo/css/demo.css': 'demo/css/demo.less'
        },
        options: {
          compress: true
        }

      }
    },

    develop: {
      server: {
        file: 'server.js'
      }
    },

    watch: {
      less: {
        files: ['src/**/*.less'],
        tasks: ['less:development'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less:development', 'develop', 'watch' ]);
  grunt.registerTask('build', ['less:build']);

};
