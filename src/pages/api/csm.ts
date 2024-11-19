import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

const CSM_API_URL = "https://api.csm.ai/image-to-3d-sessions";
const CSM_API_KEY = process.env.NEXT_PUBLIC_CSM_API_KEY;

interface CSMRequestBody {
  image_url: string;
  creativity?: string;
  auto_refine?: boolean;
  refine_speed?: string;
  preview_mesh?: string;
  texture_resolution?: number;
  scaled_bbox?: [number, number, number];
  topology?: string;
  resolution?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "허용되지 않는 메소드입니다" });
  }

  try {
    const body: CSMRequestBody = req.body;
    if (!body.image_url.startsWith("data:")) {
      return res.status(400).json({
        error:
          "Base64 이미지는 반드시 MIME 타입이 포함되어야 합니다. (예: data:image/jpeg;base64,...)",
      });
    }
    const response = await axios.post(
      CSM_API_URL,
      {
        image_url: body.image_url,
        preview_mesh: "fast_sculpt",
        topology: "tris", // Mesh Topology: Tris
        resolution: "high_poly", // Polygon Count: High Poly
        refine_speed: "slow", // Refine Speed: Slow
        creativity: "highest", // Creativity: Highest
        texture_resolution: 2048, // 기본 텍스처 해상도
        auto_refine: false, // 기본 자동 리파인 설정
      },
      {
        headers: {
          "x-api-key": CSM_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log({
      "동적 파라미터 값": {
        texture_resolution: body.texture_resolution,
      },
    });

    console.log({ "csm result": response.data });

    return res.status(201).json(response.data);
  } catch (error) {
    console.error("CSM API 오류:", error);
    return res.status(500).json({
      error: "3D 모델 생성 중 오류가 발생했습니다",
    });
  }
}
