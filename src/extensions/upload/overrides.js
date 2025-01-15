// const _ = require('lodash');
// const path = require('path');
// const { extension } = require('mime-types');

// /**
//  * Overriding formatFileInfo function for upload plugin to
//  * maintain original file naming.
//  */
// export async function formatFileInfoOverride(
//   { filename, type, size },
//   fileInfo = {},
//   metas = {},
// ) {
//   const fileService = strapi.plugin('upload').service('file');

//   let ext = path.extname(filename);

//   if (!ext) {
//     ext = `.${extension(type)}`;
//   }
//   const usedName = (fileInfo.name || filename).normalize();
//   const basename = path.basename(usedName, ext);

//   const entity = {
//     ext,
//     mime: type,
//     hash: basename,
//     name: usedName,
//     folder: fileInfo.folder,
//     caption: fileInfo.caption,
//     alternativeText: fileInfo.alternativeText,
//     size: Math.round((size / 1000) * 100) / 100,
//     folderPath: await fileService.getFolderPath(fileInfo.folder),
//   };

//   const { refId, ref, field } = metas;

//   if (refId && ref && field) {
//     entity.related = [
//       {
//         id: refId,
//         __type: ref,
//         __pivot: { field },
//       },
//     ];
//   }

//   if (metas.path) {
//     entity.path = metas.path;
//   }

//   if (metas.tmpWorkingDirectory) {
//     entity.tmpWorkingDirectory = metas.tmpWorkingDirectory;
//   }

//   return entity;
// }
const fs = require('fs');
const path = require('path');
const { extension } = require('mime-types');
const {
  sanitize,
  nameToSlug,
  contentTypes: contentTypesUtils,
  errors: { ApplicationError, NotFoundError },
  file: { bytesToKbytes },
} = require('@strapi/utils');
module.exports = ({ strapi }) => ({
  async enhanceAndValidateFileOverride(file, fileInfo = {}, metas = {}) {
    const currentFile = await strapi.formatFileInfo(
      {
        filename: file.name,
        type: file.type,
        size: file.size,
      },
      fileInfo,
      {
        ...metas,
        tmpWorkingDirectory: file.tmpWorkingDirectory,
      },
    );
    currentFile.getStream = () => fs.createReadStream(file.path);
    const { optimize, isImage, isFaultyImage, isOptimizableImage } = strapi
      .plugin('upload')
      .service('image-manipulation');
    if (await isImage(currentFile)) {
      console.log('Yes it is an image');
      if (await isFaultyImage(currentFile)) {
        throw new ApplicationError('File is not a valid image');
      }
      if (await isOptimizableImage(currentFile)) {
        return optimize(currentFile);
      }
    }
    console.log('No it is not an image');
    return currentFile;
  },
});
