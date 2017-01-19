import cons from 'consolidate';

const templateRootPath = `${process.cwd()}/src/lib/resources/`;

export default async function render(filename, model) {
  const data = await cons.mustache(templateRootPath + filename, model);
  return data;
}

