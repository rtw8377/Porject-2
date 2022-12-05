const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('popupMessage').classList.remove('hidden');
  };
  
  /* Sends post requests to the server using fetch. Will look for various
     entries in the response JSON object, and will handle them appropriately.
  */
  const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    document.getElementById('popupMessage').classList.add('hidden');
  
    if(result.error) {
      handleError(result.error)
    }

    if(result.redirect) {
      window.location = result.redirect;
    }
  
    if(handler) {
      handler(result);
    }
  };

  const hideError = () => {
    document.getElementById('popupMessage').classList.add('hidden');
  };

  module.exports = {
    handleError,
    sendPost,
    hideError,
  };