// https://en.wikipedia.org/wiki/Lujiazui

export const features = [{
  rank: 1,
  name_eng: 'Shanghai Tower',
  name_chi: '上海中心大厦',
  address: '51 Lujiazui Road',
  image: 'https://en.wikipedia.org/wiki/File:Shanghai_Tower_July_2014_-_1.jpg',
  height: 632,
  floors: 128,
  year: 2015,
  filter: f => (
    f.properties.building === '165792123' ||
    f.properties.id === '376023554' ||
    f.properties.id === '436083136'
  )
}, {
  rank: 2,
  name_eng: 'Shanghai World Financial Centre',
  name_chi: '上海环球金融中心',
  address: '100 Century Avenue',
  image: 'https://en.wikipedia.org/wiki/File:SWFC3600ppx4.jpg',
  height: 492,
  floors: 101,
  year: 2008,
  filter: f => (
    f.properties.building === '165591946' ||
    f.properties.id === '165591946'
  )
}, {
  rank: 3,
  name_eng: 'Oriental Pearl Tower',
  name_chi: '东方明珠广播电视塔',
  address: '2 Lujiazui Road',
  image: 'https://en.wikipedia.org/wiki/File:Oriental_Pearl_Tower_in_Shanghai.jpg',
  height: 468,
  floors: 114,
  year: 1995,
  filter: f => f.properties.building === 'r7584460'
}, {
  rank: 4,
  name_eng: 'Jin Mao Tower',
  name_chi: '金茂大厦',
  address: '88 Century Avenue',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Jin_Mao_Building-2005.JPG/160px-Jin_Mao_Building-2005.JPG',
  height: 421,
  floors: 93,
  year: 1999,
  filter: f => f.properties.building === 'r5602067'
}, {
  rank: 5,
  name_eng: 'One Lujiazui',
  name_chi: '时代金融中心',
  address: '68 Yincheng Road',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/C108_One_Lujiazui.jpg/160px-C108_One_Lujiazui.jpg',
  height: 269,
  floors: 47,
  year: 2008,
  filter: f => f.properties.id === '164971461'
}, {
  rank: 6,
  name_eng: 'BoCom Financial Towers',
  name_chi: '交银金融大厦',
  address: '188 Yincheng Road',
  image: 'https://en.wikipedia.org/wiki/File:Bocom_Financial_Towers_closeup.jpg',
  height: 265,
  floors: 52,
  year: 2002,
  filter: f => (
    f.properties.building === '164971470' ||
    f.properties.id === '164971470'
  )
}, {
  rank: 7,
  name_eng: 'Shanghai IFC',
  name_chi: '上海国金中心',
  address: '8 Century Avenue',
  image: 'https://en.wikipedia.org/wiki/File:Shanghai_Tower_with_IFC_North_and_South_Towers.jpg',
  height: 260,
  floors: 58,
  year: 2009,
  filter: f => (
    f.properties.building === '526005642' ||
    f.properties.id === '526005642' ||
    f.properties.id === '164968674' ||
    f.properties.id === '423304682' ||
    f.properties.id === '165166878'
  )
}, {
  rank: 8,
  name_eng: 'Bank of China Tower',
  name_chi: '中银大厦',
  address: '200 Yincheng Road',
  image: 'https://en.wikipedia.org/wiki/File:Bank_of_China_Tower_II.jpg',
  height: 258,
  floors: 53,
  year: 2000,
  filter: f => (
    f.properties.building === '164957811' ||
    f.properties.id === '164957811'
  )
}, {
  rank: 9,
  name_eng: 'Bank of Shanghai Headquarters',
  name_chi: '上海银行大厦',
  address: '168 Yincheng Road',
  image: 'https://en.wikipedia.org/wiki/File:Bank_of_Shanghai_Headquarters.jpg',
  height: 252,
  floors: 46,
  year: 2005,
  filter: f => (
    f.properties.building === '520990197' ||
    f.properties.id === '520990197'
  )
}]
