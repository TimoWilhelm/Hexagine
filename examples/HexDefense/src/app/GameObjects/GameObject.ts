import { Hex } from '@hexagine/index';

export abstract class GameObject {
  public sprite: ImageBitmap;

  constructor(public position: Hex, public readonly spriteSource: string) {
    const image = new Image();
    image.src = spriteSource;
    image.onload = () => {
      createImageBitmap(image).then((bitmap) => {
        this.sprite = bitmap;
      });
    };
  }
}
