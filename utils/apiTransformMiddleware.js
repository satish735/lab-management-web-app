const apiTransformMiddleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    const { transformSuccess, transformError } = config;

    // Define a custom fetcher to transform success and error responses
    const customFetcher = async (...args) => {
      try {
        const data = await fetcher(...args);

        // Apply custom transformation on success response
        const transformedData = transformSuccess
          ? transformSuccess(data)
          : data;

        return transformedData;
      } catch (error) {
        // Apply custom transformation on error response
        const transformedError = transformError ? transformError(error) : error;
        throw transformedError;
      }
    };

    // Pass the modified fetcher to SWR
    return useSWRNext(key, customFetcher, config);
  };
};
export default apiTransformMiddleware;
