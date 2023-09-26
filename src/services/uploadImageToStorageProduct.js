import { supabase } from "../supabase/supabase";
import Compressor from "compressorjs";

export async function uploadImageToStorageProduct(file) {
  const fileNameParts = file.name.split(".");
  const fileName = fileNameParts[0];
  const extension = fileNameParts[1];

  // Comprimir y convertir la imagen a formato WebP
  const compressedImage = await new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8, // especificar la calidad de la imagen comprimida
      convertSize: 0, // forzar la conversión a formato WebP
      success: (result) => {
        resolve(result);
      },
      error: (err) => {
        reject(err);
      },
    });
  });

  let newFileName = fileName;
  let i = 1;

  while (true) {
    const { error } = await supabase.storage
      .from("gamestoreac")
      .list(`products/${newFileName}.${extension}`);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    if (error || i === 1) {
      newFileName = fileName;
    } else {
      newFileName = `${fileName}-${i}`;
    }

    i++;

    const { data, error: uploadError } = await supabase.storage
      .from("gamestoreac")
      .upload(`products/${newFileName}.${extension}`, compressedImage);

    if (uploadError) {
      console.error(error);
      throw new Error(error.message);
    }

    if (data) {
      const publicUrl = `https://jdqutuyidetohruhllra.supabase.co/storage/v1/object/public/gamestoreac/${data.path}`;
      return publicUrl;
    }
  }
}
