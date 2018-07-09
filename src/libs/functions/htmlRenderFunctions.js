//Support function for date display issues
import {
  Image
}
from 'react-native';

export const renderImage = (node, index, siblings, parent, defaultRenderer) => {
  if(node.name == 'img') {
    const a = node.attribs;
    Image.getSize(a.src, (w, h) => {
      let acceptableWidth = 400;
      let tmpStyles = {
        width: w,
        height: h
      };
      if(acceptableWidth < w) {
        tmpStyles = {
          flex: 1,
          alignSelf: "stretch",
          marginHorizontal: 5,
          resizeMode: 'cover',
        };
        console.log(w);
      }
      return(
        <Image key={Math.random()} resizeMode='cover' source={{uri: a.src}} style={tmpStyles} />
      );
    }, (error) => {

    });

  }
}
