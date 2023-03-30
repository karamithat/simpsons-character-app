export const cleanURL = (url) => {
    const reg = /(.+\/images\/.+?\.(png))/;
    const toMatch = url.match(reg);

    if (toMatch) {
      return toMatch[1];
    } else if (url) {
      return url;
    } else {
      return "https://via.placeholder.com/300";
    }
  };
