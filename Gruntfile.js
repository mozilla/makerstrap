module.exports = function(grunt) {

  grunt.initConfig({

    less: {
      development: {
        files: {
          'compiled/makerstrap.dev.css': 'less/makerstrap.less',
          'demo/css/demo.css': 'demo/css/demo.less'
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

    shell: {
      runServer: {
        options: {
          async: true
        },
        command: 'node server.js'
      }
    },

    watch: {
      less: {
        files: ['less/**/*.less', 'demo/css/**/*.less'],
        tasks: ['less:development'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell-spawn');

  grunt.registerTask('default', ['less:development', 'shell:runServer', 'watch' ]);
  grunt.registerTask('build', ['less:build']);

};
