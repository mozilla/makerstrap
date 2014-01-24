module.exports = function(grunt) {

  grunt.initConfig({

    less: {
      development: {
        files: {
          'compiled/makerstrap.dev.css': 'less/makerstrap.less'
        },
        options: {
          sourceMap: true
        }
      },
      build: {
        files: {
          'makerstrap.min.css': 'less/makerstrap.less',
          'makerstrap.complete.min.css': 'less/makerstrap.complete.less'
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
        files: ['less/**/*.less'],
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
