const Option = {
  devColor: {
    1: { // 正常率低于50%
      color_0: '#FABE89',
      color_1: '#F38C9D',
      color_2: '#e9ebf0'
    },
    2: { // 正常率50%-80%
      color_0: '#FABE89',
      color_1: '#F38C9D',
      color_2: '#e9ebf0'
    },
    3: { // 正常率80%-95%
      color_0: '#6CF3DD',
      color_1: '#09BDFE',
      color_2: '#e9ebf0'
    },
    4: { // 正常率高于95%
      color_0: '#6CF3DD',
      color_1: '#09BDFE',
      color_2: '#e9ebf0'
    }
  }
};
export default Option;
