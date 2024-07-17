// src/utils/generateImageFileName.ts

export const generateImageFileName = (
  prefix: string,
  asset_id: string,
  index: number,
) => {
  return `${prefix}_${asset_id}_${index}.jpg`;
};
