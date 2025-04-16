module.exports = {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        zlib: require.resolve('browserify-zlib'),
        querystring: require.resolve('querystring-es3'),
        url: require.resolve('url/'),
        buffer: require.resolve('buffer/')
      }
    }
  };
  