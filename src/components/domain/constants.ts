import { iModels } from "./types";

export const IS_DEBUG = true;
export const BG_COLOR = "#f4f4f4";
export const CAMERA_MIN_DIS = 1;
export const CAMERA_MAX_DIS = 5;
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
    url: "https://wroldofcoding.s3.ap-northeast-2.amazonaws.com/models/texturedMesh.glb",
  },
];
