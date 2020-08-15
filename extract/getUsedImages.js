module.exports = (allById) => {
  const paths = {};
  for (const unit of Object.values(allById)) {
    paths[unit.image] = true;
    for (const atck of unit.attacks) {
      paths[atck.icon] = true;
    }
  }
  delete paths[undefined];
  return Object.keys(paths);
};
