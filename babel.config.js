module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'module:metro-react-native-babel-preset',
      '@babel/preset-flow'
    ],
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-flow',
      '@babel/plugin-transform-private-methods'  
    ]
  };
};