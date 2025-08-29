const importAllIcons = (r) => {
  let icons = {};
  r.keys().forEach((key) => {
    // Из ключей можно убрать префикс "./" и расширение ".png"
    const iconName = key.replace('./', '').replace('.png', '');
    icons[iconName] = r(key);
  });
  return icons;
};


const icons = importAllIcons(require.context('../images', false, /\.png$/));


Object.values(icons).forEach((src) => {
  const img = new Image();
  img.src = src;
});
export default icons;