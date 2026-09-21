const useSessionStorage = () => {
  function getFromSessionStorage(key) {
    try {
      const res = sessionStorage.getItem(key);
      const data = JSON.parse(res);
      return data;
    } catch (error) {
      console.log("Error in getting data from session storage");
      return null;
    }
  }

  function addInSessionStorage(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Error in adding data in session storage");
    }
  }

  return { getFromSessionStorage, addInSessionStorage };
};

export default useSessionStorage;
