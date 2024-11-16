import { iModels } from "./types";

export const IS_DEBUG = false;
export const BG_COLOR = "#f4f4f4";
export const CAMERA_MIN_DIS = 1;
export const CAMERA_MAX_DIS = 10;
export const MODELS: iModels[] = [
  {
    type: "obj",
    url: "models/texturedMesh.obj",
  },
  {
    type: "obj",
    url: "https://wroldofcoding.s3.ap-northeast-2.amazonaws.com/models/texturedMesh.obj",
  },
  {
    type: "fbx",
    url: "https://wroldofcoding.s3.ap-northeast-2.amazonaws.com/models/texturedMesh.fbx",
  },
  {
    type: "glb",
    url: "https://implicitshapefm.blob.core.windows.net/inference-outputs/os.jaeyoung@gmail.com/SESSION_1731733701_5979420/mesh.glb?se=2036-04-13T20%3A11%3A38Z&sp=r&sv=2024-11-04&sr=b&sig=meiJ8R6fXGIPe973bvf3wxI1QjPoIVlUQz1NlVNHDpA%3D",
  },
];
