module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    shell: 'grunt-shell-spawn'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
          'dist/makerstrap.min.css': 'less/build/makerstrap.less',
          'dist/makerstrap.complete.min.css': 'less/build/makerstrap.complete.less',
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
    },

    copy: {
      latest: {
        expand: true,
        cwd: 'dist/',
        src: '**/*',
        dest: 'deploy/latest/'
      },
      version: {
        expand: true,
        cwd: 'dist/',
        src: '**/*',
        dest: 'deploy/v<%= pkg.version %>/'
      }
    },

    filesize: {
      base: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['*.css']
          }
        ]
      }
    }

  });

  grunt.registerTask('default', ['less:development', 'shell:runServer', 'watch' ]);
  grunt.registerTask('stats', ['less:development', 'filesize']);
  grunt.registerTask('build', ['less:build', 'filesize']);
  grunt.registerTask('deploy', ['copy']);

};
