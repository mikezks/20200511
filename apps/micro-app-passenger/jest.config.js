module.exports = {
  name: 'micro-app-passenger',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/micro-app-passenger',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
