module.exports = {
  name: 'micro-app-flight',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/micro-app-flight',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
