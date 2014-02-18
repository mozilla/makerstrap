module.exports = function(grunt) {

  grunt.initConfig({

    less: {
      development: {
        files: {
          'demo/compiled/demo.dev.css': 'demo/less/demo.less'
        },
        options: {
          sourceMap: true
        }
      },

      build: {
        files: {
          'dist/makerstrap.min.css': 'less/makerstrap.less',
          'dist/makerstrap.complete.min.css': 'less/makerstrap.complete.less',
          'demo/compiled/demo.css': 'demo/less/demo.less'
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
        command: 'node demo/server.js'
      }
    },

    watch: {
      less: {
        files: ['less/**/*.less', 'demo/less/**/*.less'],
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
