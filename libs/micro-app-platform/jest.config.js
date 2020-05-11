module.exports = {
  name: 'micro-app-platform',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/micro-app-platform',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
